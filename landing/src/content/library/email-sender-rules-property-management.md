---
title: "Gmail and Yahoo Sender Rules for Property Managers — Citata.ai"
description: "Gmail and Yahoo want SPF or DKIM from all senders, SPF, DKIM and DMARC from bulk senders, a spam rate under 0.3% and one-click unsubscribe on marketing mail."
headline: "Gmail and Yahoo Sender Rules for Property Managers"
dek: "A checklist for owner newsletters, rent reminders and lead emails, from the inbox providers' own pages."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Gmail and Yahoo ask every sender to set up SPF or DKIM, use valid DNS records and keep the spam rate below 0.3%. Bulk senders (Gmail: 5,000 or more messages a day) must set up SPF, DKIM and a DMARC policy of at least p=none, align the From domain, and offer one-click unsubscribe on marketing mail. Yahoo asks bulk senders to honor an unsubscribe within 2 days. A property manager that sends owner newsletters from its own domain should check all of these."
visible: false
cluster: "pm-marketing"
kind: "checklist"
priority: 4
inspired_by: "https://fourandhalf.com/2024-gmail-and-yahoo-sender-requirements/"
faq:
  - q: "What spam rate is too high for Gmail?"
    a: "Google says to keep the spam rate in Postmaster Tools below 0.3%. Its troubleshooting advice is to stay below 0.1% and never reach 0.3%."
  - q: "Do I need DMARC as a small property manager?"
    a: "Gmail and Yahoo require DMARC for bulk senders only. Both strongly recommend it for all senders, and a policy of p=none is enough to meet the bulk sender rule."
  - q: "Who counts as a bulk sender for Gmail?"
    a: "Google applies its stricter rules to senders of 5,000 or more messages a day to Gmail accounts. A large owner and tenant list plus rent reminders can reach that number."
  - q: "Do owner newsletters need an unsubscribe link?"
    a: "Yes. Gmail asks bulk senders for one-click unsubscribe on marketing mail plus a visible link in the body. The CAN-SPAM Act also asks for a clear opt-out in every marketing email."
  - q: "How fast must I process an unsubscribe?"
    a: "Yahoo asks bulk senders to honor unsubscribes within 2 days. The CAN-SPAM Act sets a legal limit of 10 business days."
sources:
  - label: "Google Workspace Admin Help: Email sender guidelines"
    url: "https://support.google.com/a/answer/81126"
  - label: "Yahoo Sender Hub: Sender best practices"
    url: "https://senders.yahooinc.com/best-practices/"
  - label: "FTC: CAN-SPAM Act, a compliance guide for business"
    url: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business"
---

## What do Gmail and Yahoo sender rules mean for property management emails?

Gmail and Yahoo sender rules mean your email must prove it comes from your domain, or it can go to spam or bounce. Google started these rules on February 1, 2024, according to its email sender guidelines. Yahoo has a matching list on its Sender Hub.

A property management company sends many kinds of email. Owner statements, rent reminders, newsletters, lead follow-ups and maintenance updates all count. Some go out from your property management software. Some go from your email marketing tool. Some go from staff mailboxes in Google Workspace or Microsoft 365. Each of these senders must pass the checks.

Here are the rules side by side, as each company states them.

| Rule | Gmail, all senders | Gmail, 5,000+ a day | Yahoo, all senders | Yahoo, bulk senders |
|---|---|---|---|---|
| SPF and DKIM | SPF or DKIM | SPF and DKIM | SPF or DKIM | SPF and DKIM |
| DMARC | Recommended | Required, p=none is enough | Strongly urged | Required, at least p=none, must pass |
| From domain alignment | Not required | Must align with SPF or DKIM domain | Not stated | DMARC must pass |
| Spam rate | Below 0.3% | Below 0.3%, aim below 0.1% | Below 0.3% | Below 0.3% |
| One-click unsubscribe | Not required | Required on marketing mail | Not required | Required on marketing mail |
| Honor unsubscribe | Not stated | Not stated | Not stated | Within 2 days |
| Valid forward and reverse DNS | Yes | Yes | Yes | Yes |
| TLS connection | Yes | Yes | Not stated | Not stated |

Sources: Google email sender guidelines and Yahoo sender best practices, both read 2026-10-19.

## What are SPF, DKIM and DMARC?

