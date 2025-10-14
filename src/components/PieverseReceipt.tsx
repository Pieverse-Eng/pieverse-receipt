/**
 * PieverseReceipt Component
 * Main React component for one-click receipt generation
 */

import React, { useState } from "react";
import { parseBscTransaction, isValidBscTxHash } from "../chains/bsc";
import { downloadReceiptPDF } from "../core/receipt-generator";
import type { Invoice, BrandConfig, TaxMetadata, SupportedChain, TokenConfig, ParseOptions } from "../types";

export interface PieverseReceiptProps {
  /** Transaction hash */
  tx: string;

  /** Blockchain chain */
  chain?: SupportedChain;

  /** Optional brand configuration */
  brandConfig?: BrandConfig;

  /** Button variant */
  variant?: "button" | "icon" | "link";

  /** Button label */
  label?: string;

  /** Custom loading text */
  loadingText?: string;

  /** Custom loading component (overrides loadingText) */
  loadingComponent?: React.ReactNode;

  /** Custom button className */
  className?: string;

  /** Tax metadata (optional, never stored) */
  taxMetadata?: TaxMetadata;

  /** Include partner branding in receipt */
  includeTheme?: boolean;

  /** Custom RPC endpoint URL */
  rpcUrl?: string;

  /** Custom tokens to detect (for chains supporting custom tokens) */
  customTokens?: TokenConfig[];

  /** Callback when download completes */
  onDownload?: (success: boolean, error?: string) => void;

  /** Callback when PDF is generated (before download) */
  onGenerate?: (invoice: Invoice) => void;
}

export function PieverseReceipt({
  tx,
  chain = "bsc",
  brandConfig,
  variant = "button",
  label = "Download Receipt",
  loadingText = "Generating Receipt...",
  loadingComponent,
  className,
  taxMetadata,
  includeTheme = true,
  rpcUrl,
  customTokens,
  onDownload,
  onGenerate,
}: PieverseReceiptProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate transaction hash format
      if (chain === "bsc" && !isValidBscTxHash(tx)) {
        throw new Error("Invalid BSC transaction hash format. Expected 0x followed by 64 hex characters.");
      }

      // Sanitize brand config (basic XSS prevention)
      const sanitizedBrandConfig = brandConfig ? {
        ...brandConfig,
        partnerName: brandConfig.partnerName?.replace(/<[^>]*>/g, ""),
      } : undefined;

      // Build parse options
      const parseOptions: ParseOptions | undefined = (rpcUrl || customTokens) ? {
        rpcUrl,
        customTokens,
      } : undefined;

      // Step 1: Parse transaction
      let invoice: Invoice;

      if (chain === "bsc") {
        invoice = await parseBscTransaction(tx, parseOptions);
      } else {
        throw new Error(`Chain ${chain} is not yet supported. Currently supporting: BSC`);
      }

      // Callback after parsing
      onGenerate?.(invoice);

      // Step 2: Generate and download PDF
      const result = await downloadReceiptPDF(
        invoice,
        sanitizedBrandConfig,
        includeTheme,
        taxMetadata,
        chain,
      );

      // Step 3: Callback
      onDownload?.(result.success, result.error);

      if (!result.success) {
        setError(result.error || "Failed to download receipt");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      onDownload?.(false, message);
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  const renderLoading = () => {
    if (loadingComponent) return loadingComponent;
    return loadingText;
  };

  // Button variant
  if (variant === "button") {
    return (
      <div className="pieverse-receipt-wrapper">
        <button
          onClick={handleDownload}
          disabled={loading}
          className={
            className ||
            "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          }
        >
          {loading ? renderLoading() : label}
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>
    );
  }

  // Icon variant
  if (variant === "icon") {
    return (
      <button
        onClick={handleDownload}
        disabled={loading}
        title={label}
        className={
          className ||
          "p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        }
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
      </button>
    );
  }

  // Link variant
  if (variant === "link") {
    return (
      <button
        onClick={handleDownload}
        disabled={loading}
        className={
          className ||
          "text-blue-600 hover:text-blue-800 underline disabled:opacity-50 disabled:cursor-not-allowed"
        }
      >
        {loading ? renderLoading() : label}
      </button>
    );
  }

  return null;
}
