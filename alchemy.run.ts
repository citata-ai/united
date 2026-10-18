/**
 * One Alchemy Stack for all citata Cloudflare resources.
 *
 *   citata-landing  Astro static site       citata.ai, www.citata.ai (prod)
 *   citata-web      Foldkit Website Worker  app.citata.ai (prod)
 *     └─ /api/*  ── service binding ─▶
 *   citata-api      Effect API Worker       no public route
 *
 * Stage "stage" puts the landing on stage.citata.ai (noindex). Other stages
 * (dev, pr-<n>) get suffixed names and no custom domains.
 *
 * CITATA_DEPLOY=landing deploys only the landing (what CI does today; the app
 * and API are not live yet). CI: .github/workflows/deploy.yml.
 */
import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { fileURLToPath } from "node:url";
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
    // AI crawlers and AI referrals (landing/ai-traffic.js). Query: docs/ai-traffic.md.
    const AI_TRAFFIC = yield* Cloudflare.AnalyticsEngine.Dataset("AiTraffic", {
      dataset: "citata_ai_traffic",
    });
    const domain =
      stage === "prod"
        ? { name: "citata.ai", redirects: ["www.citata.ai"] }
        : stage === "stage"
          ? "stage.citata.ai"
          : undefined;
    return {
      name: workerName("citata-landing", stage),
      cwd: "landing",
      command: "bun run build",
      outdir: "dist",
      dev: { command: "bun run dev" },
      // www redirect, AI-traffic records, Markdown answers, security and cache headers.
      main: fileURLToPath(new URL("./landing/worker.js", import.meta.url)),
      env: { AI_TRAFFIC, CITATA_STAGE: stage },
      assets: {
        htmlHandling: "auto-trailing-slash" as const,
        notFoundHandling: "404-page" as const,
        runWorkerFirst: true,
      },
      ...(domain ? { domain } : {}),
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
    const landing = yield* Landing;
    if (process.env.CITATA_DEPLOY === "landing") return { landing: landing.url };
    yield* Api;
    const web = yield* Web;
    return { web: web.url, landing: landing.url };
  }),
);
