// Rebuilds site-knowledge-base.txt from the live src/content/ files.
// Run this after any content change so the chatbot's knowledge stays in sync.
// Strips internal-only fields (never shown publicly) and draft/unpublished
// content (not live on the site yet) before it ever reaches the model.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
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

let skippedDrafts = [];
for (const f of fs.readdirSync(path.join(ROOT, 'src/content/locations'))) {
  const filePath = path.join(ROOT, 'src/content/locations', f);
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (raw.status === 'draft') {
    skippedDrafts.push(f);
    continue; // not published on the live site -- shouldn't inform the bot's answers
  }
  parts.push(`=== locations/${f} ===\n` + JSON.stringify(stripInternal(raw), null, 2));
}

const kb = parts.join('\n\n');
fs.writeFileSync(path.join(__dirname, 'site-knowledge-base.txt'), kb);

console.log(`Wrote knowledge base: ${parts.length} sections, ${kb.length} chars`);
console.log(`Skipped ${skippedDrafts.length} draft locations (not live yet):`, skippedDrafts.join(', '));
