+++
date = "2026-11-16"
previous = "2026-11-13-grok"
prompts = 20
answers_ok = 80
answers_failed = 40
nonbrand_answers = 72
nonbrand_mentions = 3
nonbrand_cites = 5
brand_answers = 8
brand_mentions = 8
brand_cites = 4
top_companies = ["ClearLead Digital", "Upkeep Media", "WebFX", "Profound", "Goodjuju Marketing", "Fourandhalf", "First Page Sage", "Ahrefs", "Semrush", "iPullRank"]
top_sources = ["clearleaddigital.com", "en.wikipedia.org", "gogoodjuju.com", "95projects.com", "propertymanagerwebsites.com", "developers.google.com", "citata.ai", "firstpagesage.com", "support.google.com", "theanswerengine.ai"]

[engine.chatgpt]
model = "gpt-6-luna"
answers = 40
nonbrand_mentions = 3
brand_mentions = 4
cites = 7

[engine.claude]
model = "claude-sonnet-5-5"
answers = 40
nonbrand_mentions = 0
brand_mentions = 4
cites = 2

[usage."claude-haiku-5-5"]
calls = 80
input_tokens = 97742
output_tokens = 39136
web_searches = 0

[usage."claude-sonnet-5-5"]
calls = 40
input_tokens = 958178
output_tokens = 69126
web_searches = 81

[usage."gpt-6-luna"]
calls = 40
input_tokens = 701487
output_tokens = 26546
web_searches = 0
+++

# AI visibility — 2026-11-16

Prompts: 20 · engines: chatgpt, claude, gemini · answers: 80 ok / 40 failed

## Mention rate

| Engine | Answers | Mentions us | Cites our site |
| --- | --- | --- | --- |
| chatgpt | 40 | 7 | 7 |
| claude | 40 | 4 | 2 |

## Change since 2026-11-13-grok (non-brand)

| Engine | Mentions before | Mentions now | Cites before | Cites now |
| --- | --- | --- | --- | --- |
| chatgpt | 0/0 | 3/36 | 0/0 | 3/36 |
| claude | 0/0 | 0/36 | 0/0 | 2/36 |

## By prompt group (non-brand)

| Group | Answers | Mentions us |
| --- | --- | --- |
| brand | 8 | 8 |
| geo-general | 12 | 0 |
| pm-geo | 24 | 3 |
| pm-how | 16 | 0 |
| pm-leads | 20 | 0 |

## Companies AI recommends (non-brand prompts, answers that name them)

| Company | Answers |
| --- | --- |
| ClearLead Digital | 6 |
| Upkeep Media | 5 |
| WebFX | 4 |
| Profound | 4 |
| Goodjuju Marketing | 4 |
| Fourandhalf | 4 |
| First Page Sage | 4 |
| Ahrefs | 3 |
| Semrush | 3 |
| iPullRank | 3 |
| ApartmentSEO | 3 |
| Property Manager Websites | 3 |
| Siana Marketing | 3 |
| Prefer Managed | 2 |
| SOCi | 2 |
| FlyDragon | 2 |
| Otterly.AI | 2 |
| FirstIndex | 2 |
| Peec AI | 2 |
| Go Fish Digital | 2 |
| Siege Media | 2 |
| NoGood | 2 |
| Visiblee | 2 |
| HubSpot | 2 |
| LLMrefs | 2 |
| Otterly | 2 |
| RankSages | 2 |
| Skyfield Digital | 2 |
| Qeystone | 2 |
| Kihan Marketing | 2 |

## Sources AI cites (targets for listings / outreach)

| Domain | Answers |
| --- | --- |
| clearleaddigital.com | 18 |
| en.wikipedia.org | 16 |
| gogoodjuju.com | 15 |
| 95projects.com | 10 |
| propertymanagerwebsites.com | 10 |
| developers.google.com | 10 |
| citata.ai | 9 |
| firstpagesage.com | 9 |
| support.google.com | 9 |
| theanswerengine.ai | 9 |
| stackmatix.com | 7 |
| upkeepmedia.com | 6 |
| llmpulse.ai | 5 |
| searchengineland.com | 5 |
| apartmentseo.com | 5 |
| suggestedbygpt.com | 5 |
| webtonic.io | 5 |
| thestacc.com | 5 |
| factoryjet.com | 4 |
| gen-optima.com | 4 |
| firstindex.com | 4 |
| fourandhalf.com | 4 |
| almcorp.com | 4 |
| ahrefs.com | 4 |
| help.openai.com | 4 |
| trakkr.ai | 4 |
| fuelonline.com | 4 |
| seos.co | 4 |
| peterlohmann.com | 4 |
| arobis.ai | 3 |

## Where we are mentioned

- chatgpt · `brand-reviews` · rank 1
- chatgpt · `brand-reviews` · rank 1
- claude · `brand-reviews` · rank —
- claude · `brand-reviews` · rank —
- chatgpt · `brand-what` · rank —
- chatgpt · `brand-what` · rank 1
- claude · `brand-what` · rank —
- claude · `brand-what` · rank —
- chatgpt · `pm-aeo-agency` · rank —
- chatgpt · `pm-geo-cost` · rank —
- chatgpt · `pm-geo-small` · rank 1

## Gaps

Run notes (measure 2026-11-16): Gemini gave HTTP 503 "auth_unavailable" on all 40 calls, so only ChatGPT and Claude count. Extractor `claude-haiku-5-5` (`AIV_EXTRACTOR`; `claude-haiku-4-5` gives 403). The "Change since" table above compares with the `2026-11-13-grok` folder by mistake (Grok only); the right base is `2026-11-13`: non-brand ChatGPT 6/35 -> 3/36 mentions, Claude 0/36 -> 0/36.

1. Claude still does not know us. Brand answers read by hand: ChatGPT 4 of 4 right (it reads `/about`), Claude 0 of 4 (it answers about Citant.ai or Citate.ai). H09.
2. No landlord data prompt is tracked. The 20 prompts hold no Section 8, fee or software question, so this run cannot show if AI cites the H01, H02 or H06 pages. H11 (proposed).
3. pm-leads, pm-how and geo-general: 0 of 48 non-brand answers name us; ClearLead Digital and Goodjuju lead the cited sources (18 and 15 answers). H10.

## Actions

1. H09: Wikidata item, LinkedIn and Crunchbase pages (needs Tao), so Claude's web search finds a profile for citata.ai.
2. H11: add 10 landlord data prompts at the end of `prompts.toml` (never edit old ones) and run them each Monday.
3. H10: pitch the lists AI cites for pm-geo prompts (needs Tao to approve one template).
