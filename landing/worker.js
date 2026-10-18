/**
 * citata-landing: serve the static site; send www.citata.ai to citata.ai (301);
 * record AI traffic (AI crawlers and AI referrals) to Analytics Engine and logs.
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
    const response = await env.ASSETS.fetch(request);
    if (isTracked(url.pathname)) record(request, url, response.status, env);
    return response;
  },
};

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
