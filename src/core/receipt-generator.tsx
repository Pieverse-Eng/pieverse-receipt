/**
 * Receipt PDF Generator
 * Generates professional PDF receipts for blockchain transactions
 */

import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import type { Invoice, TaxMetadata, BrandConfig, DownloadResult } from "../types";
import {
  // formatAddress, // TODO: Use in future version
  formatCurrencyAmount,
  formatShortDate,
  getExplorerLink,
  getExplorerName,
  getBlockchainName,
} from "../lib/utils";
import { isWalletBrowser, getWalletBrowserName, isAndroidDevice, isIOSDevice } from "../lib/browser-detection";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "2px solid #F97316",
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 11,
    color: "#6B7280",
  },
  value: {
    fontSize: 11,
    color: "#111827",
    fontWeight: "bold",
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#10B981",
    textAlign: "center",
    marginVertical: 20,
  },
  currency: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  statusBadge: {
    backgroundColor: "#D1FAE5",
    color: "#047857",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "flex-end",
  },
  divider: {
    borderBottom: "1px solid #E5E7EB",
    marginVertical: 15,
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: "1px solid #E5E7EB",
    fontSize: 10,
    color: "#9CA3AF",
    textAlign: "center",
  },
  blockchainSection: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  txHashLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 4,
  },
  txHashValue: {
    fontSize: 9,
    color: "#374151",
    fontFamily: "Courier",
    marginBottom: 8,
  },
  explorerLink: {
    fontSize: 9,
    color: "#F97316",
    textDecoration: "none",
  },
  description: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.5,
    marginTop: 4,
  },
  watermark: {
    position: "absolute",
    bottom: 40,
    right: 40,
    opacity: 0.1,
    fontSize: 48,
    color: "#F97316",
    transform: "rotate(-45deg)",
  },
});

interface ReceiptPDFProps {
  invoice: Invoice;
  brandConfig?: BrandConfig;
  includeTheme?: boolean;
  taxMetadata?: TaxMetadata;
  chain?: string;
}

