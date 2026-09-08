// Runs each scripted conversation turn-by-turn (maintaining message history,
// unlike run-test.cjs's single-turn questions) to check the *stateful*
// rules: 10+ question handoff, repeated-spam cutoff, full lead-capture flow,
// context retention across turns, and tone under mixed frustration.
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^([^=#]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = process.env[m[1].trim()] || m[2].trim();
  }
}

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY');
  process.exit(1);
}

const MODEL = 'claude-sonnet-4-5';
const inputFile = process.argv[2] || 'test-conversations.json';
const outputFile = process.argv[3] || 'conversation-test-report.md';
const systemPrompt = fs.readFileSync(path.join(__dirname, 'system-prompt.txt'), 'utf-8');
const conversations = JSON.parse(fs.readFileSync(path.join(__dirname, inputFile), 'utf-8'));

async function sendTurn(history) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      system: [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
      messages: history,
    }),
  });

  if (!res.ok) {
    return { error: `HTTP ${res.status}: ${await res.text()}` };
  }
  const data = await res.json();
  const text = data.content?.map((c) => c.text).join('') ?? '(no text)';
  return { text, usage: data.usage };
}

function slugTitle(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function runConversation(name, userMessages) {
  const history = [];
  const transcriptLines = [`## ${slugTitle(name)}\n`];

  for (let i = 0; i < userMessages.length; i++) {
    const userMsg = userMessages[i];
    history.push({ role: 'user', content: userMsg });
    transcriptLines.push(`**Visitor (turn ${i + 1}):** ${userMsg}\n`);

    const result = await sendTurn(history);
    if (result.error) {
      transcriptLines.push(`**Bot:** ⚠️ ERROR — ${result.error}\n`);
      break;
    }
    history.push({ role: 'assistant', content: result.text });
    transcriptLines.push(`**Bot:** ${result.text}\n`);
    process.stdout.write('.');
  }

  return transcriptLines.join('\n');
}

async function main() {
  const names = Object.keys(conversations);
  console.log(`Running ${names.length} multi-turn conversations...`);

  const sections = [];
  for (const name of names) {
    console.log(`\n${name} (${conversations[name].length} turns):`);
    const transcript = await runConversation(name, conversations[name]);
    sections.push(transcript);
  }

  console.log('\n\nWriting report...');

  const report = `# Chatbot Multi-Turn Conversation Test Report

Generated: ${new Date().toISOString()}
Model: ${MODEL}
Conversations: ${names.length}

Each conversation below is a single continuous back-and-forth (full message
history sent each turn), designed to test rules that only show up across
multiple messages: the 10+ question handoff nudge, ending a conversation
after repeated spam, the full lead-capture flow, context retention, and
tone under mixed frustration/legitimate questions.

---

${sections.join('\n\n---\n\n')}
`;

  fs.writeFileSync(path.join(__dirname, outputFile), report);
  console.log(`Report written to chatbot-testing/${outputFile}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
