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
| `landing/`       | Astro 7 static site `citata-landing` (citata.ai, live).                  |
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
| Deploy landing (interim)   | `cd landing && bun run build && npx wrangler@4 deploy` |

## Gates

- Hooks run G1 on commit and G2 on push. Never use `--no-verify`.
- Run `mise run gate3` before you open a PR. CI runs the same task and is the only merge gate.
- Details: `docs/gates.md`.

## Deploy

**Branches (since 2026-10-18).** `main` = prod (citata.ai). `stage` = everything approved for the next release, deployed to the stage Worker. Flow: work branch → merge into `stage` (`--no-ff`) → deploy stage, check → on the owner's explicit "publish", merge `stage` into `main` → deploy prod. Do not merge work branches straight into `main`. No PRs. Exception (Tao, 2026-10-19): the growth runs in `docs/growth-loop.md` may merge `stage` into `main` without asking, under its "Publish rule". Pushes to `stage` and `main` deploy by GitHub Actions (`.github/workflows/deploy.yml`, Alchemy): stage → https://stage.citata.ai, main → https://citata.ai. See `docs/gates.md` "Deploy".

- **Live: the landing only.** Worker `citata-landing` on Cloudflare account `1494c6f692bcb718f1c942d6801e83fe` ("1st Account") serves `https://citata.ai`. `www.citata.ai` answers 301 to the apex. First deploy 2026-10-18.
- How: wrangler, not Alchemy (interim). Config `landing/wrangler.jsonc`, script `landing/worker.js` (www redirect, then static assets). Run from `landing/`: `bun run build && npx wrangler@4 deploy`. Wrangler uses the operator's OAuth login on the Mac.
- **Stage:** push to branch `stage` → GitHub Actions + Alchemy deploy Worker `citata-landing-stage` to https://stage.citata.ai. Every response has `X-Robots-Tag: noindex, nofollow`. Check stage, then merge `stage` into `main` (only on the owner's "publish"). The old wrangler commands are a manual fallback only.
- Smoke check after each deploy: `curl -I https://citata.ai/`, `/property-management`, `/case-studies/fridman-properties` give 200; `https://www.citata.ai/` gives 301.
- `citata-web` and `citata-api` are not deployed. Do not run `alchemy deploy` or `mise run deploy`: the Stack deploys all three Workers, and no Cloudflare token exists yet.
- Do not touch Worker `tao-email`, `mail.citata.ai`, or the zone's MX, SPF, DKIM and DMARC records. Email depends on them.
- When the token exists, the operator puts it in Infisical project `citata`. Then CI deploys with Alchemy (see `docs/gates.md`). Before that, delete the wrangler Worker `citata-landing` (or let Alchemy adopt it) so the names do not clash.

## Business data

- Edit facts in `business/*.toml`. Then run `mise run test`: the loader test decodes each file.
- A new key in a TOML file fails the decode. Add the key to `business/src/files.ts` first.
- A new entity in `business/model.toml` needs a Schema in `business/src/model.ts`. A test checks this.

## Versions

- Keep `effect`, `alchemy`, Foldkit, Vite and `@effect/platform-*` pinned to exact versions. Beta releases break between minor versions.
- Patch dependencies only with `mise run patch` and `mise run patch:commit`. Record each patch in `patches/README.md`.

## Brand, voice and email

- Before you write any text that leaves this repo (email, site, post, case study), read [`brand/VOICE.md`](brand/VOICE.md).
- Before you build or change any UI, page or graphic, read [`brand/DESIGN.md`](brand/DESIGN.md). Brand assets (icon, wordmark, fonts, samples) live in `brand/`.
- Before you make an AI image (cover, hero, OG), read [`brand/IMAGES.md`](brand/IMAGES.md). It holds the style block and the prompts.
- Before you write an email or newsletter, also read [`business/NEWSLETTER.md`](business/NEWSLETTER.md). It holds the email types and their structure.
