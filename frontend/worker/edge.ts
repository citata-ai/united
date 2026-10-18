/**
 * Website Worker entry for `citata-web`. Static assets answer first; Cloudflare
 * runs this Worker only for `/api/*` (see `runWorkerFirst` in alchemy.run.ts).
 * It forwards each request to `citata-api` through the service binding.
 */
export interface EdgeEnv {
  readonly API: { fetch(request: Request): Promise<Response> };
}

export default {
  fetch(request: Request, env: EdgeEnv): Promise<Response> {
    return env.API.fetch(request);
  },
};
