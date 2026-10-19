---
title: "Why ChatGPT Names Different Property Managers Each Time — Citata.ai"
description: "AI answers are drawn by chance from a pool of names, so one test means little. Run each prompt many times and track how often you appear, not your rank."
headline: "Why ChatGPT Gives a Different Answer Each Time"
dek: "One study ran the same prompts 2,961 times. Two lists matched less than 1 time in 100."
published: "2026-10-19"
updated: "2026-10-19"
answer: "ChatGPT, Gemini and Google AI build each answer fresh, so the list of names changes from run to run. A SparkToro study found a less than 1 in 100 chance of the same brand list twice. Do not judge your AI visibility from one test. Run a fixed set of prompts many times and track the share of answers that name you."
visible: false
cluster: "ai-search"
kind: "guide"
priority: 5
faq:
  - q: "Why does ChatGPT give a different list of property managers each time?"
    a: "ChatGPT generates each answer anew and may search the web in one run and skip it in the next. SparkToro and Gumshoe found less than a 1 in 100 chance that ChatGPT or Google AI gives the same brand list twice."
  - q: "How many times should I run a prompt to measure AI visibility?"
    a: "SparkToro suggests 60 to 100 runs per prompt for a true picture. A small firm can start with 10 to 20 landlord prompts, 3 engines and 2 runs each, then grow the sample over months."
  - q: "Does my rank in a ChatGPT answer matter?"
    a: "Rank in an AI answer is close to random. SparkToro found the same order less than 1 time in 1,000. Track how often you appear instead."
  - q: "Does location change AI answers about property managers?"
    a: "Yes, it can. The OpenAI web search tool accepts an approximate user location to refine results. Set the city in the prompt so each test run asks the same question."
  - q: "What is a fair AI visibility score?"
    a: "A fair score is the share of non-brand answers that name you, over a fixed prompt set, with the run count shown. For example: named in 8 of 132 answers, or 6%."
sources:
  - label: "SparkToro: AIs are highly inconsistent when recommending brands or products (2026-01-27)"
    url: "https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/"
  - label: "OpenAI: Web search tool guide (user location, sources)"
    url: "https://developers.openai.com/api/docs/guides/tools-web-search"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Help: AI Overviews"
    url: "https://support.google.com/websearch/answer/14901683"
---

You ask ChatGPT for the best property manager in your city. It names 5 firms, and you are not one of them. You ask again. Now you are second. Both answers are real. Neither one is your score.

## Why do AI answers vary from run to run?

AI answers vary because the engine writes each answer fresh. It does not look up a stored list. It picks names from a pool of likely candidates, and the pick changes with each run.

SparkToro and Gumshoe tested this in late 2025 and published the results on 2026-01-27. About 600 volunteers ran 12 prompts through ChatGPT, Claude and Google AI, 2,961 times in total. Each prompt ran 60 to 100 times per tool.

What they found:

- **The list changes.** There is less than a 1 in 100 chance that ChatGPT or Google AI gives the same brand list twice.
- **The order changes more.** The same list in the same order came up less than 1 time in 1,000.
- **The length changes.** Some answers had 2 or 3 names. Others had 10 or more.

Other parts of the process also move. The OpenAI web search guide says the model can choose to skip the search when the tool is on "auto". The same guide says the number of sources is often larger than the number of citations shown. Google says AI Overviews appear only when its systems decide that AI helps. Google AI Overviews and AI Mode may also use "query fan-out": they run many related searches and join the results.

So two runs can read different pages, then pick different names from them.

## Does the variation mean AI visibility is random?

AI visibility is not random, but rank is. The SparkToro data shows that some names come back again and again, even when the order jumps.

One example from the study: ChatGPT named City of Hope in 69 of 71 answers about West Coast cancer hospitals. That is 97%. Yet it was the first name in only 25 of those answers. The pool was stable. The order was not.

The study also tested prompt wording. Volunteers wrote 142 different prompts about headphones for a family member. The prompts had a mean semantic similarity (how close two texts are in meaning) of 0.081, which is low. Still, Bose, Sony, Sennheiser and Apple showed up in 55% to 77% of the 994 answers.

