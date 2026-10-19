---
title: "A KPI Dashboard for Property Management Firms \u2014 Citata.ai"
description: "Build a dashboard with clear definitions, source records and named leads. Review weekly queues and monthly business results without hiding overdue open tasks."
headline: "Build a Useful Property Management KPI Dashboard"
dek: "A useful dashboard links a clear measure to a decision and a responsible person."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Show a small set of measures covering cash, leasing, maintenance, owners and service cost. Define each measure, its source and the decision it supports. Use weekly views for active work and monthly views for reconciled results, with access limited by role."
visible: false
cluster: "pm-business"
kind: "template"
priority: 5
inspired_by: "https://propertymeld.com/blog/what-is-a-kpi-dashboard/"
faq:
  - q: "Which Numbers Belong on the Dashboard?"
    a: "Choose measures that support decisions across service quality and business health. A dashboard should show where someone needs to act, not simply collect every available chart."
  - q: "Should You Review KPIs Weekly or Monthly?"
    a: "Use frequent reviews for active work and monthly reviews for results that need closed accounts. Match the timing to the decision rather than the chart's refresh speed."
  - q: "Which Data Comes From Property Management Software?"
    a: "Use your system's actual reports and field definitions rather than assuming a product label matches your measure. Check data before importing it into the dashboard."
  - q: "Who Should See Each Dashboard View?"
    a: "Give people the detail they need for their work, with access matched to their role. A company-wide summary should not expose unnecessary personal or financial data."
sources:
  - label: "Property Meld: What is a KPI dashboard"
    url: "https://propertymeld.com/blog/what-is-a-kpi-dashboard/"
---

## Which Numbers Belong on the Dashboard?

Choose measures that support decisions across service quality and business health. A dashboard should show where someone needs to act, not simply collect every available chart.

A KPI is a key performance indicator. Property Meld's dashboard guide discusses repair speed, scheduling, workload and resident feedback. Use those maintenance categories where useful, but build the company view around your own scope and data.

This proposed starter dashboard contains 10 measures. The count is a design choice, not a benchmark or a claim that every company needs the same set.

| Measure | Suggested definition or scope | Decision it supports |
|---|---|---|
| Rent collection | Eligible rent received against rent due | Review arrears and posting issues |
| Physical occupancy | Occupied rentable units against rentable units | Inspect vacancy and readiness |
| Leasing time | Defined ready date to lease milestone | Find delays in listing and approval |
| Open repair age | Age of each unresolved request | Escalate old or urgent work |
| Repeat repair work | Same unresolved fault after completion | Review diagnosis and vendor quality |
| Owner losses | Departing accounts with reviewed reasons | Fix preventable service problems |
| New owner intake | Accepted accounts and intake status | Control service capacity |
| Resident renewals | Renewals within a defined expiry group | Review offers and resident concerns |
| Company contribution | Defined fee income less direct service costs | Test whether work funds delivery |
| Open complaints | Unresolved cases with next actions | Assign follow-up and remedies |

Keep the dashboard narrow enough for a person to review. Supporting detail can sit in the source report. Do not put private resident information in the shared summary.

## Should You Review KPIs Weekly or Monthly?

Use frequent reviews for active work and monthly reviews for results that need closed accounts. Match the timing to the decision rather than the chart's refresh speed.

A weekly work review can inspect open repairs, approvals and intake tasks. A monthly business review can use checked fee income, owner losses and costs. These are suggested cadences, not mandatory industry standards. Change them when the service process needs a different pace.

Show the reporting window and last update beside each measure. An old chart with a fresh page timestamp can mislead the team. State whether results are provisional or checked against final records.

Separate the age of open work from the time taken for completed work. If you measure only closed jobs, old requests can disappear from the performance view. Keep both groups visible and inspect the oldest cases.

Use the review to assign tasks, not just discuss colors. A flagged measure needs a person, next action and review date. If no one can explain what decision a measure supports, remove it from the front view or redefine it.

## Which Data Comes From Property Management Software?

Use your system's actual reports and field definitions rather than assuming a product label matches your measure. Check data before importing it into the dashboard.

Rent ledgers, lease dates, unit status and work orders can provide inputs when the system captures them correctly. Company payroll and other costs may come from separate records. Owner exit reasons often need a reviewed internal log.

Ask a team member to trace a result back to its source. Check a completed repair, a partial rent payment and a unit changing status. Confirm that dates and exclusions match the written definition. Exporting a report does not make the underlying entries correct.

Keep missing data visible. A blank completion date can mean unfinished work or a missed entry. Do not silently replace blanks with zero. Use an exception list that a named person can review.

Before automating, run the calculation by hand for a sample period. Compare totals with the report and resolve differences. Keep the calculation method with the dashboard so another person can maintain it after the original builder leaves.

## Who Should See Each Dashboard View?

Give people the detail they need for their work, with access matched to their role. A company-wide summary should not expose unnecessary personal or financial data.

Team leads need enough detail to assign and check tasks. Company owners may need costs and profitability. Rental owners need reports for their own property and agreed service. Those views should not share the same access by default.

Use the generic dashboard specification below as a starting template. Check local record and privacy duties before adopting it.

```text
Dashboard measure:
Business question:
Calculation:
Included records:
Excluded records:
Source report and fields:
Reporting period:
Last data refresh:
Data reviewer:
Access group:
Action trigger:
Person responsible for action:
Known limits:
Definition change date:
```

Review access when roles change or staff leave. Avoid sending unrestricted exports through group messages. If a dashboard includes resident feedback, remove details that do not support the business decision.

## How Do You Set Targets Without Misleading the Team?

Start with a checked baseline and a clear service need, then set an internal target. Label targets as management choices rather than outside benchmarks.

Use the same definition when comparing periods. If you change the denominator, keep the old and new series separate or explain the break. A better-looking chart may reflect a definition change rather than better work.

- Confirm the measure answers a real business question.
- Check source records and missing data.
- Set an internal target with the responsible lead.
- Pair speed with quality and unresolved-work measures.
- Record actions and review their effect.
- Explain limits when sharing results outside the team.

Use the [fee calculator](/tools/property-management-fee-calculator) for owner cost scenarios, not as a source for company profitability. Before building more charts, choose a measure and trace its latest result to the records. Fix the data or definition before changing the target.
