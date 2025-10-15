/**
 * Ethereum Transaction Parser
 * Parses transactions from Ethereum blockchain to generate receipts
 */

import { createPublicClient, http, formatUnits, type Hash } from "viem";
import { mainnet } from "viem/chains";
import type { Invoice, CurrencyType, ParsedTransaction, TokenConfig, ParseOptions } from "../types";

// Constants
const ETH_RPC_ENDPOINTS = ["https://eth.llamarpc.com", "https://rpc.ankr.com/eth", "https://ethereum.publicnode.com"];

const TRANSFER_METHOD_ID = "a9059cbb";
const MIN_TRANSFER_DATA_LENGTH = 138;
// Reserved for future use with timeout configuration
// const DEFAULT_TIMEOUT = 30000;

// Known token configurations on Ethereum
const DEFAULT_ETH_TOKENS: Record<string, TokenConfig> = {
  "0xdAC17F958D2ee523a2206206994597C13D831ec7": {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol: "USDT",
    decimals: 6,
    name: "Tether USD",
  },
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
  },
  "0x6B175474E89094C44Da98b954EedeAC495271d0F": {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    decimals: 18,
    name: "Dai Stablecoin",
  },
};

// Simple LRU cache
const txCache = new Map<string, Invoice>();
const MAX_CACHE_SIZE = 100;

function addToCache(txHash: string, invoice: Invoice) {
  if (txCache.size >= MAX_CACHE_SIZE) {
    const firstKey = txCache.keys().next().value;
    if (firstKey) {
      txCache.delete(firstKey);
    }
  }
  txCache.set(txHash, invoice);
}

function getFromCache(txHash: string): Invoice | undefined {
  return txCache.get(txHash);
}

/**
 * Create a viem public client for Ethereum
 */
function createEthClient(rpcUrl?: string) {
  return createPublicClient({
    chain: mainnet,
    transport: http(rpcUrl || ETH_RPC_ENDPOINTS[0], {
      batch: true,
      retryCount: 3,
    }),
  });
}

/**
 * Parse a token transfer from transaction input data
 */
function parseTokenTransfer(data: string): {
  recipient: string;
  amount: bigint;
} | null {
  if (!data || data.length < MIN_TRANSFER_DATA_LENGTH) return null;

  const methodId = data.slice(2, 10);
  if (methodId !== TRANSFER_METHOD_ID) return null;

  try {
    const recipientHex = data.slice(34, 74);
    const recipient = `0x${recipientHex}`;
    const amountHex = `0x${data.slice(74, 138)}`;
    const amount = BigInt(amountHex);

    return { recipient, amount };
  } catch (error) {
    console.error("Error parsing token transfer:", error);
    return null;
  }
}

/**
 * Detect currency from transaction
 */
function detectCurrency(
  to: string | undefined,
  value: bigint,
  customTokens: Record<string, TokenConfig> = {},
): { currency: CurrencyType | string; tokenConfig?: TokenConfig } {
  if (!to) return { currency: "ETH" };

  const toLower = to.toLowerCase();

  const customToken = customTokens[toLower];
  if (customToken) {
    return { currency: customToken.symbol as CurrencyType, tokenConfig: customToken };
  }

  const defaultToken = DEFAULT_ETH_TOKENS[toLower];
  if (defaultToken) {
    return { currency: defaultToken.symbol as CurrencyType, tokenConfig: defaultToken };
  }

  if (value > 0n) {
    return { currency: "ETH" };
  }

  return { currency: "UNKNOWN", tokenConfig: { address: to, symbol: "UNKNOWN", decimals: 18 } };
}

/**
 * Parse an Ethereum transaction and convert it to Invoice format
 */
export async function parseEthereumTransaction(txHash: string, options?: ParseOptions): Promise<Invoice> {
  const cached = getFromCache(txHash);
  if (cached) return cached;

  try {
    const client = createEthClient(options?.rpcUrl);

    const [tx, receipt] = await Promise.all([
      client.getTransaction({ hash: txHash as Hash }),
      client.getTransactionReceipt({ hash: txHash as Hash }),
    ]);

    if (!tx) throw new Error(`Transaction not found: ${txHash}`);
    if (!receipt) throw new Error(`Transaction receipt not found: ${txHash}`);
    if (receipt.status === "reverted") throw new Error(`Transaction failed (reverted): ${txHash}`);

    const block = await client.getBlock({ blockNumber: receipt.blockNumber });

    const customTokensMap: Record<string, TokenConfig> = {};
    if (options?.customTokens) {
      for (const token of options.customTokens) {
        customTokensMap[token.address.toLowerCase()] = token;
      }
    }

    let amount: string;
    let currency: CurrencyType | string;
    let recipient: string;
    let decimals = 18;

    const detected = detectCurrency(tx.to || undefined, tx.value, customTokensMap);
    currency = detected.currency;

    if (detected.tokenConfig) {
      decimals = detected.tokenConfig.decimals;
      const tokenTransfer = parseTokenTransfer(tx.input);
      if (tokenTransfer) {
        amount = formatUnits(tokenTransfer.amount, decimals);
        recipient = tokenTransfer.recipient;
      } else {
        throw new Error("Failed to parse token transfer data");
      }
    } else {
      amount = formatUnits(tx.value, decimals);
      recipient = tx.to || "";
    }

    const invoice: Invoice = {
      id: txHash,
      creatorAddress: tx.from,
      recipientAddress: recipient,
      amount,
      currency: currency as CurrencyType,
      description: `Payment via Ethereum`,
      dueDate: new Date(Number(block.timestamp) * 1000),
      createdAt: new Date(Number(block.timestamp) * 1000),
      updatedAt: new Date(Number(block.timestamp) * 1000),
      paidAt: new Date(Number(block.timestamp) * 1000),
      status: "paid",
      transactionHash: txHash,
      blockchainConfirmations: 0,
      blockNumber: receipt.blockNumber.toString(),
    };

    addToCache(txHash, invoice);
    return invoice;
  } catch (error) {
    throw new Error(`Failed to parse Ethereum transaction: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Get detailed transaction information
 */
export async function getEthTransactionDetails(txHash: string, options?: ParseOptions): Promise<ParsedTransaction> {
  const client = createEthClient(options?.rpcUrl);
  const [tx, receipt] = await Promise.all([
    client.getTransaction({ hash: txHash as Hash }),
    client.getTransactionReceipt({ hash: txHash as Hash }),
  ]);

  if (!tx) throw new Error(`Transaction not found: ${txHash}`);

  const block = await client.getBlock({ blockNumber: tx.blockNumber || 0n });

  const customTokensMap: Record<string, TokenConfig> = {};
  if (options?.customTokens) {
    for (const token of options.customTokens) {
      customTokensMap[token.address.toLowerCase()] = token;
    }
  }

  const detected = detectCurrency(tx.to || undefined, tx.value, customTokensMap);

  return {
    hash: txHash,
    from: tx.from,
    to: tx.to || "",
    value: formatUnits(tx.value, detected.tokenConfig?.decimals || 18),
    timestamp: Number(block.timestamp),
    blockNumber: tx.blockNumber?.toString() || "0",
    currency: detected.currency as CurrencyType,
    status: receipt?.status === "success" ? "success" : receipt?.status === "reverted" ? "failed" : "pending",
  };
}

/**
 * Validate Ethereum transaction hash format
 */
export function isValidEthTxHash(txHash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(txHash);
}
