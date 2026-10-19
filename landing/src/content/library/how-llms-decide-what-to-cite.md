---
title: "How AI Assistants Decide Which Property Manager Sites to Cite — Citata.ai"
description: "AI assistants cite pages that their search step finds and that answer with clear facts. Brand mentions on other sites matter more than rank. Data inside."
headline: "How AI Assistants Decide Which Sites to Cite"
dek: "Only 38% of Google AI Overview citations rank in the top 10 for the same query."
published: "2026-10-19"
updated: "2026-10-19"
answer: "An AI assistant first runs one or more web searches, then reads the pages it finds and cites the ones that answer the question with clear, specific facts. Rank on the first query matters less than it did: Ahrefs found that only 38% of Google AI Overview citations rank in the top 10 for that query. Mentions of your brand on other sites correlate with AI visibility more than backlinks do. The answer changes from run to run, so measure your share over many runs."
visible: false
cluster: "ai-search"
kind: "guide"
priority: 3
inspired_by: "https://citant.ai/blog/how-llms-decide-what-to-cite/"
faq:
  - q: "Do I need to rank number 1 on Google to be cited by AI?"
    a: "No. Ahrefs found in March 2026 that 37.9% of pages cited in AI Overviews rank in the top 10 for the same query, and 31.0% rank beyond the top 100. A page must still be indexed and able to show in search."
  - q: "Why does ChatGPT give a different list each time?"
    a: "AI answers are generated fresh each time, and the search step can find different pages. SparkToro found under a 1 in 100 chance that ChatGPT or Google's AI gives the same brand list twice."
  - q: "Do statistics and quotes make a page more likely to be cited?"
    a: "A 2024 Princeton-led study (KDD 2024) found that content changes such as added statistics, quotes and citations can raise visibility in generative engine answers by up to 40% in its tests."
  - q: "Do backlinks help AI citations?"
    a: "Somewhat, but less than brand mentions. In Ahrefs' study of 75,000 brands, backlinks had a 0.218 correlation with AI Overview mentions, and branded web mentions had 0.664."
  - q: "Can I block AI crawlers and still be cited?"
    a: "Not in ChatGPT search. OpenAI says sites that block OAI-SearchBot will not be shown in ChatGPT search answers. You can block GPTBot, the training crawler, and still allow OAI-SearchBot."
sources:
  - label: "Ahrefs: Update: 38% of AI Overview citations pull from the top 10 (2026-03-02)"
    url: "https://ahrefs.com/blog/ai-overview-citations-top-10/"
  - label: "Ahrefs: An analysis of AI Overview brand visibility factors, 75K brands (2025-05-26)"
    url: "https://ahrefs.com/blog/ai-overview-brand-correlation/"
  - label: "Aggarwal et al.: GEO: Generative Engine Optimization (arXiv 2311.09735, KDD 2024)"
    url: "https://arxiv.org/abs/2311.09735"
  - label: "SparkToro: AIs are highly inconsistent when recommending brands or products (2026-01-28)"
    url: "https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "citata.ai: AI Property Manager Index 2026 (our data, 2026-10)"
    url: "https://citata.ai/research/ai-property-manager-index-2026"
---

## How does an AI assistant pick its sources?

An AI assistant with web search picks sources in 3 steps: it searches, it reads, and it cites. The details differ by engine, but the shape is the same.

1. **Search.** The assistant turns your question into one or more search queries. Google calls this "query fan-out": many related searches across subtopics and data sources.
2. **Read.** It fetches the top pages from those searches and pulls out the parts that answer the question.
3. **Cite.** It writes the answer and links the pages it used most.

Each step has a gate. A page that the crawler cannot reach fails step 1. OpenAI says sites that block OAI-SearchBot will not be shown in ChatGPT search answers. Google says a page must be indexed and eligible to show with a snippet to be a supporting link in AI Overviews or AI Mode.

A page that hides its facts fails step 2. If your fee is in a PDF or an image, the reader step may skip it. A page with a vague answer fails step 3, because a page with a direct answer wins the citation.

## Does ranking position matter?

