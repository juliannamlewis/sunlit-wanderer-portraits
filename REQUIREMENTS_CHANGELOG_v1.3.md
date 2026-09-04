# Requirements Changelog — v1.2 → v1.3

The Sunlit Wanderer Portrait Site. Append to your existing changelog.

Last updated: August 31, 2026

---

## §7 — Session Tier Names

**REVISE — middle tier renamed.** `Full` → `Standard`. Final names:
**Short $150 · Standard $275 · Extended $475.**

v1.1 rejected "Standard" on the grounds it read as the default nobody chose.
Overridden: ShootProof is already configured as `the-standard`, and keeping the
name resolves the booking-slug mismatch that had been carried as an open
cosmetic item since v1.1. The name doesn't need to do the explaining — the
per-category guidance below does.

**RESOLVED — ShootProof slug mismatch.** Closed. Public tier name and booking
URL now agree. No ShootProof reconfiguration required.

---

## §6 — Session Guidance

**ADD — per-category guidance.** Tier guidance is now written separately for
each session category rather than as one set of descriptions. The
families-and-walls framing does not transfer to seniors, maternity or couples,
where the reasons to move up a tier are different.

Stored in `pricing.json` under `whichFits.byCategory` and echoed on each
session page.

**ADD — Families Extended walkthrough.** A concrete description of how ninety
minutes actually unfolds: Carriage Hill farm and quilt picnic to settle everyone
in, the bridge and creek if there's time, then the pond at last light for the
formal frames and solo portraits.

**ADD — Seniors Extended walkthrough.** Roughly 40 minutes at Carriage Hill
farm and creek, 30 in the Oregon District, 20 at the Art Institute.

---

## §18 — Rescheduling Wording

**ADD — two audience-specific versions.** The young-children framing is
appropriate on the Families & Kids page and in Prepare, and inappropriate for
seniors, couples and maternity clients. General FAQ uses a neutral version that
carries the same flexibility without the reference to kids.

---

## §9 — Locations

**ADD — new location: The Dayton Art Institute.** Split out from Downtown
Dayton. Minutes from the Oregon District but visually distinct — stone
balustrades, terraces and the city skyline. Status: published, description
written, 2 images.

Access confirmed: Julie's husband retired from the Art Institute. Recorded as a
relationship-based permission in `RELEASE_REVIEW.md` rather than assumed
permanent.

**UPDATE — image placement.** Eight frames from one senior session, resized to
the export standard and distributed:

| Location | Images |
|---|---|
| Dayton Art Institute | 2 |
| Downtown Dayton / Oregon District | 3 |
| Wegerzyn Gardens | 3 |

Two of the same frames also placed in the Seniors category gallery, chosen for
different outfits and settings so the gallery doesn't read as one shoot.

Descriptions written for Downtown Dayton and the Art Institute. **Carriage Hill
remains the only published location with no description** — it is now the single
content blocker on the Locations page.

---

## New Section — Quarterly Release Review

**ADD — recurring maintenance task.** `RELEASE_REVIEW.md` establishes four
checkpoints a year (Jan 15, Apr 15, Jul 15, Oct 15) to audit which portfolio
images have signed releases, which family and friend images can be replaced by
paying-client work, and which galleries are still thin.

Claude cannot initiate contact or run on a schedule. The reminder must live in
Julie's calendar; the file is what makes the review consistent when she opens it.

---

## Future Backlog

**ADD — Split Extended session.** $275 for the first hour, $200 due before the
second. Two structures under consideration: pond and farm, then a Christmas tree
farm at the holidays; or summer in the Oregon District, then autumn at Sycamore.

⚠️ **Margin caution:** two sessions means two drives, two rounds of
communication, two culls and two gallery deliveries — roughly 12–13 hours
against the single-session Extended's 10, for the same $475. That's about
$38/hour, below all three current tiers, on the most premium product. If this
launches, price it **above** the single-session Extended.

**ADD — reschedule limit contingency.** If two or more clients request
short-notice reschedules more than once each, consider "sessions may be
rescheduled once; a second change is handled case by case." Not written into
public copy now — a stated limit reads as suspicion of the reader, and there is
no evidence yet it's needed.

---

## §9 — Locations (second update)

**ADD — six further images placed.**

| Location | Images | Status |
|---|---|---|
| Downtown Dayton / Oregon District | 5 | meets §9 range ✅ |
| The Dayton Art Institute | 4 | meets §9 range ✅ |
| Wegerzyn Gardens | 3 | one short |
| Sycamore State Park | 0 | ⚠️ published with no images |
| Carriage Hill MetroPark | 0 | ⚠️ published, no description, no images |

Seniors category gallery now holds 6 frames from three sessions, interleaved so
no single shoot reads as a block.

**PROPOSED — "Somewhere That Means Something to You".** A location entry for
client-supplied places rather than scouted ones. Requirements §9 already promise
"Already have somewhere special in mind? Tell me about it" on the homepage but
give that promise nowhere to land. Built as a draft at
`locations/your-own-location.json`. Flip status to `published` to accept, or
delete the file to decline.

Practical benefit: the two school sports frames demonstrate exactly this idea
and currently have no location home, since a high-school track is not a setting
Julie can offer anyone.

---

## §53 — Image Quality Standard

**FLAG — export standard not met.** Six images placed at 600×900 and 800×1200
against a 2000px standard. Acceptable in a phone grid, soft in a desktop
lightbox. Replace with full-resolution originals.

**FLAG — watermarked images in production paths.** Two sports frames carry the
former "Frame the World Photography" watermark. Automated removal was attempted
and rejected: the watermark overlays structured detail (bleacher seating, track
lane markings) and inpainting destroys it. Clean originals required. Final
filenames are already in place so replacement is a straight file swap.

---

## New Section — Backlog

**ADD — `BACKLOG.md`.** Parked items with explicit triggers to unpark, so
non-urgent work stops competing for attention with launch work.

First entry: Shopify GDPR/CSRF email. Flagged as probable spam or phishing — an
unsolicited external "audit" of a store with no products cannot have inspected
anything. Underlying concern is legitimate and parked until first products are
listed.
