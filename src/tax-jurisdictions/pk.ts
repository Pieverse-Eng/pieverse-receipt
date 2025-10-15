import type { JurisdictionInfo } from "./types";

export const PK_JURISDICTION: JurisdictionInfo = {
  code: "PK",
  name: "Pakistan",
  emoji: "🇵🇰",
  hasStates: false,

  classification: "Virtual Asset (Transitioning to Regulation)",
  officialGuidanceUrl: "https://www.fbr.gov.pk/",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_pkr",
      "description",
      "payer_address",
      "recipient_address",
      "cnic_or_ntn",
      "transaction_hash",
    ],
    retentionYears: 6,
    notes: "Business records must be kept for 6 years. Crypto status unclear - SBP has issued warnings",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business/Freelance Income",
        description: "Income from services paid in crypto",
        taxFormHint: "Income Tax Return - Business income",
        taxRate: "0-35% (progressive) + 1-4% advance tax",
        notes: "Freelancers receiving crypto must report as business income",
      },
      {
        type: "personal_income",
        label: "Other Income",
        description: "Income from crypto trading/disposal",
        taxFormHint: "Income from other sources",
        taxRate: "5-35% (progressive)",
        notes: "May be classified as income from other sources",
      },
      {
        type: "capital_gain",
        label: "Capital Gain",
        description: "Gain from asset disposal",
        taxFormHint: "Capital Gains section",
        taxRate: "15% (if CGT applicable)",
        notes: "CGT may apply on gains > PKR 50,000; holding-based rates 0-15%",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Expense",
        description: "Business payment",
        taxFormHint: "Allowable business expense",
        deductible: true,
        notes: "May be deductible if properly documented and business-related",
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
        label: "Charitable Donation (Zakat)",
        description: "Donation to approved charity",
        taxFormHint: "100% deductible for approved donees",
        deductible: true,
        notes: "Donations to approved institutions fully deductible",
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
    rate: 18,
    cryptoToFiatExempt: false,
    goodsServicesSubject: true,
    notes: "18% sales tax on goods/services. Crypto tax treatment under discussion by FBR",
  },

  specialFeatures: [
    "Virtual Assets Ordinance 2025 (July 8) establishes PVARA as regulator",
    "SBP ban (2018, reaffirmed 2024) conflicts with government regulation efforts",
    "Pakistan Crypto Council (PCC) formed March 2025 for framework development",
    "Ordinance requires parliamentary approval within 120 days",
    "CGT at 15%; income tax 5-35% slabs; business 29% corporate rate",
    "Many freelancers use crypto for international payments",
    "5% tax on forex conversion (Roshan accounts); 10% otherwise",
    "6-year record retention for tax purposes",
    "Transitional phase: moving from ban to regulation",
  ],

  lastUpdated: "2025-10-13",
};
