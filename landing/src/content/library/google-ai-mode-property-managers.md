---
title: "Google AI Mode for Property Managers: How It Picks Companies — Citata.ai"
description: "Google has not published how AI Mode picks local companies. What Google does say, what tests show (up to 10 businesses, GBP data) and what managers can do."
headline: "Google AI Mode for Property Managers"
dek: "What Google says, what tests show, and what is still unknown about AI Mode lists."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Google has not published how AI Mode chooses which property management companies to show. Google says AI Mode splits a question into subtopics, runs many searches at once and cites web pages that are indexed and eligible for a snippet. Independent tests found AI Mode lists up to 10 local businesses, pulls ratings and hours from Google Business Profiles and uses the searcher's location. So the same three local factors still apply: relevance, distance and prominence."
visible: false
cluster: "ai-search"
kind: "guide"
priority: 2
inspired_by: "https://www.humanlevel.com/en/blog/seo/google-ai-mode-and-local-search-results"
faq:
  - q: "What is Google AI Mode?"
    a: "AI Mode is a tab in Google Search that gives an AI-written answer with links. Google says it splits a question into subtopics and searches for each one at the same time. It launched in the US on May 20, 2025."
  - q: "How many property managers does AI Mode list?"
    a: "Google does not say. Human Level's tests in May 2025 saw local lists with up to 10 businesses, against 3 in a classic Local Pack."
  - q: "Does AI Mode use Google Business Profile data?"
    a: "Tests by Human Level and Whitespark show AI Mode answers with star ratings, review counts, hours and other facts from Business Profiles. Google's AI features page also tells site owners to keep their Business Profile up to date."
  - q: "Can I pay to appear in AI Mode?"
    a: "Google says there is no way to request or pay for a better local ranking. It has not published a paid option for local company lists in AI Mode."
  - q: "Does my location change which property managers AI Mode shows?"
    a: "Yes, in tests. Human Level found that AI Mode used the device location for a search without a city, and showed the named city when the search included one."
sources:
  - label: "Google Search Help: Get AI-powered responses with AI Mode in Google Search"
    url: "https://support.google.com/websearch/answer/16011537"
  - label: "Google Blog: AI in Search, going beyond information to intelligence (May 20, 2025)"
    url: "https://blog.google/products/search/google-search-ai-mode-update/"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Business Profile Help: Tips to improve your local ranking"
    url: "https://support.google.com/business/answer/7091"
  - label: "Google Business Profile Help: How Google sources and uses info in Business Profiles"
    url: "https://support.google.com/business/answer/2721884"
  - label: "Google Business Profile Help: Manage your service areas"
    url: "https://support.google.com/business/answer/9157481"
  - label: "Google Business Profile Help: Guidelines for representing your business"
    url: "https://support.google.com/business/answer/3038177"
  - label: "Human Level: Google AI Mode and local search results"
    url: "https://www.humanlevel.com/en/blog/seo/google-ai-mode-and-local-search-results"
  - label: "Whitespark: Guide to Google's AI Mode for local businesses"
    url: "https://whitespark.ca/guides/whitesparks-guide-to-googles-ai-mode-for-local-businesses/"
---

## What is Google AI Mode?

Google AI Mode is an AI search tab inside Google Search. You type a question, and Google writes an answer with links to web pages. You can then ask follow-up questions in the same thread.

Google launched AI Mode in the US on May 20, 2025, with no Search Labs sign-up. Its help page says AI Mode "divides your question into subtopics and searches for each one simultaneously". Google calls this "query fan-out". The launch post said AI Mode and AI Overviews in the US run on a custom version of Gemini 2.5.

For a property manager, this matters because owners ask long questions. A classic search might be "property management Tampa". An AI Mode prompt might be "Who manages single-family rentals in Tampa, charges under 10% and has no leasing fee?" AI Mode can split that into several searches and pull facts from many pages.

## How is AI Mode different from the Local Pack?

AI Mode shows a written list of companies with short notes, not three map pins. Human Level tested local searches in AI Mode in the last week of May 2025. Its findings:

