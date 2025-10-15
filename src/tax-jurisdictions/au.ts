import type { JurisdictionInfo, StateOption } from "./types";

export const AU_STATES: StateOption[] = [
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "WA", name: "Western Australia" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT", name: "Northern Territory" },
];

export const AU_JURISDICTION: JurisdictionInfo = {
  code: "AU",
  name: "Australia",
  emoji: "🇦🇺",
  hasStates: true,

  classification: "Property/CGT Asset (ATO)",
  officialGuidanceUrl:
    "https://www.ato.gov.au/individuals-and-families/investments-and-assets/crypto-asset-investments",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_aud",
      "description",
      "payer_address",
      "recipient_address",
      "tax_number",
      "transaction_hash",
    ],
    retentionYears: 5,
    notes: "ATO requires records kept for 5 years",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income",
        description: "Income from crypto trading business",
        taxFormHint: "Business tax return, ordinary income",
        taxRate: "0-45% (progressive)",
        notes: "No CGT discount available for business traders",
      },
      {
        type: "personal_income",
        label: "Capital Gain (Personal)",
        description: "Gain from personal investment",
        taxFormHint: "Individual tax return, CGT schedule",
        taxRate: "0-45% (50% discount if held >12 months)",
      },
      {
        type: "capital_gain",
        label: "Capital Gain",
        description: "CGT event from disposal",
        taxFormHint: "myTax CGT schedule",
        taxRate: "0-45%, 50% discount available",
        notes: "50% CGT discount if held >12 months as individual",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "No immediate CGT",
        notes: "Recipient inherits donor's cost base",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Ordinary business expense",
        taxFormHint: "Deductible business expense",
        deductible: true,
        notes: "Must calculate CGT on crypto disposal",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal use",
        taxFormHint: "CGT calculation required",
        deductible: false,
        notes: "Exempt if personal use asset <$10,000 AUD",
      },
      {
        type: "capital_loss",
        label: "Capital Loss",
        description: "Loss on disposal",
        taxFormHint: "Can offset capital gains",
        notes: "Losses can be carried forward indefinitely",
      },
      {
        type: "gift_given",
        label: "Gift Given",
        description: "Crypto given as gift",
        taxFormHint: "CGT event at market value",
        notes: "Triggers CGT unless to spouse",
      },
      {
        type: "charitable_donation",
        label: "Charitable Donation",
        description: "Donation to DGR charity",
        taxFormHint: "Deductible, may trigger CGT",
        deductible: true,
      },
    ],
  },

  costBasisMethods: ["fifo", "lifo", "hifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: true,
    longTermThresholdDays: 365,
    longTermRate: "50% discount (individuals only)",
    shortTermRate: "Full rate 0-45%",
    notes: "50% CGT discount for individuals if held >12 months. No discount for businesses",
  },

  vatGstRules: {
    applicable: false,
    cryptoToFiatExempt: true,
    goodsServicesSubject: false,
    notes:
      "GST does not apply to crypto transactions (treated as financial supply). ABN registration required for business",
  },

  specialFeatures: [
    "50% CGT discount for individuals (>12 months holding)",
    "Personal use exemption if <$10,000 AUD",
    "FIFO, LIFO, or HIFO methods permitted",
    "No CGT discount for business traders",
    "5 year record retention requirement",
    "ABN required for business activities",
  ],

  lastUpdated: "2024-10-04",
};