The lesson for a property manager: the engine has a short list of firms it links to your city and service. Your job is to get onto that short list. Your rank inside one answer tells you almost nothing.

## How many runs give a fair number?

More runs give a fairer number. SparkToro suggests 60 to 100 runs of a prompt to see the full set of names. That is a lot of work by hand, so most firms use a script or a tool.

Here is the math on why small samples mislead. Say the true rate is 10%: the engine names you in 1 of 10 answers. This table shows how far a measured rate can drift by chance. We used the normal approximation for a 95% range (our math).

| Answers you check | Expected times named | Likely range of your measured rate |
|---|---|---|
| 1 | 0.1 | 0% or 100% |
| 10 | 1 | 0% to 29% |
| 30 | 3 | 0% to 21% |
| 120 | 12 | 5% to 15% |
| 300 | 30 | 7% to 13% |

With 10 answers, a score of 0% and a score of 20% can come from the same true rate. With 120 answers or more, a real change starts to show.

Our own test design follows this logic. For a Chicago property manager on 2026-10-16, we ran 24 prompts on ChatGPT, Claude and Gemini, 2 runs each: 144 answers. The non-brand answers named the firm in 8 of 132 (our data). One run alone would have shown a much noisier number.

## Do location and login change answers?

Location can change AI answers. The OpenAI web search guide says you can pass an approximate user location (country, city, region or time zone) to refine results. A landlord in Evanston and a landlord in Dallas can get different lists for "best property manager near me".

What to do:

1. **Put the city in the prompt.** "Best property manager in Naperville, IL for a single-family home" gives the same intent from any desk.
2. **Use the same account state each time.** We run tests through the API or in a logged-out browser. A logged-in account can carry chat history into the answer.
3. **Note the engine and model.** Our 2026-10-19 run used gpt-6-luna, claude-sonnet-5-5 and gemini-3-flash. A model change can move results, so log it.
4. **Do not count your own brand prompts.** "Is Acme Property Management good?" will name you. It tells you what AI knows, not if AI picks you.

## What is a fair AI visibility score?

A fair AI visibility score is the share of non-brand answers that name you. It needs a fixed prompt set, a fixed list of engines and a stated run count. Write it as a fraction and a percent: "named in 8 of 132 answers (6%)".

Track these 4 numbers each month:

| Metric | How to count it | Why it matters |
|---|---|---|
| Mention rate | Answers that name you ÷ non-brand answers | Your share of the short list |
| Citation rate | Answers that link your site ÷ non-brand answers | Shows that your own pages feed the answer |
| Rate per engine | Same counts, split by ChatGPT, Gemini, Claude | Engines differ a lot |
| Top sources | Domains cited most often | Shows where to fix listings and reviews |

Our own data shows how much engines differ. In the Chicago baseline, the median non-brand answer named 5 companies. ChatGPT named 4, Claude 10 and Gemini 5 (our data, 2026-10-16). A firm can look strong on Claude and absent on ChatGPT in the same week.

Watch for: any report that gives you an "AI rank" of #1 or #3. SparkToro calls rank tracking in AI "full of baloney". Ask the vendor for the mention rate, the prompt list and the run count.

## How should a property manager test AI answers by hand?

A manual test is fine if you treat it as a sample, not a verdict. Follow these steps:

1. **Write 10 landlord prompts.** Use your cities and your services, such as Section 8 or single-family homes.
2. **Run each prompt 3 times** in ChatGPT, Gemini and Claude. That gives 90 answers.
3. **Log each answer** in a sheet: engine, prompt, run, names, links.
4. **Count the mention rate** for you and for the top 5 competitors.
5. **Repeat the same set each month.** Change one thing at a time on your site and listings.

For a full monthly scorecard, read [how to track AI traffic and AI mentions](/guides/track-ai-traffic-property-management). To see what landlords ask, read [how landlords use AI to choose a property manager](/guides/how-owners-choose-a-property-manager-with-ai).
