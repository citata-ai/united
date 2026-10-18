/**
 * One Alchemy Stack for all citata Cloudflare resources.
 *
 *   citata-landing  Astro static site       citata.ai, www.citata.ai (prod)
 *   citata-web      Foldkit Website Worker  app.citata.ai (prod)
 *     └─ /api/*  ── service binding ─▶
 *   citata-api      Effect API Worker       no public route
 *
 * Other stages (dev, pr-<n>) get suffixed names and no custom domains.
 * Do not deploy before the Cloudflare token exists (see docs/architecture.md).
 */
import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import Api from "./backend/src/platform/cloudflare/worker.ts";
import { workerName } from "./backend/src/platform/cloudflare/name.ts";

const observability = {
  enabled: true,
  logs: { enabled: true, invocationLogs: true, headSamplingRate: 1, persist: true },
  traces: { enabled: true, headSamplingRate: 1, persist: true },
};

export const Web = Cloudflare.Website.Foldkit(
  "Web",
  Effect.gen(function* () {
    const stage = yield* Alchemy.Stage;
    return {
      name: workerName("citata-web", stage),
      rootDir: "frontend",
      main: "worker/edge.ts",
      env: { API: Api },
      // Static assets answer first; only `/api/*` runs the edge Worker.
      assets: { runWorkerFirst: ["/api/*"] },
      ...(stage === "prod" ? { domain: "app.citata.ai" } : {}),
      compatibility: { date: "2026-10-04" },
      observability,
    };
  }),
);

export const Landing = Cloudflare.Website.StaticSite(
  "Landing",
  Effect.gen(function* () {
    const stage = yield* Alchemy.Stage;
    return {
      name: workerName("citata-landing", stage),
      cwd: "landing",
      command: "bun run build",
      outdir: "dist",
      dev: { command: "bun run dev" },
      assets: {
        htmlHandling: "auto-trailing-slash" as const,
        notFoundHandling: "404-page" as const,
      },
      ...(stage === "prod" ? { domain: { name: "citata.ai", redirects: ["www.citata.ai"] } } : {}),
      compatibility: { date: "2026-10-04" },
      observability,
    };
  }),
);

const state = Layer.unwrap(
  Effect.gen(function* () {
    const dev = yield* Alchemy.ALCHEMY_DEV.pipe(Effect.orDie);
    return dev ? Alchemy.localState() : Cloudflare.state();
  }),
);

export default Alchemy.Stack(
  "citata",
  { providers: Cloudflare.providers(), state },
  Effect.gen(function* () {
    yield* Api;
    const web = yield* Web;
    const landing = yield* Landing;
    return { web: web.url, landing: landing.url };
  }),
);
