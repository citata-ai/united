+++
date = "2026-10-19"
previous = "2026-10-18"
prompts = 20
answers_ok = 120
answers_failed = 0
nonbrand_answers = 108
nonbrand_mentions = 0
nonbrand_cites = 0
brand_answers = 12
brand_mentions = 9
brand_cites = 1
top_companies = ["Ahrefs", "Semrush", "WebFX", "First Page Sage", "Goodjuju Marketing", "Google", "ChatGPT", "Perplexity", "Profound", "ClearLead Digital"]
top_sources = ["clearleaddigital.com", "gogoodjuju.com", "en.wikipedia.org", "reddit.com", "propertymanagerwebsites.com", "developers.google.com", "support.google.com", "firstpagesage.com", "fuelonline.com", "webtonic.io"]

[engine.chatgpt]
model = "gpt-6-luna"
answers = 40
nonbrand_mentions = 0
brand_mentions = 4
cites = 1

[engine.claude]
model = "claude-sonnet-5-5"
answers = 40
nonbrand_mentions = 0
brand_mentions = 2
cites = 0

[engine.gemini]
model = "gemini-3-flash"
answers = 40
nonbrand_mentions = 0
brand_mentions = 3
cites = 0
+++

# AI visibility — 2026-10-19

Prompts: 20 · engines: chatgpt, claude, gemini · answers: 120 ok / 0 failed

## Mention rate

| Engine | Answers | Mentions us | Cites our site |
| --- | --- | --- | --- |
| chatgpt | 40 | 4 | 1 |
| claude | 40 | 2 | 0 |
| gemini | 40 | 3 | 0 |

## Change since 2026-10-18 (non-brand)

| Engine | Mentions before | Mentions now | Cites before | Cites now |
| --- | --- | --- | --- | --- |
| chatgpt | 0/36 | 0/36 | 0/36 | 0/36 |
| claude | 0/36 | 0/36 | 0/36 | 0/36 |
| gemini | 0/36 | 0/36 | 0/36 | 0/36 |

## By prompt group (non-brand)

| Group | Answers | Mentions us |
| --- | --- | --- |
| brand | 12 | 9 |
| geo-general | 18 | 0 |
| pm-geo | 36 | 0 |
| pm-how | 24 | 0 |
| pm-leads | 30 | 0 |

## Companies AI recommends (non-brand prompts, answers that name them)

| Company | Answers |
| --- | --- |
| Ahrefs | 14 |
| Semrush | 11 |
| WebFX | 10 |
| First Page Sage | 10 |
| Goodjuju Marketing | 10 |
| Google | 10 |
| ChatGPT | 9 |
| Perplexity | 9 |
| Profound | 8 |
| ClearLead Digital | 8 |
| Peec AI | 7 |
| Upkeep Media | 7 |
| BrightLocal | 6 |
| Siana Marketing | 6 |
| Resident360 | 6 |
| FlyDragon | 5 |
| OtterlyAI | 5 |
| Gemini | 5 |
| Ahrefs Brand Radar | 4 |
| FirstIndex | 4 |
| SE Ranking | 4 |
| Otterly.ai | 4 |
| CiteVantage | 4 |
| Onely | 4 |
| ApartmentSEO | 4 |
| 95 Projects | 4 |
| Digible | 4 |
| LSEO | 4 |
| Google Search Console | 4 |
| RankSages | 3 |

## Sources AI cites (targets for listings / outreach)

| Domain | Answers |
| --- | --- |
| clearleaddigital.com | 16 |
| gogoodjuju.com | 15 |
| en.wikipedia.org | 13 |
| reddit.com | 12 |
| propertymanagerwebsites.com | 12 |
| developers.google.com | 11 |
| support.google.com | 10 |
| firstpagesage.com | 9 |
| fuelonline.com | 8 |
| webtonic.io | 8 |
| 95projects.com | 8 |
| citate.ai | 7 |
| thriveagency.com | 7 |
| youtube.com | 7 |
| teramok.us | 7 |
| stackmatix.com | 6 |
| eseospace.com | 6 |
| resident360.com | 6 |
| digible.com | 6 |
| citant.ai | 5 |
| minuttia.com | 5 |
| searchengineland.com | 5 |
| bluelinks.agency | 5 |
| ahrefs.com | 5 |
| theanswerengine.ai | 5 |
| medium.com | 5 |
| citato.ai | 4 |
| citeme.io | 4 |
| growffic.com | 4 |
| tripledart.com | 4 |

## Where we are mentioned

- chatgpt · `brand-reviews` · rank 1
- chatgpt · `brand-reviews` · rank —
- claude · `brand-reviews` · rank —
- claude · `brand-reviews` · rank —
- gemini · `brand-reviews` · rank 1
- gemini · `brand-reviews` · rank 1
- chatgpt · `brand-what` · rank —
- chatgpt · `brand-what` · rank —
- gemini · `brand-what` · rank 1

## Gaps

1. **Brand confusion.** Claude answers about Citate.ai or Citant.ai in 4 of 4 brand answers. Gemini merges us with Citant.ai and calls us a B2B SaaS consultancy. ChatGPT is right in 2 of 4 answers and cites citata.ai once.
2. **"GEO agency for property management" prompts: 0 of 36.** AI names ClearLead Digital, Goodjuju, Upkeep Media and First Page Sage, and cites clearleaddigital.com (16), gogoodjuju.com (15), propertymanagerwebsites.com (12), firstpagesage.com (9), reddit.com (12).
3. **How-to prompts (track AI traffic, llms.txt, checklist): our guides exist but are 1 day old.** AI cites developers.google.com, support.google.com and Wikipedia.

## Actions

1. H09: /about#not-the-same (name table: Citant.ai, Citate.ai, Citala), sharper schema `disambiguatingDescription` and llms.txt. Then a Wikidata item with `sameAs`. Citant.ai added to `business/competitors.toml` as direct (owner decision).
2. Outreach to the list pages AI cites (First Page Sage, propertymanagerwebsites.com) and one useful answer on r/PropertyManagement as Tao (needs a person).
3. Resubmit the sitemap to Google after each prod deploy (Search Console API, see the reply of 2026-10-19), and add one first-party number from our own tests to each guide.
