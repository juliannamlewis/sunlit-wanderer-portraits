// Builds well-structured Markdown files for Retell's RAG-based Knowledge Base
// (chunked + vector-searched, top ~3 chunks per turn) -- a different consumption
// model than the text chatbot's single system-prompt dump, so raw JSON here
// would retrieve poorly.
//
// Output goes to public/agent-knowledge/*.md, which Astro publishes as plain
// static files at https://portraits.thesunlitwanderer.com/agent-knowledge/*.md
// on every deploy. In Retell, add each as a URL-type Knowledge Base source
// (not a File upload) with auto-refresh enabled -- Retell re-checks URL
// sources every 24 hours on its own, so specials/pricing/etc. changes reach
// the voice agent automatically on the next deploy, no manual re-upload.
//
// Run this before `npm run build` any time src/content/*.json changes and
// you want the voice agent's knowledge to stay current. Output is gitignored
// (regenerable), same convention as chatbot-testing/*.txt.
//
// Contains supporting information ONLY, per Retell's guidance -- no behavior
// instructions, which stay in the agent's main prompt (see retell-agent-prompt.md).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'agent-knowledge');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function write(name, content) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, name), content.trim() + '\n');
  console.log(`Wrote public/agent-knowledge/${name} (${content.length} chars)`);
}

function buildBusinessOverview() {
  const site = readJson(path.join(ROOT, 'src/content/site.json'));
  const pricing = readJson(path.join(ROOT, 'src/content/pricing.json'));

  let md = `# The Sunlit Wanderer -- Business Overview\n\n`;
  md += `## About\n${site.site.tagline} Based in Dayton, Ohio, serving ${site.site.serviceArea}. ${site.site.serviceRadiusNote}\n\n`;
  md += `## Contact\nPreferred contact is Messenger ("${site.contact.messengerLabel}"). Phone: ${site.contact.phoneDisplay}.\n\n`;
  md += `## Session Pricing\n${pricing.universalPolicy.heading}. ${pricing.universalPolicy.body} ${pricing.universalPolicy.includesLine}\n\n`;

  for (const tier of pricing.tiers) {
    md += `### ${tier.name} -- ${tier.priceDisplay}\n`;
    md += `Duration: ${tier.duration}. Minimum images: ${tier.minimumImagesDisplay}.\n`;
    md += `Best for: ${tier.bestFor}\n`;
    md += `${tier.description}\n`;
    md += `Includes: ${tier.includes.join('; ')}.\n`;
    md += `Important: the ${tier.priceDisplay} price includes every professionally edited image from the session, not a set or limited number -- there is no picking a handful of files and no paying extra to unlock the rest.\n\n`;
  }

  md += `## Which Session Fits Which Category\n${pricing.whichFits.intro}\n\n`;
  for (const [category, guidance] of Object.entries(pricing.whichFits.byCategory)) {
    md += `### ${category[0].toUpperCase()}${category.slice(1)}\n`;
    md += `Short session: ${guidance.short}\n`;
    md += `Standard session: ${guidance.standard}\n`;
    md += `Extended session: ${guidance.extended}\n\n`;
  }
  md += `Note on timing: ${pricing.whichFits.timingNote}\n\n`;

  md += `## Outfit Changes Policy\n`;
  md += `Multiple outfits or outfit changes are only a standard part of Grad sessions and Extended-tier sessions (any category). Standard and Short sessions for families, maternity, and couples don't include outfit changes as a rule. If a client wants to bring an extra outfit anyway, that's something Julie arranges personally -- never offer it proactively or imply it's a standard option.\n`;

  write('business-overview.md', md);
}

function buildFaq() {
  let md = `# Frequently Asked Questions\n\n`;
  const faqDir = path.join(ROOT, 'src/content/faq');
  for (const f of fs.readdirSync(faqDir)) {
    const data = readJson(path.join(faqDir, f));
    const category = f.replace('.json', '');
    md += `## ${data.title || category}\n\n`;
    for (const item of data.questions) {
      md += `**${item.q}**\n${item.a}\n\n`;
    }
  }
  write('faq.md', md);
}