| Feature | Classic Local Pack | AI Mode (Human Level tests) |
|---|---|---|
| Number of businesses | 3 | Up to 10 |
| Map | At the top | At the end of the answer |
| Text per business | Name, rating, hours | A short AI note on why it fits the question |
| Sources | Not shown | Right-hand panel lists source pages |
| Overlap | Top 3 | The usual top 3 also showed in AI Mode |

Human Level ran these tests on restaurants, not on property managers. AI Mode was also new at the time. Treat the table as a sign of direction, not as a rule.

Google also says AI Mode and AI Overviews "may use different models and techniques". So a company can show in one and not in the other.

## How many businesses does AI Mode list?

Google has not published a number. Human Level saw lists with "up to ten businesses" for local searches. A longer list is a real chance for a manager who is not in the top 3 of the Local Pack.

Our own data shows how much the count can vary between AI engines. On 2026-10-19 we asked "What is the best property management company in <City, ST>? Give names." for 50 US cities. We used the APIs of ChatGPT, Claude and Gemini, not Google AI Mode itself (our data, 2026-10-19).

| Engine (API model) | Answers | Companies named per answer (average) |
|---|---|---|
| ChatGPT (gpt-6-luna) | 50 | 5.3 |
| Claude (claude-sonnet-5-5) | 50 | 15.5 |
| Gemini (gemini-3-flash) | 50 | 5.7 |

The Gemini API is not AI Mode. But the numbers show one point: AI lists are short and they change from engine to engine. You need to check each one.

## Does AI Mode use Google Business Profile data?

Tests say yes. Human Level saw each listed business with its rating "taken from GBP". Clicks on a business name opened the Business Profile panel. Whitespark saw AI Mode answers with "star ratings, review volumes, pricing, hours of operation" and other facts. It says these came from Business Profiles "or other sources".

Google does not say which profile fields AI Mode reads. It does say three things that apply:

1. **Profiles come from many sources.** Google builds a Business Profile from your website, licensed third-party data, user edits and reviews, and the owner's own edits.
2. **AI features need a current profile.** The Search Central page on AI features lists "Business Profile information is up-to-date" as an SEO basic.
3. **Local results depend on relevance, distance and prominence.** Google's local ranking page says prominence includes "how many reviews you have" and links to your business. Google also says "there's no way to request or pay for a better local ranking".

For the full owner path from prompt to shortlist, see [how landlords use AI to choose a property manager](/guides/how-owners-choose-a-property-manager-with-ai).

## Does device location change the answer?

Yes, in tests. Human Level searched "best pizzerias" with a Chicago IP address and got a Chicago list. A "near me" search gave a wider area. A search with another city name gave results in that city.

For a property manager, the lesson is simple. Owners who search from home without a city name will see managers near them. Owners who live in another state and type your city will see that city. An owner who lives in another state may type your city. So your pages and your profile must name the cities you serve, in plain text.

Google's service area rules also matter here. A service-area business can set up to 20 service areas by city or postal code. A radius is not allowed for new setups.

## What should a property manager do about AI Mode?

Do the work that helps in both AI Mode and the classic Local Pack. Here is a checklist, in order:

- **Verify your Business Profile.** Google says verified profiles are more likely to show.
- **Pick the right primary category.** Google asks for the fewest categories that describe your core business, as specific as possible.
- **List each service.** Use the Services editor: leasing, rent collection, maintenance, owner reporting.
- **Set service areas.** Name each city you serve, up to 20.
- **Ask every owner and tenant for an honest review.** Prominence includes review count and rating.
- **Write one owner page per question.** AI Mode fans out into sub-questions. Each page can match one of them.
- **Check AI Mode by hand each month.** Search 10 owner prompts with your city, from a private window. Write down who AI Mode lists and which sources it shows.

To log these checks next to your site traffic, use our guide on [how to track AI traffic and AI mentions](/guides/track-ai-traffic-property-management).

## What is still unknown?

Google has not published the rules that choose businesses in AI Mode. Google has not said how reviews are weighted there, or which profile fields it reads. All third-party tests so far use few searches, and most use restaurants. AI Mode also changes often.

So do not trust any vendor that promises an AI Mode spot. Trust a before-and-after record: the same prompts, the same city, the same date each month.
