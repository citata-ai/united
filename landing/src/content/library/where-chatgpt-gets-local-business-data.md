---
title: "Where ChatGPT Gets Local Business Data for Property Managers — Citata.ai"
description: "ChatGPT pulls local facts from search partners like Microsoft, licensed data like Yelp, listings and your website. What each study found and why they disagree."
headline: "Where ChatGPT Gets Local Business Data"
dek: "OpenAI names its search partners, Yelp licenses its reviews, and the studies disagree on the rest."
published: "2026-10-19"
updated: "2026-10-19"
answer: "ChatGPT gets local business facts from 3 places: third-party search providers (OpenAI's help page links Microsoft), content partners such as Yelp, and the web pages its search finds, such as directories and company sites. In a Yext study of 6.8 million citations, listings were 48.7% of OpenAI citations. In our 50-city property management test, the ChatGPT engine linked a listing site in 48 of 50 answers and a company site in 15. So keep your website, Yelp, Bing Places and the big directories in sync."
visible: false
cluster: "ai-search"
kind: "guide"
priority: 1
inspired_by: "https://brightlocal.com/blog/ai-search-using-listings-sources"
faq:
  - q: "Does ChatGPT use Google Business Profile data?"
    a: "OpenAI does not say so. Local Falcon says ChatGPT has no direct integration with Google Business Profile. Google data can still reach ChatGPT when other sites copy it, so keep the profile correct."
  - q: "Does ChatGPT use Yelp?"
    a: "Yes. Yelp announced an agreement with OpenAI on 2026-02-12. Trade press reports that ChatGPT can show Yelp reviews, ratings, photos and business details in local answers."
  - q: "Does ChatGPT use Bing?"
    a: "OpenAI's help page says ChatGPT search sometimes sends queries to other search providers and links the Microsoft privacy statement among them. It does not name Bing Places as a data source."
  - q: "Does ChatGPT use Foursquare?"
    a: "Some reports say so, and BrightLocal repeats that claim, but BrightLocal did not measure it. We found no primary data on Foursquare and ChatGPT, so we do not count on it."
  - q: "Why do studies about ChatGPT sources disagree?"
    a: "They test different industries, prompts, dates and versions of ChatGPT. An API test, a logged-out app test and a logged-in app test can give different sources for the same question."
sources:
  - label: "OpenAI Help Center: ChatGPT search"
    url: "https://help.openai.com/en/articles/9237897-chatgpt-search"
  - label: "OpenAI: Introducing ChatGPT search"
    url: "https://openai.com/index/introducing-chatgpt-search/"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "Yext: 86% of AI citations come from brand-managed sources (2025-10-09)"
    url: "https://yext.com/about/news-media/ai-citations-release"
  - label: "BrightLocal: AI search and listings sources (2025-07-22)"
    url: "https://brightlocal.com/blog/ai-search-using-listings-sources"
  - label: "Local Falcon: ChatGPT local search data sources (2025-11-05)"
    url: "https://www.localfalcon.com/blog/chatgpt-local-search-data-sources-where-does-business-info-come-from"
  - label: "Yelp: Q4 2025 press release, SEC Form 8-K Exhibit 99.1 (2026-02-12)"
    url: "https://www.sec.gov/Archives/edgar/data/1345016/000134501626000011/yelpq4-25ex991pressrelease.htm"
---

## What does OpenAI say about where ChatGPT gets local data?

OpenAI says ChatGPT search uses third-party search providers and content from partners. The launch post for ChatGPT search says it "leverages third-party search providers, as well as content provided directly by our partners." The same post says OpenAI partnered with data providers for categories such as weather, news and maps.

The ChatGPT search help page adds 3 facts that matter for a local business:

1. **Search partners.** ChatGPT "sometimes partners with other search providers" and rewrites your question into shorter search queries for them. The page links the Microsoft privacy statement among those providers.
2. **Location.** ChatGPT uses an approximate location from the IP address. It may send that general location, not the IP, to the search provider. Device location sharing is off by default.
3. **Errors.** OpenAI says results "can be incomplete, outdated, or incorrect."

OpenAI also runs its own crawler for search. Its crawler page says OAI-SearchBot "is used to surface websites in search results in ChatGPT's search features." A site that blocks OAI-SearchBot does not show in ChatGPT search answers, except as a plain navigation link.

