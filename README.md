# The Sunlit Wanderer — Portrait Site

Astro static site for `portraits.thesunlitwanderer.com`.
Deployed to Cloudflare Pages from GitHub.

## 👉 Start with [HANDOFF.md](./HANDOFF.md)

It explains the state of the project, what's built, what's not, what's locked,
and what's waiting on Julie.

## Repo map

```
docs/                     source requirements PDFs — put them here
src/content/              all approved content. Wire it up; don't rewrite it.
  site.json               every external link + site-wide policy
  pricing.json            three session tiers
  reviews.json            client reviews
  galleries/              image lists per gallery
  faq/                    Q&A per page
  copy/                   page prose as markdown
  locations/              one file per location
public/images/            images, organised by gallery
```

## Key documents

| File | Purpose |
|---|---|
| `HANDOFF.md` | State of the build. Read first. |
| `HOW_TO_UPDATE_SITE.md` | Nondeveloper guide to changing content, images, and pages yourself |
| `CONTENT_CHECKLIST.md` | Everything missing or undecided |
| `PENDING_IMAGES.md` | Work order for watermarked originals |
| `RELEASE_REVIEW.md` | Quarterly model-release audit |
| `BACKLOG.md` | Parked items with unpark triggers |
| `REQUIREMENTS_CHANGELOG_v1.2–v1.4.md` | Amendments. These supersede v1.0. |

## Editing content

Change a value in `src/content/` and it updates everywhere it appears. No code
changes needed for content edits.

- Empty string or empty array = that element does not render
- `"status": "draft"` on a location = present in files, invisible on the site

## Local development

```bash
npm install
npm run dev
```
