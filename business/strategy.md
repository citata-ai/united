# Strategy: citata.ai

Status: draft v1, 2026-10-18. Owner: Tao.

## 1. One line

citata.ai makes AI assistants name and link our clients when buyers ask them for a recommendation.

The name reads as "cite / citation" in English. That is the product: get cited.

## 2. Model business: FirstIndex

We start as a clone of [FirstIndex](https://firstindex.co) (Josh Pigford, Ordinary Systems LLC). Then we change it from market feedback and our goals. Details: `competitors.toml`. Its `[rule]` decides who is a direct competitor.

What we copy:
- Done-for-you GEO + SEO. Three stages: Indexed → Found → Mentioned.
- One clear plan, month to month. FirstIndex: $2,000/mo, or $1,500/mo for 12 months.
- "One real change a day, a person checks each one", report every Monday.
- Deliverables: AI answer tracking, keyword map, articles, "vs" and "alternatives" pages, free tools (calculators), page fixes, index checks, fact checks.
- Founder-led voice. Honest "no" when we cannot help.

Where we differ (their gaps):
- **Proof.** FirstIndex shows one unnamed chart. We publish named case studies with numbers from month 1.
- **Verticals, not one audience.** FirstIndex sells to indie SaaS through the founder's X audience. We sell to verticals where we have access: property management first.
- **Price ladder.** Free audit → Starter → Growth (see `offers.toml`).
- **Impact.** Part of capacity goes to B Corps, NGOs and charities. This fits the TAO mission and makes portfolio.
- **Agents do the work.** Delivery runs as code in this repo. People set direction and check output.

## 3. Verticals

| # | Vertical                         | Why us                                                   | Status  |
|---|----------------------------------|----------------------------------------------------------|---------|
| 1 | Property management companies    | MyRemotely ICP, Fridman Properties access, our own data  | now     |
| 2 | PMS / proptech software          | Same buyers; SaaS is the FirstIndex home market          | Q1 2027 |
| 3 | B Corps, NGOs, charities         | Mission fit; portfolio; low price or pro bono pilots     | Q1 2027 |

## 4. First three accounts (dog food)

All three are related to Tao or Ran Fridman. Say so in each case study. Details: `accounts.toml`.

1. **Fridman Properties** (fridmanproperties.com, Chicago, ~150 doors). First case study. Focus: Section 8 and AI answers.
2. **citata.ai** itself. Our own site with vertical pages. We must be cited for our own queries before we sell it.
3. **MyRemotely** (myremotely.ai). More leads from AI answers for "AI leasing agent" queries.

## 5. Key market facts

- **Which AI sends the clicks.** ChatGPT sends 63–87% of AI referral traffic (SE Ranking 2026: 74.8%). Gemini is second (11.6%) and grows fastest (+231% YoY). Claude grows fast in B2B (Goodie: 18.5%). Perplexity is 7% and flat. Google AI Overviews and AI Mode do not show as a referrer, so we measure them by citation, not by clicks.
  - Priority: ChatGPT → Gemini / Google AI Overviews → Claude → Perplexity, Copilot.
- **AI traffic is small but converts.** AI is 0.3–1.1% of all site traffic. Ahrefs reports 0.5% of visits but 12.1% of signups from AI.
- **Rental search is won on listings, not brand sites.** Peek (8,442 communities): listing sites are 72% of AI citations for renters; manager home pages are below 0.3%. Google Maps leads at 35% (SOCi).
  - So for renter queries we work on listings (GoSection8, Zillow, Apartments.com) and Google Business Profile.
  - For owner queries ("property manager Chicago", "manager that takes Section 8") the client's own site can win. Owners are who Fridman sells to.
- **No one publishes a GEO case study for Section 8 or affordable housing.** The niche is open. The closest proof is multifamily and developer work (Teramok, Resident360: non-competitors, other buyers) and proptech SaaS (SmartRent via Single Grain, REsimpli via DerivateX).
- **Price band.** GEO agencies charge $2,000–$25,000/mo. FirstIndex sits at the bottom with $2,000.

## 6. Section 8 angle (Fridman)

- Today Section 8 is only one FAQ on fridmanproperties.com. It is a new content pillar, not an existing strength.
- Illinois law forbids refusal of a tenant because of the source of income (vouchers included). Verify the current law before we publish. This makes "how Section 8 works for Chicago owners" a real need for owners.
- Content: owner guide (inspections, HAP payments, CHA process, rent limits), city pages, FAQ with exact answers, calculator (voucher rent vs market rent).
- All copy must follow Fair Housing rules.

## 7. How we win traffic for ourselves

1. Dog food: three accounts, three case studies with numbers.
2. Vertical pages on citata.ai, each with its own proof.
3. Free AI-visibility audit as the lead magnet (like the FirstIndex "audit of 300+ sites" threads).
4. MyRemotely go-to-market: MyRemotely clients are property managers. citata.ai is the marketing arm we offer them.
5. Later: link building and outreach, social. Not now.

## 8. Focus now: delivery system

Sales and marketing systems wait. First we build delivery and learn how to make AI cite a site.

1. Tools in place (`tools.toml`), open source and free tiers first.
2. Baseline for each account **before** any change. Without a baseline we have no case study.
3. Weekly prompt tracking: same prompts, 4 engines, every week.
4. One change a day per account, human check, Monday report.

## 9. Risks

- **Related parties.** All first accounts are ours or Ran's. Case studies need clear disclosure.
- **fridmanproperties.com rebuild went live 2026-10-16** (`fp-landing`). The AI baseline was taken the same day. The move kept every URL and word, but it can still change traffic. Say so in each report. Source: `case-studies/fridman-properties.md`.
- **Google "scaled content abuse".** AI content without human review can be penalised. Every page gets a human check.
- **Open-source GEO trackers are under one year old.** Expect breaking changes.
- **Small numbers.** AI referral traffic is ~1% of visits. Report citations and leads, not only clicks.
