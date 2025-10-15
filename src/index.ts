/**
 * @pieverse/receipt
 * One-click receipt generation for Web3 transactions
 *
 * @example
 * ```tsx
 * import { PieverseReceipt } from '@pieverse/receipt';
 *
 * function App() {
 *   return (
 *     <PieverseReceipt
 *       tx="0x..."
 *       chain="bsc"
 *       brandConfig={{
 *         partnerName: "My DApp",
 *         logoUrl: "/logo.png",
 *         primaryColor: "#FF6B9D"
 *       }}
 *       onDownload={(success) => console.log('Downloaded:', success)}
 *     />
 *   );
 * }
 * ```
 */

// Main component
export { PieverseReceipt } from "./components/PieverseReceipt";
export type { PieverseReceiptProps } from "./components/PieverseReceipt";

// Types
export type {
  Invoice,
  BrandConfig,
  TaxMetadata,
  CurrencyType,
  InvoiceStatus,
  SupportedChain,
  DownloadResult,
  DownloadMethod,
  UserRole,
  TransactionType,
  Jurisdiction,
  CostBasisInfo,
  ParsedTransaction,
  ChainConfig,
  TokenConfig,
  ParseOptions,
} from "./types";

// Utility functions
export {
  formatAddress,
  formatCurrencyAmount,
  formatShortDate,
  getExplorerLink,
  getExplorerName,
  getBlockchainName,
  isValidAddress,
} from "./lib/utils";

// Browser detection utilities
export { isAndroidDevice, isIOSDevice, isWalletBrowser, getWalletBrowserName } from "./lib/browser-detection";

// Chain parsers (for advanced users who want to parse transactions separately)
export { parseBscTransaction, getBscTransactionDetails, isValidBscTxHash } from "./chains/bsc";
export { parseEthereumTransaction, getEthTransactionDetails, isValidEthTxHash } from "./chains/ethereum";
export { parsePolygonTransaction, getPolygonTransactionDetails, isValidPolygonTxHash } from "./chains/polygon";
export { parseArbitrumTransaction, getArbitrumTransactionDetails, isValidArbitrumTxHash } from "./chains/arbitrum";
export { parseOptimismTransaction, getOptimismTransactionDetails, isValidOptimismTxHash } from "./chains/optimism";
export { parseBaseTransaction, getBaseTransactionDetails, isValidBaseTxHash } from "./chains/base";

// Core PDF generator (headless API for custom implementations)
export { downloadReceiptPDF, ReceiptPDF } from "./core/receipt-generator";

// Tax compliance engine (18 jurisdictions, 93 transaction types)
export {
  TAX_JURISDICTIONS,
  JURISDICTION_MAP,
  getJurisdiction,
  getJurisdictionsWithStates,
  getNoCapitalGainsTaxJurisdictions,
  getHoldingPeriodDiscountJurisdictions,
  getVATGSTJurisdictions,
  formatJurisdictionName,
  getJurisdictionOptions,
  getStatesForJurisdiction,
  US_STATES,
  CA_PROVINCES,
  AU_STATES,
} from "./tax-jurisdictions";

export type {
  JurisdictionInfo,
  JurisdictionCode,
  ReceiptRequirements,
  TransactionTypesByRole,
  TransactionTypeConfig,
  CostBasisMethod,
  HoldingPeriodRules,
  VatGstRules,
  StateOption,
  TransactionCategoryOption,
} from "./tax-jurisdictions/types";

// Package metadata
export const VERSION = "0.1.0-alpha.3";
export const PACKAGE_NAME = "@pieverse/receipt";
