# GEO loop for citata.ai (dog food)

Status: v1, 2026-10-18. Owner: Tao. Account 2 in `business/strategy.md` §4.

Goal: AI assistants name and link citata.ai when a property management company asks about GEO, AEO, AI search or fewer owner leads. Key result: `CTT-O3` in `business/goals.toml`.

## The loop

```
verify ──▶ find gaps ──▶ improve ──▶ wait 7 days ──▶ verify again
   ▲                                                      │
   └──────────────────────────────────────────────────────┘
```

1. **Verify.** `python3 tools/ai-visibility/run.py --runs 2`. It asks ChatGPT, Gemini and Claude (with web search) each prompt in `tools/ai-visibility/prompts.toml`. Output: `business/marketing/ai-visibility/<date>/report.md`. From the second run on, the report shows the change since the last run.
2. **Find gaps.** Read the report:
   - Prompts where we are not named, but other agencies are: we need a mention on the pages AI cites (list in "Sources AI cites").
   - Prompts where AI gives a how-to answer: we need an exact answer page for that question.
   - Wrong facts about us (for example Citate.ai): fix the entity data (schema, `llms.txt`, profiles).
3. **Improve.** One change a day, human check. Log it in the table below.
4. **Track traffic.** `docs/ai-traffic.md`.
5. **Wait 7 days, then verify again.** Same prompts. Add new prompts at the end; never edit old ones, so the runs stay comparable.

Rules:
- Take the baseline before a change goes live. The 2026-10-18 run is point A.
- Do not claim a result that the reports do not show.
- Answers change between runs. Use `--runs 2` or more and compare counts, not one answer.

## Point A (2026-10-18)

- Non-brand prompts: named in 0 of 108 answers. Our site cited in 0 of 120.
- Brand prompts: AI does not know us. It says "could not find citata.ai" and offers Citate.ai, Citant.ai, Citala or Citeca. Name clash is gap 1.
- Technical score (`uvx --from geo-optimizer-skill geo audit --url https://citata.ai`): 58/100. Canonical on every page pointed to a `.html` URL that answers 307.
- Most cited for our niche: clearleaddigital.com (22 answers), firstpagesage.com (15), gogoodjuju.com (13), propertymanagerwebsites.com (11), reddit.com (8), youtube.com (7).

## Weekly report format

`tools/ai-visibility/run.py` writes `report.md` with TOML front matter between `+++` lines: the standard metrics (non-brand and brand mentions and cites, per engine, top companies and sources, token usage per model). A script can compare weeks from the front matter alone. Below it come the tables and two sections the analyst fills: **Gaps** and **Actions**. Re-render an old run without API calls: `python3 tools/ai-visibility/run.py --report-only <dir>`.

Each weekly run also appends one `measure` entry to `business/journal/citata.toml`.

## Change log

| Date       | Change                                                                 | Live since |
|------------|------------------------------------------------------------------------|-------|
| 2026-10-18 | Baseline run (point A), 20 prompts × 3 engines × 2 runs                 | —     |
| 2026-10-18 | Organization JSON-LD with `sameAs` and Citate.ai disambiguation         | 2026-10-18 |
| 2026-10-18 | Canonical and og:url without `.html` (was a 307 target)                  | 2026-10-18 |
| 2026-10-18 | robots.txt names AI crawlers with `Allow: /`                            | 2026-10-18 |
| 2026-10-18 | AI traffic tracking in the Worker; Ahrefs Web Analytics; audit email asks "how did you hear" | 2026-10-18 |
| 2026-10-18 | Home page for property management companies only: FAQ (FAQPage), Service schema, fit / not fit, llms.txt | 2026-10-18 |
| 2026-10-18 | Ahrefs project "Citata" verified; Site Audit weekly, Sundays 15:00 Kyiv | — |
| 2026-10-19 | Guide /guides/appfolio-vs-buildium (H06-E1, B001): plan prices, minimums, Buildium fees, fit by door count | 2026-10-19 |
| 2026-10-20 | Guide /guides/best-property-management-software-50-200-doors (H06-E1, B002): monthly cost at 50/100/200 doors, 5 vendors, fees, trust accounting test | 2026-10-20 |
| 2026-10-21 | Tool /tools/rent-vs-sell-calculator (H02-E1, B015): sell now vs rent then sell, pre-tax, break-even growth, IRS Pub 523 / Topic 409 rules | 2026-10-21 |
| 2026-10-22 | Data page /guides/section-8-rent-limits/payment-standard-cuts-2026 (H01-E1, B019): 22 housing authorities that cut payment standards or paused vouchers in 2025-2026, start date, who it hits, source per row | 2026-10-22 |
| 2026-10-23 | Tool /tools/owner-lead-value-calculator (H02-E1, B023): owner lifetime value, max cost per lead and per new owner, leads to replace churn; NARPM/ProfitCoach churn, RentScale lead volume | 2026-10-23 |
| 2026-10-24 | Research /research/ai-readiness-property-managers-2026 (H03-E1, B024): robots.txt, llms.txt, schema and fee links on 144 manager sites AI cited; CSV without domains; script tools/ai-visibility/readiness_audit.py | 2026-10-24 |
| 2026-10-28 | Data page /guides/section-8-rent-limits/section-8-funding-2027 (H01-E1, B020): FY2027 stopgap law to 2026-12-11, voucher funding table (CRS), shortfall rules (PIH 2026-12), HAP termination rule, EHV to TPV by 2026-12-31 | 2026-10-28 |

Technical score after the deploy: 58 → 72/100. Open items from the audit: page dates and author in markup, About page, WebSite schema, Wikidata / LinkedIn / Crunchbase in `sameAs`.

Score after the second deploy (2026-10-18): 96/100. Added: About page, WebSite / Article / Person schema, dates and author, Markdown copy of each page (`Accept: text/markdown`), `llms-full.txt`, `/.well-known/ai.txt`, `/ai/*.json`, RSS. The last 4 points need 3 knowledge-graph profiles in `sameAs` (LinkedIn, Crunchbase, Wikidata). The LINK BUILD thread owns them.

## Search consoles (2026-10-18)

- Google Search Console: Domain property `sc-domain:citata.ai`, owner `dread9ko@gmail.com`, verified by DNS TXT `google-site-verification=…` on the apex. Do not delete that record. Sitemap submitted.
- Bing Webmaster Tools: `https://citata.ai/`, imported from GSC (same Google account). Sitemap submitted. Its AI Performance report shows Copilot citations: export the CSV weekly.
- Ahrefs Webmaster Tools: project "Citata", verified, weekly Site Audit.

## Publish step (automatic since 2026-10-19)

Merge `stage` into `main`. The deploy job (`.github/workflows/deploy.yml`) then:

1. Lists the sitemap pages whose new HTML differs from live citata.ai (`landing/scripts/changed-urls.mjs`).
2. Deploys prod with Alchemy and runs the smoke test.
3. Pings IndexNow (Bing, Yandex, Seznam, Naver, Yep) with only the changed pages. No change, no ping. Google does not use IndexNow: it reads the sitemap (`lastmod` comes from the build), and new pages can be sent through GSC "Request indexing" by hand.

Cloudflare **Crawler Hints** is on (2026-10-19, Caching → Configuration). It sends IndexNow signals when cached content changes. Our HTML is served by a Worker, so it may not fire for pages; the CI ping covers that. Check once: Bing Webmaster Tools → IndexNow shows which URLs arrived and from where.

First full ping: 2026-10-19, 10 URLs, HTTP 202 (`node landing/scripts/indexnow.mjs`).
