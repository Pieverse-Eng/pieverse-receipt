import type { JurisdictionInfo } from "./types";

export const ID_JURISDICTION: JurisdictionInfo = {
  code: "ID",
  name: "Indonesia",
  emoji: "🇮🇩",
  hasStates: false,

  classification: "Digital Financial Asset (OJK Oversight)",
  officialGuidanceUrl: "https://www.pajak.go.id/",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_idr",
      "description",
      "payer_address",
      "recipient_address",
      "npwp_number",
      "transaction_hash",
    ],
    retentionYears: 5,
    notes: "Business records must be kept for 5 years per Indonesian tax law",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income",
        description: "Income from crypto trading business",
        taxFormHint: "Corporate Income Tax (PPh 25/29)",
        taxRate: "22% (corporate)",
        notes: "Corporate tax rate 22% (20% for listed companies)",
      },
      {
        type: "personal_income",
        label: "Personal Income",
        description: "Income from crypto trading/investment",
        taxFormHint: "PPh Article 22 (Final withholding)",
        taxRate: "0.21% final tax (domestic); 1% (foreign platforms)",
        notes: "Final withholding tax on gross transaction value - PMK 50/2025",
      },
      {
        type: "capital_gain",
        label: "Capital Gain",
        description: "Gain from crypto disposal",
        taxFormHint: "PPh Article 22 (Final withholding)",
        taxRate: "0.21% on gross value",
        notes: "0.21% final tax on gross transaction value (no deductions for losses)",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Crypto received as gift",
        taxFormHint: "May be subject to income tax",
        taxRate: "5-35%",
        notes: "Large gifts may be taxable income",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business payment",
        taxFormHint: "Deductible expense",
        deductible: true,
        notes: "Must be properly documented with invoice",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "Not deductible",
        deductible: false,
        notes: "Triggers capital gains calculation",
      },
      {
        type: "charitable_donation",
        label: "Charitable Donation (Zakat/Infaq)",
        description: "Donation to approved charity",
        taxFormHint: "Tax deductible",
        deductible: true,
        notes: "Zakat and infaq to approved institutions deductible",
      },
    ],
  },

  costBasisMethods: ["fifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "No holding period discount. Final tax option: 0.1% regardless of holding period",
  },

  vatGstRules: {
    applicable: true,
    rate: 11,
    cryptoToFiatExempt: true,
    goodsServicesSubject: true,
    notes:
      "Crypto asset transfers VAT-exempt (reclassified as financial assets). 11% VAT on service fees; 2.2% on mining services",
  },

  specialFeatures: [
    "MOF Regulation 50/2025 (effective Aug 1, 2025): comprehensive tax framework",
    "Oversight transitioned from Bappebti to OJK (Financial Services Authority) Jan 2025",
    "Reclassified from commodity to financial asset",
    "0.21% final tax on domestic platforms; 1% on foreign platforms",
    "VAT-exempt on asset transfers; 11% VAT on service fees; 2.2% on mining",
    "PPMSEs (exchanges) act as withholding agents",
    "22% corporate tax on business income (exchange fees, mining)",
    "NPWP (tax ID) and OJK licensing mandatory",
    "5-year record retention requirement",
  ],

  lastUpdated: "2025-10-13",
};
