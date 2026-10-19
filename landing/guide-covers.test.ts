// Every guide has a cover image (brand/IMAGES.md, section 7). A new guide without one fails here.
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { guideCovers } from "./src/data/guide-covers.ts";

const dir = join(import.meta.dirname, "src/pages/guides");
const slugs = readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));
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
});
