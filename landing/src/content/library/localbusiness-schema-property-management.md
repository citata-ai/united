---
title: "LocalBusiness Schema Template for Property Managers — Citata.ai"
description: "Copy-ready JSON-LD for a property management home page and city pages: type, address, areaServed, sameAs and Service, with Google's rules and a test plan."
headline: "LocalBusiness Schema Template for Property Managers"
dek: "Two JSON-LD blocks, one for the home page and one for each city page."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Put one LocalBusiness block on the home page, as LocalBusiness or its subtype RealEstateAgent, with your name, office address, phone, URL, hours, areaServed and sameAs links to your profiles. On each city page, add a Service block that names the city in areaServed and points back to the home page business as provider. Mark up only facts that the page shows, then test with Google's Rich Results Test and the Schema Markup Validator."
visible: false
cluster: "ai-search"
kind: "template"
priority: 4
inspired_by: "https://gogoodjuju.com/technical-seo-checklist-property-management/"
faq:
  - q: "Which schema type should a property management company use?"
    a: "Use LocalBusiness, or RealEstateAgent if you also act as a brokerage. Schema.org lists RealEstateAgent as a subtype of LocalBusiness, so both carry the same local properties."
  - q: "Which properties does Google require for LocalBusiness markup?"
    a: "Google requires name and address. It recommends geo, openingHoursSpecification, priceRange, telephone and url, among others."
  - q: "How do you list service areas in schema?"
    a: "Use areaServed. Schema.org accepts AdministrativeArea, GeoShape, Place or plain text, so you can list each city as a City with its name."
  - q: "What links go in sameAs?"
    a: "Profile URLs that clearly identify your company, such as Google Business Profile, Yelp, BBB, LinkedIn and Facebook. Schema.org defines sameAs as a URL of a page that \"unambiguously indicates the item's identity\"."
  - q: "Can I add my star rating to LocalBusiness schema?"
    a: "You can add it, but Google will not show stars for it if you control the reviews about yourself. Google's review snippet rules say such LocalBusiness pages are ineligible for the star review feature."
  - q: "Does schema make ChatGPT or Google AI cite my site?"
    a: "No promise. Google says there is no special schema.org markup you need for AI Overviews or AI Mode. Schema states your facts in a fixed format, which removes doubt about who you are."
sources:
  - label: "Google Search Central: Local business structured data (read 2026-10-19)"
    url: "https://developers.google.com/search/docs/appearance/structured-data/local-business"
  - label: "Google Search Central: General structured data guidelines (read 2026-10-19)"
    url: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies"
  - label: "Google Search Central: Review snippet structured data (read 2026-10-19)"
    url: "https://developers.google.com/search/docs/appearance/structured-data/review-snippet"
  - label: "Google Search Central: AI features and your website (read 2026-10-19)"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Schema.org: RealEstateAgent"
    url: "https://schema.org/RealEstateAgent"
  - label: "Schema.org: Service"
    url: "https://schema.org/Service"
  - label: "Schema.org: sameAs"
    url: "https://schema.org/sameAs"
  - label: "Goodjuju Marketing: Technical SEO checklist for property management (read 2026-10-19)"
    url: "https://gogoodjuju.com/technical-seo-checklist-property-management/"
---

## Which schema type fits a property management company?

LocalBusiness fits a property management company, and RealEstateAgent is its closest subtype. Schema.org puts RealEstateAgent under LocalBusiness, on both the Organization path and the Place path. So both types accept address, telephone, areaServed and sameAs.

Pick the type that matches what you are:

| Your business | Type to use | Why |
|---|---|---|
| You manage rentals only | LocalBusiness | True and simple; no claim that you sell homes |
| You manage rentals and broker sales | RealEstateAgent | Goodjuju Marketing's checklist suggests it when you also help owners buy and sell |
| You have 2 or more offices | One LocalBusiness block per office | Google defines each location as its own LocalBusiness |

Google accepts more than one type. Its local business page says: "If you have multiple types, specify them as an array (additionalType isn't supported)." Keep it to types you can defend.

Schema (structured data) states facts in a fixed format that machines read. It is not a ranking switch. Google says "There's also no special schema.org structured data that you need to add" for AI Overviews and AI Mode. Schema helps by removing doubt about your name, address and area.

## What goes on the home page?

The home page gets one full LocalBusiness block. Google requires two properties, name and address. It recommends geo, openingHoursSpecification, priceRange, telephone and url, and a few more.

Google adds 3 rules for those fields:

- **Phone:** "Be sure to include the country code and area code in the phone number."
- **Coordinates:** latitude and longitude need at least 5 decimal places.
- **Price range:** "This field must be shorter than 100 characters."

