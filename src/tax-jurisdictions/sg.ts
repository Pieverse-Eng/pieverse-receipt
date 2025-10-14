import type { JurisdictionInfo } from "./types";

export const SG_JURISDICTION: JurisdictionInfo = {
  code: "SG",
  name: "Singapore",
  emoji: "🇸🇬",
  hasStates: false,

  classification: "Digital Payment Token (IRAS)",
  officialGuidanceUrl:
    "https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/specific-business-sectors/digital-payment-tokens",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_sgd",
      "description",
      "payer_address",
      "recipient_address",
      "tax_number",
      "transaction_hash",
    ],
    retentionYears: 5,
    notes: "Business records must be kept for 5 years",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income",
        description: "Revenue from crypto trading business",
        taxFormHint: "Form C (Corporate) or Form B/B1 (Individual)",
        taxRate: "0-22% (progressive for individuals)",
      },
      {
        type: "personal_income",
        label: "Personal Investment Income",
        description: "Capital gains from personal investment",
        taxFormHint: "Not taxable if held as investment",
        taxRate: "0%",
        notes: "Singapore has no capital gains tax",
      },
      {
        type: "capital_gain",
        label: "Capital Gain (Trading)",
        description: "Gains from frequent trading (business activity)",
        taxFormHint: "Form C/B - Revenue nature",
        taxRate: "0-22%",
        notes: "Only taxable if deemed to be trading/business",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "Generally not taxable",
        taxRate: "0%",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Expense paid with crypto",
        taxFormHint: "Deductible if revenue nature",
        deductible: true,
        notes: "No capital gains tax on disposal",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "No tax implications",
        deductible: false,
        notes: "No capital gains tax in Singapore",
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
    notes: "No capital gains tax for investors. Business traders use ordinary income rates",
  },

  vatGstRules: {
    applicable: true,
    rate: 9,
    cryptoToFiatExempt: true,
    goodsServicesSubject: false,
    notes: "GST exempt for digital payment tokens since Jan 2020. 9% GST on transaction fees only",
  },

  specialFeatures: [
    "No capital gains tax for personal investors",
    "Business vs. investment distinction is critical",
    "MAS licensing required for crypto service providers",
    "CARF reporting framework from 2026",
    "Territorial tax system - foreign income may be exempt",
  ],

  lastUpdated: "2024-10-04",
};
