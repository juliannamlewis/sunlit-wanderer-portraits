# Chatbot Requirements Changelog

Per the requirements doc's own change-management process: propose, Julie reviews/approves, then implement. Recorded here as the doc itself requires.

---

## 2026-09-08 — v1.1: three additions after first test round

**Trigger:** first offline test pass (119 single-turn questions + 6 multi-turn
conversations) surfaced three issues. Julie approved fixing all three
immediately ("fix it with whatever you recommend").

**Added to CONVERSATION BEHAVIOR:**

1. **Response formatting** — bot was using Markdown headers/bold/bullets in
   every answer, which most chat widgets don't render (visitors would see
   literal `##` and `**` symbols). Added an explicit plain-text instruction.
2. **Vague frustration handling** — given the single input "This is so
   confusing, why is this so hard" with no other context, the bot broke
   character and described its own system prompt/knowledge base as if the
   visitor had seen it. Added an explicit instruction to never reference its
   own internals and to ask what's specifically confusing instead.
3. **10-question handoff as a hard trigger** — the original wording ("after
   approximately 2-3 minutes... when appropriate") didn't reliably fire; a
   test conversation reached 11 turns without the bot ever offering Julie
   follow-up. Added an explicit question-count trigger.

**Not yet tested:** the 2-3 minute time-based nudge (separate from the
10-question count) still can't be validated by a scripted test, since it's
wall-clock time, not turn count. Will need real-world observation once live.

---

## 2026-09-08 — v1.2: formatting fix, take two

The first formatting instruction (v1.1) removed `##` headers but `**bold**`
and `-` bullets kept leaking through. Strengthened the instruction with
explicit WRONG/RIGHT examples and added a second copy of the reminder at
the very end of the system prompt (after the knowledge base), so it's the
last thing the model reads before responding.

Retested on the three question types that previously produced the most
Markdown (pricing breakdown, Extended session details, what to wear/bring).
All three came back completely clean -- zero `*` or `#` characters. Also
reconfirmed the vague-frustration and wedding-disclaimer fixes still hold
with the updated prompt.

**Still open:** the 10-question hard trigger (needs code-level turn
counting, not a prompt instruction -- see v1.1 entry above). Not addressed
in this pass.

---

## 2026-09-08 — v1.3: lead delivery channel decided, first-name-only privacy

Julie confirmed three decisions:

1. **Lead delivery channel: email for v1** (her call, matching the earlier
   recommendation). SMS stays a possible later upgrade.
2. **First name only, never pushed.** The bot should ask for a first name
   and a phone/email, but never ask for a last name, and never press a
   visitor who only gives a number with no name at all. Updated
   LEAD HANDOFF BEHAVIOR and PRIVACY/DATA HANDLING accordingly.
3. **Anonymized transcripts: yes.** Julie wants to review chatbot quality
   over time without keeping identifiable data online. Transcripts are
   kept with all contact info (name, number) stripped before storage --
   they exist to review answers, not to identify who asked.
