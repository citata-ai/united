# Content batch 1: guides for property management companies

Status: brief, 2026-10-18. Owner: Tao (checks each page before publish). Loop: `docs/geo-loop.md`.

## Goal

AI assistants name and link citata.ai when a property manager asks about falling owner leads, AI search, GEO or AEO. Point A (2026-10-18): 0 of 108 non-brand answers name us. See `business/marketing/ai-visibility/2026-10-18/report.md`.

Each page answers the prompts in `tools/ai-visibility/prompts.toml` listed for it below. AI breaks one prompt into many small searches (query fan-out). So each page covers the main question and the 5–8 sub-questions an AI would search for.

## Pages

| # | File (`landing/src/pages/guides/`) | Main question | Target prompt ids |
|---|---|---|---|
| 1 | `why-owner-leads-are-dropping.md` | Why do property management companies get fewer owner leads from Google, and what to do? | pm-leads-decline, pm-seo-worth, pm-owner-leads |
| 2 | `how-owners-choose-a-property-manager-with-ai.md` | How do rental owners use ChatGPT, Gemini and Google AI to choose a property manager? | pm-owner-search, pm-chatgpt-recommend, pm-ai-overviews |
| 3 | `geo-agencies-for-property-management.md` | Which agencies do GEO / AEO for property management companies, and what do they cost? (honest list) | pm-geo-agency, pm-aeo-agency, pm-marketing-agency, pm-geo-cost, pm-geo-small, geo-firstindex-alt |
| 4 | `track-ai-traffic-property-management.md` | How can a property management company track visits and leads from ChatGPT and other AI assistants, and check if AI mentions it? | pm-track-ai, pm-ai-visibility-check |
| 5 | `ai-search-checklist-property-management-website.md` | What must a property management website have for AI search: robots.txt, llms.txt, schema, pages? | pm-llms-txt, pm-ai-overviews |

## Rules for every page

Voice and language:
- Read `brand/VOICE.md` first. ASD-STE100: short sentences (mean 11–14 words, max 25), active voice, one idea per sentence, simple words. No banned words. No hype, no fear.
- "You" is the reader, a property management company owner or marketing lead with 50 to 500 doors. "We" is Citata.ai. No "I" and no personal name: bylines and "checked by" lines say Citata.ai.

Structure (GEO, from the Ahrefs AEO guide and the claude-seo / marketingskills skills):
- Answer first. The `answer` field in the frontmatter answers the main question in 2–4 sentences. The first sentence of each H2 section answers that section's question.
- Each H2 section stands alone (AI cuts pages into chunks). Repeat the noun, not "it" or "this", at the start of a section.
- H2s are the sub-questions an AI would search for, written as questions or clear labels.
- Use lists and tables where they help. A comparison table is good.
- Entity-rich: name tools, engines, sources and companies. Not "a tool helps", but "Bing Webmaster Tools shows Copilot citations".
- 900–1,600 words of body. Length does not get citations; clear answers do.
- 4–6 FAQ items in the frontmatter. Each answer is 1–3 sentences and stands alone.
- 1–3 internal links: `/`, `/property-management`, `/case-studies/fridman-properties`, `/about`, other guides in this batch (use the file name without `.md`, under `/guides/`).

Facts:
- Every number has a source. Put the source URL in `sources` and name the source in the sentence ("(Ahrefs, 2025)").
- Allowed sources: our own data (below), and pages you fetch and read now. Do not use a number you did not see on the source page. If you cannot verify a number, do not use it.
- Our own data you may use:
  - `business/marketing/ai-visibility/2026-10-18/report.md`: 20 prompts × ChatGPT, Gemini, Claude × 2 runs. citata.ai named in 0 of 108 non-brand answers. AI confused citata.ai with Citate.ai and others. Most cited sources for our niche: clearleaddigital.com (22 answers), firstpagesage.com (15), gogoodjuju.com (13), propertymanagerwebsites.com (11), reddit.com (8), youtube.com (7).
  - `business/case-studies/fridman-properties.md`: Chicago manager baseline 2026-10-16, 144 answers. Named in 8 of 132 non-brand owner answers, 0 of 6 for Section 8. Search demand for 7 generic property management terms fell 46% (Chicago area) and 43% (US) year over year (Keyword Planner); the cause is a hypothesis. Most cited sources there: manager sites, Yelp (35 answers), Expertise.com (22), Thumbtack (17). Read the "Do not claim" list in that file and obey it.
  - `business/strategy.md` §5: market facts with sources.
  - `docs/ai-traffic.md`: how we track AI traffic on citata.ai (real setup, you may describe it).
- Related party: Fridman Properties' owner is CEO of MyRemotely, our partner. Say so when you mention the case study.
- Do not promise results. Do not say we are the best. Do not invent clients, reviews or numbers.
- Fair Housing: do not write anything that steers renters by protected class.

Format of the file (Markdown page, Astro):

```markdown
---
layout: ../../layouts/Guide.astro
title: "<SEO title, 50–65 chars> — citata.ai"
description: "<150–160 chars, answers the question>"
headline: "<H1, Title Case, 4–10 words>"
dek: "<one sentence, 8–18 words>"
published: "2026-10-18"
updated: "2026-10-18"
answer: "<2–4 sentences, the direct answer>"
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

Do not put an H1 in the body (the layout prints `headline`). Do not use raw HTML. Use `**bold**` only for the lead phrase of a list item.

## Check before hand-off

- Do not run the build (other writers share the folder). The editor builds and checks all pages.
- Every number in the page is in `sources` or in our own data above.
- Read the page out loud in your head: any sentence over 25 words gets split.