Ranking position matters less than it used to. Ahrefs checked 4 million AI Overview citations across 863,000 searches. It published the result on March 2, 2026:

| Where the cited page ranks for the same query | Share of AI Overview citations |
|---|---|
| Top 10 | 37.9% |
| Positions 11–100 | 31.2% |
| Beyond 100 | 31.0% |

In Ahrefs' July 2025 study, the top 10 share was about 76%. Ahrefs links the drop to query fan-out. The AI cites pages that rank for the sub-queries, not only for the original question.

For a property manager, this is good news. You do not need to beat a national brand for "property management Denver". You need a clear page that ranks for a narrow sub-question, such as "what does a Denver property manager charge for a lease renewal".

## Do facts and numbers help?

Facts and numbers help, in the tests we know of. A Princeton-led team published "GEO: Generative Engine Optimization" (KDD 2024). They changed page text in set ways and measured how often generative engines used the page. Their abstract says these methods "can boost visibility by up to 40% in generative engine responses." The methods included adding statistics, quotes and source citations.

This fits what AI answers need. An owner asks "how much does a property manager cost in Phoenix?" The engine looks for a page that says "8% of monthly rent, $500 leasing fee, no setup fee". A page that says "competitive pricing, call us" gives the engine nothing to quote.

Use this test on your own pages:

| Vague (hard to cite) | Specific (easy to cite) |
|---|---|
| "Affordable management fees" | "8% of collected rent, no fee when the unit is empty" |
| "We serve the metro area" | "We manage in Mesa, Tempe, Chandler and Gilbert" |
| "Experienced team" | "Licensed since 2011, 340 doors, 4 staff" |
| "Fast tenant placement" | "Median 21 days to lease in 2025, from our records" |

The right column uses example numbers. Put your own, true numbers there.

## Do brand mentions on other sites matter?

Brand mentions on other sites matter a lot. Ahrefs studied 75,000 brands (published May 26, 2025). It compared each factor with how often AI Overviews mentioned the brand:

| Factor | Correlation with AI Overview mentions |
|---|---|
| Branded web mentions | 0.664 |
| Branded anchors | 0.527 |
| Branded search volume | 0.392 |
| Referring domains | 0.295 |
| Backlinks | 0.218 |

Ahrefs warns that correlation is not causation. Still, the order is clear. Being named on other sites tracks AI visibility much more closely than raw link count.

Our own data shows where those mentions sit for property managers. In our [AI Property Manager Index](/research/ai-property-manager-index-2026), we asked ChatGPT, Gemini and Claude for the best property manager in the 50 largest US cities. Of 150 answers, Expertise.com was a source in 93, Yelp in 50 and iPropertyManagement in 50 (our data, 2026-10). These lists are the "other sites" for your niche.

## Why does the answer change each time?

The answer changes because the model writes it fresh each time, and the search step can return different pages. SparkToro and Gumshoe ran 2,961 prompts through ChatGPT, Claude and Google's AI (published January 28, 2026). They found under a 1 in 100 chance that ChatGPT or Google's AI gives the same brand list twice. Getting the same list in the same order was about 1 in 1,000.

So never judge your AI visibility from one answer. SparkToro's advice is to measure your visibility share across many prompts and many runs. A share such as "named in 12 of 60 answers" is a fair metric. A "rank 3 in ChatGPT" is not.

## What can a property manager do with this?

A property manager can work on each of the 3 steps. Use this checklist:

- [ ] **Search step.** Allow OAI-SearchBot, Googlebot and Bingbot in robots.txt. Check that your city pages are indexed.
- [ ] **Read step.** Put fees, service areas and contract terms in plain HTML text. Answer one question per section.
- [ ] **Cite step.** Lead each section with a direct answer that has a number in it.
- [ ] **Mentions.** Correct your profiles on Expertise.com, Yelp and iPropertyManagement. Earn honest owner reviews.
- [ ] **Measure.** Run a fixed set of owner prompts every month and count the share of answers that name you.

For the full site audit, use our [AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website). To set up tracking, read [how to track AI traffic and AI mentions](/guides/track-ai-traffic-property-management). No one can promise a citation. You can make your page the easiest one to quote.
