// Pure math for the free tools under /tools. No DOM, no network: the pages import it at build
// time (worked examples, first render) and in the browser (the calculator islands).
// Tests: landing/calculators.test.ts.

/** A number that is finite and 0 or more. Empty or bad input counts as 0. */
const pos = (n: number | null | undefined): number =>
  typeof n === "number" && Number.isFinite(n) && n > 0 ? n : 0;

const cents = (n: number): number => Math.round(n * 100) / 100;

// ---------------------------------------------------------------------------
// Property management fee calculator
// ---------------------------------------------------------------------------

export type FeeModel = "percent" | "flat";

export interface FeeInput {
  /** Monthly rent per unit, USD. */
  rent: number;
  units: number;
  model: FeeModel;
  /** Management fee, percent of rent collected (model "percent"). */
  percent: number;
  /** Management fee, USD per door per month (model "flat"). Charged on every door, every month. */
  flat: number;
  /** Leasing fee, percent of one month's rent, per new tenant placed. */
  leasingPercent: number;
  newLeasesPerYear: number;
  /** Lease renewal fee, USD per renewal. */
  renewalFee: number;
  renewalsPerYear: number;
  /** Vacant unit-months per year, all units together. Vacant months bring no rent. */
  vacantMonthsPerYear: number;
  /** Vacancy fee, USD per vacant unit per month. 0 if the contract has none. */
  vacancyFee: number;
}

export interface FeeResult {
  /** Rent if every unit is let every month. */
  scheduledRent: number;
  /** Rent after vacant months. */
  collectedRent: number;
  management: number;
  leasing: number;
  renewals: number;
  vacancy: number;
  totalYear: number;
  totalMonth: number;
  perDoorMonth: number;
  /** Total fees as a percent of rent collected. */
  effectivePercent: number;
}

export function computeFees(input: FeeInput): FeeResult {
  const rent = pos(input.rent);
  const units = Math.floor(pos(input.units));
  const doorMonths = units * 12;
  const vacant = Math.min(pos(input.vacantMonthsPerYear), doorMonths);
  const scheduledRent = rent * doorMonths;
  const collectedRent = rent * (doorMonths - vacant);
  const management =
    input.model === "flat"
      ? pos(input.flat) * doorMonths
      : (collectedRent * pos(input.percent)) / 100;
  const leasing = ((rent * pos(input.leasingPercent)) / 100) * pos(input.newLeasesPerYear);
  const renewals = pos(input.renewalFee) * pos(input.renewalsPerYear);
  const vacancy = pos(input.vacancyFee) * vacant;
  const totalYear = management + leasing + renewals + vacancy;
  return {
    scheduledRent: cents(scheduledRent),
    collectedRent: cents(collectedRent),
    management: cents(management),
    leasing: cents(leasing),
    renewals: cents(renewals),
    vacancy: cents(vacancy),
    totalYear: cents(totalYear),
    totalMonth: cents(totalYear / 12),
    perDoorMonth: units ? cents(totalYear / doorMonths) : 0,
    effectivePercent: collectedRent ? Math.round((totalYear / collectedRent) * 1000) / 10 : 0,
  };
}

/**
 * Typical US fee levels. Only numbers we read on the source page (checked 2026-10-19).
 * A fee type with no verified number (for example vacancy fees) has no entry.
 */
export const typical = {
  /** All Property Management: "between 8 and 12% of the monthly rental value". */
  percentRange: { low: 8, high: 12, source: "All Property Management" },
  /** iPropertyManagement: average advertised percent fee 8.49%, lowest 3.75%, highest 14.0%. */
  percentAverage: { value: 8.49, low: 3.75, high: 14, source: "iPropertyManagement" },
  /** iPropertyManagement: average flat fee $101.04 per unit per month. */
  flatAverage: { value: 101.04, source: "iPropertyManagement" },
  /** All Property Management: 50–100% of one month's rent per new tenant. */
  leasingRange: { low: 50, high: 100, source: "All Property Management" },
  /** iPropertyManagement: 70.6% with full management, 81.8% for placement only. */
  leasingAverage: { value: 70.6, source: "iPropertyManagement" },
  /** iPropertyManagement: average flat lease renewal fee $231.77. */
  renewalAverage: { value: 231.77, source: "iPropertyManagement" },
} as const;

