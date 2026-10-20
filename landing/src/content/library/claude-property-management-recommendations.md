---
title: "What Claude Says About Property Managers, and Why — Citata.ai"
description: "Claude searches the web for current facts about companies and cites each source. In our 50-city test it read Yelp, Expertise.com and iPropertyManagement most."
headline: "What Claude Says About Property Managers, and Why"
dek: "We asked Claude for the best property manager in 50 cities and logged every source."
published: "2026-10-19"
updated: "2026-10-19"
answer: "When a landlord asks Claude to compare property managers, Claude runs a web search and builds the answer from the pages it finds, with a citation for each source. Anthropic does not name its search index on its help pages; in 2025 TechCrunch reported evidence that it is Brave Search. In our 50-city test on 2026-10-19, Claude's search used Yelp in 50 of 50 answers, Expertise.com in 47 and iPropertyManagement in 42. To be cited, a manager needs correct facts on those listing sites and a clear page on its own site."
visible: false
cluster: "ai-search"
kind: "guide"
priority: 5
inspired_by: "https://citant.ai/blog/optimize-for-claude/"
faq:
  - q: "Does Claude search the web?"
    a: "Yes. Claude can search the web, and Anthropic says every response with web search includes citations. In the newer Claude app there is no toggle: Claude searches when it judges a search will help."
  - q: "Which search engine does Claude use?"
    a: "Anthropic's help page does not name the provider for web search. It says image search is powered by Bing. In March 2025, TechCrunch reported that Anthropic added Brave Search to its subprocessor list and that Claude's search tool had a parameter named BraveSearchParams."
  - q: "How does Claude cite sources?"
    a: "Each citation holds the URL, the page title and up to 150 characters of the cited text, per Anthropic's API documentation. Citations are always on for web search."
  - q: "Which sites did Claude use for property manager answers?"
    a: "In our test of 50 US cities on 2026-10-19, Claude's search used Yelp in 50 of 50 answers, Expertise.com in 47, iPropertyManagement in 42 and a property manager's own site in 43."
  - q: "Should I block ClaudeBot?"
    a: "Only if you do not want your pages used for model training. Claude-User and Claude-SearchBot are the bots for live answers and search, and Anthropic says that blocking them can reduce your visibility in Claude's answers."
sources:
  - label: "Anthropic Help Center: Enabling and using web search"
    url: "https://support.claude.com/en/articles/10684626-enabling-and-using-web-search"
  - label: "Claude API docs: Web search tool"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool"
  - label: "Anthropic Help Center: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - label: "TechCrunch: Anthropic appears to be using Brave to power web searches for its Claude chatbot (2025-03-21)"
    url: "https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/"
  - label: "Simon Willison: Anthropic used Brave (2025-03-21)"
    url: "https://simonwillison.net/2025/Mar/21/anthropic-used-brave/"
  - label: "Citata.ai: AI Property Manager Index 2026 (our data, 2026-10-19)"
    url: "https://citata.ai/research/ai-property-manager-index-2026"
---

## What did Claude say when we asked for a property manager?

Claude gave long lists. On 2026-10-19 we asked Claude Sonnet 5.5 "What is the best property management company in [city]?" for the 50 largest US cities. We used the Claude API with the web search tool on, capped at 4 searches per answer.

Claude named 15.5 companies per answer on average. ChatGPT named 5.3 and Gemini 5.7 for the same question. So a Claude answer is less a top pick and more a short list that an owner reads and filters.

| Engine | Companies per answer | Sources per answer | Answers that used a manager's own site |
|---|---|---|---|
| Claude | 15.5 | 7.6 | 43 of 50 |
| Gemini | 5.7 | 5.6 | 48 of 50 |
| ChatGPT | 5.3 | 2.5 | 15 of 50 |

Source: our data, 2026-10-19, 150 answers. Watch for: for Claude we count both the search results and the citations. For ChatGPT we count only citations. So Claude's source count is not a like-for-like match. The full data is in the [AI Property Manager Index 2026](/research/ai-property-manager-index-2026).

## Does Claude search the web?

Yes. Claude searches the web when a question needs current facts. Anthropic's API documentation lists "information about specific organizations, people, or products that might have changed" as a reason to search. A question about local property managers fits that rule.

