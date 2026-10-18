/**
 * Classify a request as AI traffic: an AI crawler (bot) or a person who came
 * from an AI answer (referral). The Worker writes each hit to Analytics Engine
 * and to Workers Logs. Pure: no Cloudflare APIs here, so tests run in Node.
 */

/** User-agent token → AI vendor. Order matters: the first match wins. */
const BOTS = [
  ["OAI-SearchBot", "openai"], // ChatGPT search index
  ["ChatGPT-User", "openai"], // ChatGPT fetches a page for a user
  ["GPTBot", "openai"], // training
  ["Claude-SearchBot", "anthropic"],
  ["Claude-User", "anthropic"],
  ["ClaudeBot", "anthropic"],
  ["anthropic-ai", "anthropic"],
  ["Perplexity-User", "perplexity"],
  ["PerplexityBot", "perplexity"],
  ["Google-CloudVertexBot", "google"],
  ["Google-Extended", "google"],
  ["GoogleOther", "google"],
  ["Googlebot", "google"], // also feeds AI Overviews and AI Mode
  ["bingbot", "microsoft"], // also feeds Copilot and ChatGPT search
  ["Applebot", "apple"],
  ["meta-externalagent", "meta"],
  ["meta-externalfetcher", "meta"],
  ["Amazonbot", "amazon"],
  ["DuckAssistBot", "duckduckgo"],
  ["MistralAI-User", "mistral"],
  ["cohere-ai", "cohere"],
  ["Bytespider", "bytedance"],
  ["CCBot", "commoncrawl"],
  ["YouBot", "you"],
];

/** Referrer host (or suffix) → AI source. */
const REFERRERS = [
  ["chatgpt.com", "chatgpt"],
  ["chat.openai.com", "chatgpt"],
  ["perplexity.ai", "perplexity"],
  ["claude.ai", "claude"],
  ["gemini.google.com", "gemini"],
  ["bard.google.com", "gemini"],
  ["copilot.microsoft.com", "copilot"],
  ["copilot.cloud.microsoft", "copilot"],
  ["chat.deepseek.com", "deepseek"],
  ["grok.com", "grok"],
  ["meta.ai", "meta"],
  ["you.com", "you"],
  ["phind.com", "phind"],
  ["chat.mistral.ai", "mistral"],
];

/** utm_source values that AI tools add to links. */
const UTM = [
  ["chatgpt", "chatgpt"],
  ["openai", "chatgpt"],
  ["perplexity", "perplexity"],
  ["claude", "claude"],
  ["gemini", "gemini"],
  ["copilot", "copilot"],
];

/** @param {string} host @param {string} entry */
const hostMatches = (host, entry) => host === entry || host.endsWith("." + entry);

/**
 * @param {{ url: string, userAgent?: string | null, referer?: string | null }} req
 * @returns {{ kind: "bot" | "referral", source: string, via: string } | null}
 */
export function classify({ url, userAgent, referer }) {
  const ua = (userAgent ?? "").toLowerCase();
  for (const [token, vendor] of BOTS) {
    if (ua.includes(token.toLowerCase())) return { kind: "bot", source: vendor, via: token };
  }
  if (referer) {
    try {
      const host = new URL(referer).hostname.toLowerCase();
      for (const [entry, source] of REFERRERS) {
        if (hostMatches(host, entry)) return { kind: "referral", source, via: "referer" };
      }
    } catch {
      // A bad Referer header is not AI traffic.
    }
  }
  const utm = new URL(url).searchParams.get("utm_source")?.toLowerCase() ?? "";
  for (const [token, source] of UTM) {
    if (utm.includes(token)) return { kind: "referral", source, via: "utm" };
  }
  return null;
}

/** Count page views and the files AI reads; skip fonts, images and CSS. */
export function isTracked(pathname) {
  return !/\.(woff2?|png|jpe?g|webp|avif|svg|ico|css|js|map)$/i.test(pathname);
}
