// Housing authority payment standard cuts and voucher freezes, 2025–2026 (backlog B019, hypothesis H01).
// One row = one change that the source states. Agents read each source on 2026-10-22.
// Add a row only with a housing authority notice, board record or local news report that states it.

export const published = "2026-10-22";
export const updated = "2026-10-22";
export const checked = "2026-10-22";

export interface Cut {
  pha: string;
  /** Area as the source names it. */
  place: string;
  /** Our FY2027 metro page, when the PHA is in that HUD FMR area. */
  metroSlug?: string;
  kind: "cut" | "proposed" | "freeze";
  /** True when the PHA stopped or paused new vouchers. */
  paused: boolean;
  action: string;
  start: string;
  appliesTo: string;
  sourceLabel: string;
  sourceShort: string;
  sourceUrl: string;
}

export const cuts: Cut[] = [
  {
    pha: "Housing Authority of the City of Los Angeles (HACLA)",
    place: "Los Angeles, CA",
    metroSlug: "los-angeles",
    kind: "cut",
    paused: true,
    action:
      "Payment standard 120% → 110% of FMR. Paused voucher issuance for more than 3,000 families from March 2025.",
    start: "2025-08-01",
    appliesTo:
      "New rental agreements. Families who stay in their unit keep the old amount (hold harmless).",
    sourceLabel: "HACLA: notice to Section 8 participants on budget cuts (2025-07-02)",
    sourceShort: "HACLA notice, 2025-07-02",
    sourceUrl:
      "https://www.hacla.org/en/news/hacla-notifies-section-8-participants-changes-program-due-recent-budget-cuts",
  },
  {
    pha: "Columbus Metropolitan Housing Authority (CMHA)",
    place: "Columbus, OH",
    metroSlug: "columbus-oh",
    kind: "cut",
    paused: false,
    action: "Payment standard 110% → 100% of FMR, because of a projected funding shortfall.",
    start: "2026-08-01",
    appliesTo:
      "New leases and moves from 2026-08-01. Current tenants at annual reexamination or when they move.",
    sourceLabel: "CMHA: payment standard letter to HCV participants (2026-07-01)",
    sourceShort: "CMHA letter, 2026-07-01",
    sourceUrl:
      "https://cmhanet.com/media/documents/2026/Participant_Payment_Standard_Letter%20electronic_Final_070126.pdf",
  },
  {
    pha: "Housing Authority of Washington County (HAWC)",
    place: "Washington County, OR",
    metroSlug: "portland-or",
    kind: "cut",
    paused: false,
    action:
      "Payment standards 105–107% of FMR → 96% of FMR on average. HAWC expects $1.1M less HAP a year.",
    start: "2026-07-01",
    appliesTo:
      "New admissions and moves at once. Continuing tenancies by annual recertification date.",
    sourceLabel: "HAWC Board of Directors agenda packet, item E.1 (2026-05-05)",
    sourceShort: "HAWC board, 2026-05-05",
    sourceUrl: "https://washingtoncounty.civicweb.net/document/328201/",
  },
  {
    pha: "Housing Authority of the City of Alameda (AHA)",
    place: "Alameda, CA",
    metroSlug: "oakland",
    kind: "cut",
    paused: true,
    action:
      "Payment standards 111% → 110% of FMR (the regulatory limit), because AHA is in shortfall. Stopped new vouchers, except HUD-VASH and FYI.",
    start: "2026-05-02",
    appliesTo: "New admissions and transfers at once. Recertifications from 2026-05-02.",
    sourceLabel: "AHA Board of Commissioners agenda packet (2026-03-18)",
    sourceShort: "AHA board, 2026-03-18",
    sourceUrl:
      "https://www.alamedahsg.org/wp-content/uploads/2026/03/03.-Board-of-Commissioners-March-18-2026-Agenda-and-Packet.pdf",
  },
  {
    pha: "Housing Authority of Cook County (HACC)",
    place: "Cook County, IL",
    metroSlug: "chicago",
    kind: "cut",
    paused: true,
    action:
      "Payment standards go back to the 2024 schedule. No new vouchers from the wait list. Port-ins not absorbed.",
    start: "2025-05-01",
    appliesTo:
      "Movers from 2025-05-01. Current families from the second annual recertification after that date.",
    sourceLabel: "HACC: shortfall notice to HCV participants (2025)",
    sourceShort: "HACC notice, 2025",
    sourceUrl: "https://thehacc.org/app/uploads/2025/04/HACC-Shortfall-Notice-2025-Revised-3.pdf",
  },
  {
    pha: "Massachusetts EOHLC, state-run federal vouchers",
    place: "Massachusetts (outside the Boston metro)",
    kind: "cut",
    paused: false,
    action:
      "Payment standards for most federal mobile vouchers 120% → 110% of Small Area FMR. The Boston metro stayed at 120% while an FMR appeal ran.",
    start: "2025-02-01",
    appliesTo:
      "Moves, voucher size changes and recertifications. Current leases are held harmless.",
    sourceLabel:
      "Mass.gov: EOHLC memo, updated payment standards and hold-harmless policy (2024-11-21)",
    sourceShort: "EOHLC memo, 2024-11-21",
    sourceUrl:
      "https://www.mass.gov/doc/federal-payment-standard-policy-update-november-21-2024/download",
  },
  {
    pha: "Georgia Department of Community Affairs (DCA)",
    place: "Georgia, areas the state program serves",
    kind: "proposed",
    paused: false,
    action:
      "Proposed: payment standards at 90% of FMR, for shortfall mitigation. We found no notice that DCA adopted it.",
    start: "",
    appliesTo: "New cases only. Current families held harmless (as proposed).",
    sourceLabel: "Georgia DCA: notice of public hearing (2026-06-05)",
    sourceShort: "DCA notice, 2026-06-05",
    sourceUrl: "https://dca.georgia.gov/node/24691",
  },
  {
    pha: "New York City Housing Authority (NYCHA)",
    place: "New York, NY",
    metroSlug: "new-york",
    kind: "freeze",
    paused: true,
    action: "Paused outreach and voucher issuance for the general HCV wait list.",
    start: "2025-08-01",
    appliesTo: "General wait list applicants. VASH and Stability Voucher referrals continue.",
    sourceLabel: "NYCHA: Section 8 applicants page",
    sourceShort: "NYCHA applicants page",
    sourceUrl: "https://www.nyc.gov/site/nycha/section-8/applicants.page",
  },
  {
    pha: "Housing Opportunities Commission of Montgomery County (HOC)",
    place: "Montgomery County, MD",
    metroSlug: "washington-dc",
    kind: "freeze",
    paused: true,
    action:
      "Cannot issue new vouchers, with some exceptions. Paused new applications and port-ins. HOC expects to issue again in spring 2027.",
    start: "",
    appliesTo: "New applicants. VASH, statewide and PBV applicants still processed.",
    sourceLabel: "HOC: Housing Choice Voucher program update",
    sourceShort: "HOC update page",
    sourceUrl:
      "https://www.hocmc.org/housing-opportunities/housing-rental-assistance-programs/housing-choice-voucher-program/housing-choice-voucher-program-update/",
  },
  {
    pha: "San Diego Housing Commission (SDHC)",
    place: "San Diego, CA",
    metroSlug: "san-diego",
    kind: "freeze",
    paused: true,
    action:
      "Selects no new families from the HCV wait list, because of too little federal funding. Closed the wait lists.",
    start: "",
    appliesTo: "New applicants and families on the wait list.",
    sourceLabel: "SDHC: wait list portal",
    sourceShort: "SDHC wait list page",
    sourceUrl: "https://www.sdhc.org/housing-opportunities/help-with-your-rent/wait-list-portal/",
  },
  {
    pha: "Home Forward",
    place: "Portland, OR",
    metroSlug: "portland-or",
    kind: "freeze",
    paused: true,
    action: "Canceled voucher orientations for new families. The program is in shortfall.",
    start: "",
    appliesTo: "New families.",
    sourceLabel: "Willamette Week: Home Forward halts vouchers for new families (2025-08-22)",
    sourceShort: "Willamette Week, 2025-08-22",
    sourceUrl:
      "https://www.wweek.com/news/2025/08/22/home-forward-halts-vouchers-for-new-families-as-federal-funds-fall-short/",
  },
  {
    pha: "Denver Housing Authority (DHA)",
    place: "Denver, CO",
    metroSlug: "denver",
    kind: "freeze",
    paused: true,
    action:
      "Selected no names from the HCV lottery in 2025 or 2026, because of limited federal funding.",
    start: "",
    appliesTo: "Lottery and wait list applicants.",
    sourceLabel: "DHA: HCV lottery page",
    sourceShort: "DHA lottery page",
    sourceUrl: "https://www.denverhousing.org/hcv-lottery/",
  },
  {
    pha: "Miami-Dade County Section 8 program",
    place: "Miami-Dade County, FL",
    metroSlug: "miami",
    kind: "freeze",
    paused: true,
    action: "New vouchers frozen after a $77 million funding shortfall.",
    start: "",
    appliesTo: "About 5,000 people on the wait list. Current voucher holders not affected.",
    sourceLabel:
      "WSVN 7News: funding shortfall freezes new Section 8 vouchers in Miami-Dade (2025-06-26)",
    sourceShort: "WSVN, 2025-06-26",
    sourceUrl:
      "https://wsvn.com/news/local/miami-dade/herald-funding-shortfall-freezes-new-section-8-rent-vouchers-in-miami-dade/",
  },
  {
    pha: "Metropolitan Council HRA (Metro HRA)",
    place: "Minneapolis–St. Paul suburbs, MN",
    metroSlug: "minneapolis-st-paul",
    kind: "freeze",
    paused: true,
    action:
      "Stopped wait list selections and new vouchers. Stopped port-ins. Aim: about 375 fewer vouchers by the end of 2025.",
    start: "",
    appliesTo: "Wait list, PBV movers, port-ins.",
    sourceLabel: "Metropolitan Council: Community Development Committee info item (2025-06-02)",
    sourceShort: "Met Council, 2025-06-02",
    sourceUrl:
      "https://metrocouncil.org/Council-Meetings/Committees/Community-Development-Committee/2025/June-2,-2025/info-2-ppt.aspx",
  },
  {
    pha: "Richmond Redevelopment and Housing Authority (RRHA)",
    place: "Richmond, VA",
    kind: "freeze",
    paused: true,
    action:
      "Suspended all new tenant-based vouchers. 395 selected families went back to the wait list.",
    start: "",
    appliesTo: "Selected applicants not yet issued a voucher.",
    sourceLabel: "The Richmonder: RRHA stops issuing new vouchers (2025-05-22)",
    sourceShort: "The Richmonder, 2025-05-22",
    sourceUrl:
      "https://www.richmonder.org/richmond-public-housing-authority-stops-issuing-new-vouchers-amid-funding-strains/",
  },
  {
    pha: "Tulsa Housing Authority (THA)",
    place: "Tulsa, OK",
    kind: "freeze",
    paused: true,
    action:
      "No new vouchers. Vouchers that end are not reissued. The board adopted a termination plan as a last resort.",
    start: "",
    appliesTo:
      "Wait list and turnover vouchers. Elderly and disabled families exempt from terminations.",
    sourceLabel:
      "NonDoc: no new vouchers, Tulsa Housing Authority approves emergency plan (2025-05-08)",
    sourceShort: "NonDoc, 2025-05-08",
    sourceUrl:
      "https://nondoc.com/2025/05/08/no-new-vouchers-tulsa-housing-authority-approves-emergency-plan-hopes-to-avoid-terminations/",
  },
  {
    pha: "Colorado Springs Housing Authority (CSHA)",
    place: "Colorado Springs, CO",
    kind: "freeze",
    paused: true,
    action: "Paused new voucher issuance after a HUD directive.",
    start: "",
    appliesTo: "New issuance. Current voucher holders not affected.",
    sourceLabel: "Rocky Mountain PBS: Colorado Springs housing vouchers paused (2025-08-06)",
    sourceShort: "Rocky Mountain PBS, 2025-08-06",
    sourceUrl:
      "https://www.rmpbs.org/news/housing-transportation/colorado-springs-housing-vouchers-paused",
  },
  {
    pha: "Buffalo Municipal Housing Authority (BMHA)",
    place: "Buffalo, NY",
    kind: "freeze",
    paused: true,
    action: "In shortfall status: hold on new vouchers.",
    start: "",
    appliesTo: "New applicants.",
    sourceLabel: "Investigative Post: Buffalo voucher shortfall (2025-06-24)",
    sourceShort: "Investigative Post, 2025-06-24",
    sourceUrl: "https://investigativepost.org/2025/06/24/523186/",
  },
  {
    pha: "Housing Authority of the City of Santa Barbara (HACSB)",
    place: "Santa Barbara, CA",
    kind: "freeze",
    paused: true,
    action: "Stopped issuing new vouchers. No date to start again.",
    start: "2025-03-18",
    appliesTo: "Wait list applicants, movers and landlords (limits on rent increases).",
    sourceLabel: "HACSB: notice regarding voucher funding shortfall (2025-03-18)",
    sourceShort: "HACSB notice, 2025-03-18",
    sourceUrl:
      "https://hacsb.org/wp-content/uploads/2025/03/Notice-Regarding-Voucher-Funding-Shortfall_3-18-2025.pdf",
  },
  {
    pha: "Vermont State Housing Authority (VSHA)",
    place: "Vermont, statewide",
    kind: "freeze",
    paused: true,
    action:
      "Stopped issuing new vouchers. Began to take back about 50 vouchers from families still searching.",
    start: "",
    appliesTo: "Wait list applicants and searching voucher holders.",
    sourceLabel: "VTDigger: VSHA will stop issuing new vouchers (2025-05-22)",
    sourceShort: "VTDigger, 2025-05-22",
    sourceUrl:
      "https://vtdigger.org/2025/05/22/vermonts-largest-provider-of-section-8-housing-subsidies-will-stop-issuing-new-vouchers/",
  },
  {
    pha: "Tallahassee Housing Authority",
    place: "Tallahassee, FL",
    kind: "freeze",
    paused: true,
    action: "Stopped reissuing vouchers that turn over.",
    start: "",
    appliesTo: "Wait list and turnover vouchers.",
    sourceLabel:
      "WTXL ABC 27: Tallahassee Housing Authority halts reissuing of some vouchers (2026-07-20)",
    sourceShort: "WTXL, 2026-07-20",
    sourceUrl:
      "https://www.wtxl.com/northwest-tallahassee/tallahassee-housing-authority-halts-reissuing-of-some-housing-vouchers-due-to-federal-funding-limits",
  },
  {
    pha: "Mansfield Metropolitan Housing Authority (MMHA)",
    place: "Mansfield, OH",
    kind: "freeze",
    paused: true,
    action: "No new vouchers in 2025. Suspended 240 vouchers for the rest of 2025.",
    start: "",
    appliesTo: "Wait list applicants and searching voucher holders.",
    sourceLabel:
      "Richland Source: Metro Housing seeks federal funds to avoid shortfall (2025-08-28)",
    sourceShort: "Richland Source, 2025-08-28",
    sourceUrl:
      "https://www.richlandsource.com/2025/08/28/metro-housing-director-agency-seeking-federal-funds-to-avoid-shortfall/",
  },
];

