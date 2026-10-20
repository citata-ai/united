---
title: "Running Many Section 8 Units: Inspections, HAP, Software, KPIs — Citata.ai"
description: "Run 50 to 500 voucher units without missed inspections or HAP gaps. Track due dates, reconcile HAP across PHAs, split tasks by role and watch 8 key KPIs."
headline: "How to Run Many Voucher Units Without Missed Deadlines"
dek: "At scale, voucher income depends on dates. Put every federal clock in one sheet."
published: "2026-10-19"
updated: "2026-10-19"
answer: "To run many voucher units, track every federal clock in one place: the biennial inspection, the 24-hour and 30-day repair deadlines, the 60-day rent change notice and the 180-day automatic end of a HAP contract. Reconcile HAP by unit, by PHA, every month. Give each task an owner, and watch a short KPI set such as first-pass inspection rate and abatement days."
visible: false
cluster: "section-8"
kind: "guide"
priority: 5
faq:
  - q: "How do I track Section 8 inspection dates for many units?"
    a: "Keep one table with each unit's last inspection date and PHA. Add 24 months (36 at a small rural PHA) for the next due date, since 24 CFR 982.405 requires at least biennial inspections. Set a prep reminder 60 days before."
  - q: "How do I reconcile HAP payments from more than one housing authority?"
    a: "Reconcile by unit and by PHA each month: expected HAP from the latest PHA notice, HAP received, and the difference. A family that moved with portability is paid by the receiving PHA, which administers its assistance (24 CFR 982.355)."
  - q: "What software supports Section 8 units?"
    a: "AppFolio lists affordable housing capabilities in its Plus plan, from $3.20 per unit per month. Yardi Breeze sells an affordable housing edition from $3 per unit per month with a $400 monthly minimum, and says it can receive and distribute housing assistance payments."
  - q: "Which voucher tasks can staff own?"
    a: "Split by role: a leasing person owns RFTA packets and listings, a maintenance lead owns inspection prep and repair deadlines, and an accountant owns HAP reconciliation and 1099s. One compliance owner should watch every PHA notice."
  - q: "What KPIs should I track for voucher units?"
    a: "Track first-pass inspection rate, days from RFTA to HAP contract, abatement days per year, HAP variance, open repair items past deadline, units with inspections due in 90 days, rent change notices sent on time and HAP contracts at $0 HAP."
sources:
  - label: "eCFR: 24 CFR 982.405, PHA unit inspection"
    url: "https://www.ecfr.gov/current/title-24/section-982.405"
  - label: "eCFR: 24 CFR 982.404, Maintenance and PHA remedies"
    url: "https://www.ecfr.gov/current/title-24/section-982.404"
  - label: "eCFR: 24 CFR 982.305, PHA approval of assisted tenancy"
    url: "https://www.ecfr.gov/current/title-24/section-982.305"
  - label: "eCFR: 24 CFR 982.308, Lease and tenancy addendum"
    url: "https://www.ecfr.gov/current/title-24/section-982.308"
  - label: "eCFR: 24 CFR 982.355, Portability: administration by receiving PHA"
    url: "https://www.ecfr.gov/current/title-24/section-982.355"
  - label: "eCFR: 24 CFR 982.455, Automatic termination of HAP contract"
    url: "https://www.ecfr.gov/current/title-24/section-982.455"
  - label: "AppFolio: Property management software pricing (read 2026-10-19)"
    url: "https://www.appfolio.com/pricing"
  - label: "Yardi Breeze: Affordable housing property management software (read 2026-10-19)"
    url: "https://www.yardibreeze.com/affordable/"
---

## How do I track inspection dates?

Track inspection dates in one table, with one row per unit. 24 CFR 982.405(b) says the PHA must inspect each unit "at least biennially". A small rural PHA inspects every 3 years. A PHA can inspect more often, and a tenant complaint can start a special inspection at any time.

At 200 voucher units on a 2-year cycle, about 100 periodic inspections fall in a year. That is about 2 a week. Without a calendar, a few will surprise you.

The columns that matter:

| Column | Example | Why |
|---|---|---|
| Unit | 412 Oak St, #2 | One row per unit |
| PHA | Metro HA | Rules differ by PHA |
| Last inspection | 2025-03-14 | Base date |
| Next due (est.) | 2027-03-14 | Last + 24 months (36 if small rural PHA) |
| Prep reminder | 2027-01-13 | Due date − 60 days |
| Built before 1978? | Yes | Lead visual check applies if a child under 6 lives there |
| Open fail items | 1 (GFCI, kitchen) | Drives the repair clock |
| Repair deadline | 2026-11-02 | 24 hours or 30 days from PHA notice |