SPF, DKIM and DMARC are three DNS records that prove your email is really from you. You add them at your domain host, for example Cloudflare or GoDaddy.

- **SPF (Sender Policy Framework).** A list of the servers that may send mail for your domain. Add each tool: Google Workspace, your PM software, your newsletter tool.
- **DKIM (DomainKeys Identified Mail).** A digital signature on each email. Each sending tool gives you its own DKIM record. Google says personal Gmail accounts need a DKIM key of 1024 bits or longer, and it recommends 2048 bits.
- **DMARC (Domain-based Message Authentication, Reporting and Conformance).** A policy that tells inboxes what to do when SPF or DKIM fails. It also sends you reports. Google says a policy of p=none meets the bulk sender rule.

The common gap for property managers is the PM software. Many PM platforms send email on your behalf with your domain in the From line. If you did not add their DKIM record, that mail may fail the check. Ask your vendor for its SPF include and DKIM setup page.

Gmail also asks bulk senders to align the From domain. Google says the domain in the From header must match the SPF domain or the DKIM domain. So "news@yourpm.com" must be signed by yourpm.com, not only by the newsletter tool's domain.

## What spam rate is too high?

A spam rate of 0.3% or higher is too high for both Gmail and Yahoo. Google says to keep the rate reported in Postmaster Tools below 0.3%. Its troubleshooting section says to stay below 0.1%.

Here is what that means for a newsletter to 2,000 owners and prospects:

| Spam rate | Spam reports per 2,000 delivered | Status |
|---|---|---|
| 0.1% | 2 | Google's target |
| 0.3% | 6 | Limit for Gmail and Yahoo |
| 0.5% | 10 | Over the limit |

Six people who click "Report spam" can put the whole list at risk. The usual cause is mail that people did not expect. A bought list of landlords, or old leads who never asked for a newsletter, both raise the rate.

To keep the rate low:

1. **Send only to people who asked.** Owners, past owners and leads who opted in.
2. **Say who you are in the first line.** Use the company name owners know.
3. **Remove inactive addresses.** Drop people who have not opened in 6 or 12 months.
4. **Split tenant and owner lists.** Each group gets only what it needs.

## Do I need a one-click unsubscribe?

Yes, if you are a bulk sender and the email is marketing. Google asks marketing and subscribed messages to support one-click unsubscribe. It also asks for a clearly visible unsubscribe link in the body. The one-click part uses two email headers: List-Unsubscribe and List-Unsubscribe-Post. Yahoo asks for the same header and says to honor unsubscribes within 2 days.

Ask your newsletter tool if it adds these headers on campaign mail. Also check that the tool sends from your domain with your DKIM record.

Transactional email is different. A rent receipt or an owner statement is not marketing. Do not add a newsletter-style unsubscribe that stops owners from getting statements.

The law also applies. The CAN-SPAM Act asks every marketing email to include a clear way to opt out and a valid postal address. The FTC says you must process an opt-out within 10 business days. The FTC also says the law "makes no exception for business-to-business email." Each violating email can cost up to $53,088 (FTC).

This is general information, not legal advice. Check the current law or ask a local attorney.

## How do I check my setup?

Check your setup with free tools and one test email.

- [ ] List every tool that sends email as your domain: Workspace or 365, PM software, newsletter tool, CRM, website forms.
- [ ] Check that your SPF record includes each tool. Keep one SPF record per domain.
- [ ] Add the DKIM record from each tool. Use 2048-bit keys where the tool allows it.
- [ ] Publish a DMARC record. Start with p=none and a report address.
- [ ] Sign up for Google Postmaster Tools and verify your domain. Watch the spam rate there.
- [ ] Send a test to a Gmail address. Open "Show original" and look for SPF PASS, DKIM PASS and DMARC PASS.
- [ ] Confirm one-click unsubscribe and a body link on each newsletter.
- [ ] Confirm your postal address is in the footer of marketing email.
- [ ] Write down who updates the records when you add a new tool.

When DMARC reports show that all your real mail passes, you can move the policy to p=quarantine. That step is optional for the Gmail and Yahoo rules.

Good email setup also helps your owner lead funnel. A lead who fills in a form expects your reply in the inbox, not in spam. For the bigger picture on owner leads, read [why owner leads are dropping](/guides/why-owner-leads-are-dropping).