export const ReceiptPDF: React.FC<ReceiptPDFProps> = ({
  invoice,
  brandConfig,
  includeTheme = true,
  taxMetadata, // TODO: Implement tax metadata rendering
  chain = "bsc",
}) => {
  // Suppress unused variable warning - will be used when tax forms are implemented
  void taxMetadata;
  const partnerName = includeTheme ? brandConfig?.partnerName || "Pieverse" : "Pieverse";
  const logoUrl = includeTheme ? brandConfig?.logoUrl : null;
  const primaryColor = includeTheme ? brandConfig?.primaryColor || "#F97316" : "#6B7280";
  const secondaryColor = includeTheme ? brandConfig?.secondaryColor || "#10B981" : "#10B981";

  const explorerLink = invoice.transactionHash ? getExplorerLink(invoice.transactionHash, chain) : "";
  const explorerName = getExplorerName(chain);
  const blockchainName = getBlockchainName(chain);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={[styles.watermark, { color: primaryColor }]}>PAID</Text>

        {/* Header */}
        <View style={[styles.header, { borderBottomColor: primaryColor }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            {includeTheme && logoUrl && <Image src={logoUrl} style={styles.logo} />}
            <View>
              <Text style={styles.title}>Payment Receipt</Text>
              <Text style={styles.subtitle}>Invoice #{invoice.id.slice(-8)}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${secondaryColor}20` }]}>
            <Text style={{ color: secondaryColor }}>✓ PAID</Text>
          </View>
        </View>

        {/* Amount */}
        <Text style={[styles.amount, { color: primaryColor }]}>{formatCurrencyAmount(invoice.amount, 2)}</Text>
        <Text style={styles.currency}>{invoice.currency}</Text>

        <View style={styles.divider} />

        {/* Payment Details */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: `${primaryColor}08`,
              padding: 15,
              borderRadius: 8,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: primaryColor }]}>Payment Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Paid on:</Text>
            <Text style={styles.value}>{invoice.paidAt ? formatShortDate(invoice.paidAt) : "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.value}>Cryptocurrency ({invoice.currency})</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Blockchain:</Text>
            <Text style={styles.value}>{blockchainName}</Text>
          </View>
          {invoice.blockchainConfirmations !== undefined && invoice.blockchainConfirmations !== null && (
            <View style={styles.row}>
              <Text style={styles.label}>Confirmations:</Text>
              <Text style={styles.value}>{invoice.blockchainConfirmations}</Text>
            </View>
          )}
        </View>

        {/* Addresses */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: primaryColor }]}>Transaction Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>To:</Text>
            <Text style={[styles.value, { fontSize: 9, fontFamily: "Courier" }]}>{invoice.recipientAddress}</Text>
          </View>
          {invoice.recipientName && (
            <View style={styles.row}>
              <Text style={styles.label}>Recipient Name:</Text>
              <Text style={styles.value}>{invoice.recipientName}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>From:</Text>
            <Text style={[styles.value, { fontSize: 9, fontFamily: "Courier" }]}>{invoice.creatorAddress}</Text>
          </View>
        </View>

        {/* Description */}
        {invoice.description && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: primaryColor }]}>Description</Text>
            <Text style={styles.description}>{invoice.description}</Text>
            {invoice.memo && (
              <Text style={[styles.description, { marginTop: 8, fontSize: 10, color: "#6B7280" }]}>
                Note: {invoice.memo}
              </Text>
            )}
          </View>
        )}

        {/* Blockchain Verification */}
        {invoice.transactionHash && (
          <View style={[styles.blockchainSection, { backgroundColor: `${secondaryColor}10` }]}>
            <Text style={[styles.sectionTitle, { color: secondaryColor }]}>Blockchain Verification</Text>
            <Text style={styles.txHashLabel}>Transaction Hash:</Text>
            <Text style={styles.txHashValue}>{invoice.transactionHash}</Text>
            <Text style={styles.txHashLabel}>Block Number:</Text>
            <Text style={styles.txHashValue}>{invoice.blockNumber || "Pending"}</Text>
            <Text style={[styles.explorerLink, { color: primaryColor }]}>
              View on {explorerName}: {explorerLink}
            </Text>
          </View>
        )}

        <View style={[styles.divider, { borderBottomColor: `${primaryColor}30` }]} />

        {/* Invoice Metadata */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: primaryColor }]}>Invoice Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice ID:</Text>
            <Text style={styles.value}>{invoice.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Created:</Text>
            <Text style={styles.value}>{formatShortDate(invoice.createdAt)}</Text>
          </View>
          {invoice.paidAt && (
            <View style={styles.row}>
              <Text style={styles.label}>Paid:</Text>
              <Text style={styles.value}>{formatShortDate(invoice.paidAt)}</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: `${primaryColor}20` }]}>
          {includeTheme ? (
            <Text style={{ color: primaryColor, fontWeight: "bold" }}>Powered by {partnerName}</Text>
          ) : (
            <Text style={{ color: "#6B7280", fontWeight: "bold" }}>Pieverse - Blockchain Payment Receipt</Text>
          )}
          <Text style={{ marginTop: 4 }}>Blockchain • Secure • Transparent • Immutable</Text>
          <Text style={{ marginTop: 8, fontSize: 8 }}>Generated on {new Date().toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

/**
 * Progressive enhancement download strategy
 */
const tryDownloadWithProgressiveEnhancement = async (blob: Blob, filename: string): Promise<DownloadResult> => {
  // Method 0: Android wallet browser - convert to data URL
  if (isWalletBrowser() && isAndroidDevice()) {
    const walletName = getWalletBrowserName();

    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      return {
        success: true,
        method: "wallet-copy",
        blob,
        filename,
        blobUrl: dataUrl,
        walletName: walletName || "Wallet Browser",
      };
    } catch (error) {
      console.error("Failed to convert blob to data URL:", error);
    }
  }

  // Method 1: iOS devices - use Share API
  if (isIOSDevice() && typeof navigator !== "undefined" && navigator.share) {
    const file = new File([blob], filename, { type: "application/pdf" });

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: filename,
            text: "Payment Receipt",
          });
          return { success: true, method: "share" };
        }

        await navigator.share({
          title: filename,
          text: "Payment Receipt",
        });
        return { success: true, method: "share" };
      } catch (error: any) {
        if (error.name === "AbortError") {
          return { success: false, error: "User cancelled share" };
        }

        if (attempt === 0) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }
    }

    // Fallback to new tab
    try {
      const url = URL.createObjectURL(blob);
      const opened = window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      if (opened) {
        return { success: true, method: "new-tab" };
      }
    } catch (e) {
      return {
        success: false,
        method: "failed",
        error: "Unable to open PDF on iOS",
        blob,
        filename,
      };
    }
  }

  // Method 2: Web Share API for Android
  if (typeof navigator !== "undefined" && navigator.canShare) {
    try {
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: filename,
          text: "Payment Receipt",
        });
        return { success: true, method: "share" };
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        return { success: false, error: "User cancelled share" };
      }
    }
  }

  // Method 3: Traditional download
  if (!isIOSDevice()) {
    try {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(url), 100);

      return { success: true, method: "download" };
    } catch (error) {
      console.warn("Traditional download failed:", error);
    }
  }

  // Method 4: Open in new tab
  try {
    const url = URL.createObjectURL(blob);
    const opened = window.open(url, "_blank");

    if (opened) {
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return { success: true, method: "new-tab" };
    }
  } catch (error) {
    console.warn("Open in new tab failed:", error);
  }

  // All methods failed
  return {
    success: false,
    method: "failed",
    error: "Unable to download in this environment",
    blob,
    filename,
  };
};

/**
 * Generate and download receipt PDF
 */
export const downloadReceiptPDF = async (
  invoice: Invoice,
  brandConfig?: BrandConfig,
  includeTheme: boolean = true,
  taxMetadata?: TaxMetadata,
  chain: string = "bsc",
): Promise<DownloadResult> => {
  try {
    const { pdf } = await import("@react-pdf/renderer");
    const blob = await pdf(
      <ReceiptPDF
        invoice={invoice}
        brandConfig={brandConfig}
        includeTheme={includeTheme}
        taxMetadata={taxMetadata}
        chain={chain}
      />,
    ).toBlob();

    const filename = `receipt-${invoice.id.slice(-8)}.pdf`;

    return await tryDownloadWithProgressiveEnhancement(blob, filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    return {
      success: false,
      method: "failed",
      error: error instanceof Error ? error.message : "Failed to generate PDF",
    };
  }
};
