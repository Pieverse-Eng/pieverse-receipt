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
export {
  isAndroidDevice,
  isIOSDevice,
  isWalletBrowser,
  getWalletBrowserName,
} from "./lib/browser-detection";

// Chain parsers (for advanced users who want to parse transactions separately)
export { parseBscTransaction, getBscTransactionDetails, isValidBscTxHash } from "./chains/bsc";

// Core PDF generator (headless API for custom implementations)
export { downloadReceiptPDF, ReceiptPDF } from "./core/receipt-generator";

// Package metadata
export const VERSION = "0.1.0-alpha.1";
export const PACKAGE_NAME = "@pieverse/receipt";

// Default export
export { PieverseReceipt as default } from "./components/PieverseReceipt";
