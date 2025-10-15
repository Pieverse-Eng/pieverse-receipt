import type { JurisdictionInfo } from "./types";

export const DE_JURISDICTION: JurisdictionInfo = {
  code: "DE",
  name: "Germany",
  emoji: "🇩🇪",
  hasStates: false,

  classification: "Private Money/Asset (§23 EStG)",
  officialGuidanceUrl:
    "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Einkommensteuer/2025-03-06-einzelfragen-kryptowerte.pdf",

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
      "acquisition_date",
    ],
    retentionYears: 10,
    notes: "German tax law requires business records kept for 10 years. Holding period is critical",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income",
        description: "Commercial income from crypto business",
        taxFormHint: "ESt1A, Commercial income",
        taxRate: "0-45% + 5.5% solidarity surcharge",
        notes: "No 1-year exemption for businesses",
      },
      {
        type: "personal_income",
        label: "Private Income (>1 year held)",
        description: "Disposal of privately held crypto",
        taxFormHint: "ESt1A, Other income",
        taxRate: "0% if held >1 year, else 0-45%",
        reportingThreshold: "€1,000 exemption for short-term gains",
      },
      {
        type: "capital_gain",
        label: "Capital Gain (Short-term)",
        description: "Gain on crypto held ≤1 year",
        taxFormHint: "Private sales transaction (§23 EStG)",
        taxRate: "0-45% + solidarity",
        reportingThreshold: "€1,000 annual exemption",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "Gift tax may apply if over threshold",
        notes: "€20,000 exemption from parents, €500,000 from spouse",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business-related payment",
        taxFormHint: "Deductible business expense",
        deductible: true,
        notes: "Must calculate gain/loss on disposal",
      },
      {
        type: "personal_expense",
        label: "Personal Expense (>1 year held)",
        description: "Personal purchase",
        taxFormHint: "Tax-free if held >1 year",
        deductible: false,
        notes: "Tax-free disposal if crypto held >1 year!",
      },
      {
        type: "capital_loss",
        label: "Capital Loss (Short-term)",
        description: "Loss on crypto held ≤1 year",
        taxFormHint: "Can offset short-term gains only",
        notes: "Losses only offset other private sales gains",
      },
      {
        type: "gift_given",
        label: "Gift Given",
        description: "Crypto given as gift",
        taxFormHint: "Gift tax may apply",
        notes: "No capital gains on gift transfer",
      },
    ],
  },

  costBasisMethods: ["fifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: true,
    taxFreeThresholdDays: 365,
    longTermRate: "0% (tax-free)",
    shortTermRate: "0-45% + 5.5% solidarity",
    notes: "100% TAX-FREE if held >1 year! Critical to track acquisition dates. €1,000 exemption for short-term gains",
  },

  vatGstRules: {
    applicable: true,
    rate: 19,
    cryptoToFiatExempt: true,
    goodsServicesSubject: true,
    notes: "No VAT on crypto-to-fiat exchange. 19% VAT on goods/services. BaFin licensing for crypto service providers",
  },

  specialFeatures: [
    "100% tax-free if held over 1 year (private investors)",
    "€1,000 annual exemption for short-term gains",
    "FIFO method mandatory",
    "10 year record retention for businesses",
    "Solidarity surcharge adds 5.5% to tax",
    "BaFin regulation for crypto businesses",
    "Specific ID not allowed - must use FIFO",
  ],

  lastUpdated: "2024-10-04",
};
