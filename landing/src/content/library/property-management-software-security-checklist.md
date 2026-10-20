---
title: "Property Software Security: Accounts, Funds and Logs — Citata.ai"
description: "Protect property software accounts with limited roles, extra login checks, verified bank changes and log reviews. Use daily checks alongside monthly close."
headline: "Protect Your Property Software Accounts and Funds"
dek: "Control access, verify payment changes and review exceptions before the monthly close."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Protect property management software through limited user access, extra login verification and independent payment-change checks. Review bank activity and sensitive changes between monthly closes. Vendor security features help, but staff must configure them and respond to exceptions."
visible: false
cluster: "software"
kind: "checklist"
priority: 4
inspired_by: "https://www.rentvine.com/blog/hot-takes-why-a-monthly-reconciliation-isnt-enough-to-catch-fraud"
faq:
  - q: "Which user roles should you set?"
    a: "Give each person only the access required for their work. Separate preparation, approval and administrative tasks where possible."
  - q: "Should you turn on two-factor login?"
    a: "Use the strongest extra login verification your vendor supports. Protect recovery methods and remove former staff promptly."
  - q: "How do you stop payment change fraud?"
    a: "Confirm changes through a trusted contact route already on file. Do not rely on the phone number in the change request."
  - q: "Why is monthly reconciliation not enough?"
    a: "Rentvine recommends daily transaction checks alongside monthly three-way reconciliation. A correct month-end balance does not explain every earlier change."
  - q: "What logs should you check?"
    a: "Review access, role changes, payment details, approvals, exports, corrections and integration activity. Assign a person to investigate exceptions."
sources:
  - label: "DoorLoop: Roles and login security (read 2026-10-19)"
    url: "https://www.doorloop.com/pricing"
  - label: "Buildium: Data security (read 2026-10-19)"
    url: "https://www.buildium.com/features/data-security/"
  - label: "Rentvine: Monthly reconciliation and fraud (read 2026-10-19)"
    url: "https://www.rentvine.com/blog/hot-takes-why-a-monthly-reconciliation-isnt-enough-to-catch-fraud"
  - label: "Rentvine: Trust accounting and audit trails (read 2026-10-19)"
    url: "https://www.rentvine.com/features/trust-accounting"
---

## Which user roles should you set?

Give each person the smallest set of permissions needed for their task. Use the checklist below as our control recommendation, not a claim that every vendor offers every setting.

| Role or task | Access to test | Control to verify |
|---|---|---|
| Leasing | Applications and lease records | No unrelated payment approval |
| Maintenance | Requests and assigned work | Limited resident financial data |
| Bookkeeping | Entries and reconciliation | Clear payment approval route |
| Payment approval | Approved bills and bank details | Separate change verification |
| Administration | Users and configuration | Named accounts and change logs |
| Integration | Required records only | Restricted credentials and revocation |

DoorLoop lists access roles and extra login verification on its pricing page. Buildium describes encryption and security reviews on its security page. Ask vendors to show your actual plan settings rather than relying on broad security claims.

Use named accounts. Shared logins make responsibility hard to trace. Remove old access when duties change, including connected applications and outside bookkeepers.

## Should you turn on extra login verification?

Enable the strongest additional login verification the vendor supports. Ask what methods exist, whether staff can bypass them and how recovery works.

Check the account that controls staff email too. A protected PMS login still depends on secure recovery and communication routes. Store recovery access under company control.

Test account recovery before an urgent lockout. Name who can approve it and what evidence support requires. Avoid a process where a caller can reset the administrator account without independent review.

Keep access records current. Review former staff, temporary users and outside services. A person who no longer needs a role should not keep it for convenience. Confirm that disabling an account also stops active sessions or ask the vendor how to revoke them. Write the actual process into staff instructions after testing it.

## How do you stop payment-change fraud?

Verify a payment change through a trusted route already on file. Treat the request and the verification as separate steps.

Do not call a new number supplied in the same email that changes bank details. Find the existing vendor or owner record and contact that person through a known route. Record who confirmed the change.

Require a review before the next payment uses the new destination. If your team is small, use an outside reviewer with suitable access. Define what evidence they inspect rather than asking them to approve blindly.

Test the workflow with a sample change. Check who can edit details, who sees the alert and whether the approval remains in the record. Inspect the bank destination before release. If the software cannot separate those tasks, document a manual check and make its completion visible. A vendor's encryption statement does not establish a safe approval process.

## Why is monthly reconciliation not enough?

Monthly reconciliation happens after transactions have already occurred. It can identify differences without explaining every suspicious payment or access change in time.

Rentvine's article on reconciliation recommends daily transaction checks alongside a monthly three-way match. It describes comparing the bank statement, bank ledger and client ledgers. Treat that as an operational recommendation, not a universal legal deadline.

Review recent bank activity against software entries between closes. Look for unfamiliar payees, duplicate payments and changes that lack approval. Investigate differences instead of forcing a match.

A balanced account does not prove every payment was authorized. A wrong payment can still have a matching ledger entry. Pair reconciliation with change and approval reviews. Keep the person who investigates an exception distinct from the person whose action needs review where possible. Record the cause and fix so the same issue does not remain invisible next month.

## What logs should you check?

Check records that show who changed access, money instructions and accounting entries. Ask the vendor which logs exist and whether they can be exported.

Rentvine describes transaction audit trails on its trust accounting page. Ask to see the original entry, change, user and time in a sample correction. Do not assume a general activity feed contains everything needed.

Use this review checklist:

- New users and removed accounts.
- Role and administrator changes.
- Login and recovery events, where available.
- Owner and vendor bank changes.
- Payment creation and approvals.
- Voided or corrected entries.
- Large exports and integration access.
- Unresolved reconciliation differences.

Assign a person to review exceptions and a route for escalation. Keep evidence secure and available to authorized reviewers. Choose review intervals based on your activity and risk. Test alerts before depending on them, including what happens when the usual reviewer is absent.

## How do you make the checklist work?

Turn each control into a named task with a visible record. A policy that nobody follows does not improve access or payment handling.

Start with administrator access and payment-change verification. Then test recovery, staff removal and log review. Keep a short record of failed checks and the person responsible for fixing each.

Ask vendors for the actual plan settings and support procedure. Do not send real resident data into a sales demo. Use sample records to test permissions and corrections.

Review the process after staff or integration changes. Keep the first response clear: pause the affected action, preserve records and contact the responsible people. Use the [guide library](/guides) for related management systems. Run a sample bank-detail change through your process and confirm that a second person can trace every approval.
