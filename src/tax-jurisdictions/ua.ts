import type { JurisdictionInfo } from "./types";

export const UA_JURISDICTION: JurisdictionInfo = {
  code: "UA",
  name: "Ukraine",
  emoji: "🇺🇦",
  hasStates: false,

  classification: "Virtual Asset (Regulated since 2022)",
  officialGuidanceUrl: "https://tax.gov.ua/",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_uah",
      "description",
      "payer_address",
      "recipient_address",
      "tax_id_ipn",
      "transaction_hash",
    ],
    retentionYears: 4,
    notes: "Business records must be kept for 4 years per tax law",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income",
        description: "Income from crypto business activities",
        taxFormHint: "Corporate/business income tax",
        taxRate: "18% (corporate) or 5% (simplified)",
        notes: "FOP (sole proprietor) can use 5% simplified tax",
      },
      {
        type: "personal_income",
        label: "Other Income",
        description: "Income from crypto trading",
        taxFormHint: "Personal income tax (PIT)",
        taxRate: "18% + 5% military tax (23% total)",
        notes: "Proposed: 18% PIT + 5% military levy on fiat conversion",
      },
      {
        type: "capital_gain",
        label: "Capital Gain",
        description: "Gain from crypto disposal to fiat",
        taxFormHint: "Investment income",
        taxRate: "18% + 5% military tax (first year: 5% preferential)",
        notes: "Proposed: Tax only on fiat conversion or goods purchase, not crypto-to-crypto",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "Gift/inheritance tax",
        taxRate: "5-18% depending on relationship",
        notes: "Gifts from close relatives often exempt",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business payment",
        taxFormHint: "Deductible business expense",
        deductible: true,
        notes: "Must be properly documented",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "Not deductible",
        deductible: false,
        notes: "May trigger capital gains calculation",
      },
      {
        type: "charitable_donation",
        label: "Charitable Donation",
        description: "Donation to registered charity",
        taxFormHint: "Tax deductible",
        deductible: true,
        notes: "Donations to approved organizations deductible",
      },
    ],
  },

  costBasisMethods: ["fifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "No long-term holding period discount. All gains taxed at 19.5%",
  },

  vatGstRules: {
    applicable: true,
    rate: 20,
    cryptoToFiatExempt: true,
    goodsServicesSubject: false,
    notes: "20% VAT. Crypto transactions VAT-exempt per 2022 Virtual Assets Law",
  },

  specialFeatures: [
    "'On Virtual Assets' law passed but pending Tax Code amendments to activate",
    "Proposed tax: 18% PIT + 5% military levy = 23% total on fiat conversions",
    "Crypto-to-crypto swaps proposed as non-taxable events",
    "Stablecoins may be exempt or subject to reduced rate (5-9%)",
    "First-year preferential rate: 5% (vs 18%)",
    "Tax only on fiat off-ramps, not internal crypto activity",
    "NSSMC (National Securities Commission) as primary regulator",
    "4-year record retention requirement",
    "Framework designed to attract digital nomads and developers",
  ],

  lastUpdated: "2025-10-13",
};
