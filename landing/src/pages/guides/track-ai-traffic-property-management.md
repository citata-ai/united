---
layout: ../../layouts/Guide.astro
title: "How to Track AI Traffic for a Property Management Company — citata.ai"
description: "Track visits from ChatGPT, Gemini and Perplexity in GA4, see AI crawlers, ask landlords how they found you, and check each month if AI names your company."
headline: "How to Track AI Traffic and AI Mentions"
dek: "Three signals, five steps and one monthly scorecard, with the setup we use on citata.ai."
published: "2026-10-18"
updated: "2026-10-18"
answer: "Track 3 signals: visits from AI assistants, AI crawler visits to your pages, and a 'how did you hear about us' question on your landlord form. GA4 now has an AI Assistant channel, and a custom channel group catches the rest. To check if AI names you, ask the same landlord questions in ChatGPT, Gemini, Claude and Perplexity each month and write down who they name. Bing Webmaster Tools also shows how often Copilot cites your pages."
faq:
  - q: "Does Google Analytics 4 show traffic from ChatGPT?"
    a: "Yes. Since May 2026, GA4 has an AI Assistant channel in the default channel group. It names ChatGPT, Gemini, DeepSeek, Copilot and Grok as examples, so add a custom channel group to catch Perplexity and Claude."
  - q: "Why does GA4 show so few visits from AI?"
    a: "Some AI links reach your site with no referrer, so GA4 counts them as Direct. Google AI Overviews and AI Mode count as Organic Search. Use AI visit counts for trends, not exact totals."
  - q: "What does utm_source=chatgpt.com mean in my reports?"
    a: "ChatGPT adds utm_source=chatgpt.com to links in its search answers. A visit with that tag came from a ChatGPT answer, even when the referrer is missing."
  - q: "How do I see if AI crawlers read my property management website?"
    a: "Cloudflare AI Crawl Control shows AI crawler requests on all Cloudflare plans. Ahrefs Bot Analytics is free during its beta. Your server logs also show user agents such as GPTBot, OAI-SearchBot, ClaudeBot and PerplexityBot."
  - q: "How often should I check if AI names my company?"
    a: "Check once a month with the same 10 to 20 landlord questions. Ask each question at least twice per engine, because AI answers change from run to run. Track the rate, for example 'named in 3 of 40 answers'."
sources:
  - label: "Google Analytics Help: Default channel group"
    url: "https://support.google.com/analytics/answer/9756891"
  - label: "Search Engine Journal: GA4's AI Assistant channel undercounts your AI traffic (2026)"
    url: "https://www.searchenginejournal.com/ga4s-ai-assistant-channel-undercounts-your-ai-traffic-how-to-build-one-that-doesnt/580133/"
  - label: "OpenAI Help Center: Publishers and developers FAQ"
    url: "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq"
  - label: "Ahrefs: AI search traffic conversions at Ahrefs (2025)"
    url: "https://ahrefs.com/blog/ai-search-traffic-conversions-ahrefs/"
  - label: "Cloudflare Docs: AI Crawl Control, get started"
    url: "https://developers.cloudflare.com/ai-crawl-control/get-started/"
  - label: "Ahrefs Help: About Bot Analytics"
    url: "https://help.ahrefs.com/articles/14297049-about-bot-analytics"
  - label: "Ahrefs: Web Analytics"
    url: "https://ahrefs.com/web-analytics"
  - label: "Bing Webmaster Blog: Introducing AI Performance in Bing Webmaster Tools (2026)"
    url: "https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview"
---

AI traffic is the set of visits that reach your site from links in AI answers. These visits are small, but they matter. At Ahrefs, AI search sent 0.5% of visits in 30 days. Those visits brought 12.1% of signups (Ahrefs, 2025). Your numbers will differ. But you cannot see the trend if you do not track it.

## What are the 3 signals of AI traffic?

A property management company can track AI traffic with 3 signals. Each one fills a gap in the others.

| Signal | What it tells you | Where to read it |
|---|---|---|
| AI referral visits | People clicked a link in an AI answer | GA4, Ahrefs Web Analytics |
| AI crawler visits | AI tools read your pages | Cloudflare, Ahrefs Bot Analytics, server logs |
| "How did you hear about us" | Landlords who asked AI, then came back by other routes | Your landlord form or CRM |

The form answer matters most. Many landlords read an AI answer, then type your name into Google. Analytics counts that visit as search, not AI.

## Step 1: How do you see AI visits in Google Analytics 4?

Google Analytics 4 has an AI Assistant channel in the default channel group. Google added it on May 13, 2026 (Search Engine Journal, 2026). You do not need to set it up.

1. **Open the report.** Go to Reports, then Acquisition, then Traffic acquisition. Set the dimension to "Session default channel group".
2. **Find the AI Assistant row.** Google's help page names ChatGPT, Gemini, DeepSeek, Copilot and Grok as examples (Google Analytics Help).
3. **Add a custom channel group.** The default list can miss Perplexity and Claude. In Admin, open Channel groups and copy the default group.
4. **Add an "AI" channel.** Set the condition "Source matches regex" to the pattern below. Move the channel above Referral, because GA4 uses the first channel that matches.

```
chatgpt\.com|perplexity\.ai|gemini\.google\.com|claude\.ai|copilot\.microsoft\.com
```

