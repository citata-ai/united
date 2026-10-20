---
title: "Track HAP and Tenant Rent In Your Rental Software — Citata.ai"
description: "Track HAP and tenant rent with separate payer balances, a shared lease record, and monthly remittance checks. Keep delayed subsidy out of tenant arrears."
headline: "How To Track HAP And Tenant Rent"
dek: "Keep housing authority and tenant balances distinct while matching each payment to its approved rent period."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Record tenant rent and Housing Assistance Payments against the same lease, with separate payer tracking. Allocate each housing authority deposit from its remittance advice, rather than treating the bank total as tenant rent. Keep delayed or abated HAP out of the tenant's amount due."
visible: false
cluster: "software"
kind: "how-to"
priority: 3
inspired_by: "https://www.biggerpockets.com/posts/7250086"
faq:
  - q: "Should HAP and tenant rent be two charges?"
    a: "Use separate payer tracking so the tenant share and HAP share stay clear. Your software may use separate charges, a subsidy ledger, or another supported design."
  - q: "How do you post a PHA wire that covers many units?"
    a: "Split the PHA deposit by its remittance detail, then match the allocated receipts to the bank total. The deposit alone does not identify every unit or rent period."
  - q: "How do you handle an abatement month?"
    a: "Follow the PHA's written notice and distinguish withheld HAP from abated HAP. Those statuses can have different accounting consequences."
  - q: "How do you set late fees only on the tenant share?"
    a: "Configure late-fee rules against the lawful tenant balance, with HAP excluded. Test the rule before it sends a notice or posts a fee."
sources:
  - label: "Hemlane Support: Record payments made outside Hemlane"
    url: "https://support.hemlane.com/hc/en-us/articles/360043495952-How-do-I-track-record-and-manage-payments-made-outside-of-Hemlane"
  - label: "Cornell LII: 24 CFR 982.451, HAP contract"
    url: "https://www.law.cornell.edu/cfr/text/24/982.451"
  - label: "Cornell LII: 24 CFR 982.404, maintenance and PHA remedies"
    url: "https://www.law.cornell.edu/cfr/text/24/982.404"
---

## Should HAP and tenant rent be two charges?

Use separate payer tracking so the tenant share and HAP share stay clear. Your software may use separate charges, a subsidy ledger, or another supported design. Ask support which method preserves the full rent without duplicate income.

HAP means Housing Assistance Payments. A PHA is the public housing agency that administers the payment. Keep its record separate from the tenant contact.

Under 24 CFR 982.451, HAP credits the rent due under the lease. The same rule says the family does not owe the HAP-covered portion. Name both payers in your internal records.

| Record | What to store | What to prevent |
|---|---|---|
| Approved rent | Current rent-to-owner notice | Charging more than approved rent |
| Tenant share | Effective date and amount | Treating subsidy delay as tenant debt |
| HAP share | Agency, period, and contract reference | Posting the same subsidy twice |
| Receipt | Bank and remittance reference | Applying money by guesswork |

These are accounting design recommendations. Confirm the exact setup with your accountant and the software vendor.

## How do you post a PHA wire that covers many units?

Split the PHA deposit by its remittance detail, then match the allocated receipts to the bank total. The deposit alone does not identify every unit or rent period.

Save the remittance file before entry. For each line, identify the property, lease, period, amount, and any adjustment. Check names against stable unit and contract identifiers.

Create the receipts through the software's supported batch process. If the tool does not support a batch, use documented individual entries with a common deposit reference. Recheck the total before saving.

Hemlane's outside-payment help permits recording offline receipts and matching them to an existing request. Use the existing charge when appropriate. A new income entry can double-count a charge that already exists.

Keep unmatched remittance lines in an exception list for review. Do not apply a missing unit's payment to another tenant merely to make the deposit balance. Ask the agency for missing detail.

## How do you handle an abatement month?

Follow the PHA's written notice and distinguish withheld HAP from abated HAP. Those statuses can have different accounting consequences. Do not shift the shortfall onto the tenant.

The maintenance remedies in 24 CFR 982.404 distinguish withholding from abatement. Ask the PHA to confirm the applicable status and contract treatment for your unit.

Record the notice, affected period, repair issue, and staff member responsible. Link inspection and repair evidence to the lease or property record. Keep the agency's amount separate from normal tenant arrears.

Ask your accountant whether the relevant balance stays receivable or needs a documented adjustment. The answer depends on the notice and facts. A generic software rule should not decide the treatment.

Keep later payments tied to the original period. If the PHA restores a withheld amount, avoid posting it as new rent for the current month. Reconcile both the receipt and the earlier exception.

## How do you set late fees only on the tenant share?

Configure late-fee rules against the lawful tenant balance, with HAP excluded. Test the rule before it sends a notice or posts a fee.

The family is not responsible for the HAP-covered share under 24 CFR 982.451. That is why a combined unpaid rent balance can be unsafe for automatic tenant charges.

Create a sample lease with tenant rent paid and HAP still pending. Run the fee process in a permitted test environment. Check the tenant statement, notices, and staff delinquency report.

Then test a tenant payment still in transit. Ask how the software distinguishes pending, settled, and returned money. Have staff review exceptions before notices go out.

Confirm local fee rules and the lease terms with counsel. This is general information, not legal advice. Check the current law or ask a local attorney.

## How do you reconcile HAP each month?

Reconcile expected HAP, remittance detail, posted receipts, and bank deposits by lease and period. A bank match without payer detail leaves missing subsidy hard to find.

Build a monthly control sheet with expected amount, received amount, adjustment, balance, and follow-up owner. Use a separate reason field for timing, abatement, and unresolved differences.

Review retroactive rent-share changes from their effective date. Correct future schedules and inspect prior periods. Keep the agency notice with the correction so another reviewer can follow the change.

Check that tenant and PHA balances together still explain approved rent. Verify credits and refunds with the agency before applying them elsewhere. Under 24 CFR 982.451, excess payments require attention and return to the appropriate payer.

Save the close report and the open exception list. Give unresolved items a person and next action. For rent context, use the [Section 8 rent guide](/guides/section-8-rent-limits) and [rent calculator](/tools/section-8-rent-calculator).

## How should you test the choice before you pay?

Test the full workflow with sample records before you move live data. Use the same case in each product. Ask the person who will do the daily work to run the test. A sales demo alone does not show where your team will need help.

Keep a decision sheet with the task, result, missing step, and person who checked it. Mark each result as shown, promised, or still open. Ask for written terms when a feature needs an upgrade or another service. Include staff setup time in your cost review.

Check the exit path while you still control the choice. Export the sample records and open them outside the platform. Confirm that notes, files, dates, and links remain useful. Ask how you will get records after you close the account.

Choose a tool when the test proves a clear gain for your workflow. Keep your current process until the new process passes. Use the [property management fee calculator](/tools/property-management-fee-calculator) to see how software costs affect your service margin.
