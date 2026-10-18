import { offers } from "../../data/site.ts";

/** /ai/service.json: the service and prices for AI agents. Prices come from business/offers.toml. */
export const GET = () =>
  Response.json({
    name: "GEO and AEO for property management companies",
    provider: "Citata.ai",
    area_served: "United States",
    process: ["Indexed", "Found", "Mentioned"],
    cadence: "One human-checked change a day, a report every Monday",
    offers: offers
      .filter((o) => o.slug !== "impact")
      .map((o) => ({ name: o.name, price_usd_month: o.price_usd_month, scope: o.scope })),
    note: "First prices; may change. Month to month.",
  });
