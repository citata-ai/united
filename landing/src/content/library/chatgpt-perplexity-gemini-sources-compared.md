---
title: "ChatGPT vs Gemini vs Perplexity vs Copilot: Local Sources — Citata.ai"
description: "We asked 3 AI engines for the best property manager in 50 cities. ChatGPT leaned on directories, Gemini on company sites and Reddit. Which source to fix first."
headline: "Which Sources Each AI Uses to Name a Property Manager"
dek: "150 answers in 50 US cities show each engine trusts a different set of sites."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Each assistant draws on a different pool. In our 50-city test, ChatGPT cited directories such as Expertise.com and Birdeye and linked a company site in 30% of answers. Gemini, grounded in Google Search, linked a company site in 96% and Reddit in 44%. Copilot gets web results from Bing, and Perplexity shows numbered links from its own crawler. Fix your directory listings first, because every engine cites them."
visible: false
cluster: "ai-search"
kind: "comparison"
priority: 4
inspired_by: "https://www.yext.com/blog/where-do-google-gemini-chatgpt-get-local-business-information"
faq:
  - q: "Where does ChatGPT get local business information?"
    a: "In our 50-city test (2026-10-19), ChatGPT cited Expertise.com in 30 of 50 answers, Birdeye in 17, BestInHood in 12 and BBB in 11. It linked a property manager's own site in only 30% of answers."
  - q: "Does Gemini use Google Business Profile and Google Maps?"
    a: "Google's Gemini API can ground answers in Google Maps data on over 250 million places, with reviews and opening hours. The Gemini app uses public Google Maps information when Keep Activity is on. In our test, Gemini with Google Search linked a company site in 96% of answers."
  - q: "Which AI assistant uses Bing?"
    a: "Microsoft Copilot. Microsoft Learn says Copilot sends a short generated query to the Bing search service and builds its answer from the results."
  - q: "Does Perplexity show links to my website?"
    a: "Yes. Perplexity says each answer has numbered citations to the original sources. Its crawler, PerplexityBot, finds and links sites, so allow it in robots.txt."
  - q: "Which AI assistant should a property manager check first?"
    a: "Check ChatGPT first, then Gemini. In our test ChatGPT named the fewest local companies per answer, 5.3 on average, and leaned most on directories. That makes listing fixes show there first."
sources:
  - label: "Citata.ai: AI visibility city test H03-E1, 50 cities, 150 answers (2026-10-19)"
    url: "https://citata.ai/research/ai-property-manager-index-2026"
  - label: "Google AI for Developers: Grounding with Google Maps (updated 2026-10-13)"
    url: "https://ai.google.dev/gemini-api/docs/maps-grounding"
  - label: "Gemini Apps Help: Use and manage Connected Apps in Gemini"
    url: "https://support.google.com/gemini/answer/13695044"
  - label: "Microsoft Learn: Data, privacy, and security for web search in Microsoft Copilot (2026-08-18)"
    url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/manage-public-web-access"
  - label: "Perplexity Help Center: How does Perplexity work?"
    url: "https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "Yext: Where do Google Gemini, ChatGPT and other AI models get local business information? (2024-06-13)"
    url: "https://www.yext.com/blog/where-do-google-gemini-chatgpt-get-local-business-information"
---

## How do the assistants differ in the sources they use?

ChatGPT, Gemini, Copilot and Perplexity each search a different index, so each one cites a different set of sites. We measured 3 of them on 2026-10-19. We asked ChatGPT, Gemini and Claude the same question for 50 US cities: "What is the best property management company in <City, ST>? Give names." Each engine ran with live web search.

| Metric | ChatGPT | Gemini | Claude |
|---|---|---|---|
| Answers | 50 | 50 | 50 |
| Companies named per answer | 5.3 | 5.7 | 15.5 |
| Sources per answer | 2.5 | 5.6 | 7.6 |
| Answers that link a company site | 30% | 96% | 86% |
| Answers that link a directory or review site | 96% | 68% | 100% |
| Answers that link a forum such as Reddit | 4% | 44% | 0% |
| Answers that name a national brand | 66% | 92% | 98% |

Source: our data, test H03-E1, 2026-10-19. Models: gpt-6-luna with web search, gemini-3-flash with Google Search grounding, claude-sonnet-5-5 with web search. We asked each question once, and API answers can differ from the consumer apps. We did not test Perplexity or Copilot in this run.

The top cited domains show the split even more clearly.

