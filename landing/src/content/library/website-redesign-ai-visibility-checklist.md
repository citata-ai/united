---
title: "Website Redesign Checklist to Keep Google and AI Visibility — Citata.ai"
description: "Before a property management site redesign, map every URL to a 301, freeze key facts and keep AI crawlers allowed. Then check 30 days of data after launch."
headline: "Website Redesign Checklist to Keep AI Visibility"
dek: "A new site can lose what the old one earned. These checks keep URLs, facts and crawlers intact."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Before a redesign, list every old URL and map each one to its new URL with a permanent 301 redirect. Keep the same company name, address, phone, fees and service cities. After launch, check robots.txt for Googlebot, OAI-SearchBot and other AI crawlers. Submit the new sitemap, then track pages indexed, AI citations and owner leads for 30 days."
visible: false
cluster: "ai-search"
kind: "checklist"
priority: 5
inspired_by: "https://www.propertymanagerwebsites.com/blog/template-vs-custom-website-design-which-site-design-is-right-for-me"
faq:
  - q: "Which redirect should I use when I redesign my property management website?"
    a: "Use a server-side permanent redirect, 301 or 308. Google says these tell it the new URL is the one to show. Send each old URL straight to its matching new page, not to the home page."
  - q: "How long should I keep redirects after a redesign?"
    a: "Google says to keep redirects for at least 1 year, and from a user view, keep them for good. Old links from directories and emails keep working that way."
  - q: "How do I check that AI crawlers can reach my new site?"
    a: "Open yoursite.com/robots.txt and look for rules on Googlebot, Bingbot and OAI-SearchBot. OpenAI says a robots.txt change can take about 24 hours to apply to ChatGPT search."
  - q: "Will my Google rankings drop after a redesign?"
    a: "Rankings may move for a while. Google says a medium-sized site can take a few weeks or more before the new URLs show in search. Correct redirects keep the drop small."
  - q: "What should I measure in the first 30 days after launch?"
    a: "Measure 404 errors, pages indexed in Search Console, owner form leads in GA4 and the share of AI answers that name you. Compare each with the weeks before launch."
sources:
  - label: "Google Search Central: Site moves with URL changes"
    url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes"
  - label: "Google Search Central: Redirects and Google Search"
    url: "https://developers.google.com/search/docs/crawling-indexing/301-redirects"
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Analytics Help: Key events"
    url: "https://support.google.com/analytics/answer/13128484"
---

In October 2026 we helped port a Chicago property manager's site to a new stack. First we mirrored 93 HTML files from the old site. Before launch, a script compared old and new pages on 8 fields. It found 0 differences. Here is the checklist we use.

## What should you do before a property management website redesign?

Before a redesign, freeze a full copy of what the old site says and where it lives. You cannot check the new site against an old site that is gone.

Pre-launch checklist:

- [ ] **Export every old URL.** Google lists the sources: sitemaps, server logs, analytics, your CMS and the Search Console links report.
- [ ] **Save the old sitemap.** Google says to keep a copy of the old URL sitemap before the move.
- [ ] **Save each page's head.** Title, meta description, canonical, robots tag and structured data (JSON-LD).
- [ ] **Save the visible text** of each landlord page: fees, guarantees, cities, contract terms.
- [ ] **Note your baseline numbers.** Pages indexed, monthly owner leads, and the share of AI answers that name you.
- [ ] **Pick a quiet week.** Google says to move one thing at a time, ideally during a low-traffic time.

## Which URLs must redirect?

Every old URL that changes must redirect to its closest new page. That includes city pages, fee pages, blog posts and PDFs. Google says to include images, videos, JavaScript and CSS files in the list too.

Rules from Google's site move guide:

| Rule | What Google says | Why it matters for a property manager |
|---|---|---|
| Use a permanent redirect | 301 or 308, server-side | Google treats the new URL as the one to show |
| No chains | Send old URLs straight to the end page; if you must chain, keep it short, ideally no more than 3 hops | Each hop slows crawlers and users |
| No mass home-page redirects | Do not send many old URLs to one unrelated page | A "Naperville property management" link should land on the Naperville page |
| Keep redirects | At least 1 year; from a user view, keep them for good | Directory links and old emails keep working |
| Self-canonical | Each new page points its canonical to itself | Google knows which URL is final |

