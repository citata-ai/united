import { faq } from "../../data/faq.ts";

/** /ai/faq.json: the home page FAQ for AI agents. */
export const GET = () =>
  Response.json({
    url: "https://citata.ai/#faq",
    updated: "2026-10-18",
    questions: faq.map((f) => ({ question: f.q, answer: f.a })),
  });
