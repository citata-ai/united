# Case study source: Fridman Properties

Status: v1, 2026-10-18. Page: `landing/src/pages/case-studies/fridman-properties.astro` (https://citata.ai/case-studies/fridman-properties).

This file is the source of truth for the page. Each claim on the page must be in this table with a source. Do not add a number to the page without a row here.

Short paths:
- `FL` = `/Users/tao/Projects/MyRemotely/fp-landing` (branch `main`)
- `W` = `/Users/admin/.t3/worktrees/fp-landing/t3-eca8cc38` (fp-landing branch `t3/landlord-marketing-strategy`)
- `AS` = `/Users/tao/Allspark`

## Related party

Ran Fridman owns Fridman Properties and is CEO of MyRemotely, a TAO partner. Fridman Properties is MyRemotely's first client. Sources: `AS/80-entities/ran-fridman.md:12`, `AS/80-entities/fridman-properties.md:11`. The page discloses this at the top.

## Claims and sources

| Claim on the page | Value | Source |
|---|---|---|
| Office | Arlington Heights, IL | `W/docs/marketing/strategy.md:10` (site footer) |
| Size | 144 active units on 2026-10-16 | `W/docs/marketing/research/summary.toml:6-11` (Rentvine, read only) |
| Most units on Chicago's South Side | 113 of 144 in Chicago, South Side ZIPs | `W/docs/marketing/strategy.md:32` |
| Site city pages | 29 `*-property-management` city pages, most in NW suburbs | `ls FL/src/pages-data` |
| City pages nearly identical | "96% identical" (Palatine vs Skokie) | `W/docs/marketing/strategy.md:21` |
| Structured data | JSON-LD on 17 of 89 pages (blog posts), no LocalBusiness | `W/docs/marketing/strategy.md:22`; research agent count of `FL/dist` |
| Section 8 on the old site | 1 FAQ answer | `FL/mirror-raw/owner-faq.html:308-311` |
| Search demand | "property management chicago" 1,900 / month, Chicago DMA, Oct 2025 – Sep 2026 | `W/docs/marketing/research/summary.toml` `[search_demand_chicago_dma]` (Keyword Planner) |
| Demand trend | 7 generic terms, yearly avg −46% Chicago DMA, −43% US (2025/26 vs 2024/25) | `summary.toml` `[search_trend_2022_2026]`. The file calls the AI-search cause a hypothesis. |
| Old site | hosted template ("powered by PMW"); jQuery, Bootstrap JS, Font Awesome kit, lazysizes, reCAPTCHA | `FL/mirror-raw/index.html`; `FL/README.md:7-11`; commit 8766eb2 |
| Mirror | 93 raw HTML files | research agent count of `FL/mirror-raw` |
| Rebuild | Astro 7 static, 90 HTML pages (89 + 404), 87 sitemap URLs | `find FL/dist -name '*.html' \| wc -l` = 90; `grep -c '<loc>' FL/public/sitemap.xml` = 87 |
| Canonical kept | 89 pages | `grep -rl 'rel="canonical"' FL/dist` = 89 |
| Redirects kept | 4 old 301s | `FL/public/_redirects` |
| Build dates | 2026-10-15 to 2026-10-16 | `git -C FL log` (first 1931d91, last 707d95e) |
| Parity check | title, description, canonical, robots, OG, JSON-LD, visible text, internal links; 0 differences | `FL/scripts/parity.mjs:1-16`; commit 707d95e message |
| Lighthouse bar | mobile, all 4 categories, fail below 100 | `FL/scripts/lighthouse.mjs:25` |
| Lighthouse run | see table below | run by us 2026-10-18 on the live site |
| llm-summary | on 51 pages; the old site already had all 51; we kept them | `grep -rl 'name="llm-summary"'` in `FL/dist` = 51 and `FL/mirror-raw` = 51 |
| Live | www.fridmanproperties.com 200, apex 301 to www; prod created 2026-10-16 | curl 2026-10-18; `FL/.alchemy/log/out` |
| Hosting | Cloudflare Workers static assets, Worker `fridmanproperties` | `FL/alchemy.run.ts:38-52` |
| AI baseline | 2026-10-16, 24 prompts × 3 engines × 2 runs = 144 answers | `W/docs/marketing/research/ai-visibility/2026-10-16/report.md`, `answers.jsonl` |
| Engines and models | ChatGPT gpt-6-luna, Claude claude-sonnet-5-5, Gemini gemini-3-flash | `answers.jsonl` field `model` |
| Named / linked | ChatGPT 4/48, 3 linked; Claude 11/48, 6; Gemini 5/48, 5 | `report.md:7-11` |
| Without brand prompts | named in 8 of 132 answers, linked in 3 | computed from `answers.jsonl` (group != brand) |
| Section 8 prompt | named in 0 of 6 | computed from `answers.jsonl` (prompt_id = section8) |
| Area groups | South Side 0/42, Chicago 0/18, NW Indiana 0/18, NW suburbs 6/18 | `report.md:15-22` |
| ChatGPT app, logged out | #1 only for the no-leasing-fee prompt; not named for South Side, Section 8, out-of-state, Arlington Heights | `.../2026-10-16/chatgpt-app-logged-out.md` |
| Plan | 8 city-page rewrites first, LocalBusiness + FAQPage schema, llms.txt, answer blocks, same NAP, listicles, Bing + IndexNow, 30–50 tracked prompts | `W/docs/marketing/strategy.md:149-168` |
| 90-day goal | 5 of 30 tracked prompts name Fridman (hypothesis H6) | `W/docs/marketing/strategy.md:312` |
| Results date | 2027-01-14 (90 days after 2026-10-16) | computed |
| No traffic data yet | no GSC or GA4 numbers stored | `W/docs/marketing/strategy.md:331, 368` |

### Lighthouse, live site, 2026-10-18

Command: `node scripts/lighthouse.mjs --base https://www.fridmanproperties.com <paths>` in `FL`. Mobile preset. Order: performance / accessibility / best practices / SEO.

| Path | Scores | LCP |
|---|---|---|
| `/` | 100/100/100/100 | 1.6 s |
| `/owner-faq` | 99/100/100/100 | 1.9 s |
| `/chicago-property-management` | 98/100/100/100 | 2.0 s |
| `/schaumburg-property-management` | 98/100/100/100 | 2.0 s |
| `/roi-calculator` | 99/100/100/100 | 1.8 s |

## Do not claim

- That we added `llm-summary`. The old site had it.
- That the site is "optimized for AI". The rebuild was a 1:1 port. The GEO work is a plan.
- Lighthouse 100 on all pages. Our run shows 98–100.
- Any traffic, lead or ranking result. None is measured yet.
- That Fridman is a Section 8 specialist. The site has one FAQ answer about it.

## Keep private

Rentvine finance, vacancy, churn, owner and client names, Google Ads spend. They are client data (`summary.toml:16-52`).

## Open items

- Client consent for the page: confirm with Ran Fridman before wide sharing.
- The Section 8 FAQ answer may not match Illinois law since 2023. Flagged for the client's legal review. Not legal advice.
