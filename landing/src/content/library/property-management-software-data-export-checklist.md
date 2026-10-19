---
title: "Property Software Export: A Complete Exit Checklist — Citata.ai"
description: "Export ledgers, statements, leases and attachments before software access ends. Check totals, file access and missing records before closing the account."
headline: "Property Software Data Export Checklist"
dek: "Build a usable archive while your account still works, then verify balances and original documents."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Export financial ledgers, balances, statements, leases, attachments and operational histories before your old software access ends. Keep stable record identifiers so related files remain connected. Verify both totals and file completeness before accepting the export or closing the account."
visible: false
cluster: "software"
kind: "checklist"
priority: 3
inspired_by: "https://faroutsolutions.com/blog/property-management-software-data-migration-guide/"
faq:
  - q: "Is a contact CSV a complete export?"
    a: "No. Contacts do not preserve ledgers, signed documents, messages or correction history. Build a record inventory before exporting."
  - q: "Should I export attachments separately?"
    a: "Yes, when they are not included in the structured export. Keep each file linked to its property, lease, invoice or person."
  - q: "Does an API guarantee a complete archive?"
    a: "No. Confirm endpoint coverage, permissions, pagination, limits and document downloads. Test the records actually required."
  - q: "How long must I keep records?"
    a: "The answer depends on jurisdiction, record type and your role. Have counsel and your accountant approve a retention schedule before deleting anything."
sources:
  - label: "Rentvine: API Documentation (read 2026-10-19)"
    url: "https://docs.rentvine.com/"
  - label: "Rentvine: Master Subscription Terms (read 2026-10-19)"
    url: "https://www.rentvine.com/terms"
  - label: "AppFolio: Owner Portal Report Exports (read 2026-10-19)"
    url: "https://www.appfolio.com/help/owner"
---

## Which ledgers and reports must you keep?

Keep enough financial detail to explain every opening balance and every past statement. The exact retention duty depends on your jurisdiction and role. As an operating checklist, start with transactions and supporting records rather than only a final balance report.

Build an inventory:

| Record group | Export and check |
|---|---|
| Accounting | General ledger, bank records, reconciliations and corrections |
| Rent | Charges, payments, credits, deposits and prepayments |
| Owners | Statements, contributions, reserves and distributions |
| Vendors | Bills, payments, credits and supporting invoices |
| Leasing | Current and past leases, terms and signed files |
| Operations | Work orders, inspections, messages and open tasks |

AppFolio's owner help page describes report downloads and structured report exports. Those owner-facing reports are useful, but they do not establish a complete manager-account export.

Ask your accountant which reports prove the final balances. Preserve a dated copy of each report before changes continue during the move.

## How do you export attachments and documents?

Export original files and a clear index that links each file to its business record. A folder full of unnamed documents can be nearly as hard to use as a missing archive.

Ask the vendor which file types the export includes. Check signed leases, amendments, invoice images, inspection photos and correspondence. Do not assume files embedded in messages arrive with a contact or lease export.

Keep the original file name where useful, but add stable record identifiers in the index. Record the property, lease, invoice or work-order relationship. Avoid relying only on a person's name, which may change or repeat.

Open examples from every record group. Confirm images display and signed documents contain the expected pages. Check whether downloaded links expire. A text file containing temporary links is not the same as a local copy of the files.

Store the archive in company-controlled storage with restricted access. Do not send the entire archive through a general staff inbox.

## What do state record-keeping rules require?

State requirements vary by record, activity and professional role. This checklist does not give a national retention period or assume every landlord follows the same broker rules. Confirm the law that applies to your company before deleting records.

Build a retention schedule with your attorney and accountant. List the record group, applicable jurisdiction, approved period and any hold that prevents deletion. Include documents needed for unresolved disputes or accounting reviews.

Separate legal retention from vendor access. A duty to keep a record does not require the old vendor to maintain your subscription indefinitely. Rentvine's reviewed terms describe termination and conditional retrieval access, including possible assistance charges.

Assign responsibility before cancellation. Someone must approve the archive, manage access and apply the retention schedule later. This is general information, not legal advice. Check the current law or ask a local attorney.

## How do API rate limits affect an export?

API limits can slow retrieval and require careful batching, but a usable export also depends on coverage, permissions and pagination. API means a software interface for data exchange. Do not assume “open API” means unlimited bulk downloads.

Rentvine's API documentation describes authentication, roles and paginated lease exports. That supports planning a structured export. It does not establish a universal rate or prove that every attachment is included in a lease response.

Ask the vendor for current request limits and bulk-export options. Estimate the work from actual record counts and file sizes. Include time for retries, missing files and updates made after the first export.

Use a read-only role where available. Keep credentials out of shared files and revoke them after the work. Log failed requests without exposing personal information. A successful request status alone does not prove that every page was retrieved.

## How do you check that the export is complete?

Check record counts, financial totals, document availability and relationships independently. A matching file count does not prove correct balances, and correct totals do not prove that attachments survived.

Compare the old reports with the archive and proposed new system. Review deposits, prepayments, unpaid invoices and owner funds separately. Ask the accountant to explain differences before approving opening balances.

Use source identifiers to find missing or repeated records. Check archived and inactive properties as well as active ones. An export can appear complete while excluding closed leases that staff still need.

Create an exception list for every failed check. Record the missing item, source location, responsible person and resolution. Do not mark the migration complete because the majority imported successfully. Required missing records need an explicit decision.

## What should happen before the old account closes?

Close the old account only after the archive works without the old login and required balances pass review. Plan for transactions posted between the first export and the final change.

- **Freeze:** agree when staff stop entering new work in the old system.
- **Capture:** export the final changes after that cutoff.
- **Compare:** check totals and open items against dated source reports.
- **Open:** verify original files from every record group.
- **Restore:** test that another authorized staff member can use the archive.
- **Approve:** obtain accounting and operations sign-off.
- **Cancel:** follow the contract's notice process and keep confirmation.

Preserve the final fee schedule and contract with the archive. Ask how late returned payments or disputes will be documented after access ends.

Use our [guides](/guides) for related software decisions. The [AppFolio and Buildium comparison](/guides/appfolio-vs-buildium) shows why plan and access terms matter. Your next step is to export a sample now and prove that your team can use it independently.
