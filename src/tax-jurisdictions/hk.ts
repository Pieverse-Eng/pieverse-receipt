import type { JurisdictionInfo } from "./types";

export const HK_JURISDICTION: JurisdictionInfo = {
  code: "HK",
  name: "Hong Kong",
  emoji: "🇭🇰",
  hasStates: false,

  classification: "Virtual Asset",
  officialGuidanceUrl: "https://www.ird.gov.hk",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_hkd",
      "description",
      "payer_address",
      "recipient_address",
      "transaction_hash",
    ],
    retentionYears: 7,
    notes: "Business records must be kept for 7 years",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Trading Business Income",
        description: "Profits from crypto trading business",
        taxFormHint: "Profits Tax Return",
        taxRate: "16.5% (corporate), 15% (unincorporated)",
        notes: "First HK$2M taxed at 8.25%/7.5% (two-tiered system)",
      },
      {
        type: "personal_income",
        label: "Personal Investment",
        description: "Capital gains from personal investment",
        taxFormHint: "Not taxable",
        taxRate: "0%",
        notes: "Hong Kong has no capital gains tax",
      },
      {
        type: "capital_gain",
        label: "Capital Gain (Investment)",
        description: "Gain from long-term investment",
        taxFormHint: "Tax-free if investment",
        taxRate: "0%",
        notes: "Only taxable if deemed trading/business activity",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "Not taxable",
        taxRate: "0%",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business payment",
        taxFormHint: "Deductible if business purpose",
        deductible: true,
        notes: "No capital gains tax on disposal",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "No tax implications",
        deductible: false,
        notes: "No capital gains tax in Hong Kong",
      },
      {
        type: "gift_given",
        label: "Gift Given",
        description: "Crypto given as gift",
        taxFormHint: "No tax implications",
        notes: "No gift tax or capital gains tax",
      },
    ],
  },

  costBasisMethods: ["fifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "No capital gains tax for investors. Business traders taxed at profits tax rates",
  },

  vatGstRules: {
    applicable: false,
    cryptoToFiatExempt: true,
    goodsServicesSubject: false,
    notes: "Hong Kong has no VAT/GST system",
  },

  specialFeatures: [
    "No capital gains tax for personal investors",
    'Business vs. investment determined by "badges of trade" test',
    "Territorial tax system - only HK-sourced income taxed",
    "Two-tiered profits tax (first HK$2M at reduced rate)",
    "VASP licensing regime since June 2023",
    "No VAT/GST system",
    "Foreign-sourced crypto gains generally exempt",
  ],

  lastUpdated: "2024-10-04",
};