Anthropic's help page says that in the newer Claude app "there's no web search toggle." Claude decides by itself when a search helps. On Team and Enterprise plans, an owner must first turn web search on for the workspace.

The API documentation also gives a size for the work. Simple fact questions use 1 to 3 searches. Comparisons of many companies can use 10 or more.

## Which search index does Claude use?

Anthropic does not name the provider of its web search on its help page. The page says only that image search "is powered by Bing."

Two reports from March 2025 point to Brave Search:

1. **TechCrunch** reported that Anthropic added "Brave Search" to its list of subprocessors, the partners that process Claude data.
2. **Simon Willison**, a software developer, asked Claude to search for "pelican facts." The 10 cited results matched Brave Search's results for the same query. He also found a `BraveSearchParams` property in Claude's search tool.

What this means for you: Google rank alone does not decide what Claude reads. Your pages must be in a second index too. Check your site in Brave Search for your company name and for "property management [your city]". This report is from 2025. Anthropic can change its provider at any time.

## How does Claude cite sources?

Claude attaches a citation to each claim that comes from a search result. Anthropic's help page says, "Every response includes citations, so you can easily verify sources yourself."

The API documentation shows what each citation holds:

| Field | What it holds |
|---|---|
| `url` | The address of the cited page |
| `title` | The page title |
| `cited_text` | Up to 150 characters of the cited text |

The 150-character limit matters. Claude quotes a short piece of one page, not your whole site. A sentence like "We manage 340 single-family homes in Mesa and charge 8% of collected rent" fits in one citation. A paragraph of slogans does not give Claude a fact to quote.

## Which sites does Claude read for property managers?

Claude leaned on listing sites in our test. These were the domains in the most Claude answers, out of 50:

| Domain | Claude answers |
|---|---|
| yelp.com | 50 |
| expertise.com | 47 |
| ipropertymanagement.com | 42 |
| trustanalytica.org | 14 |
| clutch.co | 10 |
| awning.com | 10 |

Source: our data, 2026-10-19. Yelp was in every Claude answer. ChatGPT, by contrast, cited Expertise.com most (30 of 50) and Birdeye review pages next (17 of 50).

This is correlation, not proof. But the pattern is clear. Claude finds property managers through review and list sites first, then checks some company sites.

## What does Claude get wrong?

Claude mixes up names that look alike. In our own brand test on 2026-10-19, Claude answered about Citate.ai or Citant.ai in 4 of 4 answers about citata.ai. Our name was close to theirs, and our pages were 1 day old.

Property managers have the same risk. Many firms share words like "Premier," "Elite" or "Realty." Franchise offices share a brand name. If your name, address and phone differ across sites, Claude can join your facts with another firm's.

## What can a property manager change to be cited by Claude?

You cannot pay Claude for a place in an answer. You can make your facts easy to find and hard to confuse. Here is the order we use:

1. **Fix your listings.** Check Yelp, Expertise.com and iPropertyManagement first. Make the name, address, phone, service area and website match your site.
2. **Let the right bots in.** Anthropic names three bots. Do not block Claude-User or Claude-SearchBot in robots.txt. Anthropic says that blocking them may reduce your visibility in search answers.
3. **Check your CDN.** Some firewall rules block bots by default. Ask your web host if they block Anthropic.
4. **Write quotable facts.** Put doors managed, fee, service area and license number in plain sentences near the top of a page.
5. **Make one page per city you serve.** Claude searches for "[city] property management." Give it a page that answers that search with local facts.
6. **Test in Claude.** Ask Claude your owners' real questions each month. Write down which pages it cites. Watch for a wrong fact and fix it at the source page.

Anthropic's three bots, from its help page:

| Bot | What it does | Block it? |
|---|---|---|
| ClaudeBot | Collects pages for model training | Your choice |
| Claude-User | Gets a page when a user's question needs it | No, if you want citations |
| Claude-SearchBot | Indexes pages to improve search results | No, if you want citations |

For a full site check, use our [AI search checklist for property management websites](/guides/ai-search-checklist-property-management-website). To see which owner questions people ask AI, read [how landlords use AI to choose a property manager](/guides/how-owners-choose-a-property-manager-with-ai).
