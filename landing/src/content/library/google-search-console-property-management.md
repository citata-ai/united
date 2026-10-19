---
title: "Google Search Console for Property Managers: Owner Queries — Citata.ai"
description: "Use Google Search Console to find the searches rental owners use, filter out tenant queries with regex, read the Page indexing report and link it to GA4."
headline: "Google Search Console for Property Managers"
dek: "Most of your search clicks come from tenants. Two regex filters show the owners."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Open the Performance report in Google Search Console, add a Custom (regex) query filter for owner words such as \"management\", \"manager\" and \"fees\", and add a second filter that excludes tenant words such as \"for rent\" and \"apartments\". The result is your owner query list. Then use the Page indexing report to find owner pages Google has not indexed, and link Search Console to GA4 to see those searches next to your owner leads."
visible: false
cluster: "pm-marketing"
kind: "how-to"
priority: 4
inspired_by: "https://www.propertymanagerwebsites.com/blog/google-search-console-optimization-what-it-really-tells-you"
faq:
  - q: "How do I find owner searches in Google Search Console?"
    a: "In the Performance report, add a Queries filter, choose Custom (regex), and enter owner words such as (property manag|management compan|manager|fees). Then sort by impressions to see what owners search for."
  - q: "How do I remove tenant searches in Search Console?"
    a: "Add a second Custom (regex) query filter and choose \"Doesn't match regex\". Enter tenant words such as (for rent|apartment|pay rent|portal|login|maintenance)."
  - q: "Is the Search Console regex filter case-sensitive?"
    a: "No. Google's help page says regex matching is case-insensitive by default. Add (?-i) at the start to make it case-sensitive."
  - q: "What does \"Crawled - currently not indexed\" mean?"
    a: "Google crawled the page but did not index it. Google says this often needs no action, but if the page is an important owner page, improve it and link to it from other pages."
  - q: "How much data does Search Console keep?"
    a: "Search Console keeps 16 months of data, so the linked GA4 reports also show at most 16 months. Export your owner query list each month if you want a longer history."
sources:
  - label: "Search Console Help: Performance report (Search results), advanced filtering and comparison"
    url: "https://support.google.com/webmasters/answer/17011165?hl=en"
  - label: "Search Console Help: Performance report (Search results), overview"
    url: "https://support.google.com/webmasters/answer/7576553?hl=en"
  - label: "Search Console Help: Page indexing report"
    url: "https://support.google.com/webmasters/answer/7440203?hl=en"
  - label: "Google Search Central Blog: Introducing the branded queries filter in Search Console (2025-11-20, updated 2026-03-11)"
    url: "https://developers.google.com/search/blog/2025/11/search-console-branded-filter"
  - label: "Google Analytics Help: Search Console links"
    url: "https://support.google.com/analytics/answer/10737381?hl=en"
  - label: "Goodjuju: Property Management Owner Lead Source Study 2026"
    url: "https://gogoodjuju.com/property-management-lead-source-report-2026/"
---

## Why should a property manager use Search Console?

Google Search Console shows the exact searches that make your site appear on Google. For owner leads, that matters more than any other free tool. In Goodjuju's fall 2026 study of 35 PM companies, Google Search and the Map Pack gave 50.6% of owner leads (Goodjuju, 2026-10). Search Console is where you see that channel from the inside.

The Performance report shows 4 numbers for each search (Search Console Help):

| Metric | What it means | What to watch for owner pages |
|---|---|---|
| Clicks | People who clicked to your site | Owner clicks per month, trend over 6 months |
| Impressions | Times your site showed in results | Owner searches where you show but get no clicks |
| CTR | Clicks divided by impressions | Low CTR on an owner query: fix the page title |
| Average position | Your typical rank for the search | Owner queries at position 5 to 15: the closest wins |

The report opens on the past 3 months. The newest data can still change for a few hours.

## How do I find owner queries in Search Console?

Find owner queries with a regex filter on the Queries dimension. Regex (a short text pattern) lets you match many words at once. Search Console uses RE2 syntax and matches anywhere in the query unless you add ^ or $ (Search Console Help).

Steps:

1. **Open Performance, then Search results.** Set the date range to the last 3 months.
2. **Click "+ Add filter", then Queries.** Choose "Custom (regex)".
3. **Keep "Matches regex".** Enter your owner pattern, for example: (property manag|management compan|manager|management fee|rental management|manage my)
4. **Click Apply.** Turn on all 4 metrics.
5. **Sort by impressions.** The top rows are the owner searches where Google already shows you.
6. **Export the list.** Save it each month. Search Console keeps 16 months of data.

