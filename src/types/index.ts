/**
 * Core type definitions for @pieverse/receipt
 */

// Invoice System Type Definitions
export type InvoiceStatus = "draft" | "pending" | "confirming" | "paid" | "overdue" | "cancelled";

export type CurrencyType = "USDT" | "BNB" | "ETH" | "MATIC" | "ARB";

export interface Invoice {
  id: string;

  // Parties
  creatorId?: number; // Optional for external transactions
  creatorAddress: string;
  recipientAddress: string;
  recipientName?: string | null;

  // Payment Details
  amount: string; // Token amount as string to avoid precision issues
  currency: CurrencyType;
  description: string;
  memo?: string | null;

  // Timing
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;

  // Status
  status: InvoiceStatus;

  // Blockchain
  transactionHash?: string | null;
  blockchainConfirmations?: number | null;
  blockNumber?: string | null;

  // Partner Branding
  partnerBrandId?: number | null;
}

// Tax Compliance Types
export type UserRole = "creator" | "payer";

export type TransactionType =
  // For Recipients (Income)
  | "business_income"
  | "personal_income"
  | "capital_gain"
  | "gift_received"
  | "royalty"
  | "other_income"
  // For Payers (Expenses)
  | "business_expense"
  | "personal_expense"
  | "capital_loss"
  | "gift_given"
  | "charitable_donation"
  | "other_expense";

export interface Jurisdiction {
  country: string; // ISO 3166-1 alpha-2 code (e.g., "US", "GB", "CA")
  countryName: string; // Display name (e.g., "United States")
  state?: string; // State/province code (e.g., "CA" for California)
  stateName?: string; // State/province display name
  taxYear?: number; // Auto-populated from payment date
}

export interface CostBasisInfo {
  originalPrice: string; // Original purchase price of crypto
  acquisitionDate: Date; // When crypto was acquired
  holdingPeriod: "short_term" | "long_term"; // <1 year or >1 year
}

export interface TaxMetadata {
  // Auto-detected (safe, no sensitive data)
  userRole: UserRole;

  // Required fields
  jurisdiction: Jurisdiction;
  transactionType: TransactionType;

  // Optional sensitive fields (NEVER stored in database)
  taxId?: string; // TIN/EIN/VAT number
  businessName?: string;
  businessAddress?: string;
  transactionCategory?: string; // More specific categorization
  notes?: string; // Notes for tax professional

  // Capital gains/loss specific
  costBasis?: CostBasisInfo;
}

// Brand Configuration
export interface BrandConfig {
  partnerName?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

// Download-related types
export type DownloadMethod = "share" | "download" | "new-tab" | "wallet-copy" | "failed";

export interface DownloadResult {
  success: boolean;
  method?: DownloadMethod;
  error?: string;
  blob?: Blob;
  filename?: string;
  blobUrl?: string; // For wallet browsers to copy
  walletName?: string; // Name of detected wallet
}

// Chain types
export type SupportedChain = "bsc" | "ethereum" | "polygon" | "arbitrum" | "optimism" | "base";

export interface ChainConfig {
  chainId: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

// Custom token configuration
export interface TokenConfig {
  address: string;
  symbol: string;
  decimals: number;
  name?: string;
}

// Parse options for transaction parsers
export interface ParseOptions {
  rpcUrl?: string; // Custom RPC endpoint
  customTokens?: TokenConfig[]; // User-defined tokens to detect
  timeout?: number; // Request timeout in ms
}

// Transaction parser types
export interface ParsedTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  blockNumber: string;
  currency: CurrencyType;
  status: "success" | "failed" | "pending";
}
