import type { JurisdictionInfo } from "./types";

export const BD_JURISDICTION: JurisdictionInfo = {
  code: "BD",
  name: "Bangladesh",
  emoji: "🇧🇩",
  hasStates: false,

  classification: "Digital Asset (Restricted)",
  officialGuidanceUrl: "https://www.bb.org.bd/",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_bdt",
      "description",
      "payer_address",
      "recipient_address",
      "tax_id_tin",
      "transaction_hash",
    ],
    retentionYears: 6,
    notes:
      "Business records must be kept for 6 years. Crypto transactions officially prohibited by Bangladesh Bank but subject to taxation by NBR",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business/Freelance Income",
        description: "Income from international services paid in crypto",
        taxFormHint: "Income Tax Return (IT-11GA)",
        taxRate: "0-25% (progressive)",
        notes: "Report if received from abroad and converted to BDT",
      },
      {
        type: "personal_income",
        label: "Other Income",
        description: "Miscellaneous income in cryptocurrency",
        taxFormHint: "Income from other sources",
        taxRate: "0-25%",
        notes: "Crypto trading is officially restricted but may be reported as other income",
      },
      {
        type: "capital_gain",
        label: "Capital Gain",
        description: "Gain from crypto disposal",
        taxFormHint: "Capital Gains section",
        taxRate: "15%",
        notes: "Capital gains tax may apply if legality clarified",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "International business payment",
        taxFormHint: "Business expense",
        deductible: true,
        notes: "May be deductible if properly documented",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "Not deductible",
        deductible: false,
      },
    ],
  },

  costBasisMethods: ["fifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "No specific holding period benefits for cryptocurrency",
  },

  vatGstRules: {
    applicable: true,
    rate: 15,
    cryptoToFiatExempt: false,
    goodsServicesSubject: true,
    notes: "15% VAT may apply. Crypto legal status unclear - officially restricted by Bangladesh Bank",
  },

  specialFeatures: [
    "Cryptocurrency officially illegal under Foreign Exchange Regulation Act 1947",
    "Bangladesh Bank prohibits all crypto transactions (warnings since 2014)",
    "Paradox: NBR asserts right to tax crypto profits despite illegality",
    "Violations subject to Money Laundering Prevention Act 2012 penalties",
    "15% capital gains tax may apply if legality clarified",
    "15% VAT potentially applicable but enforcement unclear",
    "6-year record retention for tax purposes",
    "High legal risk environment - consulting tax professional critical",
  ],

  lastUpdated: "2025-10-13",
};
