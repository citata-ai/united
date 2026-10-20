---
title: "Move Your Property Management Website Without Losing SEO — Citata.ai"
description: "Export every URL and post, map each old URL to a new one, add 301 redirects, keep them a year or more, and watch Search Console. A step list for PM sites."
headline: "Move Your Property Management Website Without Losing SEO"
dek: "Most lost rankings after a vendor switch come from missing redirects, not from the new design."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Before you leave a vendor, export every URL, blog post, image and form, and get your domain under your own registrar account. Map each old URL to its closest new URL and set server-side 301 redirects. Google says to keep redirects for at least 1 year and to expect ranking changes for a few weeks. Then watch both sitemaps and your owner leads in Search Console and Google Analytics."
visible: false
cluster: "pm-marketing"
kind: "how-to"
priority: 3
inspired_by: "https://www.propertymanagerwebsites.com/blog/no-blog-left-behind-the-seo-fallout-of-a-botched-site-migration"
faq:
  - q: "Will I lose my Google rankings if I change website vendors?"
    a: "You can keep most of them if each old URL redirects to the matching new URL. Google Search Central says 301 and other permanent redirects do not cause a loss in PageRank, but rankings can change for a few weeks while Google recrawls."
  - q: "How long should I keep 301 redirects after a site move?"
    a: "Google Search Central says to keep redirects as long as possible, generally at least 1 year. For users, it suggests you consider keeping them for good."
  - q: "What should I export before I cancel my website vendor?"
    a: "Export a full list of URLs, every blog post with its date and images, page titles and descriptions, form settings, redirects already in place, and your Search Console and Google Analytics access. Do it before the cancel date, while you still have access."
  - q: "Do I need the Change of Address tool in Search Console?"
    a: "Only if the domain or subdomain changes, for example from example.com to example.net. Google says you do not need it if you keep the same domain and only change the platform or URLs."
  - q: "What happens to my blog posts on the old platform?"
    a: "They go away when the old site shuts down unless you copy them and redirect each old post URL. Check your contract: some vendors keep the license to stock images, so you may need to replace those pictures."
sources:
  - label: "Google Search Central: Site moves with URL changes"
    url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes"
  - label: "ICANN: FAQs for registrants, transferring your domain name"
    url: "https://www.icann.org/resources/pages/name-holder-faqs-2017-10-10-en"
  - label: "Property Manager Websites: FAQ, do I own my website (read 2026-10-19)"
    url: "https://www.propertymanagerwebsites.com/faq"
  - label: "Citata.ai: Fridman Properties case study"
    url: "https://citata.ai/case-studies/fridman-properties"
---

## What should I export before I leave a website vendor?

Export everything you need before the cancel date, while your logins still work. After the old site goes dark, a missed page is hard to get back.

Use this checklist. Tick each line before you give notice.

- [ ] **Domain.** Confirm the domain is in a registrar account in your company's name. ICANN says a registrar may block a transfer within 60 days of a new registration or a change of registrant.
- [ ] **URL list.** Crawl the site and save every URL. Add the URLs from the sitemap and from Search Console's pages report.
- [ ] **Blog posts.** Save the text, publish date, author, title tag and meta description of each post.
- [ ] **Images and files.** Download photos, PDFs and owner documents. Check who holds the license for each picture.
- [ ] **Redirects already in place.** Ask the vendor for the current redirect list. Old redirects must survive the move.
- [ ] **Forms.** Note each form's fields, where it sends leads, and its thank-you page.
- [ ] **Tracking.** Make sure you, not the vendor, own the Google Analytics and Search Console properties.
- [ ] **Listings feed.** Write down how rental listings reach the site from your PM software.

Licenses matter here. The Property Manager Websites FAQ says you own the site's HTML once it is live and paid for. It will give you a download on request. The same answer says licensed stock images and graphics stay under its license and cannot transfer. Other vendors write it differently, so read your own contract.

## How do I map and redirect old URLs?

Map every old URL to the closest new URL, then set a server-side permanent redirect for each one. Google Search Central calls this mapping step "important" and recommends 301 or 308 redirects.

A mapping is a 2-column table. Here is what one looks like for a property management site.

| Old URL | New URL | Status |
|---|---|---|
| /schaumburg-property-management.html | /schaumburg-property-management | 301 |
| /owners/fees | /property-management-fees | 301 |
| /blog/2023/05/section-8-tips | /blog/section-8-tips | 301 |
| /tenant-portal | /tenant-portal | Keep, same URL |
| /old-promo-2019 | /property-management | 301 to the closest page |

Rules Google gives in the same guide:

1. **Use permanent redirects.** Google says 301 and other permanent redirects do not cause a loss in PageRank.
2. **Do not chain redirects.** Googlebot follows up to 10 hops, but Google advises to point straight at the final URL.
3. **Update internal links.** Change links on the new site to the new URLs, not to the old ones.
4. **Test the redirects.** Use the URL Inspection tool for single URLs and a script for the full list.
5. **Keep redirects for at least 1 year.** Google says this lets it move all signals, including links from other sites. For users, consider keeping them for good.

If the domain itself changes, also submit a Change of Address in Search Console. Google says you only need it for a move from one domain or subdomain to another.

## What happens to blog posts on the old platform?

Blog posts on the old platform disappear when the old site shuts down, unless you move them and redirect each URL. For example, a post that ranks for a city fee question loses that spot if its URL now returns a 404.

Do 3 things for each post:

- **Move it.** Copy the text, images, title tag and date to the new site.
- **Redirect it.** Point the old post URL to the new post URL with a 301.
- **Check it.** Open the old URL in a browser and confirm it lands on the new post.

Do not merge 20 old posts into one new page unless they cover the same topic. Google's guide says to redirect each old URL to its matching new URL. A redirect to the home page tells the reader nothing about the topic they asked for.

## A real move: what we kept

We moved one property management site off a hosted template in October 2026. The site belongs to Fridman Properties, a related party: its owner is CEO of MyRemotely, our partner.

The old site was a hosted template "powered by PMW". We mirrored 93 raw HTML files, rebuilt the site as a static site, and kept 89 pages with their canonical tags. We also kept the 4 old 301 redirects the site already had. A script compared title, description, canonical, robots tags, Open Graph tags, structured data, visible text and internal links on each page. It found 0 differences. The full numbers are in the [Fridman Properties case study](/case-studies/fridman-properties).

What we learned: the boring parts matter most. The 4 old redirects were easy to miss, because they lived in the vendor's settings, not in the pages.

## How do I check traffic after launch?

Check traffic after launch in Search Console, Google Analytics and your lead log, every week for the first 2 months. Google says the move can take a few weeks for most pages on a medium-sized site, and rankings may change during that time.

| When | What to check | Where |
|---|---|---|
| Day 1 | Every old URL returns 301 to the right new URL | Script or crawler |
| Day 1 | Forms send owner leads to the right inbox | Test submit |
| Week 1 | New sitemap submitted, old sitemap kept | Search Console, Sitemaps |
| Weeks 1–8 | Indexed pages move from the old sitemap to the new one | Search Console |
| Weeks 1–8 | 404 errors on old URLs | Search Console, Pages report |
| Monthly | Owner leads from organic search vs. the same month last year | GA4 and your CRM |

Google suggests you submit both the old and the new sitemap. Over time, indexed pages in the old sitemap fall to zero and the new one rises. If a page falls out and does not come back, check its redirect first.

**What to do:** start the export checklist this week, before you sign with a new vendor. Before you sign, read the ownership terms in the new contract too. Never cancel the old vendor until every redirect passes the day-1 test.

This is general information, not legal advice. Check your contract or ask a local attorney.
