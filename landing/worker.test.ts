import { describe, expect, it } from "vitest";
import { cacheControl } from "./worker.js";

describe("cacheControl", () => {
  it("caches fonts for a year and images for 30 days", () => {
    expect(cacheControl("/fonts/CalSansVF.woff2")).toContain("immutable");
    expect(cacheControl("/img/hero-art-960.webp")).toBe("public, max-age=2592000");
    expect(cacheControl("/og/hero-art.jpg")).toBe("public, max-age=2592000");
    expect(cacheControl("/wordmark.svg")).toBe("public, max-age=2592000");
  });
  it("leaves pages and text files to the default", () => {
    expect(cacheControl("/")).toBeNull();
    expect(cacheControl("/guides")).toBeNull();
    expect(cacheControl("/llms.txt")).toBeNull();
  });
});
