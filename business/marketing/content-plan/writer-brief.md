# Writer brief: content library

Status: v1, 2026-10-19. For writer agents that fill `landing/src/content/library/`. Read this whole file first.

## Read first

1. `brand/VOICE.md` (voice, banned words, sentence length).
2. `business/marketing/content-batch-1.md`, section "Rules for every page" (structure, facts, Fair Housing). The library uses the same rules.
3. One live guide as a model: `landing/src/pages/guides/appfolio-vs-buildium.md`.

## Your job

You get a list of topic slugs from `business/marketing/content-plan/<cluster>.toml`. For each topic, write one file: `landing/src/content/library/<slug>.md`. Use the topic's `question` and `subquestions` as the spine: the `answer` answers the `question`, the H2s cover the sub-questions.

## File format

```markdown
---
title: "<SEO title, 50–65 chars> — Citata.ai"
description: "<150–160 chars, answers the question>"
headline: "<H1, Title Case, 4–10 words>"
dek: "<one sentence, 8–18 words>"
published: "2026-10-19"
updated: "2026-10-19"
answer: "<2–4 sentences, the direct answer>"
visible: false
cluster: "<cluster id>"
kind: "<kind from the topic>"
priority: <priority from the topic>
inspired_by: "<topic inspired_by, or omit the key when empty>"
faq:
  - q: "..."
    a: "..."
sources:
  - label: "<Publisher: title>"
    url: "https://..."
---

## First sub-question?

Answer sentence first. ...
```

- `visible: false` always. The owner publishes later (`docs/content-library.md`).
- Body: 900–1,600 words. 4–6 FAQ items. No H1 in the body. No raw HTML. Use a table, a checklist, a worked calculation or a step list in every article.
- YAML: wrap every string in double quotes. Escape inner double quotes as `\"`. A bad YAML file breaks the whole site build.

## Facts

- Every number and every legal rule has a source you fetched and read in this session (WebFetch). Name the source in the sentence and list the URL in `sources`.
- If WebFetch gives 403 or 503 (hud.gov does), use Bash: `curl -sL -A "Mozilla/5.0 (Macintosh)" <url> | python3 -c "import sys,re,html;t=re.sub(r'<script.*?</script>|<style.*?</style>','',sys.stdin.read(),flags=re.S);print(html.unescape(re.sub(r'<[^>]+>',' ',t))[:20000])"`. If curl also gets 403, read the page through `https://r.jina.ai/<url>` (a reader proxy; cite the original URL). A fact you saw only in a search result snippet is not verified. hud.gov blocks even curl: for HUD voucher rules cite the regulation on ecfr.gov (24 CFR part 982, 982.305 etc.) or law.cornell.edu, and HUD notices on federalregister.gov or a housing authority site.
- Prefer primary sources: statutes, government sites (HUD, IRS, state legislatures, census.gov), vendor pricing pages, original studies.
- If you cannot verify a fact, leave it out. Never invent a number, a client, a quote, a review or a statute section.
- Law and tax: say what the rule is and cite it. Add one line: "This is general information, not legal advice. Check the current law or ask a local attorney." (tax: "...ask a tax professional.").
- Fair Housing: no text that steers renters by a protected class.
- Competitors: you may read a competitor page for the topic idea. Do not copy its text or its structure line by line. Add something it lacks: a table, a calculation, a checklist, newer data.

## Links

1–3 internal links per article, only to pages that are live now:
`/guides`, `/property-management`, `/tools/property-management-fee-calculator`, `/tools/section-8-rent-calculator`, `/guides/section-8-rent-limits`, `/research/ai-property-manager-index-2026`, `/case-studies/fridman-properties` (say it is a related party), `/about`, and the guides in `landing/src/pages/guides/*.md` (`/guides/<file name>`). Do not link to other library drafts: they are not live yet.

## Check before hand-off

- Run `bunx vitest run landing/library.test.ts` from the repo root. It parses your YAML and checks keys, word count, FAQ and sources. Fix every failure in your files.
- Do not run the site build. Do not commit. Do not edit any file that is not one of your articles.
- End with a short report: slugs written, slugs skipped and why (for example: no source found).

## Cluster notes

- **state-law:** the statute citations in `demand` came partly from memory. Open the official statute text (legislature or official code site; law.cornell.edu or justia.com only as a fallback that quotes the text) and verify every limit, deadline and section number. No statute text, no rule. Start with a summary table (rule | limit or deadline | statute). Name 2024–2026 changes only when you confirmed them.
- **local-market:** the local facts in `demand` came from memory: verify each at the city, county or state site. Fee pages: a table of 10+ local managers' published fees with URLs; never use the iPropertyManagement 2022 numbers as current. Rents: `landing/src/data/fmr-fy2027.json`; link to the metro page `/guides/section-8-rent-limits/<slug>-fair-market-rent-2027` (slugs in `landing/src/data/section8.ts`).
- **section-8:** link to `/guides/section-8-rent-limits` and `/tools/section-8-rent-calculator` where it helps.
- **software:** prices conflict between sources. Take every price from the vendor's own pricing page, with the date you read it. If the vendor shows no price, say "quote only". Comparisons: a feature and price table first.
- **ai-search:** our own data is in `business/marketing/competitors/clients/playbook.md` (H03: Expertise.com was a source in 93 of 150 answers) and `business/marketing/ai-visibility/`. Do not repeat the topics of the 6 live guides; link to them instead.
- **glossary-templates:** templates are generic, hold the full template text in a code block or list, and tell the reader to check local law.
- **landlord-ops:** general (all-state) topics. Where rules differ by state, say so and give 2–4 cited state examples; never present one state's rule as national. Federal rules (Fair Housing Act, FCRA, lead paint) cite the federal source (ecfr.gov, ftc.gov, consumerfinance.gov, epa.gov, hud.gov via a mirror).
- **pm-business:** the reader runs a PM company. Planner warning: license-by-state lists, franchise fees and the NARPM churn number conflict between sources; use primary sources (state license boards, franchise FDD pages, NARPM) or leave them out.
- **pm-marketing:** our competitor research is in `business/marketing/competitors/` (teardown, client playbook). The Goodjuju 2026 lead source report (35 companies, 2,525 leads) is a good primary source; cite it by URL.
- **owner-education:** the reader is a rental owner, not a PM. Tax: cite IRS publications (Pub 527, 946, 523, 925, Schedule E); no tax advice, add the tax disclaimer. Link to `/tools/property-management-fee-calculator` where costs come up.
