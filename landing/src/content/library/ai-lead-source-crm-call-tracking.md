---
title: "How to Record AI as a Lead Source in Your CRM and Call Tracking — Citata.ai"
description: "Add 2 AI lead source values to your CRM, map AI referrers in call tracking, ask one intake question, and report AI owner leads each month next to other sources."
headline: "Record AI Owner Leads in Your CRM and Call Tracking"
dek: "Lead source values, call tags, one intake question and a monthly report, for owner leads."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Add 2 lead source values to your CRM: \"AI assistant (tracked)\" for leads with an AI referrer, and \"AI assistant (self-reported)\" for leads who say AI sent them. Map AI referrers such as chatgpt.com, perplexity.ai and gemini.google.com in your web analytics and call tracking. Ask one intake question on every form and call. Then report AI owner leads each month next to Google, referrals and directories."
visible: false
cluster: "ai-search"
kind: "how-to"
priority: 4
inspired_by: "https://www.propertymanagerwebsites.com/blog/your-pmw-leads-just-got-a-home-to-land-in-introducing-crm-owner-lead-portal-by-rentvine"
faq:
  - q: "Which lead source value should a property manager use for ChatGPT leads?"
    a: "Use one parent value, AI assistant, with 2 types: tracked (an AI referrer came with the lead) and self-reported (the owner said AI sent them). Put the engine name, such as ChatGPT or Perplexity, in a second field."
  - q: "Does GA4 show AI assistant traffic?"
    a: "Yes. Google Analytics has an AI Assistant channel for sources like ChatGPT, Gemini, DeepSeek, Copilot and Grok. It does not include Google AI Overviews or AI Mode, which count as organic search."
  - q: "Why do AI leads show up as direct traffic?"
    a: "Many AI apps and in-app browsers do not pass a referrer, so the visit has no source. Search Engine Journal reports that this traffic lands in Direct. That is why you also need an intake question."
  - q: "Can call tracking tools attribute calls to ChatGPT?"
    a: "Some can. CallRail announced attribution for leads from ChatGPT/SearchGPT, Perplexity and Gemini in December 2024. Check your own tool's source list before you rely on it."
  - q: "How do you ask an owner if AI sent them?"
    a: "Add one required question to the owner form and the call script: \"How did you first hear about us?\" Include \"ChatGPT or another AI assistant\" as a choice, next to Google, a referral and a directory."
sources:
  - label: "Google Analytics Help: Default channel group"
    url: "https://support.google.com/analytics/answer/9756891"
  - label: "Search Engine Journal: How to track AI traffic in GA4 without undercounting it"
    url: "https://www.searchenginejournal.com/ga4s-ai-assistant-channel-undercounts-your-ai-traffic-how-to-build-one-that-doesnt/580133/"
  - label: "Agile Brand Guide: CallRail broadens attribution capabilities to include AI-powered search engines"
    url: "https://agilebrandguide.com/callrail-broadens-attribution-capabilities-to-include-ai-powered-search-engines/"
  - label: "Property Manager Websites: CRM Owner Lead Portal by Rentvine"
    url: "https://www.propertymanagerwebsites.com/blog/your-pmw-leads-just-got-a-home-to-land-in-introducing-crm-owner-lead-portal-by-rentvine"
---

## Why record AI as a lead source?

You record AI as a lead source so you can see if AI search work brings owners who sign. Traffic reports show visits. They do not show which owner signed a management agreement. Only your CRM knows that.

The problem is that most CRMs have no AI value. An owner who found you in ChatGPT is saved as "Website", "Google" or "Other". Then your report says AI brings nothing, and the report is wrong.

Analytics tools now help, but only in part. Google Analytics added an AI Assistant channel. Search Engine Journal reports that Google added the channel on May 13, 2026, and that it reached most properties by early June 2026. The same article explains why the channel still misses visits. So you need 3 inputs: the web referrer, the call source and the owner's own answer.

## Which lead source values should you add to the CRM?

Add one parent value and 2 types. Keep the engine name in its own field. This keeps your source list short and your reports clean.

