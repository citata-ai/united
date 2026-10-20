---
title: "Why ChatGPT Recommends Your Competitor and Not You — Citata.ai"
description: "ChatGPT names the property managers it finds on the pages its search returns. Compare your sources, reviews and city pages with theirs, then fix the gaps."
headline: "Why ChatGPT Recommends Your Competitor Instead of You"
dek: "The answer is usually in the sources ChatGPT links, not in your website design."
published: "2026-10-19"
updated: "2026-10-19"
answer: "ChatGPT names a competitor because its web search found that competitor on the pages it trusts for your city, and did not find you there. In our 50-city test, ChatGPT used a directory or review site in 48 of 50 answers and a manager's own site in 15. Open the sources ChatGPT links, check which ones list your competitor and not you, and fix those gaps first. Then check that your own site names the city, the services and the fees in plain words."
visible: false
cluster: "ai-search"
kind: "guide"
priority: 2
inspired_by: "https://www.clearleaddigital.com/blog/ai-overviews-chatgpt-property-management"
faq:
  - q: "Why does ChatGPT keep naming the same property manager?"
    a: "That company is on the list pages and review sites that ChatGPT's search returns for your city. If a page like Expertise.com or a local best-of list names them, ChatGPT can repeat the name in many answers."
  - q: "Is it reviews, directories or content that makes the difference?"
    a: "All three play a part, but directories came first in our data. ChatGPT cited a directory or review site in 48 of 50 city answers (our data, 2026-10-19). Reviews often decide who gets on those directories."
  - q: "How do I compare my company with a competitor in AI answers?"
    a: "Run the same owner questions in ChatGPT, Gemini and Claude. For each answer, log who is named and which sources are linked. Then open each source and mark if it lists you, your competitor, or both."
  - q: "What is the fastest fix if ChatGPT names my competitor?"
    a: "Get listed and correct on the 3 to 5 sources ChatGPT links most for your city. A listing fix takes days. A new page or new reviews take longer to show up."
  - q: "Can my competitor pay ChatGPT to be recommended?"
    a: "No. OpenAI says ads do not influence ChatGPT answers. Ads show at the bottom of an answer and carry a label."
sources:
  - label: "Citata.ai: AI Property Manager Index 2026 (our data, 2026-10-19)"
    url: "https://citata.ai/research/ai-property-manager-index-2026"
  - label: "Citata.ai: Fridman Properties case study (our data, 2026-10-16)"
    url: "https://citata.ai/case-studies/fridman-properties"
  - label: "OpenAI Help Center: Searching the web with ChatGPT"
    url: "https://help.openai.com/en/articles/9237897-chatgpt-search"
  - label: "OpenAI: Our approach to advertising and expanding access to ChatGPT"
    url: "https://openai.com/index/our-approach-to-advertising-and-expanding-access/"
  - label: "Google Business Profile Help: Tips to improve your local ranking on Google"
    url: "https://support.google.com/business/answer/7091"
  - label: "ClearLead Digital: AI Overviews, ChatGPT and property management"
    url: "https://www.clearleaddigital.com/blog/ai-overviews-chatgpt-property-management"
---

## What sources does the competitor have that you lack?

The competitor is on the pages that ChatGPT's search returns, and you are not. ChatGPT does not keep a fixed list of property managers. The OpenAI Help Center says ChatGPT rewrites the question into search queries and sends them to search providers. It then writes the answer from the pages it gets back.

So the question is not "why does ChatGPT like them". The question is "which pages name them".

In our 50-city test on 2026-10-19, we asked "What is the best property management company in <City, ST>? Give names." We used the OpenAI API with web search. ChatGPT cited these sources most (our data):

| Source | ChatGPT answers (of 50) |
|---|---|
| Expertise.com | 30 |
| reviews.birdeye.com | 17 |
| bestinhood.com | 12 |
| bbb.org | 11 |
| propertymanagement.com | 8 |
| threebestrated.com | 7 |

ChatGPT linked a property manager's own site in only 15 of 50 answers. A directory or review site showed up in 48 of 50. If your competitor is on Expertise.com and BBB for your city and you are not, that gap alone can explain the answer.

## Is it reviews, directories or content?

Directories come first in ChatGPT, reviews decide many directories, and content matters more in Gemini and Claude. Our 50-city data shows how each engine differs:

