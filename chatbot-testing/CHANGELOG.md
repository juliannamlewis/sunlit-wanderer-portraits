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
