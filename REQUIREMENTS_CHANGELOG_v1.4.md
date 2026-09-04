# Requirements Changelog — v1.3 → v1.4

The Sunlit Wanderer Portrait Site. Append to your existing changelog.

Last updated: August 31, 2026

---

## §9 — Locations: seasonal availability

**ADD — `availability` field.** Every location now carries
`availability` (`year-round` or `seasonal`), `availabilityWindow` (plain-English
description of when it's usable), and `accessNote` (permission terms where
access isn't simply public).

Reason: two locations exist that are only usable in a short annual window. Listing
them alongside year-round parks would set an expectation the calendar can't meet
— a client shouldn't be able to read about a sunflower field in February and
assume they can book it.

**ADD — Locations page grouping.** Year-round locations render first; seasonal
and limited-availability locations render in their own group beneath, with the
window stated plainly on each card.

**ADD — new location: sunflower field.** Status draft. Available roughly August
into September. 3 clean images placed. ⚠️ **Needs its actual name** before it
can publish.

**ADD — new location: Christmas tree farm.** Status draft. November–December
only. Access renewed annually with the farm, typically requested August–September.
⚠️ **Blocked on two things:** written permission for the current season, and
photographs. Well suited to golden-hour mini sessions rather than standard tiers.

**ADD — `accessNote` on the Dayton Art Institute.** Access is relationship-based
rather than formal. Recorded rather than assumed permanent.

---

## §53 — Railroad yard images

**ADD — approved for portfolio use, excluded as a location.** The former rail
storage yard is now posted no-trespassing. Three frames are approved as portfolio
images; the location must not appear on the Locations page.

**RECOMMENDATION — use one, not three.** Three frames of the same setting reads
as a location on offer. A senior who asks for that look has to be told no, at the
moment they're most enthusiastic. One frame reads as range; three reads as a menu.
Julie's call.

---

## §53 — Watermarked source material

**FLAG — 13 of the last 21 images supplied carry the former "Frame the World
Photography" watermark.** Automated removal was tested and rejected in v1.3;
the watermark overlays structured detail and inpainting destroys it.

**ADD — `PENDING_IMAGES.md`.** A work order mapping each watermarked source file
to its target filename and destination folder, in priority order, so locating
originals requires no further decisions.

Highest priority: two Families & Kids frames. The Families gallery is currently
empty and it is the most commercially important page on the site.

**FLAG — dated graphic.** The softball portrait carries a "SENIOR 2018" overlay,
dating the most recent sports work to eight years ago on a site selling 2026
sessions.

---

## §8 / §28 — Portfolio concentration

**FLAG — six of eight Seniors gallery images are family members.** One
granddaughter, one niece. Legitimate as a bridge while paying-client releases are
being obtained, and recorded in `RELEASE_REVIEW.md` for the January 2027 review.

Worth stating plainly: the current Seniors portfolio demonstrates Julie's range
but not her client base. Replacing these with released client work is the single
most valuable portfolio task of the coming season.
