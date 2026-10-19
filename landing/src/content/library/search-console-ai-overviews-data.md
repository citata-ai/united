---
title: "AI Overviews and AI Mode Data in Search Console — Citata.ai"
description: "Search Console counts AI Overviews and AI Mode traffic in the Web Performance report but does not split it out. Here is how property managers find lost clicks."
headline: "AI Overviews and AI Mode Data in Search Console"
dek: "Google counts AI clicks in the normal Performance report. You must find them by method."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Partly. Google counts clicks and impressions from AI Overviews and AI Mode in the Search Console Performance report, under the Web search type, but it does not show them as a separate filter. To find the effect, compare the same months year over year and look for queries where impressions held and clicks fell. Check that report each month for your owner and city queries."
visible: false
cluster: "ai-search"
kind: "how-to"
priority: 4
inspired_by: "https://gogoodjuju.com/how-to-do-an-seo-audit-for-a-property-management-company/"
faq:
  - q: "Does Google Search Console show AI Overview clicks?"
    a: "Yes, but mixed with other results. Google says sites in AI features are included in the Performance report under the Web search type. Google does not give a filter that separates AI Overview or AI Mode clicks."
  - q: "How does Search Console count a link in an AI Overview?"
    a: "An AI Overview takes one position on the results page, and all links inside it get that same position. A click on an external link in the AI Overview counts as a click. Standard impression rules apply."
  - q: "How are AI Mode follow-up questions counted?"
    a: "Google says a follow-up question in AI Mode is a new query. The impressions, position and clicks from that answer go to the new query."
  - q: "Why do I have more impressions but fewer clicks?"
    a: "A likely cause is an AI Overview on the query that answers the question on Google. Ahrefs found that an AI Overview correlates with a 58% lower click rate for the top result (December 2023 vs December 2025). Check the query in Google to confirm."
  - q: "Which Search Console reports should a property manager check each month?"
    a: "Check the Performance report for owner queries with a year-over-year date compare, the Pages tab for your city and fee pages, and Page indexing for new pages. Use regex filters to group owner and city queries."
sources:
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Search Console Help: What are impressions, position, and clicks?"
    url: "https://support.google.com/webmasters/answer/7042828"
  - label: "Search Console Help: Performance report (Search results)"
    url: "https://support.google.com/webmasters/answer/7576553"
  - label: "Search Console Help: Advanced filtering and comparison"
    url: "https://support.google.com/webmasters/answer/17011165"
  - label: "Ahrefs: AI Overviews reduce clicks (December 2025 update)"
    url: "https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/"
---

## Does Search Console split AI Overview clicks?

Search Console does not split AI Overview clicks from other clicks. Google says sites that appear in AI features "are included in the overall search traffic in Search Console". They are reported in the Performance report, under the "Web" search type (Google Search Central). There is no "AI Overview" or "AI Mode" filter in the report.

So you see the effect of AI, not the AI clicks themselves. Here is how Google counts each part (Search Console Help, "What are impressions, position, and clicks?"):

| Feature | Impression | Position | Click |
|---|---|---|---|
| AI Overview | Standard rules: counted when the item shows on the current page of results | The AI Overview takes 1 position; all links in it get that position | A click on an external link in the AI Overview |
| AI Mode | Standard rules | Same method as a normal results page | A click on an external link in AI Mode |
| AI Mode follow-up | Counted for the follow-up, as a new query | Same as above | Counted for the new query |

Two results follow from this. First, a page cited in an AI Overview can show a good position and a low click rate. Second, AI Mode conversations can create many long, new queries in your report.

## How do you find queries that lost clicks?

Find them with a year-over-year compare on the same months. Ahrefs compared 300,000 keywords in December 2023 and December 2025. It found that an AI Overview correlates with a 58% lower average click rate for the top-ranking page (Ahrefs, 2025). That is a correlation across many sites, not a number for your site.

Do these steps in Search Console:

1. **Open** Performance → Search results. Keep Search type on "Web".
2. **Click** Date → Compare. Pick the last 3 months vs the same 3 months last year. Search Console allows only one compare at a time (Search Console Help).
3. **Set** granularity to Weekly or Monthly. Google suggests this to remove the day-of-week effect.
4. **Add a query filter** with a regex. Search Console uses RE2 syntax and is case-insensitive by default.
5. **Open** the Queries tab. Show Clicks, Impressions, CTR and Position. Sort the table by the change in clicks.
6. **Check the top 10 losers in Google** in a private window. Note if an AI Overview shows.

Useful regex filters for a property manager:

| Group | Regex example |
|---|---|
| Owner intent | `property manag\|management company\|manage my (house\|rental)` |
| Fees | `fee\|cost\|how much\|percent` |
| City | `chicago\|evanston\|oak park` (your cities) |
| Brand | `yourbrand\|your brand` (your name and its misspellings) |

Watch for: brand queries. If brand clicks hold and owner-intent clicks fall, the cause is likely in search results, not in your reputation.

## What do impressions without clicks mean?

Impressions without clicks mean Google showed your page, but the searcher did not need to visit. The common causes are an AI Overview, a map pack or a featured answer on the page. Your page may still be the source of that answer.

Read the pattern this way:

| Impressions | Clicks | Position | Likely meaning | What to do |
|---|---|---|---|---|
| Up | Down | Same | AI Overview or other feature answers on Google | Check the query live; make the page the best source |
| Down | Down | Worse | You lost ranking | Check content, links, competitors |
| Same | Same | Same | No change | Leave it |
| Up | Up | Better | You gained ranking | Find what worked and repeat it |

A worked example with sample numbers: a page had 4,000 impressions and 120 clicks for "property management fees chicago" last year, so a 3.0% CTR. This year it has 4,400 impressions and 70 clicks, so a 1.6% CTR. Position stayed near 3. Demand did not fall, since impressions rose 10%. The click rate fell by almost half. That pattern points to a feature on the results page. Open the query and look.

Google says the clicks that come from AI features are "higher quality", meaning people stay longer on the site (Google Search Central). Google gives no number for this. Check it yourself: compare form fills per visit before and after.

## Which reports should you check each month?

Check 4 views once a month, on the same day.

- [ ] **Performance, owner regex, year-over-year compare.** Write down clicks, impressions and CTR.
- [ ] **Performance, Pages tab.** Check your city pages, fee page and rental analysis page.
- [ ] **Page indexing.** Confirm new city and guide pages are indexed.
- [ ] **Performance, brand regex.** Brand searches show if people heard of you elsewhere, for example in ChatGPT.

Search Console does not show ChatGPT, Claude or Perplexity at all. For those, use analytics referrals, a "how did you hear about us" field and monthly prompt checks. Our guide on [how to track AI traffic](/guides/track-ai-traffic-property-management) covers that setup. Bing Webmaster Tools covers Copilot.

Note: the newest data in Search Console can be preliminary and can change within hours (Search Console Help). Pull the monthly numbers a few days after the month ends.

## What should you do when clicks fall?

Clicks can fall while your page is still the source of the answer. So do not delete a page because its clicks fell. First check if Google's answer uses your facts.

Then make the page worth the click:

1. **Answer first** in 2–3 sentences, so AI can quote you.
2. **Add what an AI summary leaves out:** your fee table, your local numbers, a free rental analysis.
3. **Link the next step** from the answer: "Get a rent estimate for your address".
4. **Track leads, not visits.** A page with fewer clicks and more form fills is a win.

For more on why owner leads from Google fall, read [why owner leads are dropping](/guides/why-owner-leads-are-dropping).
