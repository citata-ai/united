# AGENTS.md

## Purpose

This repo is the home of the citata.ai organization. Its goal: positive impact and spiritual prosperity on the planet Earth.

## Rules

- Write in ASD-STE100 Simplified Technical English. Short words, active voice.
- Keep the README warm and short.
- Commit small, clear changes.

## Layout

Read `docs/architecture.md` first.

| Path             | Holds                                                                    |
| ---------------- | ------------------------------------------------------------------------ |
| `business/`      | Domain core. TOML/MD facts plus `src/` Effect Schema and loader. Pure.   |
| `backend/`       | Effect API Worker `citata-api` (`GET /api/health`).                      |
| `frontend/`      | Foldkit app on Website Worker `citata-web`. `/api/*` goes to the API.    |
| `landing/`       | Astro 7 static site `citata-landing` (citata.ai).                        |
| `alchemy.run.ts` | One Alchemy Stack for all Cloudflare resources.                          |
| `docs/gates.md`  | Gates G1, G2, G3 and CI.                                                 |

Import direction: `backend` and `frontend` may import `business`. `business` never imports them. `business/src/boundary.test.ts` enforces this. Do not weaken that test.

`frontend/src/` follows `frontend/src/AGENTS.md` (Foldkit rules).

## Commands

Run from the repo root.

| Do this                    | Command                                   |
| -------------------------- | ----------------------------------------- |
| Install tools and packages | `mise trust && mise install`              |
| Install packages only      | `mise run install`                        |
| Run all Workers locally    | `mise run dev`                            |
| Run the landing only       | `mise run dev:landing`                    |
| Typecheck, lint, test      | `mise run check`                          |
| Fix format                 | `mise run format`                         |
| Build (local, no deploy)   | `mise run build`                          |
| G1 (pre-commit hook)       | `mise run gate1`                          |
| G2 (pre-push hook)         | `mise run gate2`                          |
| G3 (local CI mirror)       | `mise run gate3`                          |
| Deploy prod                | `mise run deploy` (operator approval only) |

## Gates

- Hooks run G1 on commit and G2 on push. Never use `--no-verify`.
- Run `mise run gate3` before you open a PR. CI runs the same task and is the only merge gate.
- Details: `docs/gates.md`.

## Deploy

- No deploy yet. No Cloudflare token exists. Do not run `alchemy deploy` or `mise run deploy`.
- When the token exists, the operator puts it in Infisical project `citata`. Then CI deploys (see `docs/gates.md`).

## Business data

- Edit facts in `business/*.toml`. Then run `mise run test`: the loader test decodes each file.
- A new key in a TOML file fails the decode. Add the key to `business/src/files.ts` first.
- A new entity in `business/model.toml` needs a Schema in `business/src/model.ts`. A test checks this.

## Versions

- Keep `effect`, `alchemy`, Foldkit, Vite and `@effect/platform-*` pinned to exact versions. Beta releases break between minor versions.
- Patch dependencies only with `mise run patch` and `mise run patch:commit`. Record each patch in `patches/README.md`.

## Voice and email

- Before you write any text that leaves this repo (email, site, post, case study), read [`VOICE.md`](VOICE.md).
- Before you write an email or newsletter, also read [`business/NEWSLETTER.md`](business/NEWSLETTER.md). It holds the email types and their structure.