| Field | Values | When to use |
|---|---|---|
| Lead source | AI assistant | Any lead from an AI engine |
| AI lead type | Tracked | The lead came with an AI referrer or AI call source |
| AI lead type | Self-reported | The owner said AI sent them, with no tracked source |
| AI engine | ChatGPT, Gemini, Claude, Perplexity, Copilot, Google AI Mode, Other | Name the engine, if known |
| AI prompt (optional) | Free text | What the owner says they asked |

Why 2 types? Because they have different proof. A tracked lead has a referrer you can see. A self-reported lead has only the owner's words. Report both, but do not add them up in one line without a label.

Keep Google AI Overviews and AI Mode in mind. The GA4 help page says the AI Assistant channel excludes them. Those visits count as organic search. If an owner says "Google's AI showed me your name", record AI assistant, self-reported, with the engine "Google AI Mode" or "Other".

Some property management CRMs pass the source on their own. Property Manager Websites says its CRM Owner Lead Portal by Rentvine tracks the lead source "from day one" for website form leads. Check what your CRM stores for a form lead before you add fields by hand.

## How do you tag AI calls in call tracking?

Tag AI calls by the referrer of the web visit that led to the call. Many owners read an AI answer, open your site and then call. A call tracking tool with a number per source can tie that call to the visit.

Follow these steps:

1. **Check your tool's source list.** CallRail announced in December 2024 that customers can track leads from "ChatGPT/SearchGPT, Perplexity and Gemini". Other tools differ. Ask your vendor which AI sources it names.
2. **Add AI referrer rules.** Map chatgpt.com, perplexity.ai, gemini.google.com, claude.ai and copilot.microsoft.com to one source, "AI assistant".
3. **Do not use bare words.** Search Engine Journal warns that tokens like "gpt" or "google" cause false matches. Use full domains.
4. **Send the source to the CRM.** Map the call source field to the CRM lead source field, so the call becomes a tracked AI lead.
5. **Check the rules each quarter.** New engines appear. The GA4 list changed between May and June 2026, by the Search Engine Journal report.

A call with no web visit has no referrer. An owner may read the phone number in the AI answer and dial it. No tool can see that. The intake question below catches those calls.

## How do you ask on the intake form and the call?

Ask one required question on every owner form and every owner call: "How did you first hear about us?" Give fixed choices. Free text is hard to count.

Use these choices:

- [ ] Google search
- [ ] ChatGPT or another AI assistant
- [ ] Google Maps or Google Business Profile
- [ ] A directory (Expertise.com, Yelp, BBB, other)
- [ ] A referral from a person
- [ ] Social media
- [ ] Other

If the owner picks the AI choice, ask one more short question: "Which one, and what did you ask?" Save the answer in the AI prompt field. Those prompts help you plan content: they are the real questions owners ask.

On the phone, put the question in the script after the greeting. Train the person who answers to save the answer before the call ends. A question asked after the call is often lost.

Our live guide on [how to track AI traffic and AI mentions](/guides/track-ai-traffic-property-management) covers the GA4 setup and the crawler logs. This page covers the CRM and calls.

## How do you report AI leads to the team?

Report AI owner leads once a month, in the same table as every other source. Count leads and signed doors, not visits.

| Source | Owner leads | Qualified | Signed | Doors signed |
|---|---|---|---|---|
| Google search | | | | |
| AI assistant, tracked | | | | |
| AI assistant, self-reported | | | | |
| Directories | | | | |
| Referrals | | | | |
| Other or unknown | | | | |

Fill the table from the CRM. Here is a worked example with made-up numbers, to show the math:

- AI assistant, tracked: 2 leads, 1 signed, 4 doors.
- AI assistant, self-reported: 3 leads, 1 signed, 6 doors.
- AI total: 5 leads, 2 signed, 10 doors.
- Close rate for AI leads: 2 ÷ 5 = 40%.

Then compare the AI close rate with the close rate for Google leads. Small numbers swing a lot. With 5 leads, one more signed owner moves the rate by 20 points. Look at 3 months together before you decide anything.

Also watch the "Other or unknown" row. If it shrinks after you add the AI choice, some of those leads were AI leads all along.

## What to do this week

1. **Add the 3 CRM fields:** lead source value, AI lead type, AI engine.
2. **Add the intake question** to the owner form and the call script.
3. **Map AI referrers** in your call tracking tool.
4. **Book a monthly review** of the source table with the person who closes owners.

Start the count now. In 3 months you will have your own number, which beats any industry average.
