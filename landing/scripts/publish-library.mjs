// Make the next N library drafts visible (docs/content-library.md).
// Order: priority (low first), then file name. Skips drafts without a cover unless --no-cover.
// Usage: node scripts/publish-library.mjs <n> [--no-cover] [--dry]
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const lib = join(root, "src/content/library");
const args = process.argv.slice(2);
const n = Number(args.find((a) => /^\d+$/.test(a)) ?? 1);
const needCover = !args.includes("--no-cover");
const dry = args.includes("--dry");
const covers = readFileSync(join(root, "src/data/guide-covers.ts"), "utf8");
const today = new Date().toISOString().slice(0, 10);

const drafts = readdirSync(lib)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const text = readFileSync(join(lib, f), "utf8");
    const fm = text.split(/^---$/m)[1] ?? "";
    return {
      f,
      slug: f.replace(/\.md$/, ""),
      text,
      visible: /^visible:\s*true\s*$/m.test(fm),
      priority: Number(fm.match(/^priority:\s*(\d+)/m)?.[1] ?? 5),
    };
  })
  .filter((d) => !d.visible)
  .filter((d) => !needCover || covers.includes(`"${d.slug}":`))
  .sort((a, b) => a.priority - b.priority || a.f.localeCompare(b.f))
  .slice(0, n);

for (const d of drafts) {
  const out = d.text
    .replace(/^visible:\s*false\s*$/m, "visible: true")
    .replace(/^published:.*$/m, `published: "${today}"`)
    .replace(/^updated:.*$/m, `updated: "${today}"`);
  if (!dry) writeFileSync(join(lib, d.f), out);
  console.log(`${dry ? "would publish" : "published"} /guides/${d.slug}`);
}
console.log(
  `${drafts.length} of ${n} asked${needCover ? " (cover required; --no-cover to skip)" : ""}`,
);