function buildLocations() {
  let md = `# Session Locations\n\n`;
  const locDir = path.join(ROOT, 'src/content/locations');
  for (const f of fs.readdirSync(locDir)) {
    const data = readJson(path.join(locDir, f));
    if (data.status === 'draft') continue; // not published, don't inform the agent

    md += `## ${data.name}\n`;
    if (data.shortDescription) md += `${data.shortDescription}\n\n`;
    if (data.bestFor) md += `Best for: ${data.bestFor}\n\n`;
    if (data.walkingLevel) md += `Walking level: ${data.walkingLevel}\n\n`;
    if (data.restrooms) md += `Restrooms: ${data.restrooms}\n\n`;
    if (data.parking) md += `Parking: ${data.parking}\n\n`;
    if (data.accessibility) md += `Accessibility: ${data.accessibility}\n\n`;
    if (data.availability === 'seasonal' && data.availabilityWindow) {
      md += `Availability: seasonal, ${data.availabilityWindow}\n\n`;
    }
    if (data.bestSeasons && data.bestSeasons.length) {
      md += `Best seasons: ${data.bestSeasons.join(', ')}\n\n`;
    }
    if (data.seasonalNote) md += `${data.seasonalNote}\n\n`;
  }
  write('locations.md', md);
}

function buildCategoryDescriptions() {
  let md = `# Session Category Descriptions\n\n`;
  const copyDir = path.join(ROOT, 'src/content/copy');
  for (const f of ['families.md', 'grads.md', 'maternity.md', 'couples.md']) {
    const raw = fs.readFileSync(path.join(copyDir, f), 'utf-8');
    const withoutFrontmatter = raw.replace(/^---[\s\S]*?---\n/, '').trim();
    const titleMatch = raw.match(/title:\s*(.+)/);
    md += `## ${titleMatch ? titleMatch[1].trim() : f.replace('.md', '')}\n\n${withoutFrontmatter}\n\n`;
  }
  write('category-descriptions.md', md);
}

function buildQuestionnaires() {
  const data = readJson(path.join(ROOT, 'src/content/questionnaires.json'));
  let md = `# Session Questionnaires (Reference Only)\n\n`;
  md += `These are the questions asked for each session type. How and when to ask them is governed by the agent's main prompt, not this document.\n\n`;

  for (const [key, q] of Object.entries(data)) {
    if (key === '_comment' || key === 'intro') continue;
    md += `## ${q.label} Questionnaire\n\n`;
    for (const question of q.questions) {
      const opts = question.options ? ` Options: ${question.options.join(', ')}.` : '';
      md += `- (${question.required ? 'Required' : 'Optional'}) ${question.text}${opts}\n`;
    }
    if (q.sensitivityNote) md += `\nNote: ${q.sensitivityNote}\n`;
    md += '\n';
  }
  write('questionnaires.md', md);
}

function buildSpecials() {
  const specialsPath = path.join(ROOT, 'src/content/specials.json');
  if (!fs.existsSync(specialsPath)) return;
  const s = readJson(specialsPath);
  if (!s.active) return;

  let md = `# Current Special: ${s.name}\n\n`;
  md += `Price: ${s.priceDisplay}. Duration: ${s.duration}.\n\n`;
  md += `## Location\n${s.location}\n\n`;
  md += `## Dates\n${s.dates}\n\n`;
  md += `## Policy\n${s.policy}\n\n`;
  md += `## Questionnaire\n${s.questionnaire}\n\n`;
  if (s.urgencyNote) md += `## Urgency Note\n${s.urgencyNote}\n\n`;
  if (s.comparisonToShort) md += `## How This Differs From the Short Session\n${s.comparisonToShort}\n\n`;

  write('specials.md', md);
}

buildBusinessOverview();
buildSpecials();
buildFaq();
buildLocations();
buildCategoryDescriptions();
buildQuestionnaires();
