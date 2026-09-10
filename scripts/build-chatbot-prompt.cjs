// Builds functions/api/_system-prompt.js from the live src/content/ files
// and the approved chatbot requirements doc. Run this after any content or
// requirements change, before deploying, so the live chatbot never drifts
// from the actual published site or the approved requirements.
//
// Mirrors chatbot-testing/build-knowledge-base.cjs + build-system-prompt.cjs
// (which remain the offline-testing versions) but writes a JS module the
// Cloudflare Pages Function can import directly, and drops the
// test-phase-only note since this is the production prompt.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REQUIREMENTS_PATH = path.join(
  ROOT,
  '..',
  'Requirements',
  'TSW_CHATBOT REQUIREMENTS.txt',
);
const INTERNAL_KEYS = new Set(['accessNote', 'laborHours', '_laborComment']);

function stripInternal(obj) {
  if (Array.isArray(obj)) return obj.map(stripInternal);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith('_')) continue;
      if (INTERNAL_KEYS.has(k)) continue;
      out[k] = stripInternal(v);
    }
    return out;
  }
  return obj;
}

function readCleanJson(p) {
  const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
  return JSON.stringify(stripInternal(data), null, 2);
}

function readText(p) {
  return fs.readFileSync(p, 'utf-8');
}

function buildKnowledgeBase() {
  const parts = [];
  parts.push('=== site.json ===\n' + readCleanJson(path.join(ROOT, 'src/content/site.json')));
  parts.push('=== pricing.json ===\n' + readCleanJson(path.join(ROOT, 'src/content/pricing.json')));
  parts.push('=== reviews.json ===\n' + readCleanJson(path.join(ROOT, 'src/content/reviews.json')));
  parts.push('=== questionnaires.json ===\n' + readCleanJson(path.join(ROOT, 'src/content/questionnaires.json')));
  parts.push('=== specials.json (the currently running special) ===\n' + readCleanJson(path.join(ROOT, 'src/content/specials.json')));

  for (const f of fs.readdirSync(path.join(ROOT, 'src/content/faq'))) {
    parts.push(`=== faq/${f} ===\n` + readCleanJson(path.join(ROOT, 'src/content/faq', f)));
  }
  for (const f of fs.readdirSync(path.join(ROOT, 'src/content/copy'))) {
    parts.push(`=== copy/${f} ===\n` + readText(path.join(ROOT, 'src/content/copy', f)));
  }
  for (const f of fs.readdirSync(path.join(ROOT, 'src/content/locations'))) {
    const filePath = path.join(ROOT, 'src/content/locations', f);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (raw.status === 'draft') continue; // not published -- shouldn't inform the bot
    parts.push(`=== locations/${f} ===\n` + JSON.stringify(stripInternal(raw), null, 2));
  }
  return parts.join('\n\n');
}

function main() {
  const requirements = readText(REQUIREMENTS_PATH);
  const knowledgeBase = buildKnowledgeBase();

  const externalSourcesNote = `
KNOWN LIMITATION (as of launch, not part of Julie's approved requirements):
You do not have live web access to the "Approved external authoritative
sources" listed above (Metro Parks pages, Dayton Art Institute, Oregon
District). If a visitor asks something only those sites would know (current
hours, an address, a permit requirement), you do not know it. Follow
UNKNOWN-QUESTION HANDLING rather than guessing.
`;

  const questionnaireBehavior = `
===============================================================
SESSION QUESTIONNAIRE WALKTHROUGH BEHAVIOR
The knowledge base includes questionnaires.json -- the exact questions Julie
asks for each session type (family-kids, grads, couples, maternity) before a
session, normally filled out as a web form after booking.

CURRENT SPECIAL / MINI SESSIONS ARE DIFFERENT: check specials.json in the
knowledge base for whatever special is currently running. If someone asks
about it, briefly describe it and point them to the Specials page or booking
link to pick their own date and time directly -- do NOT offer a questionnaire
walkthrough for a special/mini session, it does not have one. If specials.json
includes an urgencyNote, you can mention it, but never pressure or use
aggressive sales language. If a visitor asks how the special differs from a
similarly-priced regular tier, use the comparisonToShort (or equivalent) field
to explain clearly rather than guessing.

When a visitor is ready to book a REGULAR session (not the current special) and
you know their session type, offer them a choice in your own words, e.g.:
"Want me to walk you through a few quick planning questions now, or would
you rather I text/email you a link to fill out later if you're short on
time?" Never force the walkthrough -- always offer the "later" option too.

If they want the link later: treat this like a normal submit_lead case --
collect name + contact info, let them know Julie will follow up and send
the questionnaire herself. Do not invent or describe a ShootProof link
yourself; Julie sends it manually.

If they want to do it now:
- Ask only the questions listed for their session_type in questionnaires.json,
  in the order given. Never skip a question marked required: true. Optional
  questions can be skipped if the visitor doesn't want to answer or seems
  rushed -- don't push, just move on warmly.
- CRITICAL: before asking any question, check whether the visitor already
  gave that information anywhere earlier in the conversation (e.g. they
  opened with "I want a short session at Sycamore Park" -- that already
  answers the location question). If so, treat it as answered. You can
  briefly acknowledge it ("Sycamore State Park, got it!") but never ask
  the same thing twice.
- Present checkbox/radio options naturally in conversation, not as a
  literal list of form fields. Accept free-text answers that don't
  exactly match a listed option if they're a clear equivalent.
- A question with "skipUnless" only makes sense given a specific earlier
  answer -- use judgment on whether it applies, and skip it silently if not.
- Maternity has a sensitivityNote -- follow it exactly, do not ask about the
  pregnancy itself beyond what the visitor volunteers.
- Once every applicable question has been asked or skipped, call
  submit_questionnaire exactly once with the full set of answers. Do not
  also call submit_lead for the same visitor.
- After the tool call succeeds, let the visitor know Julie has everything
  she needs and will follow up to finalize booking -- this is NOT an
  automatic booking confirmation, just confirm the info was sent.
===============================================================
`;

  const finalReminder = `
===============================================================
FINAL REMINDER BEFORE YOU RESPOND
Your response must be plain conversational text only -- no ## headers, no
**bold**, no bullet lists with - or *. Write it like a text message from a
person, not a formatted document. Keep it to a few sentences or one short
paragraph unless the visitor asked for real depth.
===============================================================
`;

  const systemPrompt = `${requirements}

${externalSourcesNote}

===============================================================
CURRENT PUBLISHED WEBSITE CONTENT (portraits.thesunlitwanderer.com)
This is the live, current, published content of the site. Treat it as the
"Current TSW website" source in your Authoritative Order. Do not state
anything about pricing, policies, locations, or sessions that contradicts
what's here.
===============================================================

${knowledgeBase}

${questionnaireBehavior}

${finalReminder}
`;

  const outPath = path.join(ROOT, 'functions', 'api', '_system-prompt.js');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(
    outPath,
    `// AUTO-GENERATED by scripts/build-chatbot-prompt.cjs -- do not edit directly.\n` +
      `// Edit Requirements/TSW_CHATBOT REQUIREMENTS.txt or src/content/, then re-run the script.\n` +
      `export const SYSTEM_PROMPT = ${JSON.stringify(systemPrompt)};\n`,
  );

  console.log(`Wrote functions/api/_system-prompt.js (${systemPrompt.length} chars, ~${Math.round(systemPrompt.length / 4)} tokens estimated)`);
}

main();
