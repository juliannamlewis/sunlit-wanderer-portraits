# Requirements Changelog — v1.6 → v1.7

The Sunlit Wanderer Portrait Site. Append to your existing changelog.

Last updated: September 7, 2026

---

## §10/§11 (Requirements) — category renamed: High-School Seniors → Grads

**Decided.** Julie has a college graduate to photograph too, so the category
is being widened rather than staying strictly high-school. Renamed
throughout the codebase:

- Route: `/seniors` → `/grads`
- Files: `src/pages/seniors.astro` → `grads.astro`,
  `copy/seniors.md` → `grads.md`, `faq/seniors.json` → `faq/grads.json`,
  `galleries/seniors.json` → `galleries/grads.json`
- Navigation label: "High-School Seniors" → "Grads"
- `pricing.json`'s `whichFits.byCategory.seniors` key → `.grads`
- `reviews.json`'s Brie F. review, placement `seniors` → `grads`
- Alt text across the Locations pages (DAI, Downtown Dayton, Wegerzyn,
  Sunflower Field) that said "a high-school senior" now says "a graduate" —
  a mechanical wording fix, not new marketing copy.
- Two generic tier-description lines in `pricing.json` that referenced "a
  senior" as an example client, updated to "a grad" for the same reason.

**Gallery fully replaced, not just renamed.** The old 8-image Seniors
gallery (two of which were the long-flagged watermarked sports frames — see
`PENDING_IMAGES.md`, that action item is now closed since those files are no
longer used anywhere) has been replaced with 20 fresh images from
`Website Gallery Pics/Grads/Grads.zip`, including several literal
graduation-moment photographs (cap toss, gown, a "Bachelor's of Chemical
Engineering" sign) so the page visually explains why it's now called Grads.
`RELEASE_REVIEW.md`'s standing image inventory updated to match — the
location-gallery images from the same original sessions are unaffected and
still due for the January 2027 release check.

**Still outstanding — needs Julie's revised wording, not written yet.**
Renaming files, routes and labels is mechanical; the actual prose was
written specifically for high-school seniors and still reads that way in
several places. Left untouched pending her input rather than guessed at:

| File | What still says "high school" / "senior" specifically |
|---|---|
| `copy/grads.md` | Whole-page prose: "two people" (senior + parent) framing, "last year of high school," "most seniors are stiff," "one senior year documented properly," outfit-count guidance framed around one school year |
| `faq/grads.json` | `metaDescription`, one answer explicitly says "this particular person's last year of high school," two question/answer pairs use "senior" throughout |
| `pricing.json` | The Grads `extended` guidance line still says "one senior year documented properly" |
| `copy/prepare.md` | The "What should we wear?" section's "**Seniors:**" line, and "senior and multi-outfit sessions" under day-of logistics |
| `copy/about.md` | Lists "seniors" as one of the session types photographed — trivial, lowest priority |
| `site.json` | Top-level `metaDescription` says "high-school seniors" |
| `site.json` `pinterestBoards` | Three board labels/URLs literally say "High School Senior" — **these point to real boards on Pinterest and can't be relabeled here without becoming inaccurate.** If Julie wants Grads-branded boards, the boards themselves need renaming on Pinterest first, then the label/URL updated here to match. |

None of this blocks the page from working — it just doesn't yet fully read
as inclusive of college grads. Draft revisions available on request; nothing
gets written to these files without Julie's approval per the standing
approve-copy-before-writing rule.