In the Chicago port, the old site had 4 permanent redirects. We kept all 4, and the new site has a canonical tag on 89 pages. Disclosure: the client, Fridman Properties, is owned by the CEO of MyRemotely, our partner.

## Which facts must stay the same?

Your entity facts must stay the same: company name, address, phone, service cities, fees and license details. AI engines and directories match your site to your listings by these facts. A redesign is not the time to rename "Acme Property Management" to "Acme Homes".

Freeze these facts in one sheet and check each on the new site:

| Fact | Where it appears | Check |
|---|---|---|
| Legal and brand name | Header, footer, schema, About | Same spelling everywhere |
| Address and phone | Footer, Contact, Google Business Profile | Same format as your listings |
| Management fee and leasing fee | Fee page, FAQ | Same numbers, same terms |
| Service cities | City pages, schema areaServed | No city lost |
| Owner FAQ answers | FAQ page | Same text, or better and checked |

Watch for: a new template that drops the FAQ or the fee table. Google says its AI features cite pages that are indexed and can show a snippet. A deleted fee table cannot be quoted.

## How do you check crawler access after launch?

Check crawler access on launch day, before you announce the new site. New platforms often ship with a robots.txt or firewall setting that blocks bots.

Post-launch steps:

1. **Open /robots.txt.** Make sure it does not say "Disallow: /" for all user agents.
2. **Check Googlebot and Bingbot.** Google says Googlebot's robots.txt rules control AI Overviews and AI Mode too.
3. **Check OAI-SearchBot.** OpenAI says OAI-SearchBot puts sites in ChatGPT search. Blocking it keeps you out of ChatGPT search answers.
4. **Decide on GPTBot.** GPTBot collects content that may train OpenAI models. Blocking it does not remove you from ChatGPT search.
5. **Look for noindex tags.** Staging sites often carry noindex, and teams forget to remove it.
6. **Test 20 old URLs.** Each should return one 301 hop to the right page, then a 200.
7. **Submit the new sitemap** in Google Search Console and Bing Webmaster Tools.

OpenAI says robots.txt changes can take about 24 hours to apply to ChatGPT search. Google says changes to snippet controls can take days to months.

## What to measure in the first 30 days?

Measure four things against your baseline: errors, indexing, leads and AI mentions. Google says rankings may move during a site move. A medium-sized site can take a few weeks or more before Google shows the new URLs.

| Week | Check | Tool | Fix if |
|---|---|---|---|
| 1 | 404 errors and redirect chains | Server logs, Search Console | Any old URL returns 404 |
| 1 | Owner form submits | GA4 key event | Leads drop to zero |
| 2 | New sitemap read | Search Console Sitemaps report | Errors on new URLs |
| 2–4 | Pages indexed | Search Console page indexing | Key landlord pages missing |
| 4 | AI mention rate | Same prompt set as baseline | Rate falls on all engines |

Set the owner form as a key event in GA4 before launch. Google Analytics says key events start counting from the time you create them and do not change past data. If you add the key event after launch, you lose the before-and-after view.

Do not judge AI mentions from one test. Run the same landlord prompts, on the same engines, the same number of times as your baseline. For a simple monthly setup, read [how to track AI traffic and AI mentions](/guides/track-ai-traffic-property-management).

## What did we learn from the Chicago port?

The port worked because we treated the old site as the spec. The parity check compared title, description, canonical, robots, Open Graph tags, JSON-LD, visible text and internal links on each page. It found 0 differences. The new build has 87 URLs in its sitemap.

Two honest notes. First, this was a 1:1 port, not a content change, so it was easier than a full redesign. Second, we have no traffic or lead results from it yet. We will not claim gains we have not measured.

If your redesign also adds new content, do the port first, check it, then change pages one at a time. For the AI side of the new site, use the [AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website).