export type Position = "below" | "within" | "above";

export const position = (value: number, low: number, high: number): Position =>
  value < low ? "below" : value > high ? "above" : "within";

/** Rent at which a flat fee per door costs the same as a percent fee. */
export const breakEvenRent = (flat: number, percent: number): number =>
  percent > 0 ? cents((flat * 100) / percent) : 0;

const word = { below: "below", within: "inside", above: "above" } as const;
const vs = (diff: number) => (diff >= 0 ? `${usd(cents(diff))} more` : `${usd(cents(-diff))} less`);

/** Plain sentences that compare the inputs with the typical levels above. */
export function feeComparisons(input: FeeInput): string[] {
  const out: string[] = [];
  const t = typical;
  if (input.model === "percent") {
    const pc = pos(input.percent);
    out.push(
      `Management fee ${pc}%: ${word[position(pc, t.percentRange.low, t.percentRange.high)]} the typical ${t.percentRange.low}–${t.percentRange.high}% range (${t.percentRange.source}). The average advertised rate is ${t.percentAverage.value}% (${t.percentAverage.source}).`,
    );
  } else {
    const flat = pos(input.flat);
    const atAverage = cents((pos(input.rent) * t.percentAverage.value) / 100);
    out.push(
      `Flat fee ${usd(flat)} per door: ${vs(flat - t.flatAverage.value)} than the ${usd(t.flatAverage.value)} average (${t.flatAverage.source}). At your rent, the average ${t.percentAverage.value}% fee is ${usd(atAverage)} per door.`,
    );
  }
  const lp = pos(input.leasingPercent);
  if (lp > 0) {
    out.push(
      `Leasing fee ${lp}% of one month's rent: ${word[position(lp, t.leasingRange.low, t.leasingRange.high)]} the typical ${t.leasingRange.low}–${t.leasingRange.high}% range (${t.leasingRange.source}). The average with full management is ${t.leasingAverage.value}% (${t.leasingAverage.source}).`,
    );
  }
  const rf = pos(input.renewalFee);
  if (rf > 0) {
    out.push(
      `Renewal fee ${usd(rf)}: ${vs(rf - t.renewalAverage.value)} than the ${usd(t.renewalAverage.value)} average flat renewal fee (${t.renewalAverage.source}).`,
    );
  }
  if (pos(input.vacancyFee) > 0) {
    out.push("Vacancy fee: we found no verified US average, so we show no comparison.");
  }
  return out;
}

// ---------------------------------------------------------------------------
// Section 8 (Housing Choice Voucher) rent calculator
// Rules: 24 CFR 5.628 (TTP), 5.630 (minimum rent), 982.505 (HAP), 982.508 (40% at first lease),
// 982.515 (family share), HUD HCV Guidebook "Calculating Rent and HAP Payments" (2019).
// ---------------------------------------------------------------------------

export interface VoucherInput {
  /** Rent to owner on the lease, per month. */
  contractRent: number;
  /** Housing authority utility allowance for tenant-paid utilities, per month. */
  utilityAllowance: number;
  /** Family's adjusted monthly income (after HUD deductions). */
  adjustedMonthlyIncome: number;
  /** Family's gross monthly income, for the 10% test. Null if unknown: the test is skipped. */
  grossMonthlyIncome: number | null;
  /** Housing authority minimum rent, $0 to $50 (24 CFR 5.630). */
  minimumRent: number;
  /** Payment standard for the family (lower of voucher size and unit size). */
  paymentStandard: number;
  /** True for the first assisted lease on this unit: the 40% check applies. */
  firstLease: boolean;
}

export type TtpBasis = "30% of adjusted income" | "10% of gross income" | "minimum rent";

