# HANDOFF — Read This First

**For:** whoever picks up this build next, human or AI.
**Written:** September 3, 2026, at the end of the content phase.

---

## What this is

A portrait photography website for The Sunlit Wanderer, launching at
`portraits.thesunlitwanderer.com`. Astro, static, deployed to Cloudflare Pages
from GitHub.

It is a **separate business track** from the Shopify print store at
`thesunlitwanderer.com`. Do not conflate them. Prints are print-on-demand,
low-touch, low-margin. Portraits are local, hands-on, and priced per the Client
Ordering Guide. Copy and policy written for one does not transfer to the other.

**The state of play:** every content file is written and internally consistent.
**No application code exists yet.** There is no `package.json`, no Astro config,
no layouts, no pages, no components, no styles. That is the entire remaining
build.

---

## Before you start: read the source documents

Three source documents govern this project. **They are the specification. This
file is a summary and does not replace them.**

Put them in `docs/` in the repo:

1. `The Sunlit Wanderer_Portrait Site_Rqmts_v1.0.pdf` — 46 pages, the full
   requirements
2. `Requirements Change Log.pdf` — amendments v1.1
3. `The Sunlit Wanderer — Portrait Site Architecture.pdf` — the architecture

Then read the three changelog files in this repo root, in order:
`REQUIREMENTS_CHANGELOG_v1.2.md`, `v1.3.md`, `v1.4.md`. These supersede v1.0
wherever they conflict.

⚠️ **v1.0 contains stale values that were corrected later.** It states the
Extended session at $425 (now $475), uses the old tier names Brief/Standard/
Extended (now Short/Standard/Extended), states a $25 booking retainer (now $0),
and lists a Messenger username that must never be used. Always check the
changelogs before pulling anything from v1.0.

---

## Also read these, in the repo root

| File | What it is |
|---|---|
| `CONTENT_CHECKLIST.md` | Everything missing, placeholder or undecided. The master gap list. |
| `PENDING_IMAGES.md` | Work order for 13 approved images that exist only as watermarked copies. |
| `RELEASE_REVIEW.md` | Quarterly model-release audit. Contains a dated January 2027 action. |
| `BACKLOG.md` | Deliberately parked items with triggers to unpark. |

---

## How Julie works — this matters

- **Approve copy before writing files.** Do not write client-facing prose into
  files and present it as done. Draft it in chat, get approval, then write.
- **Propose structural changes, don't implement them silently.** Adding a
  content file, changing a schema, restructuring a page — propose first.
- **Name gaps and risks plainly.** She has explicitly asked not to have things
  softened. If something is a problem, say so directly.
- **Corrections mid-session are applied immediately**, not deferred.
- **Changelogs are addendum documents**, not edits to prior ones. Write
  `REQUIREMENTS_CHANGELOG_v1.5.md`, don't modify v1.4.
- She has enterprise project-management and process-documentation background.
  Structured, honest, sequenced answers land better than reassurance.
- Her writing voice is documented in the project file `__Julie_Voice.txt`. Site
  copy follows the same principles: ordinary language, contractions, warm,
  direct, no corporate phrasing, no sales hype.

---

## Locked decisions — do not re-litigate these

These were each debated and settled. Changing any of them requires a new
changelog entry and Julie's explicit approval.

### Pricing and booking
- Tiers: **Short $150 · Standard $275 · Extended $475**
- Durations: ~15 min / ~40 min / ~90 min
- Minimum images: 10+ / 30+ / 50+
- **$0 due at booking.** Payment in full due by the session date, invoiced
  through ShootProof.
- **Tipping disabled.**
- **24 hours** notice to reschedule. Two audience-specific wordings exist — the
  young-children version for Families and Prepare, a neutral version everywhere
  else. Do not use the kids version on Seniors, Maternity or Couples.
- Contingency if two problem bookings occur: 10% per tier ($15/$27.50/$47.50).
  ShootProof cannot do a flat dollar retainer across tiers.
- **No sales tax collected** — digital delivery only, no physical product.

### Delivery
- All-inclusive. Every edited image in the final gallery is included.
- **No restrict-and-unlock model.** Never imply images are held back.
- 7–10 business days turnaround, 30-day gallery, 7-day edit request window.
- Personal printing and sharing rights included. No RAW files.

### Privacy and safety
- **Never publish a child's name or age.** Anywhere. Alt text included.
- Nothing from a client gallery is public without a signed release.
- The **Google Voice number is the only number published**: (513) 318-7278.
- Messenger link `https://m.me/311951671232` must **always render as a button
  labeled "Message me"**, never as a visible URL, and never link to a personal
  Facebook profile.
