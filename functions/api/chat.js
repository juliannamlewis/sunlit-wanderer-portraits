// Cloudflare Pages Function -- POST /api/chat
// Body: { messages: [{ role: 'user' | 'assistant', content: string }, ...] }
// Response: { reply: string }
//
// Secrets needed (set via `wrangler pages secret put <NAME>` or the
// Cloudflare dashboard, Settings -> Environment variables):
//   ANTHROPIC_API_KEY  -- required
//   RESEND_API_KEY     -- optional; lead emails are skipped (logged only) if unset
//   LEAD_NOTIFY_EMAIL  -- where lead emails go (Julie's inbox)
//   LEAD_FROM_EMAIL    -- the "from" address Resend sends as (must be a
//                         domain verified in Resend, or their shared
//                         test domain for early testing)
//
// Binding needed: CHATBOT_TRANSCRIPTS (KV namespace, see wrangler.toml)
// for anonymized transcript logging. If not bound, logging is skipped --
// the chatbot still works without it.

import { SYSTEM_PROMPT } from './_system-prompt.js';

const MODEL = 'claude-sonnet-4-5';
const MAX_MESSAGES = 40; // ~20 back-and-forth turns; caps worst-case cost per conversation
const TEN_QUESTION_THRESHOLD = 10;

const SUBMIT_LEAD_TOOL = {
  name: 'submit_lead',
  description:
    "Call this when a visitor has agreed to have Julie follow up and has provided a phone number or email (and optionally a first name). Do this exactly once per lead -- don't call it again later in the same conversation unless the visitor gives new contact info.",
  input_schema: {
    type: 'object',
    properties: {
      first_name: {
        type: 'string',
        description: "Visitor's first name, or empty string if not given. Never include a last name.",
      },
      contact_method: {
        type: 'string',
        enum: ['text', 'call', 'email'],
        description: 'How the visitor wants to be contacted.',
      },
      contact_value: {
        type: 'string',
        description: 'The phone number or email address the visitor provided.',
      },
      question_summary: {
        type: 'string',
        description: "A short (one sentence) summary of what the visitor wants to know, for Julie's context.",
      },
    },
    required: ['contact_method', 'contact_value', 'question_summary'],
  },
};

function redact(text) {
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[redacted email]')
    .replace(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, '[redacted phone]');
}

async function callClaude(env, messages, extraSystemNote) {
  const system = [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }];
  if (extraSystemNote) {
    system.push({ type: 'text', text: extraSystemNote });
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 600,
      system,
      tools: [SUBMIT_LEAD_TOOL],
      messages,
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function sendLeadEmail(env, lead) {
  if (!env.RESEND_API_KEY || !env.LEAD_NOTIFY_EMAIL || !env.LEAD_FROM_EMAIL) {
    console.log('Lead captured but email not configured yet:', JSON.stringify(lead));
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.LEAD_FROM_EMAIL,
      to: env.LEAD_NOTIFY_EMAIL,
      subject: `New chatbot lead${lead.first_name ? ': ' + lead.first_name : ''}`,
      text: `New lead from the site chatbot.\n\nName: ${lead.first_name || '(not given)'}\nContact (${lead.contact_method}): ${lead.contact_value}\nWhat they want to know: ${lead.question_summary}\n`,
    }),
  });

  const body = await res.text();
  if (!res.ok) {
    console.error(`Resend API error ${res.status}:`, body);
  } else {
    console.log(
      `Lead email sent successfully. from=${env.LEAD_FROM_EMAIL} to=${env.LEAD_NOTIFY_EMAIL} response=${body}`,
    );
  }
}

async function logTranscript(env, messages) {
  if (!env.CHATBOT_TRANSCRIPTS) return; // KV not bound yet -- skip silently

  const redacted = messages.map((m) => ({ role: m.role, content: redact(String(m.content)) }));
  const key = `${new Date().toISOString()}-${crypto.randomUUID().slice(0, 8)}`;
  await env.CHATBOT_TRANSCRIPTS.put(key, JSON.stringify(redacted), {
    expirationTtl: 60 * 60 * 24 * 90, // 90 days
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    return new Response(
      JSON.stringify({
        reply:
          "We've covered a lot here! I'd love to have Julie take it from here so you get a more personal answer to everything -- want to leave your number or email for her?",
      }),
      { status: 200 },
    );
  }

  const questionCount = messages.filter((m) => m.role === 'user').length;
  const extraSystemNote =
    questionCount >= TEN_QUESTION_THRESHOLD
      ? `[Context for you, not the visitor: this is the visitor's question #${questionCount} in this conversation. Per TEN-QUESTION HANDOFF IS A HARD TRIGGER, after answering, gently offer Julie follow-up.]`
      : null;

  try {
    let data = await callClaude(env, messages, extraSystemNote);
    let toolUse = data.content?.find((c) => c.type === 'tool_use' && c.name === 'submit_lead');

    if (toolUse) {
      await sendLeadEmail(env, toolUse.input);

      const followUpMessages = [
        ...messages,
        { role: 'assistant', content: data.content },
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: toolUse.id,
              content: 'Lead relayed to Julie successfully.',
            },
          ],
        },
      ];
      data = await callClaude(env, followUpMessages, extraSystemNote);
    }

    const reply = data.content?.filter((c) => c.type === 'text').map((c) => c.text).join('') || '';

    context.waitUntil(logTranscript(env, [...messages, { role: 'assistant', content: reply }]));

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        reply:
          "Sorry, something went wrong on my end. You're welcome to message Julie directly in the meantime -- there's a Message me button in the footer.",
      }),
      { status: 200 },
    );
  }
}
