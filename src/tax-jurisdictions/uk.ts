import type { JurisdictionInfo } from "./types";

export const UK_JURISDICTION: JurisdictionInfo = {
  code: "UK",
  name: "United Kingdom",
  emoji: "🇬🇧",
  hasStates: false,

  classification: "Cryptoasset/Property (HMRC guidance)",
  officialGuidanceUrl: "https://www.gov.uk/government/collections/cryptoassets",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_gbp",
      "description",
      "payer_address",
      "recipient_address",
      "vat_number",
      "transaction_hash",
    ],
    retentionYears: 20,
    notes: "HMRC requires digital records kept for 20 years",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Trading Income",
        description: "Income from frequent trading activities",
        taxFormHint: "Self Assessment, Trading Income",
        taxRate: "20-45%",
      },
      {
        type: "personal_income",
        label: "Miscellaneous Income",
        description: "Occasional crypto income (airdrops, staking)",
        taxFormHint: "Self Assessment, Miscellaneous Income",
        taxRate: "20-45%",
        reportingThreshold: "£1,000 allowance",
      },
      {
        type: "capital_gain",
        label: "Capital Gain",
        description: "Disposal of crypto assets",
        taxFormHint: "SA108 Capital Gains Summary",
        taxRate: "18-24%",
        reportingThreshold: "£3,000 CGT allowance (2024/25)",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as a gift",
        taxFormHint: "No immediate tax; basis transfers",
        notes: "CGT due when disposed of later",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Wholly and exclusively for business",
        taxFormHint: "Trading expenses deductible",
        deductible: true,
        notes: "Must also calculate CGT on crypto disposal",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "SA108 for CGT calculation",
        deductible: false,
      },
      {
        type: "capital_loss",
        label: "Capital Loss",
        description: "Loss on disposal",
        taxFormHint: "SA108, can offset gains",
        notes: "Losses can be carried forward indefinitely",
      },
      {
        type: "gift_given",
        label: "Gift Given",
        description: "Crypto given as gift",
        taxFormHint: "May trigger CGT at market value",
        notes: 'Gifts to spouse are "no gain/no loss"',
      },
      {
        type: "charitable_donation",
        label: "Charitable Donation",
        description: "Donation to registered charity",
        taxFormHint: "No CGT on donation, income tax relief available",
        deductible: true,
      },
    ],
  },

  costBasisMethods: ["pooling"],
  defaultCostBasisMethod: "pooling",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "No long-term discount. All gains taxed at 18% (basic rate) or 24% (higher rate)",
  },

  vatGstRules: {
    applicable: true,
    rate: 20,
    cryptoToFiatExempt: true,
    goodsServicesSubject: true,
    notes: "Crypto-to-fiat exchange is exempt. VAT applies to underlying goods/services",
  },

  specialFeatures: [
    "Mandatory share pooling with same-day and 30-day matching rules",
    "£3,000 annual CGT exemption (2024/25)",
    "20 year record retention requirement",
    "Bed and breakfasting rule (30 days)",
    "VAT registration threshold: £90,000",
  ],

  lastUpdated: "2024-10-04",
};
