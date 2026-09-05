# Requirements Changelog — v1.5 → v1.6

The Sunlit Wanderer Portrait Site. Append to your existing changelog.

Last updated: September 5, 2026

---

## §47 — Analytics/privacy: planned future exceptions

**No change to the launch policy.** `analytics.enabled` stays `false`.
Requirement §47's ban on analytics/tracking was aimed at *passive* tracking
and lead capture — Google Analytics, cookie banners, email harvesting — the
stuff that makes a local, personal site feel like a funnel. That reasoning
still holds and isn't being revisited.

**ADD — two planned, opt-in exceptions, not yet built:**

1. **An AI chat assistant.** Grounded only in what the site already
   publishes (pricing, FAQ, policies, locations) so it can't invent answers,
   with a clear path to the booking link. For visitors who'd rather ask a
   quick question than read through pages of FAQ text. Something a visitor
   actively chooses to engage with, not something watching them — a
   different category from the tracking §47 rules out.
2. **An opt-in text-alerts signup** ("Want texts about specials and
   promotions?") — opt-in, not collected by default, and not email capture.

Neither is scheduled. Both are explicitly planned as deliberate, scoped
exceptions to the no-tracking policy — recorded here so a future session
doesn't either (a) build them thinking the policy was silently forgotten, or
(b) refuse to build them thinking they contradict a locked requirement.

**Context for later:** Julie is planning to build and test the chat
assistant on this site first — watching real costs and behavior over a
60–90 day window — before considering it for other small local businesses
(a hair salon, a painting business) as a possible paid service. That's a
separate, future initiative, not a Sunlit Wanderer Portrait Site
requirement, but it's worth knowing about if it shapes how the assistant
gets built here (e.g. keeping it reasonably reusable rather than
hard-wired to this one site's content only).
