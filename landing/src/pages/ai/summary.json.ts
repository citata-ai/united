/** /ai/summary.json: who we are, in one object, for AI agents. Facts match llms.txt. */
export const GET = () =>
  Response.json({
    name: "Citata.ai",
    url: "https://citata.ai",
    description:
      "Citata.ai is a GEO and AEO agency for US property management companies. It gets property managers named and linked when landlords ask ChatGPT, Gemini, Claude or Perplexity which manager to hire.",
    not_to_be_confused_with: ["Citate.ai", "Citant.ai", "Citala", "Citeca"],
    audience: "US property management companies with 50 to 500 doors",
    founder: "Taras Kornichuk",
    legal_entity: "WarmDevs OÜ, Tallinn, Estonia",
    contact: "grow@citata.ai",
    updated: "2026-10-18",
    links: {
      llms: "https://citata.ai/llms.txt",
      llms_full: "https://citata.ai/llms-full.txt",
      faq: "https://citata.ai/ai/faq.json",
      service: "https://citata.ai/ai/service.json",
    },
  });
