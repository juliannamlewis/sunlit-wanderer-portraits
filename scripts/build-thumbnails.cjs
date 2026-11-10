// Makes lightweight WebP copies of every photo in public/images/ so pages
// don't download full-size originals just to show a small tile.
//
//   public/thumbs/sm/<same path>.webp — 640px wide, for grids and tiles
//   public/thumbs/lg/<same path>.webp — 1800px wide, for the hero and the
//                                       full-screen lightbox
//
// Runs automatically before `npm run dev` and `npm run build`. Only photos
// that are new or changed since their copy was made get processed, so it's
// fast after the first run. The originals are never touched. Use thumb() in
// src/lib/content.ts to point at a copy.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'public', 'images');
const OUT_DIR = path.join(ROOT, 'public', 'thumbs');
// Logos and the specials flyer are graphics with text, not photos — leave them alone.
const SKIP_DIRS = new Set(['brand', 'specials']);
const SIZES = { sm: { width: 640, quality: 72 }, lg: { width: 1800, quality: 78 } };

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return dir === SRC_DIR && SKIP_DIRS.has(entry.name) ? [] : walk(full);
    }
    return /\.(jpe?g|png)$/i.test(entry.name) ? [full] : [];
  });
}

async function main() {
  const photos = walk(SRC_DIR);
  let made = 0;

  for (const file of photos) {
    const rel = path.relative(SRC_DIR, file).replace(/\.(jpe?g|png)$/i, '.webp');
    const srcTime = fs.statSync(file).mtimeMs;

    for (const [size, { width, quality }] of Object.entries(SIZES)) {
      const out = path.join(OUT_DIR, size, rel);
      if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) continue;
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await sharp(file)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toFile(out);
      made++;
    }
  }

  console.log(`Thumbnails: ${photos.length} photos checked, ${made} copies made.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
