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

## Deploy (not yet)

TODO(CTT-3 follow-up): add `.github/workflows/deploy.yml` when the Cloudflare token exists.

- Operator creates `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in Infisical project `citata` (Approver.app).
- CI reads them through an Infisical machine identity (OIDC), not repo secrets.
- PR: `alchemy deploy --stage pr-<n>`, destroy on close.
- main: `alchemy deploy --stage prod`, then G4 smoke test (`/api/health` 200, landing 200).
