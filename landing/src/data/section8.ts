// HUD FY2027 Fair Market Rents for the Section 8 pages (src/pages/section-8/).
// The JSON comes from tools/section8/build.py. Do not edit it by hand: every number is HUD's.
import data from "./fmr-fy2027.json";

export interface Metro {
  rank: number;
  slug: string;
  short: string;
  hudName: string;
  hudAreaCode: string;
  state: string;
  states: string[];
  pop2024: number;
  counties: string[];
  byTown: boolean;
  /** 0–4 bedrooms, dollars a month. */
  fmr2027: number[];
  fmr2026: number[];
  changePct: number[];
  pha: { name: string; url: string };
  nearby: string[];
}

export const fmr = data as typeof data & { metros: Metro[] };
export const metros: Metro[] = fmr.metros;

/** Content date of the Section 8 pages. Change it when the data or the text changes. */
export const published = "2026-10-19";
export const updated = "2026-10-19";

export const bedrooms = ["Studio (0 BR)", "1 bedroom", "2 bedrooms", "3 bedrooms", "4 bedrooms"];

export const metroPath = (m: Metro) => `/section-8/${m.slug}-fair-market-rent-2027`;
export const bySlug = (slug: string) => metros.find((m) => m.slug === slug);

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
export const pct = (n: number) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(1)}%`;
export const delta = (n: number) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${usd(Math.abs(n))}`;

/** "12.9% more than" / "6.4% less than" / "the same as". */
export function changeWords(now: number, before: number, p: number): string {
  if (now === before) return "the same as";
  const d = usd(Math.abs(now - before));
  return now > before
    ? `${d} (${p.toFixed(1)}%) more than`
    : `${d} (${Math.abs(p).toFixed(1)}%) less than`;
}

/** Basic range payment standard: 90% to 110% of the FMR (24 CFR 982.503(c)), whole dollars. */
export const basicRange = (n: number) => [Math.round(n * 0.9), Math.round(n * 1.1)] as const;

export const src = {
  dataset: { label: "HUD User: Fair Market Rents (FY2027 and FY2026 data)", url: fmr.sourcePage },
  fy2027: {
    label: "HUD User: FY2027 FMRs, county-level data (FY27_FMRs.xlsx)",
    url: fmr.fy2027Url,
  },
  fy2026: {
    label: "HUD User: revised FY2026 FMRs, county-level data (FY26_FMRs_revised.xlsx)",
    url: fmr.fy2026Url,
  },
  notice: {
    label: `Federal Register: FY2027 Fair Market Rents, ${fmr.notice.citation}, Docket ${fmr.notice.docket} (2026-09-01)`,
    url: fmr.notice.url,
  },
  cfr503: {
    label: "eCFR: 24 CFR 982.503, payment standard amount and schedule",
    url: "https://www.ecfr.gov/current/title-24/subtitle-B/chapter-IX/part-982/subpart-K/section-982.503",
  },
  cfr305: {
    label: "eCFR: 24 CFR 982.305, PHA approval of assisted tenancy",
    url: "https://www.ecfr.gov/current/title-24/subtitle-B/chapter-IX/part-982/subpart-G/section-982.305",
  },
  cfr507: {
    label: "eCFR: 24 CFR 982.507, rent to owner: reasonable rent",
    url: "https://www.ecfr.gov/current/title-24/subtitle-B/chapter-IX/part-982/subpart-K/section-982.507",
  },
};

/** schema.org Dataset for one metro or for the hub. */
export function datasetSchema(opts: {
  name: string;
  description: string;
  url: string;
  place?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    creator: {
      "@type": "GovernmentOrganization",
      name: "U.S. Department of Housing and Urban Development (HUD)",
      url: "https://www.hud.gov",
    },
    publisher: { "@id": "https://citata.ai/#org" },
    isBasedOn: [fmr.fy2027Url, fmr.fy2026Url],
    citation: `${fmr.notice.citation} (Docket ${fmr.notice.docket})`,
    temporalCoverage: "2026-10-01/2027-09-30",
    ...(opts.place
      ? { spatialCoverage: { "@type": "Place", name: opts.place } }
      : { spatialCoverage: { "@type": "Country", name: "United States" } }),
    variableMeasured: [
      "Fair Market Rent, 0 to 4 bedrooms, FY2027 (USD per month)",
      "Fair Market Rent, FY2026",
      "Change from FY2026 (%)",
    ],
    datePublished: published,
    dateModified: updated,
    isAccessibleForFree: true,
    keywords: [
      "Section 8",
      "Fair Market Rent",
      "FMR",
      "Housing Choice Voucher",
      "payment standard",
      "FY2027",
    ],
  };
}
