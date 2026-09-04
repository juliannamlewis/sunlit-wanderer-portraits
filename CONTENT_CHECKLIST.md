# Content Checklist

Everything still missing, placeholder, or undecided. Required by Requirements §53.
Nothing gets quietly forgotten — if it isn't done, it's on this list.

Last updated: August 31, 2026

---

## Watermarked originals — see PENDING_IMAGES.md

Thirteen approved images exist only as watermarked copies. `PENDING_IMAGES.md`
is the work order: source file, target filename, destination folder, in priority
order. Two Families frames sit at the top of it.

---

## Two judgement calls to make

**The railroad yard images.** Approved for use, and they're strong — the
balancing frame especially. But the site is now posted no-trespassing, which
means a senior who sees them and asks for that look gets told no, at the exact
moment they're most excited. Three of them makes it read like a location you
offer. **Recommend using one, not three,** and letting it sit alongside the
"somewhere that means something to you" idea rather than looking like a menu
item.

**The "SENIOR 2018" graphic** on the softball portrait dates your most recent
sports work to eight years ago, on a page selling 2026 sessions. Worth finding
an un-stamped version if one exists.

---

## Image quality — action needed

- [ ] **Replace the two watermarked sports frames** with clean originals.
      Automated removal was attempted and destroys the background detail.
      Filenames are already in place: `seniors-03-soccer-bleachers.jpg` and
      `seniors-04-track-lanes.jpg` — save the originals under those names.
- [ ] **Replace all six newest images at full resolution.** They arrived at
      600×900 and 800×1200; the export standard is 2000px on the long edge.
      Fine on a phone, soft when enlarged on a desktop.
- [ ] **The seven Families & Kids filenames have no actual image files yet.**
      The gallery file lists them, the folder is empty. This is the single
      biggest remaining content gap — the Families page is the most important
      page on the site and currently has nothing to show.

---

## Recurring

**Quarterly release review** — see `RELEASE_REVIEW.md`. Four calendar reminders
a year: Jan 15, Apr 15, Jul 15, Oct 15.

---

## Resolved since v1.1

- **Payment at booking** — $0. Payment in full due by the date of the session,
  invoiced through ShootProof. Trial basis; contingency is 10% per tier
  ($15 / $27.50 / $47.50) if two problem bookings occur.
- **Rescheduling** — 24 hours' notice. ⚠️ The ShootProof reschedule setting
  still needs to be changed from 48 to 24 hours to match the site copy.
- **Tipping** — turn off in ShootProof.

---

## Also unresolved, not blocking

- **ShootProof slug mismatch.** The Full tier's booking URL still reads
  `/booking/the-standard` from before the rename. Working correctly as-is.
  Rename the ShootProof session type if you want the URL to match the public
  name — otherwise nothing breaks.
- **Sales tax.** Ohio taxability of photography services and digital-only
  delivery must be confirmed with an accountant before the first booking. The
  working assumption (services and digital files only, no physical product,
  therefore no sales tax) is unverified and must not be relied on. Not a site
  blocker; is a business blocker.
- **Facebook page URL.** `facebook.com/311951671232` is the numeric-ID form and
  needs to be opened on a phone to confirm it resolves. The page has no username
  and Meta no longer offers them. Do not print
  `facebook.com/thesunlitwanderer` anywhere — it does not resolve.
- **Instagram and TikTok URLs.** Blank in `site.json`. Blank means the icon
  simply doesn't render, so this is safe to leave.

---

## Images

### Homepage
- [ ] Hero image — one strong portrait, no slideshow
- [ ] 12–20 mixed portfolio images across all four categories

### Category galleries
- [x] **Families & Kids** — 7 selected and named. Gaps to fill over time: boys
      past toddler age, babies and toddlers, families of 5+, engaged dads,
      autumn and winter sessions
- [~] **High-School Seniors** — 8 placed across five sessions. Good variety now (sports and non-sports, boys and girls, colour and B&W). All on temporary approval; see RELEASE_REVIEW.md
- [ ] **Maternity** — none selected
- [ ] **Couples & Engagement** — none selected

### Location galleries — 4–10 images each
- [ ] Sycamore State Park — 0
- [~] Wegerzyn Gardens — 3 (2 more pending originals)
- [~] Sunflower field — 3, *seasonal*, **needs its actual name**
- [ ] Christmas tree farm — 0, *seasonal*, **blocked on annual permission**
- [x] Downtown Dayton & the Oregon District — 5 ✅
- [x] The Dayton Art Institute — 4 ✅
- [ ] Carriage Hill MetroPark — 0

### Other
- [ ] About photo
- [ ] Optional location videos (under 20–30 seconds, never autoplay). Nothing
      displays if none supplied — no empty player, no "coming soon"

**Export standard:** long edge ~2000px, quality 80, lowercase hyphenated
filenames, e.g. `families-01-pink-dress-fence.jpg`. Drop files in the matching
folder under `public/images/`, then reference the filename in the gallery file.

---

## Model releases

- [ ] Signed releases obtained for every portfolio image used on the site

Standard going forward from 2026. Images of family and friends from the 2010s
are usable without new releases. Galleries publish with whatever is cleared —
this is not a launch blocker, it's a rolling task.