Here is the template. Replace every value in square brackets. Delete any line you cannot fill with a true fact.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://[yourdomain.com]/#business",
  "name": "[Company Name]",
  "url": "https://[yourdomain.com]/",
  "logo": "https://[yourdomain.com]/logo.png",
  "image": "https://[yourdomain.com]/office.jpg",
  "telephone": "+1-[312]-[555]-[0100]",
  "priceRange": "[Management fee 8% of rent collected]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[100 Main St, Suite 200]",
    "addressLocality": "[Chicago]",
    "addressRegion": "[IL]",
    "postalCode": "[60601]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.88325,
    "longitude": -87.62384
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00:00",
    "closes": "17:00:00"
  }],
  "areaServed": [
    { "@type": "City", "name": "[Chicago, IL]" },
    { "@type": "City", "name": "[Evanston, IL]" },
    { "@type": "City", "name": "[Oak Park, IL]" }
  ],
  "knowsAbout": ["Residential property management", "Tenant screening", "Rent collection"],
  "sameAs": [
    "[Your Google Business Profile URL]",
    "https://www.yelp.com/biz/[your-page]",
    "https://www.bbb.org/us/[your-page]",
    "https://www.linkedin.com/company/[your-page]",
    "https://www.facebook.com/[your-page]"
  ]
}
```

Put it in a script tag of type application/ld+json in the page HTML. Google lists JSON-LD as the recommended format of the 3 it supports.

## How do you list service areas?

List service areas with areaServed. Schema.org says areaServed accepts AdministrativeArea, GeoShape, Place or Text. The template uses City, which Schema.org files under AdministrativeArea, with a name that includes the state. Replace the sample coordinates too: they are placeholders.

Follow 3 rules:

1. **List only cities you serve today.** The same cities must appear on your site and your Business Profile.
2. **Match each city to a page.** If you list Evanston, you need an Evanston page or an Evanston section.
3. **Do not list a whole state** unless you truly take clients in every part of it.

## What goes on each city page?

Each city page gets a small Service block, not a copy of the home page block. The Service names the city in areaServed and points to the home page business as provider. Schema.org lists provider, areaServed, serviceType and offers on Service.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Evanston] property management",
  "serviceType": "Residential property management",
  "url": "https://[yourdomain.com]/[evanston]-property-management",
  "description": "[Full-service management for single-family homes and 2–4 unit buildings in Evanston, IL.]",
  "areaServed": { "@type": "City", "name": "[Evanston, IL]" },
  "provider": { "@id": "https://[yourdomain.com]/#business" }
}
```

The provider line uses the @id from the home page block. That tells parsers that both blocks describe one company. It avoids a second LocalBusiness with a fake address in each city.

Watch for: Google's general rules say "Don't mark up content that is not visible to readers of the page." If the description in schema is not on the city page, put it on the page or cut it from the schema.

## How do you link profiles with sameAs?

Link each profile that clearly belongs to your company. Schema.org defines sameAs as the "URL of a reference Web page that unambiguously indicates the item's identity." The expected type is URL.

Good sameAs targets:

- [ ] Google Business Profile link
- [ ] Yelp business page
- [ ] BBB business page
- [ ] LinkedIn company page
- [ ] Facebook page
- [ ] Your Expertise.com or other directory page, if it is about you only

Leave out list pages that name 10 companies. They do not identify you alone. Directories matter for AI answers: in our test of 150 local answers, Expertise.com was a source in 93 and Yelp in 50 (our data, 2026-10-19). So keep those profiles correct, and link them.

## Should you add reviews or ratings?

Leave aggregateRating out of your own LocalBusiness block. A business that controls its own reviews gets no stars. Google's review snippet rules say: "If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature." Google's local business page also says to use review and aggregateRating only on sites that collect reviews about other businesses.

Show real reviews as text on the page instead, with links to Google and Yelp.

## How do you test the markup?

Test in 2 tools, then check the live page. Google's local business page names the Rich Results Test and the URL Inspection tool. Goodjuju's checklist adds the Schema Markup Validator.

1. **Paste the page URL into the Rich Results Test.** Fix every critical error.
2. **Run the same URL in the Schema Markup Validator.** It checks types that Google does not show as rich results, such as Service.
3. **Compare each value with the page.** Name, phone, hours and cities must match what a reader sees.
4. **Compare with your Business Profile.** Same name, address and phone.
5. **Open URL Inspection in Search Console.** Confirm the page is not blocked by robots.txt or noindex.
6. **Wait several days.** Google says crawling and indexing can take that long.
7. **Repeat after each site change** that touches the head of the page.

For the rest of the site work, such as crawler access and llms.txt, see the [AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website).

Disclosure: this page has no affiliate links. Google, Schema.org and Goodjuju did not check it.
