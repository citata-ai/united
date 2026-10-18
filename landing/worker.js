/**
 * citata-landing: serve the static site; send www.citata.ai to citata.ai (301).
 * Interim wrangler deploy; see wrangler.jsonc.
 */
export default {
  /** @param {Request} request @param {{ ASSETS: { fetch: typeof fetch } }} env */
  fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.citata.ai") {
      url.hostname = "citata.ai";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