Watch for: the native channel does not count visits from before the rollout (Search Engine Journal, 2026). Compare months after June 2026 only.

## Step 2: What does utm_source=chatgpt.com mean?

The tag utm_source=chatgpt.com means the visit came from a ChatGPT answer. ChatGPT adds this tag to links in its search results (OpenAI Help Center). GA4 shows it as the session source.

What to do: in GA4, add "Session source" as a secondary dimension. Look for chatgpt.com in both the referrer and the UTM tag. If your form tool saves UTM tags, a landlord lead can carry "chatgpt.com" into your CRM.

## Why do AI visit counts look so low?

AI visit counts are low because part of the AI traffic hides in other channels. There are 3 main gaps.

- **No referrer.** Some AI links, for example from mobile apps, arrive with no referrer. GA4 counts them as Direct (Search Engine Journal, 2026).
- **Google's own AI.** Google AI Overviews and AI Mode count as Organic Search, not AI Assistant (Google Analytics Help).
- **Later visits.** A landlord reads an answer today and searches your name next week.

Use AI visit counts for trends. A rise from 2 to 9 visits a month is a signal. The exact total is not.

## Step 3: How do you see AI crawler visits?

AI crawler visits show which pages AI tools read. A bot that reads a page again and again is a sign that AI uses the page as a source. You have 3 options.

| Tool | Cost | Note |
|---|---|---|
| Cloudflare AI Crawl Control | All plans | Free plan finds bots by user agent and shows the past 24 hours (Cloudflare Docs) |
| Ahrefs Bot Analytics | Free during beta | Needs a Cloudflare Worker; works on the Cloudflare free tier (Ahrefs Help) |
| Server logs | Free | Search for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot |

Watch for fake bots. Anyone can send a GPTBot user agent. Scanners do this to probe files like `/.env`. Count only requests that got a normal page (HTTP 200).

What to do: check that your landlord pages get bot visits. If your management fee page never gets a visit, read [the AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website).

## Step 4: How do you ask landlords where they heard about you?

Add one question to your landlord contact form: "How did you hear about us?" Give choices: ChatGPT, Gemini, Google, Perplexity, a friend, other. Add a free text field too.

Ask the same question on the first call. Write the answer in your CRM. This signal catches the landlords that analytics misses. It also tells you which engine landlords in your city use. For more on how landlords use AI, read [how landlords choose a property manager with AI](/guides/how-owners-choose-a-property-manager-with-ai).

## Step 5: How do you check whether AI mentions your company?

Ask AI the questions your landlords ask, and record the answers. Do this once a month.

1. **Write 10 to 20 landlord questions.** Example: "Who is the best property manager for a duplex in Austin?" Keep the list the same each month.
2. **Log out or use a private window.** Your own history changes the answer.
3. **Ask each engine.** Use ChatGPT, Gemini, Claude and Perplexity. Ask each question at least twice, because answers change from run to run.
4. **Record 2 facts per answer.** Did it name your company? Did it link your site?
5. **Note who it names instead.** Also note the sites it cites, such as Yelp or Expertise.com.

Bing Webmaster Tools adds a free check for Microsoft. Its AI Performance report shows Total Citations and Average Cited Pages across Copilot and Bing AI summaries. It also shows grounding queries, the phrases AI used to find your pages. The report is in public preview since February 10, 2026 (Bing Webmaster Blog).

Paid trackers, such as Profound, Peec AI and OtterlyAI, run prompts for you each day. For a 50 to 500 door company, a monthly manual check is often enough to start.

## A simple monthly AI scorecard

A monthly scorecard puts the 3 signals on one page. Fill it in on the same day each month.

| Metric | Source | Last month | This month |
|---|---|---|---|
| AI visits (AI Assistant + custom AI channel) | GA4 |  |  |
| Landlord leads with utm_source=chatgpt.com | CRM |  |  |
| AI crawler visits to landlord pages | Cloudflare or Ahrefs |  |  |
| Landlords who said "ChatGPT" or another AI | Landlord form, first call |  |  |
| Answers that name you (for example, 4 of 40) | Manual prompt check |  |  |
| Answers that link your site | Manual prompt check |  |  |
| Copilot citations | Bing Webmaster Tools |  |  |

## How we track AI traffic on citata.ai

We use the same 3 signals on citata.ai. Our setup is small and cheap.

- **Cloudflare Worker.** Our site runs on a Cloudflare Worker. It checks each page request against a list of AI bots and AI referrers. It writes each AI hit to Workers Analytics Engine, with the source, the page and the status.
- **Ahrefs Web Analytics.** It is free for sites with verified ownership and uses no cookies (Ahrefs). It shows which AI chatbots send visits.
- **"How did you hear about us."** Our audit request email has this line. The buyer fills it in.

Our baseline is honest. On 2026-10-18 we asked 20 prompts on ChatGPT, Gemini and Claude, 2 runs each. AI named citata.ai in 0 of 108 non-brand answers (our data, 2026-10). It also mixed us up with Citate.ai. We will measure again with the same prompts and report the result.

If you want this check done for you, we run a [free AI visibility audit](/property-management). It covers 20 landlord questions on 4 AI engines and gives you your top 5 fixes.
