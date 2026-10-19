---
title: "How to Get Cited by Perplexity as a Property Manager — Citata.ai"
description: "How Perplexity finds and cites property management companies: its own index, PerplexityBot, Yelp data and directories. Plus a 20-minute test to check your citations."
headline: "How Property Managers Get Cited by Perplexity"
dek: "Perplexity runs its own web index and shows numbered sources. Here is how to get in."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Perplexity searches the web in real time and shows numbered citations under each answer. Perplexity says its index covers hundreds of billions of pages and powers its answer engine. To get cited, allow PerplexityBot in robots.txt, publish clear landlord pages with exact facts, and keep your Yelp, Expertise.com and other directory profiles complete. Then test the same owner questions in Perplexity each month and log which sources it cites."
visible: false
cluster: "ai-search"
kind: "how-to"
priority: 3
inspired_by: "https://citant.ai/blog/how-to-rank-in-perplexity/"
faq:
  - q: "Does Perplexity use Google or Bing results?"
    a: "Perplexity says its Search API uses an index of hundreds of billions of webpages, the same infrastructure that powers its answer engine. We found no Perplexity statement that it uses Bing or Google results."
  - q: "What is PerplexityBot?"
    a: "PerplexityBot is the crawler that Perplexity uses to surface and link websites in its results. Perplexity says it is not used to crawl content for AI foundation models and recommends allowing it in robots.txt."
  - q: "Does Perplexity use Yelp?"
    a: "Yes. In March 2024 Perplexity added Yelp business data, including maps, reviews and photos, through Yelp's data licensing program. A complete Yelp profile helps Perplexity describe you."
  - q: "Can I block Perplexity and still be cited?"
    a: "If you block PerplexityBot, Perplexity cannot add your pages to its search results. Perplexity-User, the fetcher for live user requests, generally ignores robots.txt, but you should not rely on it."
  - q: "How often should I test Perplexity?"
    a: "Once a month is enough for most property managers. Use the same prompts each time, so you compare like with like."
sources:
  - label: "Perplexity Help Center: How does Perplexity work?"
    url: "https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work"
  - label: "Perplexity: Introducing the Perplexity Search API (2025-09-25)"
    url: "https://www.perplexity.ai/hub/blog/introducing-the-perplexity-search-api"
  - label: "Perplexity Docs: Perplexity Crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
  - label: "Maginative: Perplexity adds Yelp data (2024-03-12)"
    url: "https://www.maginative.com/article/perplexity-enhances-ai-search-engine-with-direct-yelp-data-integration/"
  - label: "SOCi: How to Improve Visibility in Generative AI Search (2026-08-18)"
    url: "https://www.soci.ai/?p=37706"
  - label: "Yelp Support: Don't Ask for Reviews"
    url: "https://www.yelp-support.com/article/Don-t-Ask-for-Reviews?l=en_US"
  - label: "BrightLocal: Local Consumer Review Survey 2026"
    url: "https://www.brightlocal.com/research/local-consumer-review-survey/"
---

## How does Perplexity choose sources?

Perplexity searches the web for each question and cites the pages it uses. Perplexity's help center says it "uses advanced AI to search the internet in real-time". It also says "each answer includes numbered citations linking to the original sources".

That makes Perplexity different from a chat answer with no links. Say an owner asks Perplexity "Who is the best property manager for a duplex in Columbus?" The owner sees a short list of names and a row of sources. Your goal is to be in both: the names and the sources.

Perplexity does not publish a ranking formula. What it does publish are 3 facts you can act on:

1. It has its own crawler, PerplexityBot.
2. It has its own index.
3. It licenses some local data, such as Yelp business data.

## Does Perplexity use Bing or its own index?

Perplexity says it runs its own index. On 2025-09-25 Perplexity launched its Search API with "an index covering hundreds of billions of webpages". The same post says the API "provides access to the same global-scale infrastructure that powers Perplexity's public answer engine" (Perplexity, 2025). Perplexity also says its systems handle tens of thousands of index updates per second.

We found no Perplexity statement that it uses Bing or Google results. So do not assume that a good Google rank gets you into Perplexity. Make sure Perplexity can crawl you directly.

Perplexity uses 2 agents (Perplexity Docs):

