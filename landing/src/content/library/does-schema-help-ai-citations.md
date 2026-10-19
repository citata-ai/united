---
title: "Does Schema Markup Help AI Citations? What the Data Says — Citata.ai"
description: "An Ahrefs test of 1,885 pages found no clear AI citation lift from JSON-LD schema. Here is what that means for a property management site, and what to keep."
headline: "Does Schema Markup Help AI Citations"
dek: "Ahrefs added schema to 1,885 pages and saw no clear lift in ChatGPT or AI Mode."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Not in a way anyone has measured yet. In a May 2026 Ahrefs study, 1,885 pages that added JSON-LD schema got about 2.2% more ChatGPT citations and 2.4% more Google AI Mode citations than 4,000 control pages, and both numbers were too small to tell apart from zero. Keep schema that is true and matches your page, because Google uses it for other features. Do not buy schema as a way to get named by AI."
visible: false
cluster: "ai-search"
kind: "data"
priority: 3
inspired_by: "https://www.stanventures.com/news/schema-markup-has-no-meaningful-impact-on-ai-citations-7231.md.txt"
faq:
  - q: "Does schema markup make ChatGPT cite my website?"
    a: "There is no proof that it does. In the Ahrefs study of 1,885 pages, adding JSON-LD gave about 2.2% more ChatGPT citations than control pages, and that result was not distinguishable from zero."
  - q: "Do I need special schema for Google AI Overviews or AI Mode?"
    a: "No. Google's guide to AI features says there is no special schema.org structured data you need to add, and no extra technical requirements. The normal Search rules apply."
  - q: "Should I remove schema from my property management website?"
    a: "No. Keep schema that is true and matches the visible text. Google still uses LocalBusiness and other markup for its own features, and wrong or missing data costs more than correct markup."
  - q: "Is FAQ schema still worth adding?"
    a: "FAQ schema no longer gives a rich result in Google. Google stopped showing the FAQ rich result on May 7, 2026. FAQ text on the page is still useful to readers and to AI engines that read the page."
  - q: "Why did AI-cited pages have more schema in the Ahrefs data?"
    a: "Ahrefs found AI-cited pages were almost 3 times more likely to have JSON-LD. That is a correlation: well-run sites tend to add schema and also do the other work that earns citations."
sources:
  - label: "Ahrefs: Schema markup and AI citations study (Louise Linehan, 2026-05-11)"
    url: "https://ahrefs.com/blog/schema-ai-citations/"
  - label: "Google Search Central: AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Google Search Central: Latest documentation updates (FAQ rich result removed)"
    url: "https://developers.google.com/search/updates"
  - label: "Google Search Central: Local business structured data"
    url: "https://developers.google.com/search/docs/appearance/structured-data/local-business"
  - label: "citata.ai: AI Property Manager Index 2026 (our data, 50 cities, 3 engines)"
    url: "https://citata.ai/research/ai-property-manager-index-2026"
---

## What did the Ahrefs schema study find?

The Ahrefs schema study found no clear lift in AI citations after pages added JSON-LD schema. JSON-LD is a block of code that labels page facts for machines. Louise Linehan published the study on the Ahrefs blog on May 11, 2026.

The study had 2 parts. First, Ahrefs scanned about 6 million URLs. AI-cited pages were almost 3 times more likely to have JSON-LD than pages with no citations. That looked like a strong signal.

Then Ahrefs tested cause, not only correlation. It took 1,885 pages that added JSON-LD between August 2025 and March 2026. It compared them with 4,000 control pages that did not change. It counted citations 30 days before and 30 days after the change.

| Engine | Change vs control pages | Ahrefs verdict |
|---|---|---|
| ChatGPT | +2.2% | Not distinguishable from zero |
| Google AI Mode | +2.4% | Not distinguishable from zero |
| Google AI Overviews | −4.6% | Statistically significant, cause unclear |
| Perplexity | Not tested | — |

The AI Mode pages grew 43% in raw numbers. But the control pages grew almost as much. So the growth came from the platform, not the schema. In the authors' words, they "can't tell whether the schema did a tiny bit of good or nothing at all."

