import type { JurisdictionInfo } from "./types";

export const JP_JURISDICTION: JurisdictionInfo = {
  code: "JP",
  name: "Japan",
  emoji: "🇯🇵",
  hasStates: false,

  classification: "Property (Miscellaneous Income)",
  officialGuidanceUrl: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1521.htm",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_jpy",
      "description",
      "payer_address",
      "recipient_address",
      "tax_number",
      "transaction_hash",
    ],
    retentionYears: 7,
    notes: "Business records must be kept for 7 years",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income",
        description: "Income from crypto business",
        taxFormHint: "Business income tax return",
        taxRate: "15-55% (5-45% income + 10% municipal)",
        notes: "All business income fully taxable",
      },
      {
        type: "personal_income",
        label: "Miscellaneous Income",
        description: "Crypto gains as miscellaneous income",
        taxFormHint: "Form A or Form B",
        taxRate: "15-55% (5-45% income + 10% municipal)",
        reportingThreshold: "¥200,000 annual crypto income",
      },
      {
        type: "capital_gain",
        label: "Crypto Disposal Gain",
        description: "All crypto disposals treated as miscellaneous income",
        taxFormHint: "Tax return (miscellaneous income)",
        taxRate: "15-55%",
        notes: "No long-term discount; all gains taxed as ordinary income",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "Gift tax may apply",
        notes: "Annual gift exemption: ¥1,100,000",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business payment with crypto",
        taxFormHint: "Deductible business expense",
        deductible: true,
        notes: "Must calculate gain/loss as miscellaneous income",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "Miscellaneous income calculation",
        deductible: false,
        notes: "Must report gain/loss as miscellaneous income",
      },
      {
        type: "capital_loss",
        label: "Crypto Disposal Loss",
        description: "Loss on crypto disposal",
        taxFormHint: "Can only offset miscellaneous income in same year",
        notes: "Cannot carry forward losses or offset other income types",
      },
      {
        type: "gift_given",
        label: "Gift Given",
        description: "Crypto given as gift",
        taxFormHint: "Gift tax applies to recipient",
        notes: "Deemed disposition at market value",
      },
    ],
  },

  costBasisMethods: ["average_cost", "fifo"],
  defaultCostBasisMethod: "average_cost",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "No holding period discount. All gains taxed at ordinary income rates up to 55%",
  },

  vatGstRules: {
    applicable: true,
    rate: 10,
    cryptoToFiatExempt: true,
    goodsServicesSubject: true,
    notes: "10% consumption tax exempt for crypto transfers. Applies to goods/services",
  },

  specialFeatures: [
    "Harshest crypto tax regime - up to 55% top rate",
    "All gains treated as miscellaneous income (not capital gains)",
    "No long-term holding discount",
    "Losses cannot be carried forward",
    "Losses can only offset other miscellaneous income in same year",
    "Moving Average Method (MAM) or Total Average Method (TAM)",
    "JFSA licensing for exchanges",
  ],

  lastUpdated: "2024-10-04",
};