What the location rule means for you: an owner who lives in another state may ask about your city by name. Then the city in the prompt decides the results, not the owner's IP. OpenAI's own tip for wrong-area results is to put the city, neighborhood or ZIP code in the question. Your pages should name each city you serve in plain text, so a rewritten query like "property management Tucson" finds them.

So the official picture has 3 layers: search providers, content partners and the pages OAI-SearchBot can read. OpenAI does not publish a list of local data sources beyond that.

## Does ChatGPT use Yelp?

Yes, by license. Yelp's Q4 2025 press release, dated February 12, 2026, says "we recently signed an agreement with OpenAI." Trade press reported in July 2026 that ChatGPT can show Yelp reviews, ratings, photos and business details in local answers.

## Does Bing Places matter?

Bing Places likely matters, but no one has proven how much. OpenAI links Microsoft as a search provider. Local Falcon calls Bing Places "one of the biggest data sources" for ChatGPT, but its post gives no numbers. Local Falcon also says the Bing profile does not set the order of results.

What to do: claim Bing Places and make it match your website. It is free to claim and a likely path for your phone, hours and address.

## Does Google Business Profile feed ChatGPT?

Not directly, as far as public sources show. Local Falcon says ChatGPT has "no direct integration" with Google Business Profile. OpenAI does not name Google as a provider on its help page.

Your Google profile still matters for 2 reasons. First, Google shows the profile in Search and Maps, where its own AI features answer local questions. Second, many directories copy facts from the web, so an error on Google can spread to sites that ChatGPT does read.

## What do the studies find?

The studies agree that listings and websites supply most local facts. They disagree on the mix. Here are the 4 we read, side by side.

| Study | Method | Main finding for ChatGPT |
|---|---|---|
| Yext, 2025-10-09 | 6.8 million citations, ChatGPT, Gemini and Perplexity, July 1 to August 31, 2025; retail, finance, healthcare, food | Listings were 48.7% of OpenAI citations. All engines: websites 44%, listings 42%, reviews and social 8%, forums 2% |
| BrightLocal, 2025-07-22 | 20 searches in 10 industries on ChatGPT Search, AI Mode, Gemini and Perplexity | All engines used directories in every industry. Yelp was a source in 33% of searches across engines |
| Local Falcon, 2025-11-05 | Guide, no study data | Names Bing Places, directories (Yelp, BBB, Tripadvisor), company sites, social pages |
| citata.ai, 2026-10-19 | 50 US cities, 1 property management prompt, OpenAI API with web search, 50 answers | Listing site in 48 of 50 answers; company site in 15 of 50 |

In our test, the ChatGPT engine's most linked sources were Expertise.com (30 answers), Birdeye review pages (17), Bestinhood (12), BBB (11) and PropertyManagement.com (8). It linked Yelp in 0 answers, and 34 of 50 answers linked list sites only, with no company site (our data, 2026-10-19).

## Why do the studies disagree?

The studies disagree because they test different things. 4 factors change the result:

- **Industry.** Yext found listings at 52.6% of healthcare citations, but websites at 47.6% in retail. Our hypothesis: property management has few national brands, so list sites may weigh more.
- **Prompt type.** Yext found that company websites and local pages gave nearly 60% of citations for unbranded, objective questions.
- **Product version.** The API, the logged-out app and the logged-in app can use different tools. Licensed Yelp data may show as a rating card, not as a link a study counts.
- **Date.** Yelp's deal came in 2026. Studies from 2025 cannot show it.

Watch for: vendors run most of these studies, and most sell listing tools. Read each number with its method.

## What should a property manager fix first?

Fix the sources ChatGPT can reach, in this order.

1. **Website:** allow OAI-SearchBot in robots.txt. Put your name, address, phone, fees, service cities and license on plain HTML pages. Our [AI search checklist](/guides/ai-search-checklist-property-management-website) covers the page format.
2. **Yelp:** claim the free page and match your facts.
3. **Bing Places:** claim or import from Google, then check every field.
4. **Directories:** check Expertise.com, BBB, Birdeye and PropertyManagement.com for your city.
5. **Google Business Profile:** keep it correct, because other sites copy from it.
6. **Test:** ask ChatGPT for your phone, address and fees, and for the best manager in your city. Write down the sources. Repeat each month, as in [How to Track AI Traffic and AI Mentions](/guides/track-ai-traffic-property-management).