Courtesy note, not a legal one: several people photographed as children are now
adults. Worth a text before publishing a childhood image.

---

## Location details

Each location publishes with whatever is known. Blank fields don't display.

| Location | Description | Walking | Restrooms | Parking | Accessibility | Images |
|---|---|---|---|---|---|---|
| Sycamore State Park | ✅ | ✅ | ❌ | ❌ | ❌ | 0 |
| Wegerzyn Gardens | ✅ | ❌ | ❌ | ❌ | ❌ | 3 |
| Downtown Dayton & Oregon District | ✅ | ❌ | ❌ | ❌ | ❌ | 3 |
| The Dayton Art Institute | ✅ | ❌ | ❌ | ❌ | ❌ | 2 |
| Carriage Hill MetroPark | ✅ | ❌ | ❌ | ❌ | ❌ | 0 |
| Cox Arboretum | *draft* | | | | | |
| Germantown Dam | *draft* | | | | | |

✅ **Every published location now has a description.** Carriage Hill and Sycamore
still have no images — those are the last two gaps on the page.

Restrooms, parking and accessibility are unconfirmed everywhere. Blank fields
don't display, so this doesn't block launch — but it's the single most useful
thing to collect on your next visit to each park, and it's exactly what parents
want to know.

---

## Branding

- [ ] Final logo
- [ ] Thicker handwritten wordmark (calligraphy pen version) — SVG or
      transparent PNG
- [ ] Sun icon for the compact interior-page header
- [ ] Favicon / app icon

Until these arrive the site uses a text wordmark in a substitute script face.
Swapping in the real artwork later is a one-file change.

---

## Copy

- [x] About copy drafted — needs your read and approval
- [ ] About photo
- [x] Downtown Dayton location description — written
- [x] Dayton Art Institute location description — written
- [x] Carriage Hill location description — written. **Locations page is now unblocked.**
- [x] FAQ language for booking payment and rescheduling — written

---

## Seasonal locations — time-sensitive

- [x] Sunflower field named — Tecumseh Sunflower Field, Yellow Springs
- [ ] Confirm access terms for the sunflower field (free / fee / by arrangement)
- [ ] Decide whether Yellow Springs needs a travel note — it sits outside the
      ~30 mile service-area framing in site.json
- [ ] **Request Christmas tree farm permission for this season.** You noted the
      request window is typically August–September — that's now. This is the
      only item on any list with a deadline set by someone else.

---

## Setup outside the site

- [x] ShootProof slug mismatch — resolved by renaming the tier to Standard
- [ ] ShootProof configuration: three session types, **tipping disabled**, **reschedule window set to 24 hours**, 30/60/120-minute calendar
      blocks, 7-day minimum lead time, 30–45 minute buffers, midday blocked in
      summer, blackout dates, reschedule settings, tipping enabled
- [ ] Seasonal last-start times loaded, and the **November 1 daylight saving
      change** noted on the calendar — sunset drops from 6:37pm to 5:36pm
      overnight
- [ ] Subdomain DNS record for `portraits.thesunlitwanderer.com`. ✅ Confirmed:
      Shopify manages DNS. Add it under Domains → thesunlitwanderer.com → DNS
      Settings → **Add custom record → CNAME**, with name `portraits`.

      ⚠️ **Order matters — don't do this first.** The CNAME has to point at a
      Cloudflare Pages project that doesn't exist yet. Correct sequence:
      1. Push the repo to GitHub
      2. Create the Cloudflare Pages project connected to that repo
      3. Add `portraits.thesunlitwanderer.com` as a custom domain *in Cloudflare*
      4. Cloudflare gives you a target like `yourproject.pages.dev`
      5. *Then* add the CNAME in Shopify pointing `portraits` at that target

      Adding the record early points the subdomain at nothing and can cache a
      failure for a while. Existing records for `@`, `www` and `account` are not
      touched — the shop keeps working exactly as it does now.

---

## Interim fix — the existing Shopify portraits page

`thesunlitwanderer.com/pages/portraits` is live and taking QR traffic right now.
Until the new site exists:

- [ ] State session prices in plain text near the top
- [ ] Real "Book Your Session" button (an actual button, not a text link) at top
      and bottom
- [ ] Reorder for mobile: what it costs → book → images → how it works →
      digitals → locations → policies → book
- [ ] Add 4–5 more images, including a family with young children

---

## Business card — revise before reprinting

- [ ] Google Voice number only
- [ ] Remove WhatsApp icon, use a plain phone icon
- [ ] Replace shopping-bag icon with a globe for the website
- [ ] Reduce five contact methods to three
- [ ] Remove the Canva "C" from the centre of the QR code
- [ ] Change QR modules from hearts to squares or rounded squares
- [ ] Add 0.125" bleed on all sides
- [ ] Test the QR code on at least three phones before ordering

---

## Deferred by decision — not missing

- Cox Arboretum and Germantown Dam locations
- Location videos
- Specials, Resources, Albums & Keepsakes, Local Favorites, Prop Library
  (built as hidden skeletons, noindex, out of sitemap and navigation)
- Design & order service as a named, priced offering
- Pets, lifestyle newborn, boudoir, holiday/Santa, private woods
