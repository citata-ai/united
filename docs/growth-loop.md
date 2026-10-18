# Growth loop (autonomous routine)

Status: v1, 2026-10-19. Owner: Tao. Goal: `CTT-O6` in `business/goals.toml` (1,000 AI referral sessions in the 30 days to 2026-11-18).

Scheduled agents run this file. Each run is a fresh session with no memory. This file, `business/hypotheses.toml` and the logs are the memory.

## Runs

| Run | When (Kyiv) | Does |
|---|---|---|
| `tick` | Mon–Sat 10:00 | One real change: build, refresh or link. Ship to stage. |
| `measure` | Mon 11:00 | Numbers, hypothesis status, Monday report. |
| `scout` | Thu 08:00 | Competitor scan, new content ideas, outreach list. |

## Read first (every run)

1. `AGENTS.md` (branch flow, deploy, gates), `brand/VOICE.md`, `business/marketing/content-batch-1.md` (page rules).
2. `business/hypotheses.toml`: the bets. Priority = impact × confidence × ease.
3. `business/marketing/backlog.toml`: content and link ideas, ranked.
4. The last `measure` report in `business/marketing/reports/`.
5. The latest competitor teardown in `business/marketing/competitors/` and `competitors/clients/playbook.md`.

## tick: one change a day

1. `git fetch origin`. Branch `t3/tick-<YYYY-MM-DD>` from `origin/stage`.
2. Pick the top item in `backlog.toml` with `status = "idea"`: highest `score`, tie-break by the ICE priority of its hypothesis (skip hypotheses that are `invalidated` or `parked`). Items with `status = "building"` have an owner: skip them. Set your item to `building` in your first commit. If no item is left, make one from the kinds below. Kinds, in order of value now:
3. Build it. Follow the page rules. Every page fits the Guides hub (Tao, 2026-10-19: educate first): a guide under `/guides/<slug>`, a sub-page of a guide (`/guides/<guide>/<sub>`, like the Section 8 metros), a tool under `/tools` or research under `/research`. Link it from `/guides` (`landing/src/pages/guides/index.astro`): the 5-step path, a guide block, tools or research. Breadcrumbs start with Guides. Every number has a source you read in this run.
4. `mise run check`, `cd landing && bun run build`. Fix until green. Never `--no-verify`.
5. Commit. Merge into `stage` with `--no-ff`. Push `stage`. CI deploys https://stage.citata.ai.
6. Check the new URL on stage gives 200.
7. Log it:
   - `business/hypotheses.toml`: append or update the `[[experiment]]` (urls, actions).
   - `docs/geo-loop.md` change log: one row.
   - `backlog.toml`: set the item `status = "staged"`.
8. Add the page to the publish queue: `business/marketing/publish-queue.md` (URL, hypothesis, one-line summary).
9. Publish to prod under the publish rule below.

## Publish rule

Since 2026-10-19 Tao allows the growth runs to publish to prod as often as needed. After the stage check (step 6 of `tick` gives 200 and the page looks right), merge `stage` into `main` with `--no-ff`, push, and run the smoke check from AGENTS.md. CI deploys https://citata.ai and pings IndexNow for changed pages. Log the URLs as live in `publish-queue.md` and set the backlog item to `live`.

Do not publish when: a check fails, a number has no source, the page names a client or a person in a new way, or the change touches prices, legal text or the email setup. Those go to "Asks for Tao".

## measure: Monday numbers

1. AI traffic: `SPARK_INFISICAL_PROJECT_ID=62010fdb-0173-4156-b434-6f5dd884f359 spark run -- python3 tools/ai-visibility/traffic.py --days 7`. Record referral sessions by source and bot fetches by path.
2. AI visibility: the scheduled "citata.ai weekly GEO re-verify" runs `tools/ai-visibility/run.py --runs 2` at Mon 09:00. Read today's `business/marketing/ai-visibility/<date>/report.md`. If it is missing, run it yourself (same prompts; new prompts go at the end, never edit old ones).
3. Search: GSC clicks and impressions, Bing Webmaster indexed count and Copilot citations, if the agent can read them. If not, say so in the report.
4. For each hypothesis: compare the metric to `target` and `kill_if`. Set `status` (`running`, `validated`, `invalidated`, `parked`) and fill `result` and `learned` in the experiments. Do not claim a result that the data does not show.
5. Re-score ICE from the data. Propose at most 2 new hypotheses (next free `H<nn>`) when a bet dies.
6. Write `business/marketing/reports/<YYYY-Www>.md`: CTT-O6 progress (sessions so far vs pace needed), table per hypothesis, changes shipped and published, asks for Tao.
7. Commit and merge to `stage` as in `tick`.

## scout: Thursday ideas

1. Competitors are only the `role = "direct"` rows in `business/competitors.toml`. Apply its `[rule]` to any new name; agents, brokers, developers, lease-up and multifamily renter marketers are `non-competitor`. For each direct competitor: fetch the sitemap, list URLs new since the last scout, and note their topics.
2. Read the last visibility report: prompts where AI cites others and not us, and the domains it cites.
3. Search for new landlord and property manager questions (Reddit r/landlord, r/PropertyManagement, r/Section8; BiggerPockets forums; Google "People also ask"; AnswerThePublic free view).
4. Add at most 10 ideas to `backlog.toml`, each tied to a hypothesis, with `demand` evidence and a score. Drop ideas that copy a competitor page without new data.
5. First Thursday of a month: re-check the client lists in `business/marketing/competitors/clients/` (new clients, new page types). Update `playbook.md` when a move shows up at 2 or more competitors.
6. Add up to 10 outreach targets for H03 and H10 to `business/marketing/outreach/`. Do not send pitches: Tao sends them or approves a template once.
7. Commit to a branch and merge to `stage` (data only, no deploy risk).

## Rules for every run

- One fact lives in one file. Absolute dates.
- No fake reviews, clients, numbers or addresses. Never pay. Never spam forums.
- Google "scaled content abuse": no thin pages. Each page answers a real question with data, a tool or a clear comparison.
- Fair Housing: no text that steers renters by a protected class.
- Needs a person (login, CAPTCHA, phone, payment, a post as Tao)? Do not stop the run. Add it to "Asks for Tao" in the next report and go to the next item.
- Do not touch Worker `tao-email`, `mail.citata.ai`, or the email DNS records.
- End each run with a 5-line summary: what shipped, URL, hypothesis, number moved, asks.
