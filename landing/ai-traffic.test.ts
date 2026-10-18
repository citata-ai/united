import { describe, expect, it } from "vitest";
import { classify, isTracked } from "./ai-traffic.js";

const url = "https://citata.ai/property-management";

describe("classify", () => {
  it("finds AI crawlers by user agent", () => {
    const ua =
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)";
    expect(classify({ url, userAgent: ua })).toEqual({
      kind: "bot",
      source: "openai",
      via: "GPTBot",
    });
    expect(classify({ url, userAgent: "Mozilla/5.0 (compatible; ClaudeBot/1.0)" })?.source).toBe(
      "anthropic",
    );
    expect(classify({ url, userAgent: "Perplexity-User/1.0" })?.via).toBe("Perplexity-User");
    expect(
      classify({ url, userAgent: "OAI-SearchBot/1.0; +https://openai.com/searchbot" })?.via,
    ).toBe("OAI-SearchBot");
  });

  it("finds people who come from an AI answer", () => {
    expect(classify({ url, referer: "https://chatgpt.com/" })).toEqual({
      kind: "referral",
      source: "chatgpt",
      via: "referer",
    });
    expect(classify({ url, referer: "https://www.perplexity.ai/search?q=x" })?.source).toBe(
      "perplexity",
    );
    expect(classify({ url, referer: "https://gemini.google.com/app" })?.source).toBe("gemini");
    expect(classify({ url: url + "?utm_source=chatgpt.com" })).toEqual({
      kind: "referral",
      source: "chatgpt",
      via: "utm",
    });
  });

  it("ignores normal traffic", () => {
    const chrome = "Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/141 Safari/537.36";
    expect(classify({ url, userAgent: chrome, referer: "https://www.google.com/" })).toBeNull();
    expect(classify({ url, referer: "https://notchatgpt.com/" })).toBeNull();
    expect(classify({ url, referer: "not a url" })).toBeNull();
  });
});

describe("isTracked", () => {
  it("skips static assets", () => {
    expect(isTracked("/")).toBe(true);
    expect(isTracked("/llms.txt")).toBe(true);
    expect(isTracked("/robots.txt")).toBe(true);
    expect(isTracked("/fonts/CalSansVF.woff2")).toBe(false);
    expect(isTracked("/og/property-management.jpg")).toBe(false);
  });
});
