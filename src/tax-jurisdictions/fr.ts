import type { JurisdictionInfo } from "./types";

export const FR_JURISDICTION: JurisdictionInfo = {
  code: "FR",
  name: "France",
  emoji: "🇫🇷",
  hasStates: false,

  classification: "Moveable Asset (Digital Asset)",
  officialGuidanceUrl: "https://www.impots.gouv.fr",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_eur",
      "description",
      "payer_address",
      "recipient_address",
      "tax_number",
      "transaction_hash",
    ],
    retentionYears: 3,
    notes: "Tax records must be kept for 3 years",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Professional Business Income",
        description: "Income from professional crypto trading",
        taxFormHint: "BNC (Non-commercial profits)",
        taxRate: "Up to 45% progressive + social contributions",
        notes: "For frequent professional traders",
      },
      {
        type: "personal_income",
        label: "Occasional Capital Gain",
        description: "Gain from occasional crypto disposal",
        taxFormHint: "Form 2086, Form 2042 C",
        taxRate: "30% flat tax (PFU)",
        reportingThreshold: "€305 annual disposal threshold",
      },
      {
        type: "capital_gain",
        label: "Capital Gain",
        description: "Net gain on crypto disposals",
        taxFormHint: "Form 2086 (detailed), Form 2042 C",
        taxRate: "30% flat (12.8% income + 17.2% social)",
        notes: "Crypto-to-crypto swaps are not taxable (deferred)",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "Gift tax may apply",
        notes: "€100,000 exemption from parents every 15 years",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business payment",
        taxFormHint: "Deductible expense",
        deductible: true,
        notes: "Must calculate capital gain if crypto-to-fiat/service",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase with crypto",
        taxFormHint: "Form 2086 if disposal",
        deductible: false,
        notes: "Triggers capital gains if crypto sold for fiat or services",
      },
      {
        type: "capital_loss",
        label: "Capital Loss",
        description: "Loss on disposal",
        taxFormHint: "Can offset gains in same year + carry forward 10 years",
        notes: "Losses can offset gains",
      },
      {
        type: "gift_given",
        label: "Gift Given",
        description: "Crypto given as gift",
        taxFormHint: "No capital gains event",
        notes: "Basis transfers to recipient",
      },
    ],
  },

  costBasisMethods: ["average_cost"],
  defaultCostBasisMethod: "average_cost",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "Flat 30% tax (PFU) regardless of holding period. No long-term discount",
  },

  vatGstRules: {
    applicable: true,
    rate: 20,
    cryptoToFiatExempt: true,
    goodsServicesSubject: true,
    notes: "No VAT on crypto-to-fiat exchange. 20% VAT on goods/services",
  },

  specialFeatures: [
    "Flat 30% tax (Prélèvement Forfaitaire Unique - PFU)",
    "Crypto-to-crypto swaps are NOT taxable (deferred until cash-out)",
    "€305 annual disposal exemption",
    "Portfolio-wide gain/loss calculation",
    "Must declare foreign crypto accounts (Form 3916-bis)",
    "Losses can be carried forward 10 years",
  ],

  lastUpdated: "2024-10-04",
};