The repair deadline is the most expensive column. Under 24 CFR 982.404, you have 24 hours for a life-threatening item and 30 days for others. Miss it, and the PHA must abate the HAP. If the unit still fails 60 days after the abatement notice, or a longer PHA period, the PHA must end the HAP contract.

## How do I reconcile HAP across PHAs?

Reconcile HAP by unit and by PHA every month. Each PHA pays on its own schedule, with its own statement format. A family that moves into your area with portability (moving a voucher between PHAs) is paid by the receiving PHA, which "must administer assistance" for the family (24 CFR 982.355). So one building can have HAP from 2 or 3 PHAs.

Monthly reconciliation table, with example numbers:

| PHA | Units | Expected HAP | Received | Variance | Reason |
|---|---|---|---|---|---|
| Metro HA | 84 | $96,600 | $95,400 | −$1,200 | 1 unit in abatement |
| County HA | 31 | $33,480 | $33,480 | $0 | — |
| Port-in (State HA) | 6 | $7,020 | $6,340 | −$680 | Income review; new tenant share |
| Total | 121 | $137,100 | $135,220 | −$1,880 | |

Expected HAP comes from the latest PHA notice for each unit, not last month's deposit. For each variance, find the notice: an abatement, an income review, a move-out or a rent change. Then bill the tenant only the tenant share in the notice.

Two clocks to watch in this table:

- **$0 HAP.** If a tenant's income rises and the HAP drops to $0, the HAP contract ends automatically 180 days after the last payment (24 CFR 982.455).
- **New leases.** The PHA must sign the HAP contract within 60 days of the lease start, and then pays back to the start, up to 60 days (24 CFR 982.305(c)). A new lease with no HAP after 45 days needs a call.

## What software supports Section 8?

Some property management software lists affordable or subsidized housing tools. Here is what 2 vendors say on their public pages, read 2026-10-19.

| Product | Price shown | What the page says about subsidy |
|---|---|---|
| AppFolio Plus | From $3.20 per unit per month; minimum spend and units apply | "Affordable Housing Capabilities" in the Plus plan |
| AppFolio Core | From $1.49 per unit per month; 50-unit minimum | No affordable housing line on the page |
| Yardi Breeze (affordable) | From $3 per unit per month, $400 monthly minimum, annual agreement | "Receive and distribute housing assistance and subsidy payments"; HOTMA updates; HUD 50059, TRACS |

The Yardi page lists HUD 50059 and TRACS under compliance. Ask the vendor which tools apply to tenant-based vouchers. For tenant-based units, the key needs are simple: split rent into HAP and tenant share, post HAP per PHA, and track inspection and abatement dates. Ask any vendor to demo those 3 steps with your own PHA statements.

For a wider software comparison, see our [AppFolio vs Buildium guide](/guides/appfolio-vs-buildium).

## Which tasks can staff own?

Most voucher tasks fit 4 roles. Give each task one owner, even on a small team.

| Role | Owns | Federal clock |
|---|---|---|
| Leasing | Listings, RFTA packets, lease and tenancy addendum, lead disclosure | HAP contract within 60 days of lease start |
| Maintenance lead | Inspection prep, fail items, reinspection booking, photos | 24 hours / 30 days to repair |
| Accounting | HAP posting, reconciliation, tenant share billing, 1099 check | 180 days at $0 HAP |
| Compliance owner | Every PHA notice, rent change notices, owner records | 60-day rent change notice to PHA |

The 60-day rent change notice comes from 24 CFR 982.308(g)(4). The owner must notify the PHA of any rent change "at least sixty days" before it takes effect, and the new rent must pass rent reasonableness.

Watch for: PHA mail goes to many inboxes at scale. Route every PHA email and portal alert to one shared box that the compliance owner reads daily.

## KPI table for voucher units

Track a short KPI set each month. These are our suggested measures, not industry benchmarks.

| KPI | How to count | Why it matters |
|---|---|---|
| First-pass inspection rate | Units passed on first visit ÷ units inspected | Fewer reinspections and fees |
| Days from RFTA to HAP contract | Median days, new leases | Vacancy cost |
| Abatement days | Sum of days with HAP abated | Lost income the PHA does not repay |
| HAP variance | Received − expected, % | Errors and missed notices |
| Repairs past deadline | Open PHA items past 24 h / 30 days | Abatement risk |
| Inspections due in 90 days | Count of units | Prep workload |
| Rent changes on time | Changes with 60-day PHA notice ÷ all changes | Avoids rejected increases |
| Units at $0 HAP | Count, with day count to 180 | Contract will end |

Start with 3: first-pass rate, abatement days and HAP variance. They cover most lost income. To see how much HAP a single unit carries, run it in our [Section 8 rent calculator](/tools/section-8-rent-calculator).

This is general information, not legal advice. Check the current law or ask a local attorney.