export interface VoucherResult {
  grossRent: number;
  thirtyPercentAdjusted: number;
  tenPercentGross: number | null;
  minimumRent: number;
  /** Total tenant payment, rounded to the nearest dollar (24 CFR 5.628). */
  ttp: number;
  ttpBasis: TtpBasis;
  /** Housing assistance payment, the housing authority's share. */
  hap: number;
  /** Part of the HAP paid to the owner (never more than the contract rent). */
  hapToOwner: number;
  /** HAP above the contract rent, paid to the family or the utility company. */
  utilityReimbursement: number;
  /** Gross rent minus HAP: what the family pays for rent and utilities together. */
  familyShare: number;
  /** Part of the family share paid to the owner. */
  tenantRentToOwner: number;
  /** Gross rent above the payment standard. The family pays it. */
  overPaymentStandard: number;
  /** 40% of adjusted monthly income. */
  fortyPercentLimit: number;
  /** The 40% check applies at first lease when the gross rent is above the payment standard. */
  fortyPercentApplies: boolean;
  fortyPercentOk: boolean;
  /** Highest gross rent that passes the 40% check at first lease. */
  maxGrossRentFirstLease: number;
}

export function computeVoucher(input: VoucherInput): VoucherResult {
  const contractRent = pos(input.contractRent);
  const grossRent = contractRent + pos(input.utilityAllowance);
  const adjusted = pos(input.adjustedMonthlyIncome);
  const thirty = adjusted * 0.3;
  const ten = input.grossMonthlyIncome == null ? null : pos(input.grossMonthlyIncome) * 0.1;
  const minimumRent = Math.min(pos(input.minimumRent), 50);
  const options: Array<[number, TtpBasis]> = [
    [thirty, "30% of adjusted income"],
    ...(ten == null ? [] : ([[ten, "10% of gross income"]] as Array<[number, TtpBasis]>)),
    [minimumRent, "minimum rent"],
  ];
  const [top, ttpBasis] = options.reduce((a, b) => (b[0] > a[0] ? b : a));
  const ttp = Math.round(top);
  const paymentStandard = pos(input.paymentStandard);
  const hap = Math.max(0, Math.min(paymentStandard, grossRent) - ttp);
  const hapToOwner = Math.min(hap, contractRent);
  const familyShare = grossRent - hap;
  const fortyPercentLimit = cents(adjusted * 0.4);
  const fortyPercentApplies = input.firstLease && grossRent > paymentStandard;
  return {
    grossRent: cents(grossRent),
    thirtyPercentAdjusted: cents(thirty),
    tenPercentGross: ten == null ? null : cents(ten),
    minimumRent,
    ttp,
    ttpBasis,
    hap: cents(hap),
    hapToOwner: cents(hapToOwner),
    utilityReimbursement: cents(hap - hapToOwner),
    familyShare: cents(familyShare),
    tenantRentToOwner: cents(contractRent - hapToOwner),
    overPaymentStandard: cents(Math.max(0, grossRent - paymentStandard)),
    fortyPercentLimit,
    fortyPercentApplies,
    fortyPercentOk: !fortyPercentApplies || familyShare <= fortyPercentLimit,
    maxGrossRentFirstLease: cents(paymentStandard + Math.max(0, fortyPercentLimit - ttp)),
  };
}

/** One plain sentence on the 40% check (24 CFR 982.508). */
export function fortyPercentText(r: VoucherResult, firstLease: boolean): string {
  if (!firstLease) return "Does not apply: the 40% check is only for the first assisted lease.";
  if (!r.fortyPercentApplies) {
    return `Passes: the gross rent is not above the payment standard, so the family pays the TTP of ${usd(r.ttp)}.`;
  }
  return r.fortyPercentOk
    ? `Passes: the family share of ${usd(r.familyShare)} is not more than 40% of adjusted income (${usd(r.fortyPercentLimit)}).`
    : `Fails: the family share of ${usd(r.familyShare)} is more than 40% of adjusted income (${usd(r.fortyPercentLimit)}). The housing authority will not approve the unit at this rent. Highest gross rent that passes: ${usd(r.maxGrossRentFirstLease)}.`;
}

