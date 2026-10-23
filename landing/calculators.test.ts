import { describe, expect, it } from "vitest";
import {
  breakEvenAppreciation,
  breakEvenRent,
  computeFees,
  computeLeadValue,
  computeRentSell,
  computeVoucher,
  feeExample,
  leadValueExample,
  position,
  rentSellExample,
  usd,
  voucherExample,
} from "./src/lib/calculators.ts";

describe("computeFees", () => {
  it("case 1: the worked example on /tools/property-management-fee-calculator", () => {
    const r = computeFees(feeExample);
    expect(r.scheduledRent).toBe(216_000);
    expect(r.collectedRent).toBe(210_600); // 117 of 120 door-months let
    expect(r.management).toBe(18_954); // 9% of 210,600
    expect(r.leasing).toBe(4_050); // 75% of 1,800 x 3
    expect(r.renewals).toBe(1_750); // 250 x 7
    expect(r.vacancy).toBe(0);
    expect(r.totalYear).toBe(24_754);
    expect(r.totalMonth).toBe(2_062.83);
    expect(r.perDoorMonth).toBe(206.28);
    expect(r.effectivePercent).toBe(11.8);
  });

  it("case 2: flat fee per door with a vacancy fee", () => {
    const r = computeFees({
      ...feeExample,
      rent: 1200,
      units: 4,
      model: "flat",
      flat: 100,
      newLeasesPerYear: 1,
      renewalsPerYear: 3,
      vacantMonthsPerYear: 2,
      vacancyFee: 50,
    });
    expect(r.collectedRent).toBe(55_200); // 1,200 x 46
    expect(r.management).toBe(4_800); // 100 x 48 door-months
    expect(r.leasing).toBe(900);
    expect(r.renewals).toBe(750);
    expect(r.vacancy).toBe(100);
    expect(r.totalYear).toBe(6_550);
    expect(r.effectivePercent).toBe(11.9);
  });

  it("case 3: bad input counts as 0 and vacancy cannot pass the door-months", () => {
    const r = computeFees({
      ...feeExample,
      rent: 1000,
      units: 1,
      percent: Number.NaN,
      leasingPercent: -5,
      renewalFee: 0,
      vacantMonthsPerYear: 99,
    });
    expect(r.collectedRent).toBe(0);
    expect(r.totalYear).toBe(0);
    expect(r.effectivePercent).toBe(0);
  });

  it("compares with typical ranges", () => {
    expect(position(7, 8, 12)).toBe("below");
    expect(position(10, 8, 12)).toBe("within");
    expect(position(13, 8, 12)).toBe("above");
    expect(breakEvenRent(101.04, 8.49)).toBe(1190.11);
  });
});

describe("computeVoucher", () => {
  it("case 1: the worked example on /tools/section-8-rent-calculator", () => {
    const r = computeVoucher(voucherExample);
    expect(r.grossRent).toBe(1650);
    expect(r.ttp).toBe(600);
    expect(r.ttpBasis).toBe("30% of adjusted income");
    expect(r.hap).toBe(1000); // lower of 1,600 and 1,650, minus 600
    expect(r.familyShare).toBe(650);
    expect(r.overPaymentStandard).toBe(50);
    expect(r.tenantRentToOwner).toBe(500);
    expect(r.fortyPercentApplies).toBe(true);
    expect(r.fortyPercentLimit).toBe(800);
    expect(r.fortyPercentOk).toBe(true);
    expect(r.maxGrossRentFirstLease).toBe(1800);
  });

  it("case 2: HUD HCV Guidebook examples 8, 9 and 11 (TTP $210, payment standard $450)", () => {
    const base = {
      adjustedMonthlyIncome: 700,
      grossMonthlyIncome: 740,
      minimumRent: 50,
      paymentStandard: 450,
      firstLease: true,
    };
    const ex8 = computeVoucher({ ...base, contractRent: 425, utilityAllowance: 0 });
    expect(ex8.ttp).toBe(210);
    expect(ex8.hap).toBe(215);
    expect(ex8.familyShare).toBe(210);
    const ex9 = computeVoucher({ ...base, contractRent: 500, utilityAllowance: 0 });
    expect(ex9.hap).toBe(240);
    expect(ex9.familyShare).toBe(260);
    expect(ex9.fortyPercentOk).toBe(true); // 260 <= 280
    expect(ex9.maxGrossRentFirstLease).toBe(520); // guidebook example 5
    const ex11 = computeVoucher({ ...base, contractRent: 300, utilityAllowance: 125 });
    expect(ex11.hap).toBe(215);
    expect(ex11.tenantRentToOwner).toBe(85);
    const fail = computeVoucher({ ...base, contractRent: 550, utilityAllowance: 0 });
    expect(fail.familyShare).toBe(310);
    expect(fail.fortyPercentOk).toBe(false); // 310 > 280
  });

  it("case 3: minimum rent and a utility reimbursement", () => {
    // Guidebook example 2: adjusted $134, gross $174, minimum rent $50 -> TTP $50.
    const r = computeVoucher({
      contractRent: 30,
      utilityAllowance: 100,
      adjustedMonthlyIncome: 134,
      grossMonthlyIncome: 174,
      minimumRent: 50,
      paymentStandard: 900,
      firstLease: false,
    });
    expect(r.ttp).toBe(50);
    expect(r.ttpBasis).toBe("minimum rent");
    expect(r.hap).toBe(80); // 130 - 50
    expect(r.hapToOwner).toBe(30);
    expect(r.utilityReimbursement).toBe(50);
    expect(r.tenantRentToOwner).toBe(0);
    expect(r.fortyPercentApplies).toBe(false);
    // 10% of gross income wins when it is the highest; no gross income skips that test.
    expect(
      computeVoucher({ ...voucherExample, adjustedMonthlyIncome: 500, grossMonthlyIncome: 2000 })
        .ttp,
    ).toBe(200);
    expect(
      computeVoucher({ ...voucherExample, adjustedMonthlyIncome: 500, grossMonthlyIncome: null })
        .ttp,
    ).toBe(150);
  });
});

