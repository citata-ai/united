---
title: "Marketing KPIs a Property Management Company Should Track — Citata.ai"
description: "The monthly marketing numbers for a PM company: owner leads by source, lead-to-signed-door rate, cost per signed door and a one-page report template. Traffic comes last."
headline: "Marketing KPIs a Property Management Company Should Track"
dek: "Count owners who sign, not visitors who click. Eight numbers fit on one page."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Track eight numbers each month: owner leads by source, qualified owner leads, calls or meetings held, signed owners, signed doors, lead-to-signed-door rate, cost per signed door and owner churn. Traffic and rankings are supporting numbers only. There is no reliable public benchmark for lead-to-signed-door rate, so measure your own baseline for 3 months and improve from there."
visible: false
cluster: "pm-marketing"
kind: "checklist"
priority: 2
inspired_by: "https://www.propertymanagerwebsites.com/blog/data-driven-marketing-roi-lead-conversion"
faq:
  - q: "What marketing KPIs should a property management company track?"
    a: "Owner leads by source, qualified leads, meetings, signed owners, signed doors, lead-to-signed-door rate, cost per signed door and owner churn. Review them monthly and in 3-month totals."
  - q: "What is a normal lead-to-signed-owner rate for property managers?"
    a: "We found no reliable public benchmark. One vendor case study reports a client closing ratio of 38%, but that is one firm's claim. Measure your own rate by source."
  - q: "Is website traffic a good KPI for a property manager?"
    a: "Not alone. Much of the traffic is tenants, vendors and job seekers. In Goodjuju Marketing's fall 2026 data, Direct and Maps was 45.0% of traffic but 35.6% of owner leads."
  - q: "How do I track leads by source?"
    a: "Use a required 'How did you first hear about us?' field, hidden UTM and referrer fields on forms, and one CRM source field with fixed options."
  - q: "How often should I review marketing KPIs?"
    a: "Monthly for the report, quarterly for budget decisions. Small firms sign few owners per month, so 3-month totals give a truer picture."
sources:
  - label: "Goodjuju Marketing: Property Management Lead Source Report 2026"
    url: "https://gogoodjuju.com/property-management-lead-source-report-2026/"
  - label: "Goodjuju Marketing: Traverse Property Management case study"
    url: "https://gogoodjuju.com/case-study-traverse-pm/"
  - label: "Google Analytics Help: Default channel group"
    url: "https://support.google.com/analytics/answer/9756891"
  - label: "Google Search Console Help: Performance report (Search results)"
    url: "https://support.google.com/webmasters/answer/7576553"
---

## How do I track property management leads by source?

Track every owner lead in one CRM field with fixed source options, filled from three records. No single tool sees every source. Goodjuju Marketing's 2026 lead source report shows the gap. On Goodjuju's own site, GA4 credited 7 leads to AI tools from May to early October. Lead answers and form records showed at least 13.

### Lead source checklist

- [ ] Required form field: "How did you first hear about us?" with each AI tool named
- [ ] Same question in your first reply email
- [ ] Hidden form fields: page URL, referrer, utm_source, utm_medium, utm_campaign
- [ ] Google Business Profile link tagged with UTM codes
- [ ] One GA4 key event per owner form; calls tracked on their own
- [ ] Tenant forms (maintenance, applications, payments) out of the lead count
- [ ] Owner forms send to their own thank-you page
- [ ] CRM fields: source, lead type, doors, referred by
- [ ] Monthly check: GA4 vs form fields vs owner answers

Read GA4's Direct channel as unknown. Google Analytics Help defines Direct as visits by a saved link or a typed URL, and visits with no referrer land there too.

## What is a normal lead-to-signed-door rate?

We found no reliable public benchmark for the lead-to-signed-door rate in property management. Vendors publish case studies, not industry data. Goodjuju's Traverse Property Management case study reports owner leads rose from 3 to 7 a month to more than 20. It also reports a 38% closing ratio and about 15 new doors a month. That is one client, in a vendor's case study.

