# Architecture: citata.ai / united

Status: draft, 2026-10-18. No code yet. This file shows the plan for the stack, the deploy and the secrets.

## 1. Repo layout

One repo, one Bun workspace. `mise` runs all tasks.

```
united/
├─ business/        Business-as-Code: the domain core (pure Effect, no platform code)
│  ├─ goals/        objectives, key results, KPIs (vocabulary from dot-do/primitives)
│  ├─ domain/       commands, events, policies (alchemy/Domain style)
│  └─ procedures/   playbooks that agents run
├─ backend/         Effect 4 API Worker + scripts / jobs (cafe-stack "api")
├─ frontend/        Foldkit app on a Website Worker (cafe-stack "edge")
├─ landing/         Astro static site (fp-landing pattern)
├─ docs/            architecture, ADRs
├─ alchemy.run.ts   one Alchemy 2 Stack for all Cloudflare resources
└─ mise.toml        gates and tasks
```

Rule: `backend/` and `frontend/` import `business/`. `business/` never imports them. A boundary test enforces this (cafe-stack `boundary.test.ts`).

Why `business/` is a separate package and not part of `backend/`: the business model must stay free of Cloudflare, HTTP and storage. Then agents, scripts and the API all read the same goals and rules.

## 2. Stack

| Layer     | Choice                                        | Source                     |
|-----------|-----------------------------------------------|----------------------------|
| Language  | TypeScript, Effect 4                          | cafe-stack                 |
| UI        | Foldkit + foldcn, Tailwind 4, Vite            | cafe-stack                 |
| Landing   | Astro 7 static, Tailwind 4                    | fp-landing                 |
| API       | Effect HTTP on a Cloudflare Worker            | cafe-stack                 |
| Data      | D1 / Durable Objects (choose when needed)     | open                       |
| Infra     | Alchemy 2 (`alchemy.run.ts`), stages dev/prod | cafe-stack, fp-landing     |
| Tooling   | Bun, mise, Oxlint, Oxfmt, Vitest, gitleaks    | cafe-stack, web-app        |
| Telemetry | Workers Observability + Effect spans          | cafe-stack                 |

Pin `alchemy` and `effect` to exact versions. Beta releases break between minor versions.

## 3. Deploy

```
git push ─▶ GitHub Actions (CI = only merge gate)
              │
              ├─ PR      ─▶ alchemy deploy --stage pr-<n>   (preview, destroyed on close)
              └─ main    ─▶ alchemy deploy --stage prod
                               │
Cloudflare account 1494c6f6…   ▼
  ├─ Worker  citata-landing   ─▶ citata.ai, www.citata.ai     (static assets)
  ├─ Worker  citata-web       ─▶ app.citata.ai                (Foldkit UI)
  │            └─ /api/*  ── service binding ─▶
  └─ Worker  citata-api       ─▶ (no public route; binding only)
```

- Registrar and DNS: Cloudflare (domain bought there). Alchemy attaches the custom domains, so no manual dashboard step.
- Alchemy state: `Cloudflare.state()` for deployed stages. Fall back to `localState()` if the beta hang (alchemy issue 1082) shows up.

## 4. Gates

Copy the web-app gate model, made smaller:

| Gate | When                 | Runs                                                        |
|------|----------------------|-------------------------------------------------------------|
| G1   | pre-commit (husky)   | oxlint + oxfmt on staged files                              |
| G2   | pre-push             | typecheck, changed tests, boundary test, gitleaks           |
| G3   | by hand              | local mirror of CI: full lint, test, build, `astro check`   |
| CI   | PR and main          | G3 + preview deploy; the only merge authority               |
| G4   | before prod deploy   | smoke test of each Worker (`/api/health`, landing 200)      |

## 5. Secrets

Self-hosted Infisical, `https://env.myremotely.ai`, TAO org `acab4c1a-58e6-4689-b7bc-62c5d88822cd`.

| Item                | Value                                                  |
|---------------------|--------------------------------------------------------|
| Project             | `citata` (new, like `Energon`)                         |
| Environments        | `dev`, `prod`                                          |
| Day-1 secrets       | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`        |
| Agents read with    | `SPARK_INFISICAL_PROJECT_ID=<citata> spark run -- …`   |
| CI reads with       | Infisical machine identity (OIDC), not repo secrets    |
| Worker runtime      | Alchemy passes secrets as Worker secret bindings       |

Rules: no `.env` files in git. Never print values. The operator creates the project, the identity and the Cloudflare token through Approver.app (Touch ID). An agent cannot do this.

## 6. Place in TAO

citata.ai is one venture of TAO (Thriving Agentic Organization). To register it:

1. Allspark: `/80-entities/citata-ai.md` and `/30-projects/citata-ai/index.md`.
2. Optimus registry: entry in `registry/projects.toml`.
3. Todoer: prefix `CIT`.
4. Goals: the venture OKRs live as code in `business/goals/` and link up to the TAO life goals.

## 7. Open decisions

- Data store for the API: D1 or Durable Objects.
- `app.citata.ai` or one host with paths.
- Go through Genesis (hypothesis) first, or hatch at once.
