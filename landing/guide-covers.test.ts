// Every guide has a cover image (brand/IMAGES.md, section 7). A new guide without one fails here.
// Library drafts (visible: false) need no cover yet; a visible library article does.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { guideCovers } from "./src/data/guide-covers.ts";

const dir = join(import.meta.dirname, "src/pages/guides");
const lib = join(import.meta.dirname, "src/content/library");
const pageSlugs = readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));
const libFiles = existsSync(lib) ? readdirSync(lib).filter((f) => f.endsWith(".md")) : [];
const visibleLib = libFiles
  .filter((f) =>
    /^visible:\s*true\s*$/m.test(readFileSync(join(lib, f), "utf8").split(/^---$/m)[1] ?? ""),
  )
  .map((f) => f.replace(/\.md$/, ""));
const slugs = [...pageSlugs, ...visibleLib];
const pub = join(import.meta.dirname, "public");

describe("guide covers", () => {
  it.each(slugs)("%s has a cover in src/data/guide-covers.ts", (slug) => {
    expect(guideCovers[slug], "add a cover: brand/IMAGES.md section 7").toBeDefined();
  });

  it.each(Object.entries(guideCovers))("%s has its image files and alt text", (_, cover) => {
    for (const w of [640, 720, 960, 1280, 1920, 2560]) {
      expect(
        existsSync(join(pub, "img", `${cover.img}-${w}.webp`)),
        `img/${cover.img}-${w}.webp`,
      ).toBe(true);
    }
    expect(existsSync(join(pub, "og", `${cover.img}.jpg`)), `og/${cover.img}.jpg`).toBe(true);
    expect(cover.alt.length).toBeGreaterThan(40);
  });

  it("library slugs do not clash with guide pages", () => {
    const clash = libFiles.map((f) => f.replace(/\.md$/, "")).filter((s) => pageSlugs.includes(s));
    expect(clash).toEqual([]);
  });
});
