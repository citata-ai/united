/**
 * Schemas for the TOML files in business/. Each file shape reuses the entity
 * fields from model.ts and adds the extra keys the file holds. Decode with
 * `onExcessProperty: "error"`, so a new key fails until it is added here.
 */
import * as Schema from "effect/Schema";
import { Account, EvidenceStatus, IsoDate, Offer, ProjectFields } from "./model.ts";

const Strings = Schema.Array(Schema.String);

/** A `[[account.project]]` table. The parent Account gives the `account` slug. */
export const ProjectRecord = Schema.Struct({
  ...ProjectFields,
  prompts_seed: Schema.optionalKey(Strings),
  blockers: Schema.optionalKey(Strings),
  pages: Schema.optionalKey(Strings),
});
export type ProjectRecord = typeof ProjectRecord.Type;

/** A `[[account]]` table in accounts.toml. */
export const AccountRecord = Schema.Struct({
  ...Account.fields,
  note: Schema.optionalKey(Schema.String),
  project: Schema.optionalKey(Schema.Array(ProjectRecord)),
});
export type AccountRecord = typeof AccountRecord.Type;

export const AccountsFile = Schema.Struct({ account: Schema.Array(AccountRecord) });
export type AccountsFile = typeof AccountsFile.Type;

/** An `[[offer]]` table in offers.toml. */
export const OfferRecord = Schema.Struct({
  ...Offer.fields,
  annual_price_usd_month: Schema.optionalKey(Schema.Finite),
  status: Schema.optionalKey(EvidenceStatus),
  purpose: Schema.optionalKey(Schema.String),
});
export type OfferRecord = typeof OfferRecord.Type;

export const OffersFile = Schema.Struct({ offer: Schema.Array(OfferRecord) });
export type OffersFile = typeof OffersFile.Type;

/** One key result of an Objective. `target` is a count or a text like "2x baseline". */
export const KeyResult = Schema.Struct({
  text: Schema.String,
  target: Schema.optionalKey(Schema.Union([Schema.Finite, Schema.String])),
  unit: Schema.optionalKey(Schema.String),
  due: IsoDate,
  status: Schema.optionalKey(EvidenceStatus),
});
export type KeyResult = typeof KeyResult.Type;

/** An `[[objective]]` table in goals.toml, linked to a TAO life goal. */
export const Objective = Schema.Struct({
  id: Schema.String.check(Schema.isPattern(/^CTT-O\d+$/, { message: "id must be CTT-O<n>" })),
  title: Schema.String,
  life_goal: Schema.String,
  period: Schema.String,
  kr: Schema.Array(KeyResult),
});
export type Objective = typeof Objective.Type;

export const GoalsFile = Schema.Struct({ objective: Schema.Array(Objective) });
export type GoalsFile = typeof GoalsFile.Type;
