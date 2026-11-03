/**
 * citata-landing: serve the static site; send www.citata.ai to citata.ai (301);
 * record AI traffic (AI crawlers and AI referrals) to Analytics Engine and logs.
 * On stage (CITATA_STAGE != "prod", e.g. stage.citata.ai) and on *.workers.dev add a noindex
 * header and do not record traffic. Deployed by Alchemy (alchemy.run.ts); wrangler.jsonc is the
 * old interim path.
 */
import { classify, isTracked } from "./ai-traffic.js";

/**
 * @typedef {{ writeDataPoint(p: { blobs?: string[], doubles?: number[], indexes?: string[] }): void }} AnalyticsEngine
 * @typedef {{ ASSETS: { fetch: typeof fetch }, AI_TRAFFIC?: AnalyticsEngine, CITATA_STAGE?: string }} Env
 */

export default {
  /** @param {Request} request @param {Env} env */
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.citata.ai") {
      url.hostname = "citata.ai";
      return Response.redirect(url.toString(), 301);
    }
    const moved = movedPath(url.pathname);
    if (moved) {
      url.pathname = moved;
      return Response.redirect(url.toString(), 301);
    }
    const response = wantsMarkdown(request, url)
      ? await markdown(request, url, env)
      : await env.ASSETS.fetch(request);
    if (
      url.hostname.endsWith(".workers.dev") ||
      (env.CITATA_STAGE && env.CITATA_STAGE !== "prod")
    ) {
      // Stage and preview hosts: keep them out of search indexes.
      const staged = secure(response, url.pathname, url.search);
      staged.headers.set("X-Robots-Tag", "noindex, nofollow");
      // no-transform stops Cloudflare from injecting the Web Analytics beacon, so stage is not counted.
      staged.headers.set("Cache-Control", noTransform(staged.headers.get("Cache-Control")));
      return staged;
    }
    if (isTracked(url.pathname)) record(request, url, response.status, env);
    return secure(response, url.pathname, url.search);
  },
};

/**
 * Old URLs that moved (2026-10-19: Section 8 pages went under /guides). Returns the new path or null.
 * @param {string} path
 */
export function movedPath(path) {
  const m = /^\/section-8(\/[^/]+)?(\.md|\.html)?\/?$/.exec(path);
  if (!m) return null;
  return `/guides/section-8-rent-limits${m[1] ?? ""}${m[2] === ".md" ? ".md" : ""}`;
}

/** Security headers on every response (HSTS, no framing, no MIME sniffing, strict referrer). */
function secure(/** @type {Response} */ response, /** @type {string} */ path, search = "") {
  const out = new Response(response.body, response);
  out.headers.set("Strict-Transport-Security", "max-age=31536000");
  out.headers.set("X-Frame-Options", "SAMEORIGIN");
  out.headers.set("X-Content-Type-Options", "nosniff");
  out.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  const cache = cacheControl(path, search);
  if (cache && response.ok) out.headers.set("Cache-Control", cache);
  return out;
}

/**
 * Long browser cache for static files. Fonts never change name; images and figure JS
 * may be replaced under the same name, so they get 30 days and 1 day. Figure files with a content
 * hash (`?v=`) never change under that URL, so they get a year.
 * @param {string} path
 * @param {string} [search]
 */
export function cacheControl(path, search = "") {
  if (path.startsWith("/mechanism/") && /[?&]v=[0-9a-f]{6,}/.test(search))
    return "public, max-age=31536000, immutable";
  if (path.startsWith("/fonts/")) return "public, max-age=31536000, immutable";
  if (/^\/(img|og)\//.test(path) || /\.(svg|png|ico|webp|jpg)$/.test(path))
    return "public, max-age=2592000";
  if (path.startsWith("/mechanism/")) return "public, max-age=86400";
  return null;
}

/**
 * Add `no-transform` to a Cache-Control value. Cloudflare does not inject its Web Analytics
 * beacon into a response that has it.
 * @param {string | null} value
 */
export function noTransform(value) {
  if (!value) return "no-transform";
  return /\bno-transform\b/.test(value) ? value : `${value}, no-transform`;
}

/** An agent asks for Markdown: "Accept: text/markdown" on a page URL (no file extension). */
function wantsMarkdown(/** @type {Request} */ request, /** @type {URL} */ url) {
  return (
    (request.headers.get("accept") ?? "").includes("text/markdown") &&
    !/\.[a-z0-9]+$/i.test(url.pathname)
  );
}

/** Serve the .md copy that scripts/markdown.mjs wrote at build; fall back to HTML. */
async function markdown(
  /** @type {Request} */ request,
  /** @type {URL} */ url,
  /** @type {Env} */ env,
) {
  const path = url.pathname === "/" ? "/index.md" : `${url.pathname.replace(/\/$/, "")}.md`;
  const md = await env.ASSETS.fetch(new Request(new URL(path, url), { headers: request.headers }));
  if (!md.ok) return env.ASSETS.fetch(request);
  return new Response(md.body, {
    status: 200,
    headers: { "content-type": "text/markdown; charset=utf-8", vary: "accept" },
  });
}

/** @param {Request} request @param {URL} url @param {number} status @param {Env} env */
function record(request, url, status, env) {
  const hit = classify({
    url: request.url,
    userAgent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
  });
  if (!hit) return;
  const country = /** @type {{ country?: string }} */ (request.cf ?? {}).country ?? "";
  // blob order is the query schema: blob1 kind, blob2 source, blob3 via, blob4 path, blob5 country, blob6 referer.
  env.AI_TRAFFIC?.writeDataPoint({
    indexes: [hit.kind],
    blobs: [
      hit.kind,
      hit.source,
      hit.via,
      url.pathname,
      country,
      request.headers.get("referer") ?? "",
    ],
    doubles: [1, status],
  });
  console.log(JSON.stringify({ event: "ai_traffic", ...hit, path: url.pathname, status, country }));
}