/** HUD's 2026 instructions to housing authorities. Quotes read on 2026-10-22. */
export const hud = {
  source: {
    label: "HUD PIH: 2026 HCV Budget Management Letter (February 2026)",
    url: "https://www.hud.gov/sites/default/files/PIH/documents/2026-Budget-Management-Letter.pdf",
  },
  notice: {
    label: "HUD: Notice PIH 2026-12, Revision 2, 2026 HCV funding (2026-06-09)",
    url: "https://www.hud.gov/sites/default/files/hudclips/documents/PIH-2026-12.pdf",
  },
  answer:
    "In February 2026, HUD told housing authorities to cut costs now so that they do not spend more than their 2026 funding, and listed lower payment standards and a stop to new vouchers as ways to do it.",
  faq: 'In its 2026 Budget Management Letter, HUD told housing authorities that they "must take measures now to reduce program costs" and that it "cannot guarantee" money for all shortfalls. Lower payment standards are one of the cuts HUD lists.',
  why: 'Housing authorities pay voucher subsidies from a yearly HUD budget. When rents rise faster than that budget, the agency runs short. HUD\'s 2026 Budget Management Letter says that housing authorities "must take measures now to reduce program costs, if necessary, to ensure that their expenditures do not exceed their anticipated 2026 funding."',
  points: [
    {
      lead: "Lower payment standards.",
      text: 'HUD lists this cut: "Reduce payment standards, including ending the use of any approved exception payment standards, and remain within the basic range." The basic range is 90% to 110% of the FMR.',
    },
    {
      lead: "Stop new vouchers.",
      text: 'HUD also lists: "Cease issuance of new vouchers", except HUD-VASH and Foster Youth to Independence (FYI) vouchers. Most rows in the tracker are this type.',
    },
    {
      lead: "Limited help from HUD.",
      text: 'The letter says HUD\'s tools for 2026 shortfalls "will be limited" and that HUD "cannot guarantee that funding will be available to resolve all shortfall needs."',
    },
    {
      lead: "Faster and deeper cuts in a shortfall.",
      text: "Notice PIH 2026-12 says a housing authority in a confirmed shortfall must suspend most new voucher issuance. With good cause, a housing authority can ask HUD for waivers: to apply a payment standard cut to current tenants at once, or to set payment standards below 90% of the FMR.",
    },
  ],
};
