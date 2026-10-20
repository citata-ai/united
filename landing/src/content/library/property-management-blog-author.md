---
title: "Who Should Author a Property Management Blog Post? — Citata.ai"
description: "Name a real person, not the company, as the author of each blog post. Google asks who wrote it and wants bylines. Here is the bio, schema and staff-exit plan."
headline: "Who Should Be the Author of Your Blog Posts"
dek: "Google asks whether it is clear who wrote a page. A company byline does not answer that."
published: "2026-10-19"
updated: "2026-10-19"
answer: "Yes. Name a real person who does the work as the author of each property management blog post. Google asks if it is \"self-evident\" who wrote a page and strongly encourages accurate bylines that lead to more about the author. Put the company in the publisher field, give each author a bio page, and mark the author as a Person in schema."
visible: false
cluster: "ai-search"
kind: "how-to"
priority: 4
inspired_by: "https://www.clearleaddigital.com/blog/property-management-blog-author"
faq:
  - q: "Can I use my company name as the blog author?"
    a: "You can, but it answers Google's \"who wrote this\" question poorly. Google strongly encourages accurate bylines that lead to more information about the author. Put the company in the publisher field and a person in the author field."
  - q: "Who should be the author if the owner does not write?"
    a: "Name the person whose knowledge the post holds, such as the broker or the leasing manager, if that person reviewed and approved it. Do not invent an author. Google calls made-up names and false credentials deceptive."
  - q: "Do author pages need schema markup?"
    a: "Schema is optional, but it helps Google tell authors apart. Google's article markup guide says to use the Person type, put only the name in author.name, and add a url or sameAs link to a page about the author."
  - q: "What happens to blog posts when the author leaves the company?"
    a: "Keep the byline on posts the person wrote, because it is true. Add a reviewer from the current team to posts you update, and change the bio to say the person used to work there."
  - q: "Should I say that AI helped write a blog post?"
    a: "Google says AI or automation disclosures are useful where a reader might ask how the content was made. A short line such as \"Drafted with AI, checked by [name]\" is honest and easy."
sources:
  - label: "Google Search Central: Creating helpful, reliable, people-first content"
    url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
  - label: "Google Search Central: Article structured data, author markup best practices"
    url: "https://developers.google.com/search/docs/appearance/structured-data/article"
  - label: "Schema.org: Person"
    url: "https://schema.org/Person"
---

## Why not list the company as the author?

A company byline does not tell a reader who stands behind the advice. Google's guide on helpful content asks: "Is it self-evident to your visitors who authored your content?" It also asks if pages "carry a byline, where one might be expected" and if bylines lead to more about the author (Google Search Central).

Google states it "strongly encourage[s] adding accurate authorship information, such as bylines". A company name is accurate, but it is not a person. An owner who reads a post about eviction timelines wants to know if a licensed broker or an intern wrote it.

The company still gets credit. It goes in the publisher field, the logo and the footer. The author field goes to a person.

| Field | Who goes there | Example |
|---|---|---|
| Byline (visible) | The person who wrote or approved the post | "By Dana Ruiz, Managing Broker" |
| Schema `author` | The same person, type Person | `"@type": "Person"` |
| Schema `publisher` | The company, type Organization | Your company name and logo |
| Reviewer line (optional) | A second expert who checked the facts | "Reviewed by Sam Lee, leasing manager" |

The names in the table are an example.

## Who should be the author?

The author is the person whose knowledge the post holds. For most property management companies, 1 to 4 people cover all topics:

1. **The owner or managing broker** for fees, contracts, owner rights and state law.
2. **The leasing manager** for screening, showings and lease renewals.
3. **The maintenance lead** for turns, vendor costs and inspections.
4. **The bookkeeper** for owner statements, reserves and 1099s.

If a marketing agency drafts the post, the expert must read it, fix it and approve it. Then the expert's name is true. If no one on your team checked the post, do not put a name on it.

Watch for: fake authors. Google warns that made-up names, AI-generated headshots and false credentials are deception (Google Search Central). One fake author can hurt trust in every post on the site.

## What goes in an author bio?

An author bio gives the facts a reader and an AI engine need to judge the author. Keep it short and check each fact. Use this list:

- [ ] Full name, as on the license.
- [ ] Role at the company and years in the role.
- [ ] State license type and number, with a link to the state license lookup.
- [ ] Trade memberships and designations, with a link to the issuer if it has a member lookup.
- [ ] Areas and property types the person manages.
- [ ] A real photo.
- [ ] Links to the person's LinkedIn and any other public profile.
- [ ] A list of the person's posts.

Show a 1–2 sentence bio under each post. Link it to a full author page at a stable URL, such as `/team/dana-ruiz`.

Google says trust is the most important part of E-E-A-T (experience, expertise, authority, trust). The other parts "contribute to trust" (Google Search Central). A license number with a public lookup link is a trust fact that anyone can check.

## Do author pages need schema?

Author schema is optional, but it helps Google connect the byline to the person. Google's article markup guide says there are no required properties. It also gives clear best practices for the author field (Google Search Central):

- Use the Person type for people and the Organization type for organizations.
- Put only the name in `author.name`. No job title, no "posted by", no company name.
- Add `author.url` that points to a page about the author. You can use `sameAs` too.
- List each author in a separate `author` entry. Do not merge 2 names in 1 field.

The schema must match the visible byline. Schema.org's Person type also has `jobTitle`, `worksFor`, `hasCredential` and `knowsAbout` (Schema.org). Use them on the author page to state the role, the company, the license and the topics.

A minimal example for a post:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How Long Does an Eviction Take in Cook County?",
  "author": {
    "@type": "Person",
    "name": "Dana Ruiz",
    "url": "https://example.com/team/dana-ruiz"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Example Property Management"
  }
}
```

## What if staff leave?

Keep the byline on posts the person wrote. The byline is a fact about the past, and it stays true. Removing it makes the post less clear, not more.

Do these 4 things when an author leaves:

1. **Keep the author page** and change the bio to "worked at [company] from 2021 to 2026".
2. **Add a reviewer** from the current team to each post you update. Show "Reviewed by" and the date.
3. **Update facts** in posts on law, fees or prices. A reviewer who checked the facts can be listed.
4. **Do not move old posts** to a new author who did not write them.

If you plan for this from the start, prefer 2 or more authors. Then one exit does not leave the whole blog without an expert.

## Does a named author help in AI search?

A named author gives AI engines one more fact to check, but no study proves that a byline alone gets citations. What we know: Google asks the "who" question for all content, and Google says the same SEO basics apply to its AI features. ChatGPT and Claude do not publish how they weigh authors.

So treat the byline as a trust fact, like your license number. It costs little and it is honest. For the other trust facts an owner looks for, see our [AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website).

Disclose AI help where a reader might ask. Google says AI or automation disclosures are useful where someone might wonder how the content was made. A line such as "Drafted with AI, checked by Dana Ruiz" is enough.

This is general information, not legal advice. Check your state's advertising rules for licensees or ask a local attorney.