// ---------------------------------------------------------------------------
// Shared formatting
// ---------------------------------------------------------------------------

export const usd = (n: number): string =>
  (n < 0 ? "-$" : "$") +
  Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });

/** Worked examples on the pages. The tools start with the same numbers. */
export const feeExample: FeeInput = {
  rent: 1800,
  units: 10,
  model: "percent",
  percent: 9,
  flat: 100,
  leasingPercent: 75,
  newLeasesPerYear: 3,
  renewalFee: 250,
  renewalsPerYear: 7,
  vacantMonthsPerYear: 3,
  vacancyFee: 0,
};

export const voucherExample: VoucherInput = {
  contractRent: 1500,
  utilityAllowance: 150,
  adjustedMonthlyIncome: 2000,
  grossMonthlyIncome: 2400,
  minimumRent: 50,
  paymentStandard: 1600,
  firstLease: true,
};

// ---------------------------------------------------------------------------
// Rent vs sell calculator
// ---------------------------------------------------------------------------

export interface RentSellInput {
  /** Market value of the home today, USD. */
  homeValue: number;
  /** Mortgage balance today, USD. */
  mortgageBalance: number;
  /** Mortgage interest rate, percent a year. */
  mortgageRate: number;
  /** Monthly principal and interest payment, USD. Taxes and insurance go in monthlyCosts. */
  monthlyPayment: number;
  /** Monthly rent, USD. */
  rent: number;
  /** Share of the year the home is empty, percent. */
  vacancyPercent: number;
  /** Management fee, percent of rent collected. 0 if you self-manage. */
  managementPercent: number;
  /** Property tax, insurance, HOA, repairs and upkeep, USD a month. */
  monthlyCosts: number;
  /** Agent commission and closing costs at sale, percent of the sale price. */
  sellCostPercent: number;
  /** Home price growth, percent a year. */
  appreciationPercent: number;
  /** Growth of rent and costs, percent a year. Steps once a year. */
  rentGrowthPercent: number;
  /** What the cash earns if you sell now (or what each month's cash flow earns), percent a year. */
  investReturnPercent: number;
  /** Years you keep the home and rent it out before you sell. */
  years: number;
}

export interface RentSellResult {
  /** Cash in hand if you sell today: value minus sale costs minus mortgage balance. */
  sellNowCash: number;
  /** sellNowCash after it grows at investReturnPercent for `years`. */
  sellNowFuture: number;
  /** Monthly cash flow in the first year: rent collected minus fee, costs and mortgage payment. */
  firstYearMonthlyCashFlow: number;
  /** Sum of all monthly cash flows, no growth. */
  cashFlowTotal: number;
  /** Cash flows, each grown at investReturnPercent to the end. */
  cashFlowFuture: number;
  futureHomeValue: number;
  futureMortgageBalance: number;
  /** Cash at the later sale: future value minus sale costs minus balance. */
  keepSaleCash: number;
  /** keepSaleCash + cashFlowFuture. */
  keepTotal: number;
  /** keepTotal - sellNowFuture. Above 0: keeping and renting comes out ahead. */
  difference: number;
}

