// Before a prod deploy: list the sitemap pages whose new HTML (dist/) differs from what citata.ai
// serves now. The deploy job pings IndexNow with only these URLs (no ping when nothing changed).
// Usage: node scripts/changed-urls.mjs > changed.txt   (run from landing/, after `bun run build`)
import { readFileSync } from "node:fs";

const sitemap = readFileSync(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

/** dist file for a page URL: "/" -> index.html, "/guides" -> guides.html (build.format "file"). */
const fileFor = (url) => {
  const path = new URL(url).pathname.replace(/\/$/, "");
  return new URL(`../dist${path === "" ? "/index" : path}.html`, import.meta.url);
};

for (const url of urls) {
  const next = readFileSync(fileFor(url), "utf8");
  const live = await fetch(url, { headers: { "cache-control": "no-cache" } })
    .then((r) => (r.ok ? r.text() : ""))
    .catch(() => "");
  if (live !== next) console.log(url);
}
