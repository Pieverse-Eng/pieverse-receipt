import type { JurisdictionInfo, StateOption } from "./types";

export const CA_PROVINCES: StateOption[] = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon" },
];

export const CA_JURISDICTION: JurisdictionInfo = {
  code: "CA",
  name: "Canada",
  emoji: "🇨🇦",
  hasStates: true,

  classification: "Commodity/Capital Property (CRA)",
  officialGuidanceUrl:
    "https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/compliance/cryptocurrency-guide.html",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_cad",
      "description",
      "payer_address",
      "recipient_address",
      "tax_number",
      "transaction_hash",
    ],
    retentionYears: 6,
    notes: "CRA requires records kept for 6 years minimum",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income",
        description: "Income from business activities",
        taxFormHint: "T2125 Statement of Business Activities",
        taxRate: "100% taxable at marginal rate (15-33% federal + provincial)",
        notes: "Full income, not capital gains treatment",
      },
      {
        type: "personal_income",
        label: "Capital Gain (Personal)",
        description: "Gain from personal investment disposal",
        taxFormHint: "Schedule 3 (T1)",
        taxRate: "50% inclusion rate at marginal rate",
        notes: "Only 50% of gain is taxable",
      },
      {
        type: "capital_gain",
        label: "Capital Gain",
        description: "Gain on disposal of capital property",
        taxFormHint: "Schedule 3",
        taxRate: "50% of gain taxed at 15-33% federal + provincial",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "No immediate tax; basis transfers",
        notes: "Recipient inherits donor's cost basis",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Reasonable business expense",
        taxFormHint: "T2125 expense deduction",
        deductible: true,
        notes: "Must also calculate capital gain/loss on disposal",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "Schedule 3 for capital gain/loss",
        deductible: false,
      },
      {
        type: "capital_loss",
        label: "Capital Loss",
        description: "Loss on disposal",
        taxFormHint: "Schedule 3",
        notes: "Can only offset capital gains. Superficial loss rules apply (30 days)",
      },
      {
        type: "gift_given",
        label: "Gift Given",
        description: "Crypto given as gift",
        taxFormHint: "Deemed disposition at FMV",
        notes: "Triggers capital gain/loss at market value",
      },
      {
        type: "charitable_donation",
        label: "Charitable Donation",
        description: "Donation to registered charity",
        taxFormHint: "Capital gain exempt + tax credit available",
        deductible: true,
        notes: "No capital gains tax + donation tax credit",
      },
    ],
  },

  costBasisMethods: ["acb"],
  defaultCostBasisMethod: "acb",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "50% inclusion rate for capital gains regardless of holding period. Business income is 100% taxable",
  },

  vatGstRules: {
    applicable: true,
    rate: 5,
    cryptoToFiatExempt: true,
    goodsServicesSubject: true,
    notes:
      "Virtual payment instruments are GST/HST exempt. Goods/services subject to 5-15% GST/HST. Registration required if revenue >$30,000",
  },

  specialFeatures: [
    "Mandatory Adjusted Cost Base (ACB) averaging method",
    "50% capital gains inclusion rate (50% of gain is taxable)",
    "Superficial loss rule - 30 day restriction",
    "Business vs. investment distinction critical",
    "GST/HST exempt for crypto since 2023",
    "CARF implementation expected 2026",
  ],

  lastUpdated: "2024-10-04",
};
