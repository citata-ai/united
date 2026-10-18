import { NodeFileSystem } from "@effect/platform-node";
import { expect, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";
import { decodeAccounts, loadBusiness } from "./load.ts";
import { entities, enums } from "./model.ts";

const businessDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");

it.effect("decodes accounts.toml, offers.toml, goals.toml and hypotheses.toml", () =>
  Effect.gen(function* () {
    const business = yield* loadBusiness(businessDir);
    expect(business.accounts.account.map((a) => a.slug)).toEqual([
      "fridman-properties",
      "citata",
      "myremotely",
    ]);
    expect(business.projects.map((p) => `${p.account}/${p.slug}`)).toEqual([
      "fridman-properties/fp-section8-ai",
      "citata/citata-site",
      "myremotely/mr-ai-leads",
    ]);
    expect(business.offers.offer.map((o) => o.slug)).toEqual([
      "audit",
      "starter",
      "growth",
      "impact",
    ]);
    expect(business.goals.objective.map((o) => o.id)).toEqual([
      "CTT-O1",
      "CTT-O2",
      "CTT-O3",
      "CTT-O4",
      "CTT-O5",
      "CTT-O6",
    ]);
  }).pipe(Effect.provide(NodeFileSystem.layer)),
);

it.effect("each Project points to an Offer that exists", () =>
  Effect.gen(function* () {
    const { projects, offers } = yield* loadBusiness(businessDir);
    const slugs = new Set(offers.offer.map((o) => o.slug));
    expect(projects.filter((p) => !slugs.has(p.offer))).toEqual([]);
  }).pipe(Effect.provide(NodeFileSystem.layer)),
);

it.effect("each Hypothesis points to an Objective, each Experiment to a Hypothesis", () =>
  Effect.gen(function* () {
    const { goals, hypotheses } = yield* loadBusiness(businessDir);
    const objectives = new Set(goals.objective.map((o) => o.id));
    const ids = hypotheses.hypothesis.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(hypotheses.hypothesis.filter((h) => !objectives.has(h.objective))).toEqual([]);
    expect(hypotheses.experiment.filter((e) => !ids.includes(e.hypothesis))).toEqual([]);
    expect(hypotheses.experiment.filter((e) => !e.id.startsWith(`${e.hypothesis}-`))).toEqual([]);
  }).pipe(Effect.provide(NodeFileSystem.layer)),
);

it("model.ts has one Schema for each entity and enum in model.toml", () => {
  const model = parse(readFileSync(resolve(businessDir, "model.toml"), "utf8")) as {
    entity: Record<string, unknown>;
    enum: Record<string, unknown>;
  };
  expect(Object.keys(entities).toSorted()).toEqual(Object.keys(model.entity).toSorted());
  expect(Object.keys(enums).toSorted()).toEqual(Object.keys(model.enum).toSorted());
});

it.effect("rejects an unknown key and a bad enum value", () =>
  Effect.gen(function* () {
    const base = `[[account]]
slug = "acme"
name = "Acme"
domain = "acme.test"
relation = "client"
status = "lead"
allspark = "/80-entities/acme.md"
`;
    const ok = yield* Effect.exit(decodeAccounts(`${base}vertical = "saas"\n`));
    expect(Exit.isSuccess(ok)).toBe(true);
    const badVertical = yield* Effect.exit(decodeAccounts(`${base}vertical = "retail"\n`));
    expect(Exit.isFailure(badVertical)).toBe(true);
    const extraKey = yield* Effect.exit(decodeAccounts(`${base}vertical = "saas"\nfoo = 1\n`));
    expect(Exit.isFailure(extraKey)).toBe(true);
    const badToml = yield* Effect.flip(decodeAccounts("[[account]\n"));
    expect(badToml.file).toBe("accounts.toml");
  }),
);
