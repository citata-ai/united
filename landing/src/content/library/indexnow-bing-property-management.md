---
title: "IndexNow for Property Management Websites: Setup and Limits — Citata.ai"
description: "IndexNow tells Bing and other engines when a page changes. See which engines use it, how a property manager turns it on, and what it does for ChatGPT."
headline: "IndexNow for Property Management Websites"
dek: "A free ping to Bing when your fee page changes. Google does not take part."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Yes, most property management websites should turn on IndexNow. It is free, needs one key file, and tells Bing, Yandex, Naver, Seznam, Yep and others the moment a page is added, changed or removed. It does not guarantee indexing, Google does not use it, and no first-party source says it changes ChatGPT answers. Its value is speed: Bing sees a new fee or city page sooner."
visible: false
cluster: "ai-search"
kind: "how-to"
priority: 6
faq:
  - q: "What is IndexNow?"
    a: "IndexNow is a free, open protocol that lets a website tell search engines when a URL is added, updated or deleted. You send the URL once, and the participating engines share it with each other (indexnow.org FAQ)."
  - q: "Does Google use IndexNow?"
    a: "No. The engine list on indexnow.org names Bing, Yandex, Seznam, Naver, Yep, the Internet Archive and Amazonbot. Google is not on it, so keep your XML sitemap in Google Search Console."
  - q: "Does IndexNow help a property manager show up in ChatGPT?"
    a: "Maybe, but no first-party source confirms it. Yoast wrote in November 2024 that ChatGPT search uses Bing's index and other sources. OpenAI's crawler page names its own OAI-SearchBot and does not mention IndexNow."
  - q: "Does IndexNow guarantee that Bing indexes my page?"
    a: "No. The indexnow.org FAQ says a submitted URL is not guaranteed to be indexed. Bing still decides based on crawl quota, scheduling and page quality."
  - q: "How do I turn on IndexNow on WordPress?"
    a: "Install a plugin that supports it: the IndexNow plugin, Yoast, RankMath, AIOSEO or SEOPress (Bing IndexNow get-started page). Then check in Bing Webmaster Tools that Bing receives your URLs."
sources:
  - label: "IndexNow: FAQ"
    url: "https://www.indexnow.org/faq"
  - label: "IndexNow: Documentation"
    url: "https://www.indexnow.org/documentation"
  - label: "IndexNow: Participating search engines (searchengines.json)"
    url: "https://www.indexnow.org/searchengines.json"
  - label: "Bing: IndexNow get started"
    url: "https://www.bing.com/indexnow/getstarted"
  - label: "Cloudflare Docs: Crawler Hints"
    url: "https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "Yoast: What is ChatGPT Search (and how does it use Bing data)? (2024-11-12)"
    url: "https://yoast.com/chatgpt-search/"
---

## What is IndexNow?

IndexNow is a free protocol that tells search engines when a URL on your site changes. You send one request with the URL and a key. The engine that gets it shares it with the other participating engines (indexnow.org FAQ).

Without IndexNow, a search engine finds your change on its next crawl. For a small property management site, that crawl may come days or weeks later. With IndexNow, you tell the engine on the day you publish.

Two limits matter:

- **No guarantee.** The FAQ says a submitted URL is not guaranteed to be indexed. The engine still weighs crawl quota and page quality.
- **No ranking boost.** IndexNow is a notice, not a signal of quality. A thin city page stays thin.

## Which engines use IndexNow?

Bing is the main engine that uses IndexNow for a US property manager. The official engine list on indexnow.org has 7 entries, read on 2026-10-19.

| Endpoint on the list | Who it serves | Matters for a US manager? |
|---|---|---|
| Bing | Bing search | Yes, most |
| Yandex | Russian search | No |
| Seznam | Czech search | No |
| Naver | Korean search | No |
| Yep | Small independent engine | Little |
| Internet Archive | Wayback Machine | Little |
| Amazonbot | Amazon | Unclear |

Google is not on the list. Keep your sitemap in Google Search Console for Google, Gemini and AI Overviews.

