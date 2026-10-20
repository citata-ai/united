---
title: "Can ChatGPT Read a Wix or Squarespace Property Site? — Citata.ai"
description: "Most AI crawlers do not run JavaScript. Wix and Squarespace send text in the HTML, but rental listing widgets often do not. Here is a 5-minute test you can run."
headline: "Can AI Crawlers Read Your Wix or Squarespace Site?"
dek: "ChatGPT's and Claude's crawlers read raw HTML only. We tested 4 property pages to see what they get."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Most AI crawlers, including the ones from OpenAI, Anthropic and Perplexity, do not run JavaScript (Vercel, 2024). They read only the HTML the server sends. Wix renders pages on the server, and the Squarespace demo we tested sent its text in the HTML too. The common gap is the rental listing widget: it often loads with JavaScript, so AI crawlers see an empty box."
visible: false
cluster: "ai-search"
kind: "guide"
priority: 4
inspired_by: "https://www.propertymanagerwebsites.com/blog/should-i-let-ai-design-my-website"
faq:
  - q: "Does ChatGPT run JavaScript when it reads a website?"
    a: "No. Vercel's 2024 study of its network found that OpenAI's crawlers fetch JavaScript files but do not run them. Text that appears only after JavaScript runs is not visible to them."
  - q: "Is Wix bad for AI search?"
    a: "No. Wix says it uses server-side rendering, so page text goes out as HTML. Custom Velo code must run inside onReady() to be in that HTML."
  - q: "Does Squarespace block AI crawlers?"
    a: "Not by default. Squarespace has a setting called Block known artificial intelligence crawlers, and it is unchecked by default. The list it blocks has GPTBot and ClaudeBot but not OAI-SearchBot or PerplexityBot."
  - q: "Can Gemini read JavaScript content?"
    a: "Vercel (2024) found that Gemini uses Google's crawl, which renders JavaScript. Google says a headless Chromium renders the page after a queue that can take a few seconds or longer."
  - q: "Should rental listings be visible to AI crawlers?"
    a: "Listings are tenant content, so they matter less for owner leads. Still, a short HTML summary above the widget, such as areas served and how to apply, helps every crawler."
sources:
  - label: "Vercel: The rise of the AI crawler (2024-12-17)"
    url: "https://vercel.com/blog/the-rise-of-the-ai-crawler"
  - label: "Google Search Central: Understand JavaScript SEO basics (updated 2026-03-04)"
    url: "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics"
  - label: "Wix Developers: SEO Best Practices"
    url: "https://dev.wix.com/docs/develop-websites/articles/best-practices/seo-best-practices"
  - label: "Squarespace Help: Request that AI models exclude your site (updated 2026-01-08)"
    url: "https://support.squarespace.com/hc/en-us/articles/360022347072-Request-that-AI-models-exclude-your-site"
  - label: "Squarespace Help: Optimize your site for AI-powered search engines (updated 2026-10-01)"
    url: "https://support.squarespace.com/hc/en-us/articles/38299115788813-Optimize-your-site-for-AI-powered-search-engines"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "Perplexity: Perplexity crawlers"
    url: "https://docs.perplexity.ai/guides/bots"
---

## Which AI crawlers run JavaScript?

Only the crawlers on Google's and Apple's systems run JavaScript. Vercel studied crawler traffic on its network and published the result on 2024-12-17. It found that none of the major AI crawlers render JavaScript, except Gemini and AppleBot.

| Crawler | Used by | Runs JavaScript? | Requests in one month on Vercel |
|---|---|---|---|
| GPTBot, OAI-SearchBot, ChatGPT-User | OpenAI, ChatGPT | No | 569 million (GPTBot) |
| ClaudeBot | Anthropic, Claude | No | 370 million |
| PerplexityBot | Perplexity | No | 24.4 million |
| AppleBot | Apple | Yes, browser-based | 314 million |
| Googlebot | Google Search, Gemini | Yes | 4.5 billion |

Source: Vercel (2024). The ChatGPT crawler fetched JavaScript files in 11.50% of its requests, and Claude in 23.84%. They download the files but do not run them.

What this means for you: if your fee table or service area text appears only after a script runs, ChatGPT search and Claude do not see it. OpenAI says OAI-SearchBot is the crawler that puts sites into ChatGPT search answers. Perplexity says PerplexityBot links websites in Perplexity results.

