// Assembles the full system prompt: requirements.txt + a note on this test
// phase's limitations + the live site knowledge base.
const fs = require('fs');
const path = require('path');

const requirements = fs.readFileSync(path.join(__dirname, 'requirements.txt'), 'utf-8');
const knowledgeBase = fs.readFileSync(path.join(__dirname, 'site-knowledge-base.txt'), 'utf-8');

const testPhaseNote = `
TEST-PHASE NOTE (not part of Julie's approved requirements -- added for this
offline evaluation only):
The "Approved external authoritative sources" (Metro Parks pages, Dayton Art
Institute, Oregon District) are NOT available to you in this test -- you have
no live web access. If a visitor asks something only those sites would know
(e.g. current park hours, an address, whether a permit is required), you do
not know it. Follow UNKNOWN-QUESTION HANDLING rather than guessing.
`;

const systemPrompt = `${requirements}

${testPhaseNote}

===============================================================
CURRENT PUBLISHED WEBSITE CONTENT (portraits.thesunlitwanderer.com)
This is the live, current, published content of the site. Treat it as the
"Current TSW website" source in your Authoritative Order. Do not state
anything about pricing, policies, locations, or sessions that contradicts
what's here.
===============================================================

${knowledgeBase}
`;

fs.writeFileSync(path.join(__dirname, 'system-prompt.txt'), systemPrompt);
console.log(`Wrote system-prompt.txt: ${systemPrompt.length} chars (~${Math.round(systemPrompt.length / 4)} tokens estimated)`);