Adjust the pattern for your market. Add your city and nearby suburbs, and phrases such as "rent my house" or "section 8 landlord" if you serve those owners.

Matching is case-insensitive by default. Add (?-i) at the start of a pattern if you need case to matter.

A second filter helps too. Since 2026-03-11, the branded queries filter is open to all eligible sites (Google Search Central Blog). It splits branded searches (your company name) from non-branded ones. Google says it uses an AI-assisted system, not regex, and some queries may be misread. It works only on top-level properties with enough search volume. Non-branded owner queries show how new owners find you.

## How do I filter out tenant queries?

Filter out tenant queries with a second regex filter set to "Doesn't match regex". Tenant searches often outnumber owner searches on a PM site. Rental listings, rent payment and maintenance pages pull most of them.

Example exclude pattern:

(for rent|apartment|houses for rent|pay rent|portal|login|maintenance request|apply|application)

Use this table to sort queries you are not sure about:

| Query type | Example | Keep as owner query? |
|---|---|---|
| Service + city | "property management company Tampa" | Yes |
| Fees | "property management fees Tampa" | Yes |
| Owner problem | "how to rent my house out" | Yes |
| Listings | "3 bedroom house for rent Tampa" | No |
| Resident tasks | "[company] tenant portal login" | No |
| Brand only | "[company name]" | Mixed: check the landing page |

Watch for: owner queries that land on a tenant page. Use the Compare tab or add a Page filter to see which page ranks. If "property management fees" sends people to your rental listings, the fee page is weak or missing.

Filtering changes totals. Google notes that filtered views can lose rows because of data limits and anonymized queries. So your owner total is a floor.

## What do the indexing reports mean?

The Page indexing report shows which of your URLs Google has indexed and which it has not. Not indexed is not always a problem. Check each reason against one question: should this page be in Google? (Search Console Help.)

| Reason in the report | What it means | What to do on a PM site |
|---|---|---|
| Crawled - currently not indexed | Google crawled the page but did not index it | Often nothing. If it is an owner page, add depth and internal links |
| Discovered - currently not indexed | Google knows the URL but has not crawled it | Wait. Make sure the page is in your sitemap and linked |
| Duplicate without user-selected canonical | Google chose a different URL as the main one | Inspect the URL. Common with listing pages |
| URL marked 'noindex' | The page tells Google not to index it | Fine for portals and thank-you pages. Remove it from owner pages |
| Not found (404) | The page returns 404 | Fix only if you link to it. Use a 301 if the page moved |
| Soft 404 | The page says "not found" but returns a success code | Common with expired listings. Return a real 404 or add content |
| URL blocked by robots.txt | robots.txt blocks crawling | Unblock owner pages. Use noindex to keep a page out |

After you fix every case of one issue, click "Validate fix". Google says validation can take about 2 weeks.

Check these owner pages first: home page, property management services, fees, each city page, and the owner contact page. Use the URL Inspection tool on each one.

## How do I link Search Console to GA4?

Link Search Console to GA4 from the GA4 Admin screen. Then GA4 shows Google search terms next to your site behavior and owner leads (Google Analytics Help).

Steps:

1. **Check your roles.** You need the Editor role in GA4 and verified owner status in Search Console.
2. **In GA4, open Admin, then Product links, then Search Console links.** Click Link.
3. **Pick the Search Console property.** Click Confirm, then Next.
4. **Pick your web data stream.** Click Next and submit.
5. **Publish the reports.** The Search Console report collection is unpublished by default. Open Library and publish it.

Limits from Google's help page:

- One web data stream links to one Search Console property.
- Data reaches GA4 about 48 hours after Search Console collects it.
- The reports show at most 16 months.
- Search Console metrics work only with Search Console dimensions plus Landing page, Device and Country.

To see which AI tools send visitors as well, read our guide to [tracking AI traffic on a property management site](/guides/track-ai-traffic-property-management). For a full page-level check, use the [AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website).

## A monthly Search Console routine

Spend 20 minutes on Search Console once a month:

- [ ] Run the owner regex filter and export the top 50 owner queries
- [ ] Note owner clicks and impressions next to last month
- [ ] Find owner queries at position 5 to 15 and improve those pages
- [ ] Check the Page indexing report for owner pages that dropped out
- [ ] Check the non-branded view if your site has it
- [ ] Compare owner clicks with owner leads in GA4
