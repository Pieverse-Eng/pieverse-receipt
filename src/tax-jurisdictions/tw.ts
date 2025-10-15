import type { JurisdictionInfo } from "./types";

export const TW_JURISDICTION: JurisdictionInfo = {
  code: "TW",
  name: "Taiwan",
  emoji: "🇹🇼",
  hasStates: false,

  classification: "Virtual Currency/Digital Asset",
  officialGuidanceUrl: "https://www.ntbt.gov.tw/",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_twd",
      "description",
      "payer_address",
      "recipient_address",
      "tax_id_unified_number",
      "transaction_hash",
    ],
    retentionYears: 5,
    notes: "Business records must be kept for 5 years per general tax law",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income",
        description: "Income from crypto trading business",
        taxFormHint: "Business income (Schedule C)",
        taxRate: "5-40% (progressive) + 2.5% supplementary",
        notes: "Frequent traders classified as business",
      },
      {
        type: "personal_income",
        label: "Other Income",
        description: "Income from occasional crypto transactions",
        taxFormHint: "Income from property transactions",
        taxRate: "5-40% (progressive)",
        notes: "Occasional trading may be classified as other income",
      },
      {
        type: "capital_gain",
        label: "Property Transaction Income",
        description: "Gain from crypto disposal",
        taxFormHint: "Property transaction income",
        taxRate: "5-40%",
        notes: "Crypto gains treated as property transaction income",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "Gift tax may apply if >NT$2.44M/year",
        taxRate: "10-20% (gift tax)",
        notes: "Annual gift tax exemption: NT$2.44 million",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business payment",
        taxFormHint: "Deductible business expense",
        deductible: true,
        notes: "Must have proper documentation (uniform invoice)",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "Not deductible",
        deductible: false,
      },
      {
        type: "gift_given",
        label: "Gift Given",
        description: "Crypto given as gift",
        taxFormHint: "Gift tax if >NT$2.44M/year",
        notes: "Donor responsible for gift tax",
      },
    ],
  },

  costBasisMethods: ["fifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "No long-term capital gains discount. All crypto gains taxed as regular income",
  },

  vatGstRules: {
    applicable: true,
    rate: 5,
    cryptoToFiatExempt: true,
    goodsServicesSubject: false,
    notes: "5% VAT. Crypto-to-crypto and crypto-to-fiat exchanges VAT-exempt since 2017",
  },

  specialFeatures: [
    "FSC AML registration mandatory for all VASPs (criminal penalties from Jan 2025)",
    "5% VAT on trading revenue (not on asset transfer itself)",
    "Transactions > NTD 500,000 must be reported by VASPs",
    "Crypto treated as property transaction income (progressive 5-40%)",
    "Gift tax: 10-20% on gifts exceeding NT$2.44M annually",
    "VAT registration required if monthly sales > NT$40,000",
    "Comprehensive crypto law draft expected mid-2025",
    "5-year record retention for tax purposes",
  ],

  lastUpdated: "2025-10-13",
};
