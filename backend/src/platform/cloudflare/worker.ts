import { Stage } from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";
import * as HttpRouter from "effect/http/HttpRouter";
import { apiRoutes } from "../../api.ts";
import { AppInfo } from "../../service.ts";
import { workerName } from "./name.ts";

/**
 * The citata API Worker. It has no public route: `citata-web` reaches it
 * through a service binding on `/api/*`.
 */
export default class Api extends Cloudflare.Worker<Api>()(
  "Api",
  Effect.gen(function* () {
    const stage = yield* Stage;
    return {
      name: workerName("citata-api", stage),
      main: import.meta.url,
      compatibility: { date: "2026-10-04" },
      observability: {
        enabled: true,
        logs: { enabled: true, invocationLogs: true, headSamplingRate: 1, persist: true },
      },
    };
  }),
  Effect.gen(function* () {
    const handler = yield* HttpRouter.toHttpEffect(apiRoutes);
    return {
      fetch: handler.pipe(Effect.withSpan("Api.request"), Effect.provide(AppInfo.layer("citata"))),
    };
  }).pipe(Effect.provide(Cloudflare.Telemetry({ headSamplingRate: 1, persist: true }))),
) {}