| Rank | ChatGPT | Gemini | Claude |
|---|---|---|---|
| 1 | expertise.com (30) | mynd.co (22) | yelp.com (50) |
| 2 | reviews.birdeye.com (17) | reddit.com (22) | expertise.com (47) |
| 3 | bestinhood.com (12) | expertise.com (16) | ipropertymanagement.com (42) |
| 4 | bbb.org (11) | ziprent.com (14) | trustanalytica.org (14) |
| 5 | propertymanagement.com (8) | utopiamanagement.com (9) | clutch.co (10) |

Numbers are answers out of 50 that cite the domain. Across all 150 answers, Expertise.com was a source in 93.

## Which assistant uses Google Business Profile?

Gemini is the assistant tied to Google's local data. Google's Gemini API offers Grounding with Google Maps, which draws on over 250 million places. It can return places, reviews, photos, addresses and opening hours. Answers about one place use Google user reviews and other Maps data.

The Gemini app also uses public information from Google Maps, when the user has Keep Activity on (Gemini Apps Help). So your Google Business Profile, its reviews and its categories feed Gemini more directly than any other engine.

Gemini also cited company sites the most. In our test, Gemini with Google Search linked a property manager's own site in 96% of answers. The sites it cited most were large national managers, such as Mynd and Ziprent. It also cited Reddit in 22 of 50 answers.

What to do: keep your Google Business Profile complete and current. Then make sure your own owner pages answer fees and service areas in plain text.

## Which uses Yelp, Foursquare or Bing?

Copilot uses Bing. Microsoft Learn says Copilot turns a prompt into a short search query and sends it to the Bing search service. It builds the answer from the Bing results and shows the queries in the citation section. So if Bing does not index your owner pages, Copilot cannot cite them.

ChatGPT and Claude lean on directories. In our test, Claude cited Yelp in all 50 answers and iPropertyManagement in 42. ChatGPT cited Expertise.com, Birdeye, BestInHood and BBB most. Yelp did not appear in ChatGPT's top 10 domains.

Yext asked the assistants themselves in 2024. ChatGPT said it uses Google, Yelp, Bing, Facebook, Hotfrog, Zomato and BBB. Copilot named Google, Yelp, Bing and Foursquare, among others. These lists are what the models said about themselves, so read them as hints, not facts. Yext also sells listing services.

## Which shows links to your website?

Perplexity and Gemini link to source sites most openly. Perplexity says each answer has numbered citations that link to the original sources. Its crawler, PerplexityBot, surfaces and links websites in Perplexity results. It is not used for model training.

ChatGPT links your site less often. In our test, only 30% of ChatGPT answers linked a company site, against 96% for Gemini. ChatGPT search finds pages through OAI-SearchBot, according to OpenAI. If robots.txt blocks OAI-SearchBot, your pages do not appear in ChatGPT search answers.

| Assistant | Main web source | Local data source | Links your site? |
|---|---|---|---|
| ChatGPT | OAI-SearchBot crawl | Directories in our test | 30% of answers |
| Gemini | Google Search | Google Maps and Business Profile | 96% of answers |
| Copilot | Bing search service | Bing results | Not tested |
| Perplexity | PerplexityBot crawl | Not stated in its help page | Numbered citations in each answer |
| Claude | Web search | Yelp and directories in our test | 86% of answers |

Sources: our data (2026-10-19), Google, Microsoft Learn, Perplexity and OpenAI pages listed below.

## Which one should you check first?

Check ChatGPT first, then Gemini, then Copilot. ChatGPT gives the shortest list, 5.3 companies on average, and leans most on directories. A fix to your Expertise.com, Birdeye or BBB listing has the most direct path into those answers. This is a hypothesis we test, not a proven effect.

A monthly check takes about 30 minutes:

1. **Write 5 owner questions** for your city, such as "best property manager in Evanston for a single-family home".
2. **Ask each one in ChatGPT, Gemini, Copilot and Perplexity.** Use a logged-out or new chat.
3. **Write down each company named** and each source linked.
4. **Mark the sources you can edit:** your site, Google Business Profile, Yelp, Expertise.com, BBB.
5. **Fix the one source that shows up most** and is wrong or missing for you.

For the full picture of how owners use these answers, read [how landlords use AI to choose a property manager](/guides/how-owners-choose-a-property-manager-with-ai). For our full city data, see the [AI property manager index](/research/ai-property-manager-index-2026).

Disclosure: none of these companies paid for or checked this page. Our test names 821 different companies, and citata.ai is not a property manager.