Google is different. Google Search Central says Googlebot crawls, renders and then indexes. A headless Chromium runs the JavaScript once Google's resources allow. That can take a few seconds or longer. Google still calls server-side rendering "a great idea" because not all bots can run JavaScript.

## How do you check what a crawler sees?

Fetch the page without a browser, then look for your own words in the result. This test takes about 5 minutes and needs only a terminal.

1. **Pick 3 owner pages.** Use your home page, your pricing page and one city page.
2. **Fetch the raw HTML** with the OAI-SearchBot user agent:

```bash
curl -sL -A "OAI-SearchBot/1.0" https://www.example.com/pricing -o page.html
```

3. **Search the file for a sentence** you know is on the page, such as your management fee:

```bash
grep -c "8% of collected rent" page.html
```

4. **Read the result.** A count of 0 means the crawler does not get that text. A count of 1 or more means it does.
5. **Repeat for the listings page** and any page with a widget, a calculator or a map.

No terminal? Open the page in Chrome, then use View Page Source, not Inspect. Page Source shows the HTML before JavaScript runs. Inspect shows the page after JavaScript runs, which is what Googlebot sees, not ChatGPT.

## What did we find on 4 property pages?

We ran this test on 2026-10-19 with the OAI-SearchBot user agent. We removed scripts and styles, then counted the words left in the HTML.

| Page | Platform | Words in raw HTML | Main content visible? |
|---|---|---|---|
| Bedford demo site | Squarespace | 189 | Yes |
| SiteWise Management demo (About page) | Wix | 294 | Yes |
| fridmanproperties.com home page | Property Manager Websites | 1,218 | Yes |
| fridmanproperties.com rentals page | Same site, with a listing widget | 309, all menus and footer | No listings |

Source: our data, 2026-10-19. The two site builder pages are demo sites, not real companies. The test checks one moment on 4 pages, so treat it as a spot check, not a study.

The rentals page is the lesson. Its HTML says "Book a self-guided tour below", then an empty frame. The frame loads from a script, and the frame page itself returned 6 words of HTML. An AI crawler sees no homes, no prices and no areas.

Disclosure: Fridman Properties is our case study client. Its owner is CEO of MyRemotely, our partner, and the listing widget on that page comes from MyRemotely.

## Are Wix and Squarespace safe for AI search?

Yes, for normal pages built in the editor. The risk comes from custom code, embeds and settings, not from the platform.

**Wix.** The Wix developer docs say Wix uses server-side rendering and returns page components as HTML. Wix warns that content not in the first HTML may be indexed late, wrong or not at all. If you add Velo code, put the content inside `onReady()`, or return the data query from it. Content loaded through a Wix dataset is already in the server HTML.

**Squarespace.** Squarespace has a setting under Settings, then Crawlers, called "Block known artificial intelligence crawlers". It is unchecked by default. If you check it, Squarespace adds 26 bots to robots.txt, such as GPTBot, ClaudeBot, Google-Extended and Applebot-Extended. OAI-SearchBot, Claude-SearchBot and PerplexityBot are not on that list. Squarespace users cannot edit robots.txt by hand.

Squarespace also warns that content is unlikely to appear in search results if you limit crawler access. Its help page suggests you ask Gemini, Perplexity, ChatGPT or Copilot to summarize a page as a test.

Checklist for a site builder:

- [ ] Fee table, service list and service areas typed as text, not placed as images.
- [ ] No key text inside a custom HTML embed or iframe.
- [ ] On Wix, Velo content inside `onReady()`.
- [ ] On Squarespace, the AI crawler box unchecked, unless you chose to block training bots.
- [ ] Every page linked from at least one menu or text link.

## What about rental listing widgets?

A rental listing widget that loads with JavaScript is invisible to AI crawlers. Treat your widget as invisible until you test it. The fridmanproperties.com rentals page above is one real example.

For owner leads, this gap is small. Owners ask AI about fees, services and trust, not about one vacant unit. For tenant traffic, it matters more, because the crawler cannot read a single home on the page.

What to do:

1. **Add 2–4 sentences of HTML text** above the widget. Name the areas you rent in, the home types and how to apply.
2. **Link to the owner side** from that text, for example "Own a rental? See our management fees."
3. **Ask your software vendor** whether it offers a listings page that sends the homes as HTML.
4. **Test again** with the curl steps after each change.

For the other checks, such as robots.txt rules, schema and index, see the [AI search checklist for a property management website](/guides/ai-search-checklist-property-management-website).
