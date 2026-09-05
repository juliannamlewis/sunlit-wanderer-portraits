# How to Update the Site

This is the plain-language guide to changing things on the site yourself, or
telling Claude what to change. You don't need to know how to code to use it —
almost everything lives in plain text files.

---

## Where things live

Everything a visitor sees comes from `src/content/`. Change a file there, and
every place that content appears on the site updates automatically — you
never need to touch the actual page code for a content change.

| What | Where |
|---|---|
| Site-wide links, contact info, policies | `src/content/site.json` |
| Pricing (all three tiers) | `src/content/pricing.json` |
| Client reviews | `src/content/reviews.json` |
| Gallery photo lists (one file per page) | `src/content/galleries/*.json` |
| FAQ questions (one file per page) | `src/content/faq/*.json` |
| Page prose — Families, Seniors, Maternity, Couples, Prepare, About | `src/content/copy/*.md` |
| Location write-ups | `src/content/locations/*.json` |
| The actual photo files | `public/images/`, organized in matching folders |

## How to replace or add images

1. Export the photo at roughly 2000px on the long edge, quality ~80.
2. Name it in lowercase-with-hyphens, matching the pattern already used in
   that folder — e.g. `families-08-new-shot.jpg`.
3. Drop the file in the matching folder under `public/images/` (e.g.
   `public/images/families/`).
4. Open the matching gallery file in `src/content/galleries/` (or the
   relevant file in `src/content/locations/`) and add an entry:
   ```json
   { "file": "families-08-new-shot.jpg", "alt": "Describe what's in the photo" }
   ```
   The `alt` text is what screen readers announce and what search engines
   see — always describe the photo, and **never include a child's name or
   age** anywhere in it.
5. To replace a photo instead of adding one, just overwrite the file with
   the same filename — nothing else needs to change.
6. To remove a photo, delete its entry from the gallery JSON file. You don't
   need to delete the image file itself, though you can.

An empty gallery (`"images": []`) simply doesn't render on the site — no
broken layout, no empty frame. That's intentional, so it's always safe to
pull a photo out.

## How to change pricing, FAQs, or reviews

Open the relevant JSON file and edit the text in quotes. Don't touch
anything before a colon (`:`) — that's a label the site's code looks for.
Fields starting with an underscore, like `"_comment"` or `"_status"`, are
internal notes to whoever's maintaining the site — they're never shown to
visitors, so you can read them for context but they don't need editing to
change what the public sees.

## How to change page prose (Families, Seniors, etc.)

Those live as Markdown files in `src/content/copy/`. Markdown is just plain
text with light formatting:

- A line starting with `##` becomes a heading
- `**text**` becomes **bold**
- A blank line starts a new paragraph

Edit the text directly and save. The `Prepare for Your Session` page is
special: each `##` heading in `prepare.md` automatically becomes its own
collapsible accordion section on the site — you don't need to do anything
extra to get that behavior, just keep using `##` for each new topic.

## Locations

Each location is its own file in `src/content/locations/`. The fields are:

- `status`: `"published"` shows it on the site; `"draft"` keeps it in the
  files but invisible to visitors — useful for staging a new location before
  it's ready.
- `availability`: `"year-round"` or `"seasonal"`. Seasonal locations show up
  in their own "Seasonal & Limited" group on the Locations page, with
  whatever you put in `availabilityWindow` (e.g. "Roughly August into
  September") displayed on the card.
- Any field left as `""` (empty) or `[]` (empty list) just doesn't display —
  there's no need to write "TBD" or delete the field.
- `accessNote` is **internal only** — permission/relationship notes for your
  own records. It is deliberately never shown on the public page, so it's a
  safe place to write anything, including names or private arrangements.

## Adding a brand-new session category or a Special

1. Duplicate the pattern used by an existing category page (e.g.
   `src/pages/families.astro`) as a starting point — or ask Claude to do
   this, describing the new category.
2. Create matching content files: a gallery JSON in `src/content/galleries/`,
   an FAQ JSON in `src/content/faq/`, and a copy Markdown file in
   `src/content/copy/`.
3. For a Special specifically, the `Specials` page already exists as a
   hidden skeleton at `src/pages/specials.astro` — it just needs real
   content and, when you're ready to launch it, removing from the "hidden
   pages" list (see below).

## Hidden (unpublished) pages

Five pages exist in the code but are deliberately kept invisible to
visitors and search engines: Specials, Resources, Albums & Keepsakes, Local
Favorites, and Prop Library. Each is:

- left out of the site navigation,
- marked `noindex, nofollow` (tells search engines not to list it),
- left out of the sitemap.

To launch one for real:
1. Give it actual content.
2. Remove `noindex` from that page (`src/pages/<name>.astro` — delete the
   `noindex` line where it calls `BaseLayout`).
3. Remove its path from the `HIDDEN_PAGES` list in `astro.config.mjs` so it
   rejoins the sitemap.
4. Add a link to it from the navigation, if you want it discoverable that
   way (`src/lib/content.ts`, the `navLinks` list).
5. Preview it (see below) before publishing.

## Previewing before anything goes live

Nothing here publishes automatically. The workflow is always:

1. A change is made to a content file or the code.
2. Run `npm run dev` and open `http://localhost:4321` to see it — this is
   your private preview, nobody else can see it.
3. You look it over and approve it.

**Important — publishing is a manual, separate step**, not automatic on
every GitHub push. The live site (`sunlit-wanderer-portraits` on Cloudflare
Pages) was set up via Cloudflare's command-line tool (Wrangler), not through
its dashboard's GitHub auto-deploy integration — the dashboard flow currently
defaults to creating a different kind of project (a Worker) whose custom
domain setup would have required moving this whole domain's DNS to
Cloudflare, which we deliberately avoided. The tradeoff: pushing to GitHub
alone does **not** update the live site.

To actually publish an approved change:
```bash
npm run build
npx wrangler pages deploy dist --project-name sunlit-wanderer-portraits --branch main
```
GitHub still holds the full version history (push there too, for the record
and for rollback), but the `wrangler pages deploy` command is what visitors
actually see. Ask Claude to run this once changes are approved, or run it
yourself from a terminal in this folder.

## Rollback

Every change is saved as a checkpoint (a "commit") in the site's version
history. If something goes wrong after a publish, you can ask to "restore
the previous version" and the exact prior state of every file comes back —
nothing is ever truly lost by editing forward. Cloudflare Pages also keeps
its own history of every past deployment, so a live rollback (undoing what
visitors see) can happen independently of the code history, usually within
a minute or two.

## What not to edit by hand

- `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json` —
  these configure the technical build. Ask Claude before changing them.
- Anything under `src/components/`, `src/layouts/`, or `src/lib/` — this is
  the site's actual code (how things are laid out and styled), not content.
  Changing it can affect every page at once. Ask Claude to make structural
  changes rather than editing these directly.
- `dist/` and `node_modules/` — these are auto-generated; nothing you save
  there survives the next build.

## Quick reference: "I want to..."

| I want to... | Do this |
|---|---|
| Change a price | Edit `src/content/pricing.json` |
| Add/remove a gallery photo | Edit the matching file in `src/content/galleries/` |
| Fix a typo in page text | Edit the matching `.md` file in `src/content/copy/` |
| Add an FAQ | Edit the matching file in `src/content/faq/` |
| Add a new location | Add a new file in `src/content/locations/`, `status: "draft"` until ready |
| Hide a location temporarily | Set its `status` to `"draft"` |
| Change the Messenger link or phone number | Edit `src/content/site.json` |
| Add a Pinterest board link | Edit `pinterestBoards` in `src/content/site.json` |
