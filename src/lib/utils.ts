/**
 * Utility functions for receipt generation
 */

/**
 * Format wallet address to shortened version
 * @example "0x1234...5678"
 */
export function formatAddress(address: string, length = 4): string {
  if (!address || address.length <= 10) return address;
  const startChars = 2 + length; // 0x + length
  const endChars = length;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Validate Ethereum-style wallet address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Format currency amount with proper decimals
 */
export function formatCurrencyAmount(amount: string | number, decimals: number = 2): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(num)) return "0";

  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format date to short format (e.g., "Mar 15, 2025")
 */
export function formatShortDate(date: Date | string): string {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  return targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Get block explorer link for transaction
 */
export function getExplorerLink(txHash: string, chain: string = "bsc"): string {
  const explorers: Record<string, string> = {
    bsc: "https://bscscan.com",
    ethereum: "https://etherscan.io",
    polygon: "https://polygonscan.com",
    arbitrum: "https://arbiscan.io",
    optimism: "https://optimistic.etherscan.io",
    base: "https://basescan.org",
  };

  const baseUrl = explorers[chain] || explorers.bsc;
  return `${baseUrl}/tx/${txHash}`;
}

/**
 * Get block explorer name for chain
 */
export function getExplorerName(chain: string = "bsc"): string {
  const names: Record<string, string> = {
    bsc: "BscScan",
    ethereum: "Etherscan",
    polygon: "PolygonScan",
    arbitrum: "Arbiscan",
    optimism: "Optimism Etherscan",
    base: "BaseScan",
  };

  return names[chain] || names.bsc;
}

/**
 * Get blockchain display name
 */
export function getBlockchainName(chain: string = "bsc"): string {
  const names: Record<string, string> = {
    bsc: "BNB Smart Chain",
    ethereum: "Ethereum",
    polygon: "Polygon",
    arbitrum: "Arbitrum",
    optimism: "Optimism",
    base: "Base",
  };

  return names[chain] || names.bsc;
}