- **No analytics or tracking at launch.** `site.json > analytics.enabled` is
  `false` and exists so the decision stays visible.

### Content behaviour
- **Empty fields do not display.** No "TBD", no empty player, no "coming soon".
- **`status: "draft"` means invisible on the site** but present in the files.
- Locations publish with whatever is known. Partial is fine.
- **No weddings.** The Couples page must say so first and unmistakably.

---

## What already exists

### Content files — all written, all valid JSON

```
src/content/
  site.json          links, contact, social, Pinterest boards, policies, delivery
  pricing.json       three tiers + per-category "which session fits" guidance
  reviews.json       six reviews with placement fields
  galleries/
    home.json        EMPTY — needs 12–20 mixed images
    families.json    7 filenames listed, ZERO image files exist
    seniors.json     8 images placed
    maternity.json   EMPTY
    couples.json     EMPTY
  faq/
    general.json     10 questions (homepage)
    families.json    11 questions
    seniors.json     6 questions
    maternity.json   7 questions
    couples.json     7 questions
  copy/
    families.md      full page copy + Extended session walkthrough
    seniors.md       full page copy + session guidance
    maternity.md     full page copy + session guidance
    couples.md       full page copy + session guidance
    prepare.md       9 accordion sections, replaces the PDF guides
    about.md         DRAFT — needs Julie's approval and a photo
  locations/
    sycamore-state-park.json      published, described, 0 images
    wegerzyn-gardens.json         published, described, 3 images
    downtown-dayton.json          published, described, 5 images ✅
    dayton-art-institute.json     published, described, 4 images ✅
    carriage-hill.json            published, described, 0 images
    sunflower-field.json          DRAFT, seasonal (Aug–Sep), 3 images
    christmas-tree-farm.json      DRAFT, seasonal (Nov–Dec), blocked
    cox-arboretum.json            DRAFT, deferred
    germantown-dam.json           DRAFT, deferred
    your-own-location.json        DRAFT, PROPOSAL — awaiting accept/decline
```

### Images placed

```
public/images/
  seniors/                       8 files
  locations/dayton-art-institute/  4 files
  locations/downtown-dayton/       5 files
  locations/wegerzyn/              3 files
  locations/sunflower-field/       3 files
  families/                      EMPTY  ← biggest gap on the site
  maternity/  couples/  home/  brand/   EMPTY
```

⚠️ **Two files in `seniors/` are still watermarked** —
`seniors-03-soccer-bleachers.jpg` and `seniors-04-track-lanes.jpg`. They are
placed under final filenames so replacement is a straight overwrite. Do not
launch with them visible.

⚠️ **Most placed images are below the 2000px export standard**, arriving at
600×900 or 800×1200. Fine on a phone, soft in a desktop lightbox. Full-res
replacements are pending.

### Location schema

Every location file carries: `id`, `name`, `status`, `availability`
(`year-round` | `seasonal`), `availabilityWindow`, `accessNote`,
`shortDescription`, `bestFor`, `walkingLevel`, `restrooms`, `parking`,
`accessibility`, `bestSeasons`, `seasonalNote`, `images[]`, `video`.

The Locations page renders year-round locations first, then a separate
**Seasonal & Limited** group with the window stated on each card.

---

## What remains to be built — this is the actual work

**None of this exists yet.**

### 1. Project scaffold
- Astro project, static output, Cloudflare Pages target
- `package.json`, `astro.config.mjs`, TypeScript config
- Content collections or direct JSON imports for `src/content/`
- No analytics, no tracking scripts

### 2. Global layout
- Base layout with meta, Open Graph, favicon
- Header: full wordmark on the homepage, compact sun icon on interior pages
  *(brand assets not yet supplied — use a text wordmark placeholder)*
- Navigation, mobile-first
- Footer: contact, social icons (blank URLs must not render), shop link
- **Persistent booking control on mobile** — a fixed bottom bar or equivalent
- Every booking button reads from `site.json > booking`

### 3. Pages
| Page | Content source |
|---|---|
| Homepage | `galleries/home.json`, `faq/general.json`, `reviews.json`, `pricing.json` |
| Families & Kids | `copy/families.md`, `galleries/families.json`, `faq/families.json` |
| High-School Seniors | `copy/seniors.md`, `galleries/seniors.json`, `faq/seniors.json` |
| Maternity | `copy/maternity.md`, `galleries/maternity.json`, `faq/maternity.json` |
| Couples & Engagement | `copy/couples.md`, `galleries/couples.json`, `faq/couples.json` |
| Locations | all of `locations/*.json`, grouped year-round then seasonal |
| Prepare for Your Session | `copy/prepare.md` rendered as accordions |
| About | `copy/about.md` |

