import { describe, expect, it } from "vitest";
import { nofollowExternal } from "./scripts/nofollow.mjs";

describe("nofollowExternal", () => {
  it("marks external links and keeps other rel values", () => {
    expect(nofollowExternal('<a href="https://ahrefs.com/x">a</a>')).toBe(
      '<a rel="nofollow noopener" href="https://ahrefs.com/x">a</a>',
    );
    expect(nofollowExternal('<a class="l" href="https://x.com" rel="noopener author">a</a>')).toBe(
      '<a class="l" href="https://x.com" rel="noopener author nofollow">a</a>',
    );
  });
  it("leaves own and relative links alone", () => {
    for (const a of [
      '<a href="/guides">g</a>',
      '<a href="https://citata.ai/about">a</a>',
      '<a href="mailto:grow@citata.ai">m</a>',
    ])
      expect(nofollowExternal(a)).toBe(a);
  });
});
