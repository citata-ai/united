// Quality gate for library articles (src/content/library, docs/content-library.md).
// Drafts too: a bad draft fails here, not on the day it goes live.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const lib = join(import.meta.dirname, "src/content/library");
const files = existsSync(lib) ? readdirSync(lib).filter((f) => f.endsWith(".md")) : [];
const keys = [
  "title",
  "description",
  "headline",
  "dek",
  "published",
  "updated",
  "answer",
  "visible",
  "cluster",
  "kind",
];

describe.skipIf(files.length === 0)("library articles", () => {
  it.each(files)("%s", (f) => {
    expect(f, "slug: lowercase kebab-case").toMatch(/^[a-z0-9]+(-[a-z0-9]+)*\.md$/);
    const [, fm = "", ...rest] = readFileSync(join(lib, f), "utf8").split(/^---$/m);
    const body = rest.join("---");
    for (const k of keys) expect(fm, `frontmatter key ${k}`).toMatch(new RegExp(`^${k}:`, "m"));
    expect(fm, "no layout key: the /guides/[slug] route renders it").not.toMatch(/^layout:/m);
    expect(fm, "at least 1 source").toMatch(/^sources:\s*\n\s+- label:/m);
    expect((fm.match(/^\s+- q:/gm) ?? []).length, "3+ FAQ items").toBeGreaterThanOrEqual(3);
    const words = body.split(/\s+/).filter(Boolean).length;
    expect(words, "body 600+ words (no thin pages)").toBeGreaterThanOrEqual(600);
    expect(body, "no H1 in body: the layout prints the headline").not.toMatch(/^# /m);
  });
});