| Engine | Answers citing a directory or review site | Answers citing a manager's own site |
|---|---|---|
| ChatGPT | 48 of 50 | 15 of 50 |
| Gemini | 34 of 50 | 48 of 50 |
| Claude | 50 of 50 | 43 of 50 |

Source: our data, 2026-10-19, [AI Property Manager Index 2026](/research/ai-property-manager-index-2026).

So the reason can differ by engine:

- **Directories.** Your competitor is on the list page, and you are not.
- **Reviews.** Many list sites rank by review count and stars. Google says "more reviews and positive ratings can help your business's local ranking" in its own local results.
- **Content.** Gemini linked a manager's own site in 48 of 50 answers. A competitor with a clear page for your city has an edge there.
- **Location.** Google ranks local results by relevance, distance and prominence. Your city pages tell engines where you work.

ClearLead Digital, an agency that sells this work, makes the same point: when an AI cannot confirm a company, "it names someone it can".

## What does a gap look like in real data?

A gap often sits between where you work and where your pages say you work. We saw this with Fridman Properties, a Chicago-area manager. Related party: the owner of Fridman Properties is CEO of MyRemotely, our partner.

On 2026-10-16, we ran 24 prompts on 3 engines, 2 times each (our data):

| Area in the prompt | Answers that named Fridman |
|---|---|
| Northwest suburbs | 6 of 18 |
| Chicago | 0 of 18 |
| NW Indiana | 0 of 18 |
| South Side | 0 of 42 |

113 of the company's 144 units are on Chicago's South Side. But most of its 29 city pages covered the northwest suburbs. AI named the company where the pages were, not where the doors were. We do not claim any result after the fix yet; the rebuild of those pages is still a plan. The full baseline is in the Fridman Properties case study on citata.ai.

## How do you compare side by side?

You compare by sources, not by feelings. Use this 6-step check. It takes about 2 hours for 10 prompts.

1. **Pick 10 owner questions.** Use your city: "best property manager for a single-family home in <city>".
2. **Run each one in ChatGPT, Gemini and Claude.** Use a logged-out window and put the city in the question.
3. **Log the names and the links.** One row per answer.
4. **Open every source link.** Mark: lists you, lists the competitor, lists both, lists neither.
5. **Count the gaps.** A source that lists the competitor and not you is a gap.
6. **Sort gaps by count.** The source with the most gaps goes first.

Use this table for step 4:

| Source | Answers that link it | Lists competitor | Lists you | Your facts correct | Action |
|---|---|---|---|---|---|
| Expertise.com | | | | | |
| BBB | | | | | |
| Yelp | | | | | |
| Birdeye | | | | | |
| Local best-of list | | | | | |
| Competitor's city page | | | | | |

Keep the logs. Run the same questions in 30 days. Our guide on [how landlords use AI to choose a property manager](/guides/how-owners-choose-a-property-manager-with-ai) shows what owners ask.

## What is the fastest fix?

The fastest fix is a listing fix on the top gap sources. A listing takes days. A new city page or 20 new reviews take weeks or months.

Do the work in this order:

1. **Claim and correct the top 3 gap sources.** Name, address, phone, website, service area, and services.
2. **Apply to list sites that take applications.** Read how each one picks companies. Do not pay a site that cannot explain its method.
3. **Ask past owners for reviews.** Ask every owner the same way. Do not offer gifts for good reviews.
4. **Write one page for the city in the prompt.** Doors you manage there, property types, fees, and local rules you handle.
5. **Run the prompts again after 30 days.** Log who is named and what is linked.

Watch for: an offer to "make ChatGPT recommend you". OpenAI says "Ads do not influence the answers ChatGPT gives you." Google says "There's no way to request or pay for a better local ranking on Google." Pay for work, not for a promise of a name in an answer.

## Why does the answer change from day to day?

AI answers change because the search results and the model output change on each run. In our 50-city test, ChatGPT named 5.3 companies per answer on average, Claude 15.5 and Gemini 5.7 (our data, 2026-10-19). A short list leaves little room. One new source can push a name in or out.

So do not judge on one answer. Judge on a set of 10 or more prompts, run 2 times each, every month. A competitor that shows up in 8 of 20 answers has a real lead. A competitor that shows up once may be noise.
