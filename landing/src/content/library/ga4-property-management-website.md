---
title: "GA4 for Property Management Websites: Track Owner Leads — Citata.ai"
description: "Set up GA4 to count owner leads, not visits: split owner and tenant pages, mark owner forms and calls as key events, and check 5 reports each month."
headline: "Set Up GA4 to Track Owner Leads"
dek: "Traffic counts tenants, vendors and bots. Owner leads are the number that pays the bills."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Count an owner lead only when a rental owner sends an owner form, books a call or calls your owner line. In GA4, tag owner pages with a content group, create one owner_lead event from the owner form thank-you page, and mark it as a key event. Leave tenant forms out of the count. Then check lead source, landing page and owner page traffic once a month."
visible: false
cluster: "pm-marketing"
kind: "how-to"
priority: 4
inspired_by: "https://www.clearleaddigital.com/blog/google-analytics-for-property-managers"
faq:
  - q: "What counts as an owner lead in GA4?"
    a: "An owner lead is a rental owner who asks about your management service: an owner form, a rental analysis request, a booked owner call or a call to the owner line. Tenant applications, maintenance requests and rent payments are not owner leads."
  - q: "How many key events can a GA4 property have?"
    a: "A standard GA4 property can have up to 30 key events, and an Analytics 360 property up to 50 (Google Analytics Help). Most property managers need 2 to 4."
  - q: "Does GA4 count form submissions on its own?"
    a: "Enhanced measurement can send form_start and form_submit events. But form_submit fires for every form, so it mixes owner and tenant forms. A thank-you page for the owner form gives a cleaner owner lead count."
  - q: "How long does GA4 keep my data?"
    a: "A standard property keeps user and event data for 2 or 14 months. The setting affects explorations and funnel reports only, not standard reports (Google Analytics Help). Set it to 14 months."
  - q: "Why do Google Business Profile visits show as organic in GA4?"
    a: "Clicks from a Google Business Profile link show as organic search unless you add UTM tags to the link. The Goodjuju 2026 lead source study notes this and groups Google Search and the Map Pack together for that reason."
sources:
  - label: "Google Analytics Help: About key events"
    url: "https://support.google.com/analytics/answer/13128484?hl=en"
  - label: "Google Analytics Help: Data retention"
    url: "https://support.google.com/analytics/answer/7667196?hl=en"
  - label: "Google Analytics Help: Enhanced event measurement"
    url: "https://support.google.com/analytics/answer/9216061?hl=en"
  - label: "Google Analytics Help: Content groups"
    url: "https://support.google.com/analytics/answer/11523339?hl=en"
  - label: "Google Analytics Help: Create an event"
    url: "https://support.google.com/analytics/answer/12844695?hl=en"
  - label: "Google Analytics Help: Search Console links"
    url: "https://support.google.com/analytics/answer/10737381?hl=en"
  - label: "Goodjuju: Property Management Owner Lead Source Study 2026 (spring and fall)"
    url: "https://gogoodjuju.com/property-management-lead-source-report-2026/"
---

## Which events count as an owner lead?

An owner lead is a rental owner who asks about your management service. Everything else on a property management site is traffic, not owner demand. Most PM sites get far more tenant visits than owner visits, so a raw traffic number hides the real picture.

Goodjuju's 2026 lead source study shows how to draw the line. It counted owner leads only and left out tenant forms: maintenance, accounting, applications and payments. In the fall window, its 35 client companies had 141,908 visits and 1,262 owner leads (Goodjuju, 2026-10). That is about 0.9 owner leads per 100 visits. These are one agency's clients, so treat the rate as a reference, not a target.

Use this table to sort your site's actions:

| Action on the site | Owner lead? | GA4 event to use |
|---|---|---|
| Owner contact or "get a proposal" form | Yes | owner_lead (key event) |
| Free rental analysis request | Yes | owner_lead (key event) |
| Booked owner call (calendar tool) | Yes | owner_call_booked (key event) |
| Click on the owner phone number | Yes, as a call intent | owner_phone_click (key event) |
| Download of an owner guide or fee sheet | No, a soft signal | file_download |
| Rental application or "apply now" click | No | none, or a tenant event |
| Maintenance request or rent payment | No | none |

Keep the list short. Each key event should mean one clear thing.

## How do I separate owner and tenant visits?

Separate owner and tenant visits with a GA4 content group. A content group sorts pages into buckets, so you can see owner pages and tenant pages apart in one report (Google Analytics Help).

