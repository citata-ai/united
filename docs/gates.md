# Gates

A gate is **when** a check runs. This is a small copy of the MyRemotely web-app gate model.

```
git commit ─▶ G1  pre-commit  .husky/pre-commit ─▶ mise run gate1
git push ───▶ G2  pre-push    .husky/pre-push   ─▶ mise run gate2
by hand ────▶ G3  CI mirror   mise run gate3
PR + main ──▶ CI  GitHub      .github/workflows/ci.yml ─▶ mise run gate3   (only merge gate)
```

| Gate | Runs                                                                                     |
| ---- | ---------------------------------------------------------------------------------------- |
| G1   | `oxlint` and `oxfmt --check` on staged files only                                        |
| G2   | typecheck (all packages + `astro check`), boundary test, all tests, gitleaks on unpushed commits |
| G3   | frozen install, `format:check`, lint, typecheck, boundary test, tests, build (Vite + Astro), gitleaks on full history |
| CI   | G3 on Ubuntu with mise                                                                   |

Rules:

- Hooks run G1 and G2. Run a gate by hand only to find a failure.
- G1 does not fix files. On a format failure, run `mise run format`, then stage again.
- Never use `--no-verify`.
- gitleaks comes from `mise.toml`. If it is missing, G2 and G3 skip it and say so.

## Boundary test

`business/src/boundary.test.ts` holds the import direction from `docs/architecture.md`:

- `backend/` and `frontend/` may import `business/`.
- `business/` imports only `effect` and `smol-toml` (tests may also use `@effect/vitest`, `@effect/platform-node` and `node:*`).
- `landing/` imports no other package.
- Only `alchemy.run.ts` joins packages together.

`backend/src/platform/boundary.test.ts` (from cafe-stack) keeps Cloudflare and Alchemy out of backend domain code.

## Deploy (GitHub Actions + Alchemy, since 2026-10-18)

`.github/workflows/deploy.yml` deploys the landing only (`CITATA_DEPLOY=landing`):

| Push to | Alchemy stage | URL | Worker |
|---|---|---|---|
| `stage` | `stage` | https://stage.citata.ai (noindex) | `citata-landing-stage` |
| `main` | `prod` | https://citata.ai (+ www 301) | `citata-landing` |

Each run: G3 → Cloudflare credentials from Infisical → `bun run deploy --stage <stage> --yes` → smoke test. Prod only, when pages changed: IndexNow ping, then a Google Search Console sitemap resubmit (keyless: GitHub OIDC → GCP Workload Identity Federation, project `citata-ai-ops` owned by grow@citata.ai, pool `github`, provider `citata-united` limited to repo id 1424141050 and environment `prod` → service account `gsc-sitemap@citata-ai-ops.iam.gserviceaccount.com`, "Full" user on `sc-domain:citata.ai`).

**Credentials.** No Cloudflare secret lives in GitHub. The job gets a GitHub OIDC token; Infisical (`https://env.myremotely.ai`, project `citata`, env `prod`, path `/`) trusts it through machine identity `citata-github-deploy` (id `8dc48f81-57d6-44f6-91b7-14825cac419a`, org role No Access, project role Viewer; OIDC auth, subject `repo:citata-ai/united:environment:*`, token TTL 10 min). It returns `CLOUDFLARE_API_TOKEN` (Cloudflare account token `citata-alchemy-deploy`: Workers template + Secrets Store Write; on citata.ai: Zone Read, DNS, SSL and Certificates, Dynamic URL Redirects) and `CLOUDFLARE_ACCOUNT_ID`. Repo variable `INFISICAL_IDENTITY_ID` holds the identity id (not a secret).

**GitHub environments.** `stage` accepts only branch `stage`; `prod` accepts only `main`. So a work branch can never get the credentials.

**State.** Alchemy keeps state in its Cloudflare state store Worker on the account (`Cloudflare.state()`).

**Not yet:** `citata-web` and `citata-api` (run the full stack without `CITATA_DEPLOY`), PR preview stages.
