/**
 * Domain entities from business/model.toml as Effect Schema.
 * Names here are the ubiquitous language. Keep them in sync with model.toml.
 */
import * as Schema from "effect/Schema";

// PRIMITIVES

/** Lowercase kebab-case id, e.g. `fridman-properties`. */
export const Slug = Schema.String.check(
  Schema.isPattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "slug must be lowercase kebab-case" }),
);

/** Absolute date, `YYYY-MM-DD`. */
export const IsoDate = Schema.String.check(
  Schema.isPattern(/^\d{4}-\d{2}-\d{2}$/, { message: "date must be YYYY-MM-DD" }),
);

/** ISO 8601 date and time, e.g. `2026-10-18T09:00:00Z`. */
export const IsoDateTime = Schema.String.check(
  Schema.isPattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/, {
    message: "datetime must be ISO 8601",
  }),
);

/** ISO week, `YYYY-Www`. */
export const IsoWeek = Schema.String.check(
  Schema.isPattern(/^\d{4}-W\d{2}$/, { message: "week must be YYYY-Www" }),
);

/** A number without a source is a hypothesis (business/README.md). */
export const EvidenceStatus = Schema.Literal("hypothesis");

// ENUMS

export const Vertical = Schema.Literals([
  "property-management",
  "pms-software",
  "impact-org",
  "saas",
  "self",
]);
export type Vertical = typeof Vertical.Type;

export const Engine = Schema.Literals([
  "chatgpt",
  "gemini",
  "google-ai-overviews",
  "claude",
  "perplexity",
  "copilot",
  "google",
  "bing",
]);
export type Engine = typeof Engine.Type;

export const Metric = Schema.Literals([
  "gsc_clicks",
  "gsc_impressions",
  "ai_mention_share",
  "ai_link_share",
  "ai_referral_sessions",
  "leads",
  "indexed_pages",
]);
export type Metric = typeof Metric.Type;

// ENTITIES

/** An organization we work with: a client, a partner, or ourselves. */
export const Account = Schema.Struct({
  slug: Slug,
  name: Schema.String,
  domain: Schema.String,
  vertical: Vertical,
  relation: Schema.Literals(["client", "dogfood", "partner"]),
  status: Schema.Literals(["lead", "active", "paused", "churned"]),
  /** Path to the Allspark entity note, e.g. `/80-entities/<slug>.md`. */
  allspark: Schema.String,
});
export type Account = typeof Account.Type;

/** Project fields that a nested `[[account.project]]` table holds. */
export const ProjectFields = {
  slug: Slug,
  offer: Slug,
  goal: Schema.String,
  /** Optional while the Project is in `baseline`. */
  started: Schema.optionalKey(IsoDate),
  status: Schema.Literals(["baseline", "active", "paused", "done"]),
  case_study: Schema.Boolean,
};

/** One engagement for one Account. An Account has many Projects. */
export const Project = Schema.Struct({ ...ProjectFields, account: Slug });
export type Project = typeof Project.Type;

/** A package we sell, with price and monthly scope. */
export const Offer = Schema.Struct({
  slug: Slug,
  name: Schema.String,
  price_usd_month: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
  scope: Schema.Array(Schema.String),
});
export type Offer = typeof Offer.Type;

/** A buyer question we track in AI engines for one Project. */
export const Prompt = Schema.Struct({
  id: Schema.String,
  project: Slug,
  text: Schema.String,
  intent: Schema.Literals(["owner", "renter", "buyer", "brand"]),
  locale: Schema.String,
});
export type Prompt = typeof Prompt.Type;

/** One run of one Prompt on one Engine at one time. Append-only. */
export const Observation = Schema.Struct({
  prompt: Schema.String,
  engine: Engine,
  at: IsoDateTime,
  mentioned: Schema.Boolean,
  linked: Schema.Boolean,
  position: Schema.optionalKey(Schema.Finite),
  cited_urls: Schema.Array(Schema.String),
  answer_hash: Schema.String,
});
export type Observation = typeof Observation.Type;

/** One change we ship to a client site. "One real change a day." */
export const Change = Schema.Struct({
  project: Slug,
  at: IsoDate,
  kind: Schema.Literals([
    "article",
    "page-fix",
    "vs-page",
    "tool",
    "index-request",
    "listing",
    "schema",
  ]),
  url: Schema.String,
  /** The person who checked the change. */
  checked_by: Schema.String,
});
export type Change = typeof Change.Type;

/** Weekly report for one Project, sent on Monday. */
export const Report = Schema.Struct({
  project: Slug,
  week: IsoWeek,
  metrics: Schema.Array(Metric),
  changes: Schema.Array(Change),
});
export type Report = typeof Report.Type;

/** Published proof for one Project: baseline, changes, result, disclosure. */
export const CaseStudy = Schema.Struct({
  project: Slug,
  baseline_week: IsoWeek,
  result_week: IsoWeek,
  disclosure: Schema.String,
  url: Schema.String,
});
export type CaseStudy = typeof CaseStudy.Type;

/** Recurring payment from an Account for an Offer (Stripe). */
export const Subscription = Schema.Struct({
  account: Slug,
  offer: Slug,
  stripe_id: Schema.String,
  status: Schema.Literals(["trial", "active", "past_due", "canceled"]),
});
export type Subscription = typeof Subscription.Type;

/** Every entity in model.toml, by name. A test checks this list against model.toml. */
export const entities = {
  Account,
  Project,
  Offer,
  Prompt,
  Engine,
  Observation,
  Change,
  Report,
  Metric,
  CaseStudy,
  Subscription,
} as const;

/** Every enum in model.toml, by name. */
export const enums = { Vertical } as const;