/** Pre-tax wealth at the end of `years` for "sell now" and "rent, then sell". */
export function computeRentSell(input: RentSellInput): RentSellResult {
  const months = Math.round(pos(input.years) * 12);
  const r = pos(input.investReturnPercent) / 100 / 12;
  const mRate = pos(input.mortgageRate) / 100 / 12;
  const growth = 1 + pos(input.rentGrowthPercent) / 100;
  const collectShare = 1 - Math.min(pos(input.vacancyPercent), 100) / 100;
  const keepShare = 1 - Math.min(pos(input.managementPercent), 100) / 100;
  const sellShare = 1 - Math.min(pos(input.sellCostPercent), 100) / 100;
  const appreciation = Number.isFinite(input.appreciationPercent) ? input.appreciationPercent : 0;

  const sellNowCash = pos(input.homeValue) * sellShare - pos(input.mortgageBalance);
  const sellNowFuture = sellNowCash * (1 + r) ** months;

  let balance = pos(input.mortgageBalance);
  let cashFlowTotal = 0;
  let cashFlowFuture = 0;
  let firstYearMonthlyCashFlow = 0;
  for (let m = 0; m < months; m++) {
    const step = growth ** Math.floor(m / 12);
    let payment = 0;
    if (balance > 0) {
      const interest = balance * mRate;
      payment = Math.min(pos(input.monthlyPayment), balance + interest);
      balance = Math.max(0, balance + interest - payment);
    }
    const flow =
      pos(input.rent) * step * collectShare * keepShare - pos(input.monthlyCosts) * step - payment;
    if (m === 0) firstYearMonthlyCashFlow = flow;
    cashFlowTotal += flow;
    cashFlowFuture += flow * (1 + r) ** (months - m - 1);
  }

  const futureHomeValue = Math.max(
    0,
    pos(input.homeValue) * (1 + appreciation / 100) ** (months / 12),
  );
  const keepSaleCash = futureHomeValue * sellShare - balance;
  const keepTotal = keepSaleCash + cashFlowFuture;
  return {
    sellNowCash: Math.round(sellNowCash),
    sellNowFuture: Math.round(sellNowFuture),
    firstYearMonthlyCashFlow: Math.round(firstYearMonthlyCashFlow),
    cashFlowTotal: Math.round(cashFlowTotal),
    cashFlowFuture: Math.round(cashFlowFuture),
    futureHomeValue: Math.round(futureHomeValue),
    futureMortgageBalance: Math.round(balance),
    keepSaleCash: Math.round(keepSaleCash),
    keepTotal: Math.round(keepTotal),
    difference: Math.round(keepTotal) - Math.round(sellNowFuture),
  };
}

/**
 * Home price growth (percent a year, 1 decimal) at which both paths end equal, or null if no
 * rate from -10% to 30% a year does it.
 */
export function breakEvenAppreciation(input: RentSellInput): number | null {
  const diff = (a: number) => {
    const x = computeRentSell({ ...input, appreciationPercent: a });
    return x.keepTotal - x.sellNowFuture;
  };
  let lo = -10;
  let hi = 30;
  if (diff(lo) > 0 || diff(hi) < 0) return null;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    if (diff(mid) < 0) lo = mid;
    else hi = mid;
  }
  return Math.round(hi * 10) / 10;
}

export const rentSellExample: RentSellInput = {
  homeValue: 400_000,
  mortgageBalance: 250_000,
  mortgageRate: 4,
  monthlyPayment: 1_400,
  rent: 2_400,
  vacancyPercent: 5,
  managementPercent: 9,
  monthlyCosts: 700,
  sellCostPercent: 7,
  appreciationPercent: 3,
  rentGrowthPercent: 3,
  investReturnPercent: 6,
  years: 5,
};

// ---------------------------------------------------------------------------
// Owner lead value calculator (backlog B023): what one owner lead is worth to a property manager
// ---------------------------------------------------------------------------

export interface LeadValueInput {
  /** Doors under management today. */
  doors: number;
  /** Average monthly rent per door, USD. */
  rent: number;
  /** Management fee, percent of rent. */
  managementPercent: number;
  /** Other fee revenue per door per year (leasing, renewal, other), USD. */
  otherRevenuePerDoor: number;
  /** Average doors per owner client. */
  doorsPerOwner: number;
  /** Doors lost per year, percent of doors at the start of the year. */
  churnPercent: number;
  /** Gross margin, percent of revenue kept after the direct cost to serve a door. */
  marginPercent: number;
  /** Percent of owner leads that sign a management agreement. */
  closePercent: number;
  /** Lifetime gross profit per dollar you spend to win the owner (for example 3 for 3:1). */
  targetRatio: number;
}

