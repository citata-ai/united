/**
 * citata-landing: serve the static site; send www.citata.ai to citata.ai (301);
 * record AI traffic (AI crawlers and AI referrals) to Analytics Engine and logs.
 * On *.workers.dev (stage) add a noindex header and do not record traffic.
 * Interim wrangler deploy; see wrangler.jsonc.
 */
import { classify, isTracked } from "./ai-traffic.js";

/**
 * @typedef {{ writeDataPoint(p: { blobs?: string[], doubles?: number[], indexes?: string[] }): void }} AnalyticsEngine
 * @typedef {{ ASSETS: { fetch: typeof fetch }, AI_TRAFFIC?: AnalyticsEngine }} Env
 */

export default {
  /** @param {Request} request @param {Env} env */
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.citata.ai") {
      url.hostname = "citata.ai";
      return Response.redirect(url.toString(), 301);
    }
    const response = wantsMarkdown(request, url)
      ? await markdown(request, url, env)
      : await env.ASSETS.fetch(request);
    if (url.hostname.endsWith(".workers.dev")) {
      // Stage and preview hosts: keep them out of search indexes.
      const staged = new Response(response.body, response);
      staged.headers.set("X-Robots-Tag", "noindex, nofollow");
      return staged;
    }
    if (isTracked(url.pathname)) record(request, url, response.status, env);
    return secure(response);
  },
};

/** Security headers on every response (HSTS, no framing, no MIME sniffing, strict referrer). */
function secure(/** @type {Response} */ response) {
  const out = new Response(response.body, response);
  out.headers.set("Strict-Transport-Security", "max-age=31536000");
  out.headers.set("X-Frame-Options", "SAMEORIGIN");
  out.headers.set("X-Content-Type-Options", "nosniff");
  out.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return out;
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
