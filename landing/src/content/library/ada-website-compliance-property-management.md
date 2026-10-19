---
title: "ADA Website Compliance for Property Management Companies — Citata.ai"
description: "The ADA covers businesses open to the public, and DOJ points to WCAG as a guide. Plaintiffs filed 3,117 federal web suits in 2025. A checklist to test a site."
headline: "ADA Website Rules for Property Management Companies"
dek: "Federal web access suits rose 27% in 2025. Most fixes take hours, not months."
published: "2026-10-19"
updated: "2026-10-19"
answer: "The Department of Justice says the ADA applies to the goods and services of businesses open to the public, including what they offer on the web. DOJ has no detailed technical rule for private businesses, but it names WCAG as helpful guidance. Plaintiffs filed 3,117 website accessibility suits in federal court in 2025 (Seyfarth). Test your site against WCAG 2.2 Level AA, fix the common errors by hand, and do not rely on an overlay widget."
visible: false
cluster: "pm-marketing"
kind: "checklist"
priority: 2
inspired_by: "https://www.propertymanagerwebsites.com/blog/company-websites-that-arent-ada-compliant-becoming-litigation-targets"
faq:
  - q: "Does the ADA apply to a property management website?"
    a: "DOJ guidance says ADA Title III covers businesses open to the public, and that its rules apply to goods and services they offer on the web. A property management company that serves owners and renters from an office is likely in scope. Ask a local attorney about your case."
  - q: "Which accessibility standard should a property management site meet?"
    a: "DOJ has no detailed technical rule for private businesses but names WCAG as helpful guidance. Most teams test against WCAG 2.2 Level AA, the current W3C version. The 2024 DOJ rule for state and local governments uses WCAG 2.1 Level AA."
  - q: "Do accessibility overlay widgets make a site ADA compliant?"
    a: "Do not count on it. In January 2025 the FTC required accessiBe to pay $1 million over claims that its AI widget could make any website WCAG compliant. The FTC said the tool did not make all user websites compliant."
  - q: "How many website accessibility lawsuits are filed each year?"
    a: "Seyfarth counted 3,117 website accessibility suits in federal court in 2025, up 27% from 2,452 in 2024. State court cases and demand letters are not in that count."
  - q: "What are the most common accessibility errors on websites?"
    a: "In the WebAIM Million 2026 study, the top errors were low-contrast text (83.9% of home pages), missing image alt text (53.1%), missing form labels (51%), empty links (46.3%) and empty buttons (30.6%)."
sources:
  - label: "ADA.gov (DOJ): Guidance on web accessibility and the ADA (2022-03-18)"
    url: "https://www.ada.gov/resources/web-guidance/"
  - label: "ADA.gov (DOJ): Fact sheet, 2024 rule on web and mobile app accessibility for state and local governments"
    url: "https://www.ada.gov/resources/2024-03-08-web-rule/"
  - label: "W3C: Web Content Accessibility Guidelines (WCAG) 2.2"
    url: "https://www.w3.org/TR/WCAG22/"
  - label: "Seyfarth Shaw (ADA Title III blog): Federal court website accessibility lawsuit filings bounce back in 2025"
    url: "https://www.adatitleiii.com/2026/03/federal-court-website-accessibility-lawsuit-filings-bounce-back-in-2025/"
  - label: "FTC: Order requires online marketer to pay $1 million for deceptive claims that its AI product could make websites compliant (2025-01-03)"
    url: "https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-order-requires-online-marketer-pay-1-million-deceptive-claims-its-ai-product-could-make-websites"
  - label: "WebAIM: The WebAIM Million, 2026 report"
    url: "https://webaim.org/projects/million/"
---

## Does a property management website need to meet ADA rules?

A property management website most likely falls under ADA rules if your company serves the public. The Department of Justice says Title III of the ADA covers businesses open to the public. It says the ADA's requirements apply to "all the goods, services, privileges, or activities" of those businesses, including those on the web (ADA.gov, 2022-03-18).

A property management site offers services online: rental listings, applications, tenant portals, owner sign-up forms, rent payment links. If a blind renter cannot apply, or a deaf owner cannot follow your video, the site blocks access to a service.

This is general information, not legal advice. Check the current law or ask a local attorney.

## Is there a legal standard for website accessibility?

There is no detailed DOJ technical rule for private businesses. DOJ says it "does not have a regulation setting out detailed standards" under Title III, and that existing standards such as WCAG "provide helpful guidance" (ADA.gov, 2022-03-18). Businesses may choose how to comply.

Government sites are different. A 2024 DOJ rule sets WCAG 2.1 Level AA as the standard for state and local government web content and apps. A 2026 interim rule moved the dates to 2027-04-26 for governments that serve 50,000 people or more, and 2028-04-26 for smaller ones (ADA.gov fact sheet). That rule does not cover a private property manager directly. But if you run a service for a city or housing authority under contract, ask whether the contract brings you under it.

WCAG 2.2 is the current W3C version. It adds 9 new success criteria to WCAG 2.1, such as a minimum target size of 24 by 24 CSS pixels for buttons and links (W3C, WCAG 2.2). Testing to WCAG 2.2 Level AA also covers 2.1 Level AA.

## Why are property management sites targets of ADA lawsuits?

