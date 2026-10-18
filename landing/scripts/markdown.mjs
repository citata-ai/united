// Post-build: for every page in dist/, write a Markdown copy (.md), then sitemap.xml,
// rss.xml and llms-full.txt. AI agents that send "Accept: text/markdown" get the .md copy
// (landing/worker.js). Run after `astro build`: node scripts/markdown.mjs
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { htmlToMarkdown, decodeEntities } from "./html-to-markdown.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const site = "https://citata.ai";
const today = new Date().toISOString().slice(0, 10);
/** Not pages a reader or an AI should get: error page and embedded figures. */
const skip = (rel) => rel === "404.html" || rel.startsWith("mechanism/");

/** Fixed order first in llms-full.txt; other pages follow by path. */
const order = ["/", "/property-management", "/about", "/guides"];

const files = walk(dist).filter((f) => f.endsWith(".html") && !skip(relative(dist, f)));
const pages = files
  .map((file) => {
    const rel = relative(dist, file);
    const path = rel === "index.html" ? "/" : "/" + rel.replace(/(\/index)?\.html$/, "");
    const html = readFileSync(file, "utf8");
    const meta = (p) =>
      html.match(new RegExp(`<meta (?:name|property)="${p}" content="([^"]*)"`))?.[1];
    return {
      file,
      path,
      title: decodeEntities(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? path),
      description: decodeEntities(meta("description") ?? ""),
      modified: meta("article:modified_time"),
      article: meta("og:type") === "article",
      html,
    };
  })
  .sort((a, b) => rank(a.path) - rank(b.path) || a.path.localeCompare(b.path));

const docs = pages.map((p) => {
  const head = [`# ${p.title}`, "", `URL: ${site}${p.path}`];
  if (p.modified) head.push(`Updated: ${p.modified}`);
  const md = `${head.join("\n")}\n\n${htmlToMarkdown(p.html, site)}\n`;
  writeFileSync(p.file.replace(/\.html$/, ".md"), md);
  return md;
});

const intro = readFileSync(join(dist, "llms.txt"), "utf8").trim();
writeFileSync(join(dist, "llms-full.txt"), `${intro}\n\n---\n\n${docs.join("\n---\n\n")}`);

writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages
      .map(
        (p) => `  <url><loc>${site}${p.path}</loc><lastmod>${p.modified ?? today}</lastmod></url>`,
      )
      .join("\n") +
    `\n</urlset>\n`,
);

const items = pages
  .filter((p) => p.article || p.path === "/about")
  .sort((a, b) => (b.modified ?? "").localeCompare(a.modified ?? ""));
const rfc822 = (d) => new Date(`${d ?? today}T12:00:00Z`).toUTCString();
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
writeFileSync(
  join(dist, "rss.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>citata.ai</title>
    <link>${site}/</link>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
    <description>GEO for property management companies: how AI assistants pick a property manager, and what we change to get our clients named.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(today)}</lastBuildDate>
${items
  .map(
    (p) => `    <item>
      <title>${esc(p.title.replace(/ — citata\.ai$/, ""))}</title>
      <link>${site}${p.path}</link>
      <guid>${site}${p.path}</guid>
      <pubDate>${rfc822(p.modified)}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`,
);
console.log(`postbuild: ${pages.length} pages → .md, sitemap.xml, rss.xml, llms-full.txt`);

function rank(path) {
  const i = order.indexOf(path);
  return i === -1 ? order.length : i;
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}