There are two ways to set it:

- **With the Google tag.** Add a content_group value to the config call on each page, for example "owner" on your owner pages.
- **With Google Tag Manager.** Make a RegEx Table variable that reads the page path. Map paths such as /property-management or /owners to "owner", and /rentals or /residents to "tenant". Add the variable as the content_group field in your GA4 tag, then publish.

After that, open Reports, then Pages and screens, and pick the Content group dimension. Now you see owner page views without the rental listings.

Watch for: a home page serves both groups. Put it in its own "shared" group and do not count it as owner traffic.

## How do I set up key events for forms and calls?

Set up one custom event per owner action, then mark each one as a key event. A key event is GA4's name for an action that matters to your business. A standard property can have up to 30 of them (Google Analytics Help).

Do not rely on form_submit alone. Enhanced measurement sends form_submit for every form on the site, with form_id and form_name parameters (Google Analytics Help). That mixes owner forms with tenant forms. A thank-you page per form is cleaner.

Steps for the owner form:

1. **Send owner forms to their own thank-you page.** For example, /thank-you-owner. Tenant forms go to a different page.
2. **Open Admin, then Data display, then Events.** Click "Create event".
3. **Name the event owner_lead.** Use page_view as the base event and match the thank-you page URL.
4. **Turn on "Mark as key event".** You need Marketer access or above for this step.
5. **Test it.** Send a test form and check the Realtime report. It updates within minutes. Standard reports can take up to 24 hours.
6. **Repeat for calls.** Use Google Tag Manager to fire owner_phone_click when someone clicks the tel: link on owner pages. Mark it as a key event.

Two rules from Google's help page matter here. A key event counts from the day you mark it, not before. And if you use Google Ads, you can share key events with Ads as conversions for bidding.

Do not send names, emails or phone numbers to GA4. Google's help page says you must make sure no personal data is collected in form parameters.

## Which settings should I fix on day one?

Fix 3 settings before you trust any report:

- **Data retention: 14 months.** A standard property offers 2 or 14 months. The setting affects explorations and funnel reports only (Google Analytics Help). With 2 months, you cannot compare this spring with last fall.
- **UTM tags on your Google Business Profile link.** Without them, Map Pack clicks show as organic search. The Goodjuju study groups Google Search and the Map Pack for this reason.
- **Search Console link.** Link it under Admin, then Product links. GA4 then shows the Google search terms that bring visitors. The report collection is unpublished by default, so publish it in the Library.

If you also track visits from ChatGPT and other AI tools, read our guide on how to [track AI traffic on a property management site](/guides/track-ai-traffic-property-management).

## Which reports should I check monthly?

Check 5 views once a month and write the numbers in one sheet. The trend over 6 months tells you more than any single month.

| Report | Where in GA4 | What to look for |
|---|---|---|
| Owner leads by source | Reports, then Acquisition, then User acquisition, with key event owner_lead | Which channels bring owners, not visits |
| Owner page traffic | Pages and screens, by Content group | Is owner interest going up or down? |
| Top landing pages for owner leads | Exploration: landing page by owner_lead | Which pages start owner journeys |
| Owner lead rate | owner_lead divided by owner content group sessions | Is the site turning owner visits into leads? |
| Google search terms | Search Console report collection | Which owner searches find you |

Compare your source mix with the Goodjuju fall 2026 numbers. Google Search and the Map Pack gave 50.6% of owner leads, and direct and Maps gave 35.6%. Paid search gave 1.2%, social 0.8% and AI tools 3.4% (Goodjuju, 2026-10). The study uses first-touch attribution and says AI numbers are a floor.

What to do: if one source brings many owner visits but few owner leads, check its landing page first. The page may answer a tenant question.

## What does a clean setup look like?

A clean GA4 setup answers one question each month: how many owners asked about management, and where did they come from? Use this checklist:

- [ ] Owner, tenant and shared content groups set
- [ ] owner_lead created from the owner thank-you page and marked as a key event
- [ ] owner_phone_click fires only on owner pages
- [ ] Tenant forms send no key events
- [ ] Data retention set to 14 months
- [ ] UTM tags on the Google Business Profile website link
- [ ] Search Console linked and its reports published
- [ ] One monthly sheet with the 5 numbers above

If owner leads drop while traffic holds, the cause is often outside your site. Read [why owner leads are dropping](/guides/why-owner-leads-are-dropping) for the wider picture.