export interface LeadValueResult {
  revenuePerDoorYear: number;
  /** Average years an owner stays: 1 / churn, max 20. */
  lifetimeYears: number;
  lifetimeRevenue: number;
  lifetimeProfit: number;
  /** Most you can pay to win one owner at the target ratio. */
  maxCostPerOwner: number;
  /** Most you can pay for one owner lead at the target ratio. */
  maxCostPerLead: number;
  /** Lifetime gross profit of one lead: max cost per lead at a 1:1 ratio. */
  breakEvenCostPerLead: number;
  doorsLostPerYear: number;
  /** Owner leads a month you need only to replace the doors you lose. */
  leadsToReplaceChurn: number;
}

/** Cap on owner lifetime, years, so a churn near 0 does not give an endless value. */
export const maxLifetimeYears = 20;

export function computeLeadValue(input: LeadValueInput): LeadValueResult {
  const doors = pos(input.doors);
  const churn = pos(input.churnPercent) / 100;
  const close = pos(input.closePercent) / 100;
  const ratio = pos(input.targetRatio);
  const doorsPerOwner = pos(input.doorsPerOwner);
  const revenuePerDoorYear =
    (pos(input.rent) * 12 * pos(input.managementPercent)) / 100 + pos(input.otherRevenuePerDoor);
  const lifetimeYears = churn > 0 ? Math.min(1 / churn, maxLifetimeYears) : maxLifetimeYears;
  const lifetimeRevenue = revenuePerDoorYear * doorsPerOwner * lifetimeYears;
  const lifetimeProfit = (lifetimeRevenue * pos(input.marginPercent)) / 100;
  const maxCostPerOwner = ratio > 0 ? lifetimeProfit / ratio : 0;
  const doorsLostPerYear = doors * churn;
  const leadsToReplaceChurn =
    doorsPerOwner > 0 && close > 0 ? doorsLostPerYear / doorsPerOwner / close / 12 : 0;
  return {
    revenuePerDoorYear: cents(revenuePerDoorYear),
    lifetimeYears: Math.round(lifetimeYears * 10) / 10,
    lifetimeRevenue: Math.round(lifetimeRevenue),
    lifetimeProfit: Math.round(lifetimeProfit),
    maxCostPerOwner: Math.round(maxCostPerOwner),
    maxCostPerLead: Math.round(maxCostPerOwner * close),
    breakEvenCostPerLead: Math.round(lifetimeProfit * close),
    doorsLostPerYear: Math.round(doorsLostPerYear * 10) / 10,
    leadsToReplaceChurn: Math.round(leadsToReplaceChurn * 10) / 10,
  };
}

/**
 * Benchmarks for the lead value page. Only numbers read on the source pages on 2026-10-23.
 * No public source gives a gross margin or a cost per owner lead, so the page shows none.
 */
export const leadBenchmarks = {
  /** Peter Lohmann, newsletter #74 (2023-12-29): "industry-average unit churn rate of 19.5%", NARPM / ProfitCoach study, year 2021. */
  churnAverage: { value: 19.5, year: 2021, source: "NARPM / ProfitCoach via Peter Lohmann" },
  /** Fourandhalf with Daniel Craig, ProfitCoach (2022-09-08): first study 25%; under 15% "great", under 20% "okay". */
  churnFirstStudy: {
    value: 25,
    great: 15,
    okay: 20,
    source: "Daniel Craig, ProfitCoach, via Fourandhalf",
  },
  /** Peter Lohmann, newsletter #74: "about 28 valid leads per month ... closing rate of around 20%" (one company). */
  closeOneCompany: { value: 20, leads: 28, source: "Peter Lohmann, newsletter #74" },
  /** RentScale data via Blanket Homes: average monthly owner leads 28.6 (2023), 21.1 (2024), 15.7 (2025). */
  leadsPerMonth: { y2023: 28.6, y2024: 21.1, y2025: 15.7, source: "RentScale via Blanket Homes" },
} as const;

/** The page's worked example. Churn and fee are benchmarks; the other inputs are an example only. */
export const leadValueExample: LeadValueInput = {
  doors: 300,
  rent: 1_800,
  managementPercent: 8.49,
  otherRevenuePerDoor: 300,
  doorsPerOwner: 1.2,
  churnPercent: 19.5,
  marginPercent: 30,
  closePercent: 20,
  targetRatio: 3,
};