Plus hidden skeleton pages, `noindex`, excluded from sitemap and navigation:
Specials, Resources, Albums & Keepsakes, Local Favorites, Prop Library.

### 4. Components
- Gallery grid + lightbox — must degrade gracefully when `images: []`
- FAQ accordion
- Pricing cards
- Review cards
- Location card, with blank fields suppressed
- Booking button

### 5. Behaviour to get right
- **Sections with no content do not render.** No empty gallery frames, no
  headings over nothing.
- Descriptive alt text on every image, already written in the gallery JSON.
- Responsive images, lazy loading below the fold.
- Mobile-first throughout — assume most traffic arrives from a phone via QR
  code or Facebook.

### 6. Deploy
1. Push repo to GitHub
2. Create the Cloudflare Pages project connected to the repo
3. Add `portraits.thesunlitwanderer.com` as a custom domain **in Cloudflare**
4. Cloudflare returns a `something.pages.dev` target
5. **Then** add the CNAME in Shopify: Domains → thesunlitwanderer.com → DNS
   Settings → Add custom record → CNAME, name `portraits`

⚠️ **Order matters.** Adding the CNAME before the Pages project exists points
the subdomain at nothing and can cache the failure. Existing `@`, `www` and
`account` records are untouched; the Shopify store keeps working.

---

## Waiting on Julie

### Blocking a good launch
- **Families & Kids images.** Seven filenames are in `galleries/families.json`;
  zero files exist. This is the most commercially important page on the site and
  it currently has nothing to show.
- **Homepage hero** — one strong portrait, no slideshow
- **Homepage mixed gallery** — 12–20 across all four categories
- Clean originals for the two watermarked Seniors frames
- Full-resolution replacements per `PENDING_IMAGES.md`

### Not blocking, but the site is weaker without them
- Carriage Hill and Sycamore location images. **These do not need people in
  them** — scenery establishes what the place looks like, which is the whole
  purpose of the page. No releases needed.
- Restrooms, parking, accessibility for every location — blank everywhere
- Branding: final logo, thicker handwritten wordmark, sun icon, favicon
- About photo, and approval of the About draft
- Maternity and Couples galleries — completely empty

### Decisions outstanding
- **Accept or decline** `locations/your-own-location.json` — a proposed entry
  for client-supplied locations. Draft, invisible until approved.
- **Railroad yard frames** — three are approved for portfolio use but the site
  is now posted no-trespassing. Recommendation was to use one, not three, so it
  doesn't read as a location on offer. Julie's call, not yet made.
- **"SENIOR 2018" graphic** on the softball portrait dates the work eight years.
  Find an un-stamped version or accept it.

### Outside the site
- ShootProof configuration: three session types, calendar blocks, 7-day minimum
  lead time, buffers, midday blocked in summer, blackout dates, **reschedule set
  to 24 hours**, **tipping off**. Seasonal last-start times, and the
  **November 1 daylight saving change** — sunset drops from 6:37pm to 5:36pm
  overnight.
- Tecumseh Sunflower Field (Yellow Springs) — access terms, and whether it needs
  a travel note since it sits outside the ~30-mile service framing
- Christmas tree farm — annual permission, requested Aug/Sep for a Nov/Dec season
- Model releases — rolling
- **Interim fix to the live Shopify portraits page**, which is taking QR traffic
  right now during booking season. Details in `CONTENT_CHECKLIST.md`.
- Business card revisions before reprinting — details in `CONTENT_CHECKLIST.md`

---

## Deferred by decision — not oversights

Cox Arboretum and Germantown Dam locations. Location videos. The Specials,
Resources, Albums & Keepsakes, Local Favorites and Prop Library pages (built as
hidden skeletons). Design & order service as a named, priced offering. Split
Extended session. Pets, lifestyle newborn, boudoir, holiday/Santa, private woods.
Google Business Profile (recommended, not yet started).

---

## Suggested first move in Claude Code

Unzip the content package into the repo, add the three source PDFs to `docs/`,
`git init`, then:

> Read HANDOFF.md, then the three source PDFs in docs/, then the changelog
> files v1.2 through v1.4. Scaffold the Astro project and build the global
> layout and homepage. Everything in src/content/ is approved content — wire it
> up, don't rewrite it. Show me the homepage before moving on to other pages.

Build the scaffold and homepage first. Every other page reuses those patterns
and gets cheaper.