describe("usd", () => {
  it("formats dollars", () => {
    expect(usd(18954)).toBe("$18,954");
    expect(usd(2062.83)).toBe("$2,062.83");
    expect(usd(1000.5)).toBe("$1,000.50");
  });
});

describe("computeRentSell", () => {
  it("the worked example on /tools/rent-vs-sell-calculator", () => {
    const r = computeRentSell(rentSellExample);
    expect(r.sellNowCash).toBe(122_000); // 400,000 x 93% - 250,000
    expect(r.sellNowFuture).toBe(164_560); // 122,000 x 1.005^60
    expect(r.firstYearMonthlyCashFlow).toBe(-25); // 2,400 x 95% x 91% - 700 - 1,400
    expect(r.futureHomeValue).toBe(463_710); // 400,000 x 1.03^5
    expect(r.futureMortgageBalance).toBe(212_431);
    expect(r.keepSaleCash).toBe(218_819); // 463,710 x 93% - 212,431
    expect(r.keepTotal).toBe(222_632);
    expect(r.difference).toBe(58_072);
    expect(breakEvenAppreciation(rentSellExample)).toBe(0.1);
  });

  it("no mortgage, no growth, no return: keep = sale cash + plain rent sum", () => {
    const r = computeRentSell({
      ...rentSellExample,
      mortgageBalance: 0,
      monthlyPayment: 0,
      appreciationPercent: 0,
      rentGrowthPercent: 0,
      investReturnPercent: 0,
      vacancyPercent: 0,
      managementPercent: 0,
      years: 1,
    });
    expect(r.sellNowFuture).toBe(372_000);
    expect(r.cashFlowTotal).toBe((2_400 - 700) * 12);
    expect(r.keepTotal).toBe(372_000 + 20_400);
  });

  it("stops the payment when the loan is paid off", () => {
    const r = computeRentSell({ ...rentSellExample, mortgageBalance: 1_000, years: 1 });
    expect(r.futureMortgageBalance).toBe(0);
  });

  it("empty input gives zeros, not NaN", () => {
    const r = computeRentSell({} as never);
    expect(r.keepTotal).toBe(0);
    expect(r.sellNowFuture).toBe(0);
  });
});

describe("computeLeadValue", () => {
  it("matches the worked example on the page", () => {
    const r = computeLeadValue(leadValueExample);
    expect(r.revenuePerDoorYear).toBe(2133.84);
    expect(r.lifetimeYears).toBe(5.1);
    expect(r.lifetimeRevenue).toBe(13131);
    expect(r.lifetimeProfit).toBe(3939);
    expect(r.maxCostPerOwner).toBe(1313);
    expect(r.maxCostPerLead).toBe(263);
    expect(r.breakEvenCostPerLead).toBe(788);
    expect(r.doorsLostPerYear).toBe(58.5);
    expect(r.leadsToReplaceChurn).toBe(20.3);
  });

  it("caps the owner lifetime at 20 years when churn is 0", () => {
    const r = computeLeadValue({ ...leadValueExample, churnPercent: 0 });
    expect(r.lifetimeYears).toBe(20);
    expect(r.doorsLostPerYear).toBe(0);
    expect(r.leadsToReplaceChurn).toBe(0);
  });

  it("gives 0, not NaN or Infinity, for empty input", () => {
    const r = computeLeadValue({} as never);
    for (const v of Object.values(r)) expect(Number.isFinite(v)).toBe(true);
    expect(r.maxCostPerLead).toBe(0);
  });
});
