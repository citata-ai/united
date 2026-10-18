/** Shared site facts. Inbox is live (business/accounts.toml, docs/architecture.md §6). */
export const inbox = "grow@citata.ai";

export const auditHref = `mailto:${inbox}?subject=${encodeURIComponent("Free AI visibility audit")}&body=${encodeURIComponent("Site: \nCity / market: \nOne question your buyers ask AI: \n")}`;

/** Offers mirror business/offers.toml. business/src/landing-offers.test.ts keeps them equal. */
export { default as offers } from "./offers.json";
