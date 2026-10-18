/**
 * Fridman Properties facts for the landing. Source of truth with a source for
 * each number: business/case-studies/fridman-properties.md.
 */
export const baseline = {
  date: "2026-10-16",
  prompts: 24,
  runs: 2,
  answers: 144,
  engines: [
    { name: "ChatGPT", answers: 48, named: 4, linked: 3 },
    { name: "Claude", answers: 48, named: 11, linked: 6 },
    { name: "Gemini", answers: 48, named: 5, linked: 5 },
  ],
  nonBrandAnswers: 132,
  nonBrandNamed: 8,
  section8Answers: 6,
  section8Named: 0,
} as const;

/** Lighthouse, mobile preset, live site, run 2026-10-18 with fp-landing scripts/lighthouse.mjs. */
export const lighthouse = {
  date: "2026-10-18",
  rows: [
    { path: "/", scores: [100, 100, 100, 100], lcp: "1.6 s" },
    { path: "/owner-faq", scores: [99, 100, 100, 100], lcp: "1.9 s" },
    { path: "/chicago-property-management", scores: [98, 100, 100, 100], lcp: "2.0 s" },
    { path: "/schaumburg-property-management", scores: [98, 100, 100, 100], lcp: "2.0 s" },
    { path: "/roi-calculator", scores: [99, 100, 100, 100], lcp: "1.8 s" },
  ],
} as const;