| Agent | What it does | robots.txt |
|---|---|---|
| PerplexityBot | Surfaces and links websites in Perplexity results. Not used to train AI foundation models. | Follows it. Perplexity recommends you allow it. |
| Perplexity-User | Visits a page when a user asks a question, to help answer it | "Generally ignores robots.txt rules", because a user asked for the fetch |

Perplexity also notes that a robots.txt change "may take up to 24 hours" to take effect.

Check your robots.txt now. Open `yourdomain.com/robots.txt`. If you see `User-agent: PerplexityBot` followed by `Disallow: /`, Perplexity cannot add your pages to its index. Some security plugins and CDN bot settings block AI crawlers by default. Check those too.

## Which sources does Perplexity cite for local service questions?

For local service questions, Perplexity can cite manager websites, review sites and directories. Two signals point to directories:

- **Yelp data.** In March 2024, Perplexity added Yelp's local data, "including maps, reviews, photos", through Yelp's Fusion licensing program (Maginative, 2024). A thin Yelp profile gives Perplexity little to say.
- **Contact data errors.** SOCi's 2026 Local Visibility Index found that only 68% of business contact data on ChatGPT and Perplexity matches the Google Business Profile (SOCi, 2026). Perplexity copies what it finds, right or wrong.

Our own test did not include Perplexity. In October 2026 we asked ChatGPT, Claude and Gemini for the best property manager in 50 US cities, 150 answers in total. Expertise.com was a source in 93 answers, Yelp in 50 and iPropertyManagement in 50. Manager websites were a source in 106 answers (our data, 2026-10). It is a fair hypothesis that Perplexity reads a similar mix. Test it before you spend money on it.

## Do Reddit and directories matter for Perplexity?

Directories matter, and the Yelp deal is the clearest proof. Reddit may matter, but we have no Perplexity data on it yet. In our 3-engine test, Reddit was a source in 22 answers, all from Gemini (our data, 2026-10).

Work in this order:

1. **Your own site.** A page per city you serve, a full fee table, and plain answers to owner questions. Perplexity cites pages, so give it pages worth citing.
2. **Yelp.** Claim the profile. Add photos, hours, service area and a link to your site. Do not ask clients for Yelp reviews: Yelp forbids it.
3. **Expertise.com, iPropertyManagement and BBB.** Make sure each profile is claimed, complete and uses the same name, address and phone.
4. **Reddit.** Read first. Answer only where you have real expertise, and say who you are.

## How do you check Perplexity citations?

Run the same set of owner questions each month and log the result. This takes about 20 minutes.

Step list:

1. **Write 10 prompts.** Mix city, property type and service. Example: "best property management company in [city] for single-family homes".
2. **Use a clean session.** Log out, or use a private window, so past chats do not shape the answer.
3. **Run each prompt once.** Copy the company names and the numbered sources.
4. **Log the result in a sheet.** One row per prompt.
5. **Repeat monthly.** Compare the rows month to month.

Use this log format. The rows are an example, not real data:

| Date | Prompt | Named? | Rank in list | Our site cited? | Sources cited |
|---|---|---|---|---|---|
| 2026-10-19 | best property manager in [city] | No | n/a | No | yelp.com, expertise.com, [competitor].com |
| 2026-11-19 | same | Yes | 4 | No | yelp.com, expertise.com |

Read the "Sources cited" column first. It tells you which sites to fix next. If the same directory shows up in 7 of 10 prompts, your profile there is the top task.

Also check your server logs for the PerplexityBot user agent. Perplexity publishes its IP ranges at `perplexity.com/perplexitybot.json`, so you can confirm a visit is real. For the analytics side, see our guide on [how to track AI traffic and AI mentions](/guides/track-ai-traffic-property-management).

## Perplexity checklist

- [ ] robots.txt allows PerplexityBot.
- [ ] CDN and security plugin do not block PerplexityBot.
- [ ] Each city you serve has its own page with real facts.
- [ ] Fee table is on the site in plain text, not in a PDF.
- [ ] Yelp profile is claimed and complete.
- [ ] Expertise.com, iPropertyManagement and BBB profiles match your name, address and phone.
- [ ] 10 test prompts run and logged this month.
- [ ] Top 3 cited sources from the log are on next month's task list.

People use AI for local choices now. BrightLocal's 2026 survey found that 45% of consumers use ChatGPT or other AI tools for local recommendations, up from 6% in 2025 (BrightLocal, 2026). For the full site checklist, read [the AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website).
