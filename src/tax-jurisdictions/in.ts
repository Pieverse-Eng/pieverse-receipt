import type { JurisdictionInfo } from "./types";

export const IN_JURISDICTION: JurisdictionInfo = {
  code: "IN",
  name: "India",
  emoji: "🇮🇳",
  hasStates: false,

  classification: "Virtual Digital Asset (VDA)",
  officialGuidanceUrl: "https://www.incometax.gov.in/",

  receiptRequirements: {
    mandatoryFields: [
      "date_time",
      "crypto_amount",
      "fiat_amount_inr",
      "description",
      "payer_address",
      "recipient_address",
      "pan_number",
      "transaction_hash",
      "tds_reference",
    ],
    retentionYears: 6,
    notes: "Business records must be kept for 6 years. TDS certificate mandatory for transactions",
  },

  transactionTypes: {
    recipient: [
      {
        type: "business_income",
        label: "Business Income (VDA)",
        description: "Income from VDA trading/mining/staking",
        taxFormHint: "ITR-3 - Business income (Section 115BBH)",
        taxRate: "30% + 4% cess (total 31.2%)",
        notes: "All VDA income taxed at flat 30% regardless of holding period",
      },
      {
        type: "personal_income",
        label: "Capital Gains (VDA)",
        description: "Gains from VDA transfer",
        taxFormHint: "ITR-2/3 - Section 115BBH",
        taxRate: "30% + 4% cess (total 31.2%)",
        notes: "No deductions allowed except acquisition cost",
      },
      {
        type: "capital_gain",
        label: "VDA Transfer Income",
        description: "Income from VDA disposal",
        taxFormHint: "Section 115BBH",
        taxRate: "30% + 4% cess",
        notes: "Set-off of losses not allowed",
      },
      {
        type: "gift_received",
        label: "Gift Received (VDA)",
        description: "VDA received as gift",
        taxFormHint: "Income from other sources if >INR 50,000",
        taxRate: "Normal slab rates if from non-relatives",
        notes: "Gifts from relatives exempt, others taxed at slab rates",
      },
    ],
    payer: [
      {
        type: "business_expense",
        label: "Business Payment (VDA)",
        description: "Payment made in VDA",
        taxFormHint: "Must deduct TDS @ 1%",
        deductible: false,
        notes: "1% TDS mandatory. No deductions allowed against VDA gains",
      },
      {
        type: "personal_expense",
        label: "Personal Expense (VDA)",
        description: "Personal purchase with VDA",
        taxFormHint: "Triggers capital gains calculation",
        deductible: false,
        notes: "Disposal triggers 30% tax on gains",
      },
      {
        type: "charitable_donation",
        label: "Charitable Donation",
        description: "Donation in VDA",
        taxFormHint: "Section 80G - limited deduction",
        deductible: true,
        notes: "80G deduction available but VDA disposal still taxed at 30%",
      },
    ],
  },

  costBasisMethods: ["fifo"],
  defaultCostBasisMethod: "fifo",

  holdingPeriodRules: {
    hasDiscount: false,
    notes: "No holding period benefit. All VDA income taxed at flat 30% + cess",
  },

  vatGstRules: {
    applicable: true,
    rate: 18,
    cryptoToFiatExempt: false,
    goodsServicesSubject: true,
    notes: "18% GST may apply to crypto service fees. VDA transaction treatment unclear",
  },

  specialFeatures: [
    "Harshest crypto tax regime globally: 30% + 4% cess = 31.2% effective rate",
    "Section 115BBH (Finance Act 2022): VDAs defined under Section 2(47A)",
    "1% TDS under Section 194S on transfers >INR 50,000 (or INR 10,000)",
    "Schedule VDA mandatory in ITR-2/3 tax returns",
    "No deductions/exemptions except acquisition cost - no transaction fees deductible",
    "Losses cannot be set off against ANY income or carried forward",
    "18% GST on platform service fees (effective July 2025)",
    "PAN (Permanent Account Number) mandatory for all transactions",
    "FIU-IND registration required for all VASPs (domestic and foreign)",
    "6-year record retention under PMLA",
  ],

  lastUpdated: "2025-10-13",
};
