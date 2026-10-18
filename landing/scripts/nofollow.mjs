// Postbuild: every link to another site gets rel="nofollow noopener" (owner rule, 2026-10-19).
// Runs on dist/*.html after `astro build`, so guides written in Markdown are covered too.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OWN = /^https?:\/\/(www\.)?citata\.ai(\/|$)/i;

/** Add nofollow and noopener to each external <a href="http…">; keep other rel values. */
export function nofollowExternal(html) {
  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    const href = tag.match(/\shref="([^"]*)"/i)?.[1] ?? "";
    if (!/^https?:\/\//i.test(href) || OWN.test(href)) return tag;
    const rel = tag.match(/\srel="([^"]*)"/i);
    const values = new Set((rel?.[1] ?? "").split(/\s+/).filter(Boolean));
    values.add("nofollow");
    values.add("noopener");
    const next = ` rel="${[...values].join(" ")}"`;
    return rel ? tag.replace(rel[0], next) : tag.replace(/^<a\b/i, `<a${next}`);
  });
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".html") ? [path] : [];
  });

if (import.meta.url === `file://${process.argv[1]}`) {
  const dist = new URL("../dist", import.meta.url).pathname;
  let files = 0;
  for (const file of walk(dist)) {
    const html = readFileSync(file, "utf8");
    const next = nofollowExternal(html);
    if (next !== html) {
      writeFileSync(file, next);
      files++;
    }
  }
  console.log(`nofollow: external links marked in ${files} pages`);
}
