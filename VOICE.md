# VOICE.md

Status: v1, 2026-10-18. Owner: Tao.

This file tells people and agents how citata.ai sounds. Read it before you write any text that leaves this repo: email, site copy, case study, post, reply.

Email structure lives in [`business/NEWSLETTER.md`](business/NEWSLETTER.md). This file is the voice. That file is the shape.

## 1. Source

We studied [Every](https://every.to) (every.to). Every writes about AI for people who do the work. Their voice is the closest model to ours: practical, first-person, honest about mistakes, full of numbers.

Sample (2026-10-18):

- 8 emails from the Gmail search `from:every.to` (digest, essays, guide, launch, workshop promo).
- 3 posts from every.to (Also True for Humans, Context Window, Working Overtime).
- 11 texts, about 17,900 words of body text. Ads and footers removed.

We copy the method, not the words. Never reuse Every text, column names or product names.

## 2. What we measured

| Metric                          | Every, range | Every, typical | citata.ai target |
|---------------------------------|--------------|----------------|------------------|
| Words per sentence (mean)       | 12.1–20.8    | 16             | 11–14            |
| Sentences of 8 words or less    | 15–43%       | 28%            | 30–40%           |
| Sentences of 30 words or more   | 5–21%        | 11%            | 0% (max 25)      |
| Flesch-Kincaid grade            | 6.4–11.2     | 8.5            | 6–8              |
| Em dashes per 1,000 words       | 4.5–15.4     | 9              | 0–4              |
| "I / my / me" per 1,000 words   | 0 (digest) – 57 (essay) | 13  | essay 25–45, report 5–15 |
| "you / your" per 1,000 words    | 7.6 (news) – 45 (promo) | 15  | 15–30            |
| Digits per 1,000 words          | 9.7–41.5     | 21             | 20+              |
| Questions per 1,000 words       | 0–5.6        | 2              | 1–4              |

What the numbers say:

- Every mixes short punches with long, winding sentences. We keep the punches and cut the long ones. ASD-STE100 caps a sentence at 20 words for steps and 25 for description.
- Every uses a lot of numbers. So do we. A claim without a number is weak.
- The writer speaks as "I" in essays and as "we" for the team. The reader is "you", most of all in calls to action.

## 3. Writer persona

A founder who does the work and shows it.

- Builds the delivery system with agents, then checks each output by hand.
- Tells you what broke, what it cost, and what changed after.
- Calm and kind. Not a hype seller. Says "no" when we cannot help.
- Serves a purpose larger than revenue: positive impact on Earth. This shows in what we choose to do, not in slogans.

Think: a careful engineer who writes a letter to a friend who runs a business.

## 4. Core traits

| Trait          | We sound like                                   | We do not sound like                        |
|----------------|-------------------------------------------------|---------------------------------------------|
| Plain          | "ChatGPT named 3 of our 5 clients."             | "We unlock AI-driven visibility at scale."  |
| Honest         | "This page did nothing. We removed it."         | "Every test brings learnings!"              |
| Specific       | "From 0 to 4 citations in 6 weeks, 20 prompts." | "Big growth in AI mentions."                |
| First-person   | "I ran the audit on our own site first."        | "It was determined that the audit..."       |
| Warm           | "If this is not a fit, I will say so."          | "Act now, spots are limited!"               |
| Grounded       | "AI is 1% of visits but 12% of signups (Ahrefs)."| "AI search is the future of everything."   |

## 5. Patterns we take from Every

1. **Hook with a scene or a fact, not a thesis.** Every opens with a moment: a Slack message, a quote, a date in 1893. We open with one concrete event or one number.
2. **Show your work.** Every's best essays walk through the real process, with screenshots and the mess. We show prompts, before/after tables, and failed tests.
3. **Name the person.** Every names who said what and their role. We name the client (with consent), the engine and the prompt.
4. **Label, then explain.** Every uses inline labels: "The news:", "The context:", "Watch for:", "What to do:". Agents parse them well and people scan them fast. We use them.
5. **Dek under the headline.** Each piece has a one-line subtitle that adds a fact or a tension. It is the email preheader.
6. **Numbered lists with a bold verb lead.** "1. Buy the model direct, not third-party tools." Then 2–4 sentences.
7. **Admit the format.** "This is a new format. Tell us what you think." One line, at the top. It invites replies.
8. **Close on what the reader can do.** Not a summary. A next step or one link.
9. **Sign with a name and role.** "Tao, founder, citata.ai."

## 6. Patterns we do not take

- Long sentences with many clauses. Every reaches 40+ words. We stop at 25.
- Heavy em dashes. Use a period or a colon.
- Cute metaphors and self-mocking asides ("a rich stew of factors"). One light line per piece is the limit.
- Insider jargon without a gloss. Define each term the first time in 5 words or less: "GEO (getting cited by AI answers)".
- Sponsor blocks. We have none.

## 7. Writing rules (agents follow these)

Sentences:
- Mean 11–14 words. Hard max 25. Steps max 20.
- One idea per sentence. One topic per paragraph. Paragraphs 1–4 sentences.
- Active voice. Subject, verb, object.
- Present tense for facts. Past tense for what we did.

Words:
- Short words. "Use", not "utilize". "Help", not "facilitate". "Start", not "commence".
- One word, one meaning. "Citation" means an AI answer names or links the site. Do not swap it for "mention" when you mean something else.
- Allowed terms, always glossed on first use: GEO, AI answer, citation, prompt, engine, index.
- Banned: "unlock", "leverage", "game-changer", "revolutionize", "in today's landscape", "dive in", "supercharge", "seamless", "cutting-edge", "synergy", "delve".

Numbers:
- Use digits: "3 clients", "12%", "$750/mo".
- Every number has a source or a status. Use "(our data, 2026-10)", "(Ahrefs)", or "hypothesis".
- Dates are absolute: 2026-10-18 in docs, "October 18" in email.

Pronouns:
- "I" for the founder's own work and opinion.
- "We" for the team, people and agents together.
- "You" for the reader. Use it in every call to action.

Format:
- Headline in Title Case, 4–10 words. Dek in sentence case, 8–18 words.
- Subheads every 150–300 words in long pieces.
- Bold only the lead phrase of a list item. No bold inside prose.
- No emoji in body text. No exclamation marks, with one exception: a real thank-you.

## 8. Do and do not

Do:
- Start with a fact, a scene or a number.
- Show the before and after.
- Say what failed and what we learned.
- Disclose related parties every time (Fridman Properties, MyRemotely, citata.ai itself).
- Give the reader one clear next step.
- Thank people by name.

Do not:
- Promise rankings, citations or revenue. AI answers change. We report what happened.
- Use fear or false urgency.
- Copy text from Every or any other source.
- Publish a page or an email that no person checked.
- Use spiritual phrases in sales copy. The mission shows in the work. The README is the one place for them.

## 9. Context variations

| Context                  | Person | Length         | Tone shift                                    |
|--------------------------|--------|----------------|-----------------------------------------------|
| Monday client report     | we     | 150–400 words  | Dry. Numbers first. Labels.                   |
| Weekly newsletter        | I / we | 600–1,200      | Warm, curious. One story, a few short items.  |
| Case study / essay       | I      | 1,200–2,500    | Personal. Show the process. Admit mistakes.   |
| Guide / how-to           | you    | 1,000–2,500    | Direct. Numbered steps, "Watch for / What to do". |
| Offer or launch email    | I      | 300–600        | TL;DR first. Who it is for and not for.       |
| Social post              | I      | 30–80 words    | One fact, one opinion, one link.              |
| Site copy                | we/you | per block      | Short. Claims with proof next to them.        |
| Reply to a person        | I      | 3–8 sentences  | Kind, exact, no template smell.               |

## 10. Scale by length

- **Short (under 100 words):** one fact, one sentence of meaning, one link. Example: "ChatGPT now names Fridman Properties for 'Section 8 property manager Chicago'. Six weeks ago it named none of our clients. Here is what we changed: [link]."
- **Medium (300–600 words):** TL;DR, a short story, 3 labeled points, a call to action, a signature.
- **Long (1,200+ words):** hook scene, the stakes in 2–3 paragraphs, the process in numbered sections, what we learned, what you can do, a bio line.

The voice stays the same at each length. Only the number of sections changes.

## 11. Emotional range

| Feeling      | How we write it                                                        |
|--------------|------------------------------------------------------------------------|
| Curiosity    | A real question we asked ourselves: "Why did Gemini skip the page?"    |
| Honesty      | A plain admission: "I was wrong about this. The data says so."         |
| Calm hope    | A small, true win with a number. No superlatives.                      |
| Care         | Name the person and the effect on them: tenants, owners, a team.       |
| Gratitude    | A thank-you by name, at the end.                                       |

Not in range: hype, fear, anger, sarcasm.

## 12. Ethics

- We study public writing to learn structure. We do not imitate a named person.
- Every piece about a client needs the client's consent and a disclosure line.
- AI drafts. A person checks every fact and every claim before we send.
- Housing copy follows Fair Housing rules. No words that exclude a protected group.
- A reader can reply to every email and reach a person.

## 13. Voice in one paragraph

citata.ai writes like a founder who does the work and shows the receipts. Sentences are short, active and plain, about 12 words on average and never more than 25. Each piece opens with a real event or a number, walks through what we did, says what failed, and ends with one step the reader can take. We speak as "I" for the founder, "we" for the team of people and agents, and "you" for the reader. Numbers carry the argument, and each one has a source. The tone is calm and kind: no hype, no fear, no fake urgency. The mission, positive impact on Earth, shows in the clients we pick and the honesty we keep, not in slogans.
