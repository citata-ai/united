/**
 * Load business/*.toml through Schema decode. Parsing is pure; only
 * `loadBusiness` reads files, through the portable Effect FileSystem service.
 */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Schema from "effect/Schema";
import { parse } from "smol-toml";
import { AccountsFile, GoalsFile, OffersFile } from "./files.ts";
import type { Project } from "./model.ts";

/** A business file that cannot be read, parsed as TOML, or decoded. */
export class BusinessFileError extends Schema.TaggedError<
  BusinessFileError,
  { readonly brand: unique symbol }
>()("BusinessFileError", { file: Schema.String, message: Schema.String }) {}

const parseToml = (file: string, text: string) =>
  Effect.try({
    try: (): unknown => parse(text),
    catch: (cause) => new BusinessFileError({ file, message: `TOML: ${String(cause)}` }),
  });

const strict = { onExcessProperty: "error" } as const;

const decodeFile =
  <A>(
    file: string,
    decode: (input: unknown, options: typeof strict) => Effect.Effect<A, Schema.SchemaError>,
  ) =>
  (text: string): Effect.Effect<A, BusinessFileError> =>
    parseToml(file, text).pipe(
      Effect.flatMap((data) =>
        decode(data, strict).pipe(
          Effect.mapError((error) => new BusinessFileError({ file, message: error.message })),
        ),
      ),
    );

export const decodeAccounts = decodeFile("accounts.toml", Schema.decodeUnknownEffect(AccountsFile));
export const decodeOffers = decodeFile("offers.toml", Schema.decodeUnknownEffect(OffersFile));
export const decodeGoals = decodeFile("goals.toml", Schema.decodeUnknownEffect(GoalsFile));

/** Every Project in accounts.toml, with the `account` slug of its parent. */
export const projectsOf = (accounts: AccountsFile): ReadonlyArray<Project> =>
  accounts.account.flatMap((account) =>
    (account.project ?? []).map(
      ({ prompts_seed: _p, blockers: _b, pages: _g, ...project }): Project => ({
        ...project,
        account: account.slug,
      }),
    ),
  );

export interface Business {
  readonly accounts: AccountsFile;
  readonly projects: ReadonlyArray<Project>;
  readonly offers: OffersFile;
  readonly goals: GoalsFile;
}

/** Read and decode accounts.toml, offers.toml and goals.toml from `dir`. */
export const loadBusiness = Effect.fn("Business.load")(function* (dir: string) {
  const fs = yield* FileSystem.FileSystem;
  const read = (file: string) =>
    fs
      .readFileString(`${dir}/${file}`)
      .pipe(Effect.mapError((error) => new BusinessFileError({ file, message: error.message })));
  const accounts = yield* Effect.flatMap(read("accounts.toml"), decodeAccounts);
  const offers = yield* Effect.flatMap(read("offers.toml"), decodeOffers);
  const goals = yield* Effect.flatMap(read("goals.toml"), decodeGoals);
  return { accounts, projects: projectsOf(accounts), offers, goals } satisfies Business;
});
