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
- Prefer primary sources: statutes, government sites (HUD, IRS, state legislatures, census.gov), vendor pricing pages, original studies.
- If you cannot verify a fact, leave it out. Never invent a number, a client, a quote, a review or a statute section.
- Law and tax: say what the rule is and cite it. Add one line: "This is general information, not legal advice. Check the current law or ask a local attorney." (tax: "...ask a tax professional.").
- Fair Housing: no text that steers renters by a protected class.
- Competitors: you may read a competitor page for the topic idea. Do not copy its text or its structure line by line. Add something it lacks: a table, a calculation, a checklist, newer data.

## Links

1–3 internal links per article, only to pages that are live now:
`/guides`, `/property-management`, `/tools/property-management-fee-calculator`, `/tools/section-8-rent-calculator`, `/guides/section-8-rent-limits`, `/research/ai-property-manager-index-2026`, and the guides in `landing/src/pages/guides/*.md` (`/guides/<file name>`). Do not link to other library drafts: they are not live yet.

## Check before hand-off

- Run `bunx vitest run landing/library.test.ts` from the repo root. It parses your YAML and checks keys, word count, FAQ and sources. Fix every failure in your files.
- Do not run the site build. Do not commit. Do not edit any file that is not one of your articles.
- End with a short report: slugs written, slugs skipped and why (for example: no source found).
