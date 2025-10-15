import type { JurisdictionInfo } from "./types";

export const VN_JURISDICTION: JurisdictionInfo = {
  code: "VN",
  name: "Vietnam",
  emoji: "🇻🇳",
  hasStates: false,

  classification: "Crypto Asset (Property per Civil Code)",
  officialGuidanceUrl: "https://mof.gov.vn/",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_vnd",
      "description",
      "payer_address",
      "recipient_address",
      "tax_number",
      "transaction_hash",
    ],
    retentionYears: 10,
    notes: "Business records must be kept for 10 years",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income",
        description: "Income from crypto-related business",
        taxFormHint: "Corporate Income Tax (CIT) - Form 03/TNDN",
        taxRate: "20% (corporate)",
        notes: "Crypto not legal payment method but can be business asset",
      },
      {
        type: "personal_income",
        label: "Capital Gains/Other Income",
        description: "Income from crypto trading",
        taxFormHint: "Personal Income Tax (PIT) - Schedule 2/04-QTT-TNCN",
        taxRate: "0.1% flat on gross transaction value (pilot)",
        notes: "Interim 0.1% flat tax on gross value until dedicated regime (Resolution 05/2025)",
      },
      {
        type: "capital_gain",
        label: "Capital Transfer",
        description: "Gain from crypto disposal",
        taxFormHint: "Taxed as securities transaction",
        taxRate: "0.1% on gross value",
        notes: "Flat 0.1% tax on gross transfer value, no deductions for losses",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "PIT on gifts >VND 10M",
        taxRate: "10%",
        notes: "Gifts exceeding VND 10 million subject to 10% tax",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business payment",
        taxFormHint: "Deductible expense",
        deductible: true,
        notes: "Must be properly documented with invoices",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "Not deductible",
        deductible: false,
      },
      {
        type: "charitable_donation",
        label: "Charitable Donation",
        description: "Donation to registered charity",
        taxFormHint: "May be deductible",
        deductible: true,
        notes: "Only to approved organizations",
      },
    ],
  },

  costBasisMethods: ["fifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "No specific holding period discounts for cryptocurrency",
  },

  vatGstRules: {
    applicable: true,
    rate: 10,
    cryptoToFiatExempt: true,
    goodsServicesSubject: false,
    notes: "No VAT on crypto asset transfers (treated as securities). 10% VAT may apply to platform services",
  },

  specialFeatures: [
    "Law on Digital Technology Industry (Jan 2026) recognizes crypto as property",
    "Resolution 05/2025/NQ-CP: 5-year pilot program for regulated market",
    "Interim 0.1% flat tax on gross transaction value (like securities)",
    "VND 10 trillion minimum capital for licensed exchanges",
    "All transactions must be in VND on licensed domestic platforms",
    "6-month grace period after first VASP licensed, then foreign platforms illegal",
    "49% cap on foreign ownership of exchanges",
    "10-year record retention requirement",
    "Transaction-based tax eliminates need for cost-basis tracking",
  ],

  lastUpdated: "2025-10-13",
};
