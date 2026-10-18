// Post-build: write a Markdown copy of each page and /llms-full.txt.
// AI agents that send "Accept: text/markdown" get the .md copy (landing/worker.js).
// Run after `astro build`: node scripts/markdown.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { htmlToMarkdown } from "./html-to-markdown.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const site = "https://citata.ai";

/** Pages in llms-full.txt order. Path → built HTML file. */
const pages = [
  ["/", "index.html"],
  ["/property-management", "property-management.html"],
  ["/case-studies/fridman-properties", "case-studies/fridman-properties.html"],
  ["/about", "about.html"],
];

const docs = pages.map(([path, file]) => {
  const html = readFileSync(join(dist, file), "utf8");
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? path;
  const modified = html.match(/<meta property="article:modified_time" content="([^"]+)"/)?.[1];
  const head = [`# ${decode(title)}`, "", `URL: ${site}${path}`];
  if (modified) head.push(`Updated: ${modified}`);
  const md = `${head.join("\n")}\n\n${htmlToMarkdown(html, site)}\n`;
  writeFileSync(join(dist, file.replace(/\.html$/, ".md")), md);
  return md;
});

const intro = readFileSync(join(dist, "llms.txt"), "utf8").trim();
writeFileSync(join(dist, "llms-full.txt"), `${intro}\n\n---\n\n${docs.join("\n---\n\n")}`);
console.log(`markdown: ${docs.length} pages, llms-full.txt`);

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"');
}