Property management sites are easy to test from home, and most sites have errors. Seyfarth Shaw counted 3,117 website accessibility suits in federal court in 2025, up 27% from 2,452 in 2024 (Seyfarth, 2026-03). Web cases were 36% of all 8,667 ADA Title III suits in federal court that year.

| State (federal courts, 2025) | Website accessibility suits |
|---|---|
| New York | 1,021 |
| Florida | 961 |
| Illinois | 585 |
| Minnesota | 162 |
| Pennsylvania | 137 |

Source: Seyfarth Shaw. California federal courts had only 4 such suits in 2025. Seyfarth says many suits and demand letters there go to state courts, which its count does not include. So a low federal number does not mean low risk.

Most sites fail basic tests. The WebAIM Million 2026 study found detected WCAG 2 failures on 95.9% of the top 1,000,000 home pages, with 56.1 errors per page on average (WebAIM, 2026).

## Which WCAG checks matter most?

Start with the errors that are most common and easiest to fix. This table joins the WebAIM top errors with the WCAG 2.2 rule each one breaks.

| Check | WCAG 2.2 criterion | Level | Home pages with the error (WebAIM 2026) | Where it shows up on PM sites |
|---|---|---|---|---|
| Text contrast at least 4.5:1 (3:1 for large text) | 1.4.3 Contrast (Minimum) | AA | 83.9% | Gray text on photos, light buttons |
| Alt text on images | 1.1.1 Non-text Content | A | 53.1% | Listing photos, team photos, logos |
| Labels on form fields | 3.3.2 Labels or Instructions; 1.3.1 Info and Relationships | A | 51% | Rental analysis, contact, application forms |
| Links with text | 2.4.4 Link Purpose (In Context) | A | 46.3% | Social icons, "click here", image links |
| Buttons with names | 4.1.2 Name, Role, Value | A | 30.6% | Menu icons, search buttons, chat widgets |
| Keyboard access to all controls | 2.1.1 Keyboard | A | not measured | Menus, listing filters, date pickers |
| Visible focus | 2.4.7 Focus Visible | AA | not measured | Links and buttons when you press Tab |
| Captions on video | 1.2.2 Captions (Prerecorded) | A | not measured | Property tours, team videos |
| Text resize to 200% | 1.4.4 Resize Text | AA | not measured | Fixed-height boxes that cut text |
| Target size at least 24 × 24 px | 2.5.8 Target Size (Minimum) | AA | not measured | Small icons on phones |

The DOJ guidance names the same kinds of barriers: missing alt text, poor color contrast, no captions on videos, forms without labels, and mouse-only navigation (ADA.gov, 2022-03-18).

## Do accessibility overlay tools work?

Do not rely on an overlay widget to make your site compliant. An overlay is a script that adds a toolbar and tries to fix pages on the fly.

In January 2025 the FTC required accessiBe to pay $1 million. The FTC said the company claimed its accessWidget tool could make any website WCAG compliant. According to the FTC complaint, the tool "did not make all user websites WCAG-compliant" (FTC, 2025-01-03). The order bars the company from that claim unless it has evidence.

An overlay does not change your page code. A missing form label in your rental analysis form is still missing. Fix the code itself.

## How do I check my site?

Use free tools first, then test by hand. Automated tools catch only part of the problems, so do both.

Checklist:

- [ ] Run Lighthouse in Chrome DevTools on your home page, a city page, a listing and every form.
- [ ] Run the WAVE tool from WebAIM on the same pages.
- [ ] Unplug the mouse. Use Tab, Enter and the arrow keys to open the menu, fill the contact form and submit it.
- [ ] Check that you can see where the focus is at each step.
- [ ] Zoom the browser to 200%. Check that no text is cut off.
- [ ] Turn on VoiceOver (Mac) or NVDA (Windows). Listen to one form and one listing.
- [ ] Watch each video with sound off. Check for captions.
- [ ] Open the site on a phone. Tap each icon. Check that you hit the right one.

A perfect Lighthouse score is not proof of compliance. On 2026-10-18 we ran Lighthouse on 5 pages of the Fridman Properties site, and all 5 scored 100 for accessibility (our data). We still treat manual tests as required. Fridman Properties is a related party: its owner is CEO of MyRemotely, our partner. See the [case study](/case-studies/fridman-properties).

## How do I fix the common problems?

Fix in this order: forms, contrast, images, links and buttons, then video.

1. **Forms first.** Give each field a visible label tied to the field in code. Owner leads come through your forms, so a broken form costs you both leads and legal risk.
2. **Contrast.** Darken gray text. Put a solid background behind text on photos.
3. **Alt text.** Describe each listing photo in a few words: "Kitchen with white cabinets and gas stove." Use empty alt text for pure decoration.
4. **Links and buttons.** Give each icon a text name, such as "Facebook" or "Open menu".
5. **Video.** Add captions. Most video hosts can make a draft. Check it by hand.
6. **Third-party tools.** Ask your listing, portal and chat vendors for their accessibility statement and WCAG test results. Their widgets sit on your site.
7. **Add an accessibility page.** Give a phone number and email so a person can get help or report a problem.

Repeat the checks after each site change. A new chat widget or a theme update can break a page that passed last month.

For the other technical checks that matter for AI search, see the [AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website).