So build your own baseline. Use these definitions so the numbers stay the same each month:

| KPI | Formula | Notes |
|---|---|---|
| Owner leads | Owner form leads + owner calls, counted as people | Exclude tenants, vendors, job seekers |
| Qualified owner leads | Leads that fit your service area, property type and size | Write the rule down |
| Meetings held | Calls or walk-throughs that happened | Not just booked |
| Signed owners | Owners who signed an agreement | Credit to the lead month |
| Signed doors | Doors under those agreements | Value, not just count |
| Lead-to-signed-owner rate | Signed owners ÷ qualified owner leads | 3-month window |
| Cost per signed door | Marketing spend ÷ signed doors | By source and total |
| Owner churn | Owners lost ÷ owners at start of period | Monthly and yearly |

### Worked example (example numbers)

In one quarter: 60 owner leads, 42 qualified, 25 meetings, 11 signed owners, 17 signed doors, $5,100 marketing spend.

- Lead-to-signed-owner rate: 11 ÷ 42 = 26%
- Meeting rate: 25 ÷ 42 = 60%
- Close rate after a meeting: 11 ÷ 25 = 44%
- Cost per signed door: $5,100 ÷ 17 = $300

The split shows where to work. A low meeting rate points to slow follow-up. A low close rate after meetings points to the sales call or the fee story.

## Which property management marketing numbers matter more than traffic?

Signed doors, cost per signed door and owner churn matter more than traffic. Traffic counts everyone, and most visitors to a property management site are not owners.

Goodjuju's fall 2026 data across 35 companies shows the gap. Direct and Maps brought 45.0% of traffic but 35.6% of owner leads. Social media brought 4.3% of traffic but 0.8% of owner leads. AI tools brought 0.8% of traffic but 3.4% of owner leads. Traffic share and owner share point in different directions.

| Rank | Number | Why |
|---|---|---|
| 1 | Signed doors | Revenue |
| 2 | Cost per signed door | Return on spend |
| 3 | Owner churn | Doors you lose undo doors you sign |
| 4 | Qualified owner leads by source | Where to spend |
| 5 | Lead-to-signed-owner rate | Sales quality |
| 6 | Reviews and rating | Trust signal owners see first |
| 7 | Owner search impressions (Search Console) | Early sign that SEO works |
| 8 | Traffic | Context only |

Search Console's Performance report gives clicks, impressions, click-through rate and average position for each query. Filter it to owner queries; ignore tenant and brand queries for this KPI.

## How do I build a simple monthly property management marketing report?

Build a one-page report with the same layout every month. Numbers first, three short notes after.

### Report template

```text
Owner marketing report: [Month YYYY]

1. Results (this month / last 3 months)
   Owner leads:           [ ] / [ ]
   Qualified:             [ ] / [ ]
   Meetings held:         [ ] / [ ]
   Signed owners:         [ ] / [ ]
   Signed doors:          [ ] / [ ]
   Owners lost (doors):   [ ] / [ ]
   Net doors:             [ ] / [ ]

2. By source (last 3 months)
   Source | Leads | Signed owners | Doors | Spend | Cost per door

3. Supporting numbers
   New reviews / rating:            [ ] / [ ]
   Owner query impressions (GSC):   [ ]
   AI prompts naming us (of [N]):   [ ]

4. Notes
   What worked:
   What did not:
   Next month we will:
```

Keep the report honest. Say what failed. Do not hide a bad month inside a traffic chart.

Add an AI line if owners in your market use AI tools. Goodjuju found AI's share of owner leads grew from 2.1% to 3.4% between spring and fall 2026. Our guide on [tracking AI traffic to a property management site](/guides/track-ai-traffic-property-management) shows how to measure it, and the [AI Property Manager Index 2026](/research/ai-property-manager-index-2026) shows how AI names firms by city.
