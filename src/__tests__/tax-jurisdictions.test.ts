import { describe, it, expect } from "vitest";
import {
  TAX_JURISDICTIONS,
  JURISDICTION_MAP,
  getJurisdiction,
  getJurisdictionsWithStates,
  getNoCapitalGainsTaxJurisdictions,
  getHoldingPeriodDiscountJurisdictions,
  getVATGSTJurisdictions,
  formatJurisdictionName,
  getJurisdictionOptions,
  getStatesForJurisdiction,
  US_STATES,
  CA_PROVINCES,
  AU_STATES,
} from "../tax-jurisdictions";

describe("Tax Jurisdictions", () => {
  describe("TAX_JURISDICTIONS", () => {
    it("should have 18 jurisdictions", () => {
      expect(TAX_JURISDICTIONS).toHaveLength(18);
    });

    it("should have required fields for each jurisdiction", () => {
      TAX_JURISDICTIONS.forEach((jurisdiction) => {
        expect(jurisdiction).toHaveProperty("code");
        expect(jurisdiction).toHaveProperty("name");
        expect(jurisdiction).toHaveProperty("emoji");
        expect(jurisdiction).toHaveProperty("classification");
        expect(jurisdiction).toHaveProperty("receiptRequirements");
        expect(jurisdiction).toHaveProperty("transactionTypes");
        expect(jurisdiction).toHaveProperty("costBasisMethods");
        expect(jurisdiction).toHaveProperty("holdingPeriodRules");
        expect(jurisdiction).toHaveProperty("vatGstRules");
      });
    });
  });

  describe("JURISDICTION_MAP", () => {
    it("should have all jurisdiction codes", () => {
      const codes = [
        "US",
        "UK",
        "SG",
        "CA",
        "AU",
        "DE",
        "JP",
        "FR",
        "HK",
        "CH",
        "BD",
        "VN",
        "PK",
        "TW",
        "UA",
        "IN",
        "ID",
        "KR",
      ];
      codes.forEach((code) => {
        expect(JURISDICTION_MAP[code as keyof typeof JURISDICTION_MAP]).toBeDefined();
      });
    });
  });

  describe("getJurisdiction", () => {
    it("should return correct jurisdiction for valid code", () => {
      const us = getJurisdiction("US");
      expect(us?.name).toBe("United States");
      expect(us?.code).toBe("US");
    });

    it("should return undefined for invalid code", () => {
      const invalid = getJurisdiction("XX" as any);
      expect(invalid).toBeUndefined();
    });
  });

  describe("getJurisdictionsWithStates", () => {
    it("should return jurisdictions with states", () => {
      const withStates = getJurisdictionsWithStates();
      expect(withStates.length).toBeGreaterThan(0);
      withStates.forEach((j) => {
        expect(j.hasStates).toBe(true);
      });
    });

    it("should include US, CA, AU", () => {
      const withStates = getJurisdictionsWithStates();
      const codes = withStates.map((j) => j.code);
      expect(codes).toContain("US");
      expect(codes).toContain("CA");
      expect(codes).toContain("AU");
    });
  });

  describe("getNoCapitalGainsTaxJurisdictions", () => {
    it("should return jurisdictions with no capital gains tax", () => {
      const noCapGains = getNoCapitalGainsTaxJurisdictions();
      expect(noCapGains.length).toBeGreaterThan(0);
    });

    it("should include Singapore", () => {
      const noCapGains = getNoCapitalGainsTaxJurisdictions();
      const codes = noCapGains.map((j) => j.code);
      expect(codes).toContain("SG");
    });
  });

  describe("getHoldingPeriodDiscountJurisdictions", () => {
    it("should return jurisdictions with holding period discounts", () => {
      const withDiscounts = getHoldingPeriodDiscountJurisdictions();
      expect(withDiscounts.length).toBeGreaterThan(0);
      withDiscounts.forEach((j) => {
        expect(j.holdingPeriodRules.hasDiscount).toBe(true);
      });
    });

    it("should include US", () => {
      const withDiscounts = getHoldingPeriodDiscountJurisdictions();
      const codes = withDiscounts.map((j) => j.code);
      expect(codes).toContain("US");
    });
  });

  describe("getVATGSTJurisdictions", () => {
    it("should return jurisdictions with VAT/GST", () => {
      const withVAT = getVATGSTJurisdictions();
      expect(withVAT.length).toBeGreaterThan(0);
      withVAT.forEach((j) => {
        expect(j.vatGstRules.applicable).toBe(true);
      });
    });

    it("should include UK and SG", () => {
      const withVAT = getVATGSTJurisdictions();
      const codes = withVAT.map((j) => j.code);
      expect(codes).toContain("UK");
      expect(codes).toContain("SG");
    });
  });

  describe("formatJurisdictionName", () => {
    it("should format jurisdiction name with emoji", () => {
      const us = getJurisdiction("US")!;
      const formatted = formatJurisdictionName(us);
      expect(formatted).toContain("🇺🇸");
      expect(formatted).toContain("United States");
    });
  });

  describe("getJurisdictionOptions", () => {
    it("should return array of options", () => {
      const options = getJurisdictionOptions();
      expect(options.length).toBe(18);
      options.forEach((option) => {
        expect(option).toHaveProperty("value");
        expect(option).toHaveProperty("label");
      });
    });

    it("should have correct structure", () => {
      const options = getJurisdictionOptions();
      const usOption = options.find((o) => o.value === "US");
      expect(usOption).toBeDefined();
      expect(usOption?.label).toContain("🇺🇸");
      expect(usOption?.label).toContain("United States");
    });
  });

  describe("getStatesForJurisdiction", () => {
    it("should return US states for US", () => {
      const states = getStatesForJurisdiction("US");
      expect(states).toEqual(US_STATES);
      expect(states.length).toBe(51); // 50 states + DC
    });

    it("should return CA provinces for CA", () => {
      const provinces = getStatesForJurisdiction("CA");
      expect(provinces).toEqual(CA_PROVINCES);
    });

    it("should return AU states for AU", () => {
      const states = getStatesForJurisdiction("AU");
      expect(states).toEqual(AU_STATES);
    });

    it("should return empty array for jurisdictions without states", () => {
      const states = getStatesForJurisdiction("UK");
      expect(states).toEqual([]);
    });
  });

  describe("Transaction Types", () => {
    it("should have recipient transaction types", () => {
      const us = getJurisdiction("US")!;
      expect(us.transactionTypes.recipient.length).toBeGreaterThan(0);
      us.transactionTypes.recipient.forEach((t) => {
        expect(t).toHaveProperty("type");
        expect(t).toHaveProperty("label");
        expect(t).toHaveProperty("description");
        expect(t).toHaveProperty("taxFormHint");
      });
    });

    it("should have payer transaction types", () => {
      const us = getJurisdiction("US")!;
      expect(us.transactionTypes.payer.length).toBeGreaterThan(0);
      us.transactionTypes.payer.forEach((t) => {
        expect(t).toHaveProperty("type");
        expect(t).toHaveProperty("label");
        expect(t).toHaveProperty("description");
        expect(t).toHaveProperty("taxFormHint");
      });
    });
  });

  describe("Cost Basis Methods", () => {
    it("should have valid cost basis methods", () => {
      const us = getJurisdiction("US")!;
      expect(us.costBasisMethods.length).toBeGreaterThan(0);
      expect(["specific_id", "fifo", "lifo", "hifo", "average_cost", "pooling", "acb"]).toContain(
        us.costBasisMethods[0],
      );
    });

    it("should have default cost basis method", () => {
      const us = getJurisdiction("US")!;
      expect(us.defaultCostBasisMethod).toBeDefined();
      expect(us.costBasisMethods).toContain(us.defaultCostBasisMethod);
    });
  });

  describe("Receipt Requirements", () => {
    it("should have mandatory fields", () => {
      TAX_JURISDICTIONS.forEach((j) => {
        expect(j.receiptRequirements.mandatoryFields).toBeDefined();
        expect(Array.isArray(j.receiptRequirements.mandatoryFields)).toBe(true);
        expect(j.receiptRequirements.mandatoryFields.length).toBeGreaterThan(0);
      });
    });

    it("should have retention years", () => {
      TAX_JURISDICTIONS.forEach((j) => {
        expect(j.receiptRequirements.retentionYears).toBeDefined();
        expect(typeof j.receiptRequirements.retentionYears).toBe("number");
        expect(j.receiptRequirements.retentionYears).toBeGreaterThan(0);
      });
    });
  });
});
