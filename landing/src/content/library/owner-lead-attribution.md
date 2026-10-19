---
title: "How to Know Where Your Owner Leads Come From — Citata.ai"
description: "Tag every owner lead by source in your CRM, ask how they first heard of you, tag your Google profile link, and know where GA4 misses leads. Steps and report template."
headline: "How to Know Where Your Owner Leads Come From"
dek: "GA4 sees the last click. Your owners can tell you what came first."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Use three records side by side: a required 'How did you first hear about us?' field on every owner form, hidden fields that save the page, referrer and UTM codes, and GA4 with a tagged Google Business Profile link. Log the source in one CRM field with fixed options. Each month, report owner leads, signed owners and signed doors by source, and treat GA4's Direct channel as unknown."
visible: false
cluster: "pm-marketing"
kind: "how-to"
priority: 2
inspired_by: "https://gogoodjuju.com/property-management-lead-source-report-2026/"
faq:
  - q: "How do I know where my property management leads come from?"
    a: "Ask every lead how they first heard of you, save the referrer and UTM codes with each form, and compare both with GA4 each month. No single record is complete."
  - q: "Should I ask 'how did you hear about us'?"
    a: "Yes, and ask how they first heard of you. Goodjuju Marketing's 2026 study says an owner who heard of you in ChatGPT and then searched your name will answer 'Google' if you ask how they found you."
  - q: "Why does GA4 miss some owner leads?"
    a: "GA4 credits the visit, not the conversation before it. AI apps and copied links often pass no referrer, owners call without a visit, and Google Business Profile clicks look like organic search unless you tag the link."
  - q: "How do I tag my Google Business Profile link?"
    a: "Add UTM codes to the website link on your profile, for example ?utm_source=google&utm_medium=organic&utm_campaign=gbp. Map Pack visits then show as their own line in GA4."
  - q: "What should a lead source report show?"
    a: "Owner leads, qualified leads, signed owners and signed doors for each source, by month. Leave tenant forms and phone call taps out of the lead count."
sources:
  - label: "Goodjuju Marketing: Property Management Lead Source Report 2026"
    url: "https://gogoodjuju.com/property-management-lead-source-report-2026/"
  - label: "Google Analytics Help: Default channel group"
    url: "https://support.google.com/analytics/answer/9756891"
  - label: "Google Analytics Help: URL builders and UTM parameters"
    url: "https://support.google.com/analytics/answer/10917952"
---

## How do I tag owner leads by source in a CRM?

Give every owner lead one "first source" field in your CRM, with a fixed list of options. A free-text field fills with "google", "Google Maps", "goggle" and "web", and you cannot count it. A dropdown with the same options as your website form lets you count leads by source in one minute.

Use this list. Name each AI tool on its own; Goodjuju Marketing's 2026 study found a single "AI" option gets picked less often.

| CRM option | Group in reports |
|---|---|
| Google search | Search |
| Google Maps | Search |
| Bing or other search | Search |
| ChatGPT | AI tools |
| Gemini | AI tools |
| Claude | AI tools |
| Perplexity | AI tools |
| Other AI tool | AI tools |
| Referral from an owner | Referral |
| Real estate agent | Referral |
| Directory (Yelp, Expertise.com, other) | Directory |
| Facebook or Instagram | Social |
| Sign or vehicle | Offline |
| Other (text) | Other |

Add two more fields: "lead type" (owner, tenant, vendor, job) and "doors" (number). Only owner leads count in the marketing report. Doors let you report value, not just count.

## Should I ask "how did you hear about us"?

Yes. Ask it twice: on the form and in your first reply. Goodjuju's 2026 study explains the wording: ask how they *first* heard about you. An owner who heard your name in ChatGPT and then searched Google will answer "Google" to "How did you find us?"

The study shows why this matters. On Goodjuju's own website, GA4 credited 7 leads to AI tools between May and early October 2026. Lead answers and form records showed at least 13. Goodjuju concludes that GA4 missed about 4 in 10 AI leads it could trace.

### Form setup

1. Add a required dropdown: "How did you first hear about us?"
2. Use the CRM options above. Do not pre-select any option.
3. Give "Other" a text box.
4. Add hidden fields for page URL, referrer, utm_source, utm_medium and utm_campaign.
5. Give owner forms their own thank-you page, separate from tenant forms.

### First reply

End your first email with: "One quick question: how did you first hear about us?" Log the answer in the same CRM field. If the form and the reply disagree, keep both in a notes field and trust the reply.

## Why does GA4 miss some owner leads?

GA4 records the visit that it can trace. It does not see the research before the visit. Google Analytics Help defines the Direct channel as visits that arrive by a saved link or a typed URL. Any visit with no referrer lands there too.

Goodjuju's fall 2026 study lists the main gaps:

- **The Google hand-off.** AI recommends you; the owner then searches your name on Google. GA4 records Google.
- **No click.** AI answers often show your name and phone. Owners call without a visit.
- **Missing referrers.** AI apps and copied links often pass no source. Those visits go to Direct.
- **The Map Pack in disguise.** Google Business Profile clicks show as "google / organic" unless you tag the link.
- **Double leads.** Click-to-call taps, form events that fire twice and tenant forms inflate counts.

In Goodjuju's fall window across 35 companies, Direct and Maps brought 45.0% of traffic but 35.6% of owner leads. Read Direct as "unknown", not as a channel.

### Fixes in GA4

1. **Tag your Google Business Profile link.** Use your URL plus ?utm_source=google&utm_medium=organic&utm_campaign=gbp. Google Analytics Help says to always use utm_source, utm_medium and utm_campaign.
2. **Add an AI channel.** In Admin, Data display, Channel groups, create a custom group. Put a channel above Referral where source matches: chatgpt|openai|claude|anthropic|gemini|perplexity|copilot. This regex is adapted from Goodjuju's guide.
3. **One key event per owner form.** Track calls on their own.

Our guide on [tracking AI traffic to a property management site](/guides/track-ai-traffic-property-management) walks through the GA4 setup step by step.

## How do I report signed doors by source?

Report from lead to signed door, by source, once a month. Traffic and lead counts alone hide which channel brings owners who sign.

| Source group | Owner leads | Qualified | Signed owners | Signed doors | Cost | Cost per signed door |
|---|---|---|---|---|---|---|
| Search | 18 | 12 | 4 | 7 | $1,200 | $171 |
| AI tools | 3 | 3 | 1 | 2 | $0 | $0 |
| Referral | 4 | 4 | 2 | 5 | $300 | $60 |
| Directory | 5 | 2 | 0 | 0 | $250 | none signed |
| Total | 30 | 21 | 7 | 14 | $1,750 | $125 |

The numbers above are an example layout, not benchmarks.

Follow these rules to keep the report honest:

1. **Use the owner's answer for "first source".** Use GA4 for "last click". Show both when they differ.
2. **Date each signed door by the lead date**, not the sign date, so slow sources get credit.
3. **Look at 3-month totals.** One month of 2 or 3 signed owners per source is noise.
4. **Compare three records each month:** GA4, form fields, owner answers. Goodjuju's study recommends the same check.

Once you know the cost per signed door, compare it with what one owner is worth. Put your fee and door count into the [property management fee calculator](/tools/property-management-fee-calculator) to see the yearly revenue per door.