## Does IndexNow help ChatGPT search?

IndexNow may help ChatGPT search, but no first-party source confirms it. Here is what each source says.

- **Yoast (November 2024):** ChatGPT search "uses Bing's index and other sources". Yoast adds that a site missing from Bing's index will not appear in ChatGPT results.
- **OpenAI (read 2026-10-19):** OpenAI runs its own search crawler, OAI-SearchBot. Its crawler page does not mention Bing or IndexNow.

Our reading: a page that Bing holds is a page that more AI tools can find. That is a hypothesis, not a fact. Keep OAI-SearchBot allowed in robots.txt either way. OpenAI says a robots.txt change takes about 24 hours to reach its search systems.

## How do you turn on IndexNow?

You turn on IndexNow in one of 3 ways. Pick the first one that fits your site.

**Option 1: your platform does it already.** Bing's get-started page lists Wix Studio, Duda, GoDaddy Website Builder and Shopify as built in. Many property management sites run on hosted templates. Ask your web vendor if IndexNow is on.

**Option 2: a plugin or a CDN switch.**

- **WordPress:** the IndexNow plugin, Yoast, RankMath, AIOSEO or SEOPress.
- **Cloudflare:** turn on Crawler Hints under Caching, then Configuration. It works on the Free plan. It sends IndexNow notices based on cache misses, so its notices are guesses about change, not confirmed edits.

**Option 3: do it by hand.** Use these steps for a custom site:

1. **Make a key** of 8 to 128 characters: letters, digits and dashes only.
2. **Save the key** in a UTF-8 text file named after the key, for example "abc123xyz.txt".
3. **Upload the file** to your site root. Each subdomain needs its own key file.
4. **Send changed URLs** with a POST to api.indexnow.org. One request holds up to 10,000 URLs.
5. **Read the response code.** 200 means accepted. 202 means the key check is pending.
6. **Check Bing Webmaster Tools** to see that Bing got the URLs.

The response codes from the IndexNow documentation:

| Code | Meaning | What to do |
|---|---|---|
| 200 | URL submitted | Nothing |
| 202 | Received, key check pending | Wait, then check again |
| 400 | Bad format | Fix the JSON or the URL |
| 403 | Key not valid or file not found | Check the key file URL |
| 422 | URL not on your host, or key mismatch | Send only your own URLs |
| 429 | Too many requests | Slow down |

## Which property management pages should you send?

Send only pages that changed. Bing's get-started page says to submit URLs added, changed or deleted since you began to use IndexNow. Do not resend your whole site. Submitted URLs count toward your crawl quota.

For a property manager, the pages that change and matter most are:

- **Fee page:** when a percent, a leasing fee or a guarantee changes.
- **City pages:** when you add a city or rewrite a page.
- **Reviews and case studies:** when you add new proof.
- **Removed pages:** when you drop a city or merge pages. Send the old URL too, so Bing sees the 301 or 404.

Most rental listing pages change daily. If a plugin pings each listing change, that is fine. Just make sure the listing pages do not crowd out owner pages in your own checks.

## What did we do on citata.ai?

We use IndexNow on citata.ai (our data, 2026-10-19). The key file sits in the site root. After each production deploy, a script lists the pages that changed and sends only those. We send the sitemap to Google Search Console in the same step, because Google ignores IndexNow.

Our plan for the Fridman Properties site also lists Bing and IndexNow work. Fridman Properties is a Chicago-area manager; its owner is CEO of MyRemotely, our partner. That plan has no measured result yet, so we claim none.

To check whether AI tools cite you after the change, read our guide to [tracking AI traffic and citations](/guides/track-ai-traffic-property-management).

## Is IndexNow worth the time for a 50 to 500 door manager?

IndexNow is worth the time when setup is small. On a hosted platform, a plugin or Cloudflare, it is one switch. On a custom site, it is one key file and one script that runs after each deploy.

Do not pay extra for it as a separate service. It is a free protocol with one key file. Put the saved budget into owner pages and directory profiles, which AI answers quote. For the full order of work, see the [AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website).
