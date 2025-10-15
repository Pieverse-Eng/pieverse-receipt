import type { JurisdictionInfo } from "./types";

export const CH_JURISDICTION: JurisdictionInfo = {
  code: "CH",
  name: "Switzerland",
  emoji: "🇨🇭",
  hasStates: false,

  classification: "Private Asset (Moveable Property)",
  officialGuidanceUrl:
    "https://www.estv.admin.ch/estv/en/home/allgemein/steuererklaerung/merkblaetter/merkblatt-kryptowaehrungen.html",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_chf",
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
        label: "Professional Trading Income",
        description: "Income from professional crypto trading",
        taxFormHint: "Self-employment income",
        taxRate: "Progressive (cantonal + federal)",
        notes: "Subject to income tax + social security if classified as professional trader",
      },
      {
        type: "personal_income",
        label: "Private Investment",
        description: "Capital gains from private investment",
        taxFormHint: "Tax-free for private investors",
        taxRate: "0% (wealth tax only)",
        notes: "Swiss private investors do not pay capital gains tax",
      },
      {
        type: "capital_gain",
        label: "Capital Gain (Private)",
        description: "Gain from private crypto disposal",
        taxFormHint: "Tax-free",
        taxRate: "0%",
        notes: "Tax-free for private investors. Wealth tax applies to holdings",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "Gift tax may apply (cantonal)",
        notes: "Gift tax varies by canton",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business payment",
        taxFormHint: "Deductible expense",
        deductible: true,
        notes: "No capital gains for private investors",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "No tax implications for private investors",
        deductible: false,
        notes: "Tax-free disposal for private investors",
      },
      {
        type: "gift_given",
        label: "Gift Given",
        description: "Crypto given as gift",
        taxFormHint: "No capital gains; gift tax varies by canton",
        notes: "No capital gains tax on gift",
      },
    ],
  },

  costBasisMethods: ["fifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: false,
    notes:
      "No capital gains tax for private investors regardless of holding period. Professional traders taxed as income",
  },

  vatGstRules: {
    applicable: true,
    rate: 8.1,
    cryptoToFiatExempt: true,
    goodsServicesSubject: true,
    notes: "No VAT on crypto transactions. 8.1% VAT on goods/services",
  },

  specialFeatures: [
    "No capital gains tax for private investors (wealth tax only)",
    "Professional trader classification is strict (FTA criteria)",
    "Wealth tax on Dec 31 holdings (0.3-1% depending on canton)",
    "Must declare crypto on annual tax return for wealth tax",
    "Professional trader if: <6 month holding, >5x turnover, leverage used",
    "FINMA regulation for crypto service providers",
    "Cantonal tax variations apply",
  ],

  lastUpdated: "2024-10-04",
};
