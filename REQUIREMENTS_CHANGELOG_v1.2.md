# Requirements Changelog — v1.1 → v1.2

The Sunlit Wanderer Portrait Site. Section numbers refer to Requirements v1.0.
Append these entries to your existing changelog document.

Last updated: August 31, 2026

---

## §18 — Booking, Payment & Rescheduling

**RESOLVED — payment model.** `$0 due at booking. Payment in full due by the
date of the session, invoiced through ShootProof.`

This supersedes v1.0 §18's `$25 nonrefundable booking retainer applied toward
the session total`, which conflicted with v1.1's payment model and is now
withdrawn.

Trialing $0 to reduce friction while the calendar is being filled for the first
time. Revisit after two problem bookings.

**ADD — ShootProof constraint.** ShootProof offers exactly three payment
configurations: full payment at booking, a percentage of the session fee at
booking, or payment due by the session date. A flat dollar retainer identical
across all tiers is not possible. This is why the contingency below is
percentage-based.

**REVISE — deposit contingency.** If two no-shows or unpaid sessions occur,
switch to a 10% nonrefundable booking fee: `$15 / $27.50 / $47.50` for
Short / Full / Extended.

**REJECTED — payment on gallery delivery.** Considered and declined. With the
all-inclusive delivery model the session fee is 100% of revenue; there is no
second sale. Payment after delivery would put the slot, the travel, the session
*and* 3–10 hours of culling and editing at risk. Payment due at the session
risks only the slot and the drive, and no editing begins until payment clears.

**RESOLVED — rescheduling window.** `24 hours`, per v1.0 §18. This supersedes
the "48-hour policy" referenced in v1.1, which did not correspond to any
requirement in v1.0.

⚠️ **Action required:** the ShootProof reschedule setting must be changed to
24 hours to match. Site copy and system configuration must agree.

Short-notice illness and genuine emergencies remain handled flexibly at the
photographer's discretion. Weather reschedules initiated by the photographer
never penalize the client.

**REVISE — tipping.** `Disabled.` v1.1 recorded tipping as enabled in
ShootProof. Turn it off.

---

## §9 — Locations

**CLARIFY — file naming.** The merged Downtown Dayton / Oregon District entry is
stored as `downtown-dayton.json`, with the image folder
`public/images/locations/downtown-dayton/`. The Architecture document lists
`oregon-district.json`; that name predates the merge. Display name is
"Downtown Dayton & the Oregon District."

**FLAG — publication blocker.** Downtown Dayton and Carriage Hill are both
marked *published* at launch but have no `shortDescription` written — they were
placeholders in v1.0 and remain so. Two short paragraphs are required before the
Locations page can go live. All other fields may stay blank under the partial
publishing rule.

---

## §51 — Content Architecture

**ADD — policies block.** Canonical plain-English wording for the booking,
rescheduling and weather policies is stored in `site.json` under `policies`,
rather than in a new file. It is echoed in `faq/general.json` and
`copy/prepare.md`; a policy change requires editing all three.

Proposed rather than assumed. Say the word and it moves to its own
`policies.json` instead.

---

## §11 — Seniors

**CORRECT — stale tier names.** v1.0 §11 describes outfit counts using the old
Brief / Standard / Extended labels. Updated to Short / Full / Extended in
`copy/seniors.md`.

---

## §6 — Pricing

**CORRECT — stale price.** v1.0 body copy states the Extended session at $425
throughout. `pricing.json` is the single source of truth at $475 per v1.1 §6.
Do not pull Extended pricing language from v1.0.
