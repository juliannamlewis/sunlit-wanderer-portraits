// Sends every question in test-questions.json to the chatbot (single-turn
// each) and writes a Markdown report of question/answer pairs, grouped by
// category, for Julie to read through.
const fs = require('fs');
const path = require('path');

// Minimal .env loader (no dependency needed)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^([^=#]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = process.env[m[1].trim()] || m[2].trim();
  }
}

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY (expected in chatbot-testing/.env)');
  process.exit(1);
}

const MODEL = 'claude-sonnet-4-5';
const systemPrompt = fs.readFileSync(path.join(__dirname, 'system-prompt.txt'), 'utf-8');
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'test-questions.json'), 'utf-8'));

async function ask(question) {
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
      system: [
        { type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } },
      ],
      messages: [{ role: 'user', content: question }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return { error: `HTTP ${res.status}: ${errText}` };
  }

  const data = await res.json();
  const text = data.content?.map((c) => c.text).join('') ?? '(no text content)';
  return { text, usage: data.usage };
}

function slugTitle(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function main() {
  const categories = Object.keys(questions);
  let total = 0;
  for (const cat of categories) total += questions[cat].length;

  console.log(`Running ${total} questions across ${categories.length} categories...`);

  const reportSections = [];
  let cachedTokensUsed = 0;
  let uncachedTokensUsed = 0;
  let outputTokensUsed = 0;
  let errors = 0;
  let done = 0;

  for (const cat of categories) {
    const catQuestions = questions[cat];
    const rows = [];

    for (const q of catQuestions) {
      const result = await ask(q);
      done++;

      if (result.error) {
        errors++;
        rows.push(`**Q:** ${q}\n\n**A:** ⚠️ ERROR — ${result.error}\n`);
      } else {
        rows.push(`**Q:** ${q}\n\n**A:** ${result.text}\n`);
        if (result.usage) {
          cachedTokensUsed += result.usage.cache_read_input_tokens || 0;
          uncachedTokensUsed += result.usage.input_tokens || 0;
          outputTokensUsed += result.usage.output_tokens || 0;
        }
      }

      process.stdout.write(`\r${done}/${total} done (${errors} errors)`);
    }

    reportSections.push(`## ${slugTitle(cat)}\n\n${rows.join('\n---\n\n')}`);
  }

  console.log('\nDone. Writing report...');

  const summary = `# Chatbot Test Report

Generated: ${new Date().toISOString()}
Model: ${MODEL}
Total questions: ${total}
Errors: ${errors}

**Estimated token usage:** ~${uncachedTokensUsed.toLocaleString()} uncached input, ~${cachedTokensUsed.toLocaleString()} cached input (billed at a fraction of uncached rate), ~${outputTokensUsed.toLocaleString()} output.

---

`;

  fs.writeFileSync(
    path.join(__dirname, 'test-report.md'),
    summary + reportSections.join('\n\n'),
  );

  console.log(`Report written to chatbot-testing/test-report.md`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
