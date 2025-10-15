/**
 * Tax Jurisdiction Data Types
 *
 * Structured reference data for cryptocurrency tax compliance
 * across different jurisdictions.
 */

/**
 * Supported tax jurisdiction codes (ISO 3166-1 alpha-2)
 */
export type JurisdictionCode =
  | "US"
  | "UK"
  | "SG"
  | "CA"
  | "AU"
  | "DE"
  | "JP"
  | "FR"
  | "HK"
  | "CH"
  | "BD"
  | "VN"
  | "PK"
  | "TW"
  | "UA"
  | "IN"
  | "ID"
  | "KR";

export interface JurisdictionInfo {
  code: JurisdictionCode;
  name: string;
  emoji: string;
  hasStates: boolean;

  // Tax classification
  classification: string;
  officialGuidanceUrl: string;

  // Receipt requirements
  receiptRequirements: ReceiptRequirements;

  // Transaction types for this jurisdiction
  transactionTypes: TransactionTypesByRole;

  // Cost basis and calculation methods
  costBasisMethods: CostBasisMethod[];
  defaultCostBasisMethod: CostBasisMethod;

  // Holding period rules
  holdingPeriodRules: HoldingPeriodRules;

  // VAT/GST rules
  vatGstRules: VatGstRules;

  // Special features or notes
  specialFeatures: string[];

  // Last updated
  lastUpdated: string; // ISO date string
}

export interface ReceiptRequirements {
  mandatoryFields: string[];
  retentionYears: number;
  notes?: string;
}

export interface TransactionTypesByRole {
  recipient: TransactionTypeConfig[];
  payer: TransactionTypeConfig[];
}

export interface TransactionTypeConfig {
  type: string; // e.g., 'business_income', 'capital_gain'
  label: string;
  description: string;
  taxFormHint: string;
  taxRate?: string;
  reportingThreshold?: number | string;
  deductible?: boolean;
  notes?: string;
}

export type CostBasisMethod = "specific_id" | "fifo" | "lifo" | "hifo" | "average_cost" | "pooling" | "acb"; // Adjusted Cost Base (Canada)

export interface HoldingPeriodRules {
  hasDiscount: boolean;
  longTermThresholdDays?: number;
  longTermRate?: string;
  shortTermRate?: string;
  taxFreeThresholdDays?: number; // e.g., Germany >1 year = tax-free
  notes?: string;
}

export interface VatGstRules {
  applicable: boolean;
  rate?: number; // e.g., 20 for UK 20%
  cryptoToFiatExempt: boolean;
  goodsServicesSubject: boolean;
  notes?: string;
}

export interface StateOption {
  code: string;
  name: string;
}

// Helper type for form display
export interface TransactionCategoryOption {
  value: string;
  label: string;
  applicableFor?: string[]; // jurisdictions where this applies
}