## What are the limits of the Ahrefs study?

The Ahrefs study has limits, and the authors list them. Each limit matters for a small property management site.

- **Only big pages.** Every test page already had 100+ AI Overview citations in February 2025. The study says nothing about a page that AI does not see yet. Most property management sites are in that group.
- **All schema types pooled.** Article, FAQ, Product, HowTo and Organization were counted together. One type could help while another does not.
- **Short window.** Ahrefs measured 30 days after the change.
- **Other changes mixed in.** Teams that add schema often fix links, content and speed at the same time.

So the fair reading is narrow. Adding schema to a page that AI already cites did not push it higher in this test. The study cannot prove that schema is useless for a new local site.

## Why do vendors still sell schema for AI search?

Vendors still sell schema because the correlation is real and easy to show. Cited pages do carry more schema. A slide with "3x more likely" looks like proof. It is not proof of cause.

Google's own guide on AI features is plain on this point. It says there is "no special schema.org structured data that you need to add" to appear in AI Overviews or AI Mode. It also says there are "no additional technical requirements." On 2026-06-15 Google added a note that llms.txt files are not needed for Google Search either.

In our own city run (our data, 2026-10), ChatGPT, Claude and Gemini answered 50 city prompts about property managers. Expertise.com was a source in 93 of 150 answers. iPropertyManagement and Yelp were sources in 50 each. The engines leaned on directories and review sites, not on schema-rich manager pages. That is a small sample and a correlation too.

## Which schema is still worth it for a property manager?

Schema is still worth it when it is true, short and matches the visible page. Google lists "making sure your structured data matches the visible text on the page" as a best practice for AI features. Wrong markup can spread wrong facts.

Use this checklist for a property management site:

- [ ] **LocalBusiness or RealEstateAgent on the home page.** Google requires `name` and `address`. Add `telephone`, `url`, `openingHoursSpecification` and `geo`.
- [ ] **Same facts as your Google Business Profile.** Name, address and phone must match letter for letter.
- [ ] **`priceRange` under 100 characters.** Google sets this limit.
- [ ] **No fake reviews in markup.** Google says `aggregateRating` and `review` are for sites that collect reviews of other businesses.
- [ ] **Article markup on guides** with a real author and a real date.
- [ ] **Test each page** in Google's Rich Results Test after each change.

Skip any schema type you cannot keep current. Old hours or an old phone number in markup does more harm than no markup.

## What does schema not do?

Schema does not make a weak page strong. The Ahrefs authors say it directly: "If you're already doing the rest of the SEO work well, JSON-LD isn't going to be the unlock."

Schema also does not give FAQ rich results anymore. Google stopped showing the FAQ rich result in Search on May 7, 2026. It removed the FAQ documentation in June 2026. An FAQ block still helps readers, and AI engines still read the text. But FAQ markup alone no longer changes how Google shows your page.

Here is how to split your hours if you have 10 hours for AI search work this month:

| Task | Hours | Why |
|---|---|---|
| Fix Google Business Profile, Yelp, Expertise.com, iPropertyManagement listings | 4 | These sources appear most in our city data |
| Write exact owner answers on fees and service area | 4 | Engines quote clear text |
| Check and fix schema so it matches the page | 1 | Keeps facts consistent |
| Run the same 10 prompts and record who is named | 1 | Shows if anything moved |

This split is our hypothesis, not a measured result.

## How can you test schema on your own site?

You can test schema on your own site with a small control group. The Ahrefs authors suggest 5 to 10 changed pages and 5 to 10 similar pages you do not change. Track both groups for 30 days or more.

1. **Pick 10 similar pages**, for example 10 city pages.
2. **Add schema to 5.** Leave the other 5 as they are.
3. **Change nothing else** on any of the 10 pages during the test.
4. **Count citations** for each page before and after. Use Bing Webmaster Tools for Copilot, or a fixed prompt list.
5. **Compare the 2 groups**, not the before and after of one group.

If both groups move the same way, the schema did not cause it. For the full site list, see [the AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website). To measure visits from AI, use [our AI traffic tracking guide](/guides/track-ai-traffic-property-management).
