import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const CONTENT_DIR = path.resolve(process.cwd(), 'src/content/copy');

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { frontmatter: {}, body: raw };

  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (/^\s/.test(line)) continue; // skip indented continuation lines (folded YAML values)
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
    frontmatter[key] = value;
  }

  return { frontmatter, body: raw.slice(match[0].length) };
}

function readRaw(name: string): string {
  return fs.readFileSync(path.join(CONTENT_DIR, `${name}.md`), 'utf-8');
}

export function loadCopy(name: string): { frontmatter: Record<string, string>; html: string } {
  const { frontmatter, body } = parseFrontmatter(readRaw(name));
  return { frontmatter, html: marked.parse(body.trim()) as string };
}

export function loadCopySections(
  name: string,
): { frontmatter: Record<string, string>; sections: { heading: string; html: string }[] } {
  const { frontmatter, body } = parseFrontmatter(readRaw(name));
  const parts = body.trim().split(/\n(?=##\s)/g).filter((p) => p.trim());

  const sections = parts.map((part) => {
    const headingMatch = part.match(/^##\s+(.+?)\r?\n/);
    const heading = headingMatch ? headingMatch[1].trim() : '';
    const rest = headingMatch ? part.slice(headingMatch[0].length) : part;
    return { heading, html: marked.parse(rest.trim()) as string };
  });

  return { frontmatter, sections };
}
