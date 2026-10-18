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

## Change log

| Date       | Change                                                                 | Live? |
|------------|------------------------------------------------------------------------|-------|
| 2026-10-18 | Baseline run (point A), 20 prompts × 3 engines × 2 runs                 | —     |
| 2026-10-18 | Organization JSON-LD with `sameAs` and Citate.ai disambiguation         | no    |
| 2026-10-18 | Canonical and og:url without `.html` (was a 307 target)                  | no    |
| 2026-10-18 | robots.txt names AI crawlers with `Allow: /`                            | no    |
| 2026-10-18 | AI traffic tracking in the Worker; Ahrefs Web Analytics; audit email asks "how did you hear" | no |
