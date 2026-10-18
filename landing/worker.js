/**
 * citata-landing: serve the static site; send www.citata.ai to citata.ai (301).
 * On *.workers.dev (stage) add a noindex header.
 * Interim wrangler deploy; see wrangler.jsonc.
 */
export default {
  /** @param {Request} request @param {{ ASSETS: { fetch: typeof fetch } }} env */
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.citata.ai") {
      url.hostname = "citata.ai";
      return Response.redirect(url.toString(), 301);
    }
    if (!url.hostname.endsWith(".workers.dev")) return env.ASSETS.fetch(request);
    // Stage and preview hosts: keep them out of search indexes.
    const response = await env.ASSETS.fetch(request);
    const staged = new Response(response.body, response);
    staged.headers.set("X-Robots-Tag", "noindex, nofollow");
    return staged;
  },
};
