import type { JurisdictionInfo } from "./types";

export const KR_JURISDICTION: JurisdictionInfo = {
  code: "KR",
  name: "South Korea",
  emoji: "🇰🇷",
  hasStates: false,

  classification: "Virtual Asset (Regulated)",
  officialGuidanceUrl: "https://www.nts.go.kr/",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_krw",
      "description",
      "payer_address",
      "recipient_address",
      "rrn_or_brn",
      "transaction_hash",
    ],
    retentionYears: 5,
    notes: "Business records must be kept for 5 years for individuals (10 years for corporations)",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income",
        description: "Income from crypto trading business",
        taxFormHint: "Corporate Tax or Business Income",
        taxRate: "9-25% (corporate) or progressive (individual)",
        notes: "Professional traders subject to business income tax",
      },
      {
        type: "personal_income",
        label: "Other Income (Virtual Assets)",
        description: "Income from virtual asset transfer",
        taxFormHint: "Other Income - Schedule F (when active)",
        taxRate: "20% + 2% local tax (deferred to 2027)",
        notes: "Tax deferred to Jan 1, 2027. Will be 20% on gains >KRW 2.5M annually",
      },
      {
        type: "capital_gain",
        label: "Virtual Asset Transfer Income",
        description: "Gain from virtual asset disposal",
        taxFormHint: "Income from transfer of virtual assets",
        taxRate: "20% on gains exceeding KRW 2.5M (deferred)",
        notes: "KRW 2.5 million annual exemption. Tax implementation deferred to Jan 1, 2027",
      },
      {
        type: "gift_received",
        label: "Gift Received",
        description: "Virtual assets received as gift",
        taxFormHint: "Gift tax may apply",
        taxRate: "10-50% depending on amount",
        notes: "Gift tax: 10-50% progressive. Annual exemption varies by relationship",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business payment",
        taxFormHint: "Deductible business expense",
        deductible: true,
        notes: "Must be properly documented",
      },
      {
        type: "personal_expense",
        label: "Personal Expense",
        description: "Personal purchase",
        taxFormHint: "Triggers transfer income calculation",
        deductible: false,
        notes: "Disposal triggers 22% tax on gains >KRW 2.5M (from 2025)",
      },
      {
        type: "charitable_donation",
        label: "Charitable Donation",
        description: "Donation to registered charity",
        taxFormHint: "May be tax deductible",
        deductible: true,
        notes: "Donations to approved organizations deductible within limits",
      },
    ],
  },

  costBasisMethods: ["fifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "No holding period discount. Flat 22% on gains exceeding KRW 2.5M annual exemption",
  },

  vatGstRules: {
    applicable: true,
    rate: 10,
    cryptoToFiatExempt: true,
    goodsServicesSubject: false,
    notes: "10% VAT. Crypto transactions VAT-exempt per Ministry of Economy guidance",
  },

  specialFeatures: [
    "Act on Protection of Virtual Asset Users (VAUPA) effective July 2024",
    "Crypto tax deferred to January 1, 2027 (originally 2022, repeatedly delayed)",
    "Proposed: 20% on gains >KRW 2.5M annually when activated",
    "Real-name bank account system (FSC/KoFIU) - no anonymous trading",
    "80% customer assets must be in cold storage",
    "ISMS certification required for cybersecurity",
    "CARF implementation: data collection 2026, exchange 2027",
    "Corporate profits taxed at 9-24% rates",
    "NTS can seize crypto for tax delinquency (2018 Supreme Court ruling)",
    "Gift tax applies under existing laws (10-50% progressive)",
  ],

  lastUpdated: "2025-10-13",
};
