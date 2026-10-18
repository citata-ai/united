/**
 * The landing is standalone (no package imports), so it holds a copy of the
 * price ladder in landing/src/data/offers.json. This test keeps the copy equal
 * to business/offers.toml.
 */
import { NodeFileSystem } from "@effect/platform-node";
import { expect, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadBusiness } from "./load.ts";

const businessDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const landingOffers = resolve(businessDir, "../landing/src/data/offers.json");

it.effect("landing offers.json matches offers.toml", () =>
  Effect.gen(function* () {
    const { offers } = yield* loadBusiness(businessDir);
    const expected = offers.offer.map((o) => ({
      slug: o.slug,
      name: o.name,
      price_usd_month: o.price_usd_month,
      ...(o.annual_price_usd_month === undefined
        ? {}
        : { annual_price_usd_month: o.annual_price_usd_month }),
      scope: o.scope,
    }));
    expect(JSON.parse(readFileSync(landingOffers, "utf8"))).toEqual(expected);
  }).pipe(Effect.provide(NodeFileSystem.layer)),
);
