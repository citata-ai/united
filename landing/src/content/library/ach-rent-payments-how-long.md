---
title: "ACH Rent Payments: How Long They Take and What If They Bounce — Citata.ai"
description: "ACH debits settle the same or next banking day, but returns can come later: about 2 business days for NSF and up to 60 days for unauthorized consumer claims."
headline: "ACH Rent Payments: Timing, Returns and Fees"
dek: "Settled is not final: plan rent timing around the ACH return window."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Nacha says ACH debits settle the same day or the next banking day, and 80% of all ACH payments settle in one banking day or less. But a payment can still come back: most returns, such as NSF (insufficient funds), arrive within 2 business days, and unauthorized consumer claims can arrive up to 60 days later. Charge a returned payment fee only if the lease allows it and state law permits the amount."
visible: false
cluster: "landlord-ops"
kind: "guide"
priority: 4
inspired_by: "https://www.landlordstudio.com/blog/how-long-does-ach-take-for-rent"
faq:
  - q: "How long does an ACH rent payment take?"
    a: "Nacha says ACH debits settle the same day or the next banking day. Your rent platform may add its own processing days before funds reach you."
  - q: "What is an NSF return?"
    a: "An NSF return means the tenant's account did not have enough money. The bank sends the payment back with return code R01."
  - q: "How long can a tenant's bank return an ACH payment?"
    a: "Most returns come within 2 business days. Returns for unauthorized consumer debits can come up to 60 calendar days later, per Column Bank's ACH documentation."
  - q: "Can I charge a fee for a bounced rent payment?"
    a: "Often yes, if the lease allows it and the amount fits state law. New York limits a dishonored check fee to the actual cost or the amount in GOL 5-328, whichever is greater."
  - q: "Can I stop accepting ACH from a tenant?"
    a: "It depends on the state. California Civil Code 1947.3 lets a landlord demand cash for up to 3 months after a check on insufficient funds, with written notice."
sources:
  - label: "Nacha: How ACH payments work"
    url: "https://www.nacha.org/content/how-ach-payments-work"
  - label: "Column Bank: ACH returns documentation"
    url: "https://column.com/docs/ach/returns"
  - label: "eCFR: 12 CFR 1005.10, Preauthorized transfers (Regulation E)"
    url: "https://www.ecfr.gov/current/title-12/chapter-X/part-1005/subpart-A/section-1005.10"
  - label: "California Civil Code 1947.3 (California Legislative Information)"
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1947.3.&lawCode=CIV"
  - label: "California Civil Code 1719 (via FindLaw)"
    url: "https://codes.findlaw.com/ca/civil-code/civ-sect-1719/"
  - label: "New York Real Property Law 238-a (via FindLaw)"
    url: "https://codes.findlaw.com/ny/real-property-law/rpp-sect-238-a/"
---

## How many days does ACH take to clear?

ACH (automated clearing house, the U.S. bank transfer network) debits settle the same day or the next banking day. Nacha, which governs the network, says so on its "How ACH Payments Work" page. Nacha estimates that 80% of all ACH payments settle in one banking day or less.

Rent platforms often add their own days. A platform may hold funds before it pays you out. So the tenant's payment may leave their account on day 1 but reach yours on day 3 or later. Read your platform's timing page.

| Step | Typical timing | Who controls it |
|---|---|---|
| Tenant authorizes payment | Day 0 | Tenant |
| ACH debit settles | Same or next banking day | ACH network (Nacha rules) |
| Platform releases funds to you | Varies by platform | Rent platform |
| NSF or most other returns | Within about 2 business days | Tenant's bank |
| Unauthorized consumer claim | Up to 60 calendar days | Tenant's bank |

Banking days exclude weekends and federal holidays. A payment started Friday evening may not settle until Monday or Tuesday.

## Why is "settled" not the same as final?

A settled ACH payment can still come back. The ACH network does not send a "success" message. A payment counts as good only because no return arrived.

Column Bank's ACH documentation explains the windows under Nacha rules. Most returns must be sent within 2 business days. Some returns, such as unauthorized claims on consumer accounts, can be sent within 60 calendar days.

For landlords, this means:

- **Do not refund** an overpayment until the return window passes.
- **Do not count** a large first payment as final on day 1. A fake account can pass the first day.
- **Hand over keys** only after first rent and deposit have cleared, or take certified funds for move-in.

## What is an NSF return?

An NSF return means the tenant's account had "not sufficient funds." The tenant's bank sends the debit back with return code R01. Other common return codes, per Column Bank, include:

| Code | Meaning |
|---|---|
| R01 | Insufficient funds |
| R02 | Account closed |
| R04 | Invalid account number |
| R07 | Customer did not authorize the debit |
| R08 | Stop payment on the debit |
| R10 | Customer did not authorize the debit |

The code tells you what to do next. R01 often means the tenant can pay later. R02 or R04 means the bank details are wrong or old. R07 or R10 means the tenant disputes the debit. Talk to them right away.

A tenant can also stop an autopay debit on purpose. Under Regulation E (12 CFR 1005.10(c)), a consumer can stop a preauthorized transfer by telling their bank at least 3 business days before the scheduled date. The rent is still due.

## Can I charge an NSF fee?

You can often charge a returned payment fee if the lease says so and the amount fits state law. States set limits, and many write them for checks. Check how your state treats electronic payments.

| State | Rule | Source |
|---|---|---|
| California | For a check passed on insufficient funds, a service charge of up to $25 for the first check and up to $35 for each later one | Civil Code 1719(a) |
| New York | A fee for a dishonored rent check only if the lease provides for it, capped at actual cost or the amount in GOL 5-328, whichever is greater | RPL 238-a(2-a) |

California Civil Code 1947.3(b) also says a landlord may not charge a fee for payment by check.

Keep the NSF fee separate from the late fee. A returned payment can make rent late, so both fees may apply. Some states limit stacking. Check your state's late fee statute too.

This is general information, not legal advice. Check the current law or ask a local attorney.

## When should I stop accepting ACH from a tenant?

Consider a different payment method after repeated returns. Set your own trigger in the lease, for example 2 returns in 6 months. Your state may limit what you can require.

California Civil Code 1947.3(a)(2) is one example. If a tenant pays with a check on insufficient funds, or stops payment on a check, the landlord may demand cash only for up to 3 months. The landlord must give written notice that the instrument was dishonored, with a copy attached. The statute names checks, so ask a local attorney how it applies to a returned ACH debit.

California also requires that landlords allow at least one form of payment that is neither cash nor electronic funds transfer (Civil Code 1947.3(a)(1)).

A fair process:

1. **First return:** tell the tenant the same day. Ask for payment by a fast method. Apply lease fees.
2. **Second return in 6 months:** send a written warning.
3. **Third return:** require certified funds or another verified method for a set period, where state law allows it.
4. **Log each event** with date, code and amount.

Apply the same rule to every tenant.

## How do I set up rent timing around ACH?

Set the autopay date so a return can arrive before your own bills are due. Here is an example:

- Rent is due on the 1st.
- Autopay runs 2 business days before the 1st.
- The NSF return window ends about 2 business days after settlement.
- Your mortgage is due on the 10th.

That plan gives you about a week to collect a failed payment before your mortgage. If your mortgage is due on the 1st too, move one of the dates.

## What you can do next

Read your rent platform's payout timing page and write the real number of days into your process. If you want rent collection handled for you, compare costs with the [property management fee calculator](/tools/property-management-fee-calculator).
