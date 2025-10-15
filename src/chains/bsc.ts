/**
 * BSC (BNB Smart Chain) Transaction Parser
 * Parses transactions from BSC blockchain to generate receipts
 */

import { createPublicClient, http, formatUnits, type Hash } from "viem";
import { bsc } from "viem/chains";
import type { Invoice, CurrencyType, ParsedTransaction, TokenConfig, ParseOptions } from "../types";

// Constants
const BSC_RPC_ENDPOINTS = [
  "https://bsc-dataseed1.binance.org",
  "https://bsc-dataseed2.binance.org",
  "https://bsc-dataseed3.binance.org",
  "https://bsc-dataseed4.binance.org",
];

const TRANSFER_METHOD_ID = "a9059cbb";
const MIN_TRANSFER_DATA_LENGTH = 138; // 4 bytes method + 32 bytes address + 32 bytes amount
// Reserved for future use with timeout configuration
// const DEFAULT_TIMEOUT = 30000; // 30 seconds

// Known token configurations on BSC
const DEFAULT_BSC_TOKENS: Record<string, TokenConfig> = {
  "0x55d398326f99059fF775485246999027B3197955": {
    address: "0x55d398326f99059fF775485246999027B3197955",
    symbol: "USDT",
    decimals: 18,
    name: "Tether USD",
  },
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56": {
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    symbol: "BUSD",
    decimals: 18,
    name: "Binance USD",
  },
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d": {
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    symbol: "USDC",
    decimals: 18,
    name: "USD Coin",
  },
};

// Simple LRU cache for parsed transactions
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
 * Create a viem public client for BSC with fallback RPC endpoints
 */
function createBscClient() {
  return createPublicClient({
    chain: bsc,
    transport: http(BSC_RPC_ENDPOINTS[0], {
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
    // Extract recipient address (bytes 4-36, last 20 bytes are the address)
    const recipientHex = data.slice(34, 74);
    const recipient = `0x${recipientHex}`;

    // Extract amount (bytes 36-68)
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
 * @param to - Transaction destination address
 * @param value - Transaction value
 * @param customTokens - User-provided custom tokens
 */
function detectCurrency(
  to: string | undefined,
  value: bigint,
  customTokens: Record<string, TokenConfig> = {},
): { currency: CurrencyType | string; tokenConfig?: TokenConfig } {
  if (!to) return { currency: "BNB" };

  const toLower = to.toLowerCase();

  // Check custom tokens first
  const customToken = customTokens[toLower];
  if (customToken) {
    return { currency: customToken.symbol as CurrencyType, tokenConfig: customToken };
  }

  // Check default tokens
  const defaultToken = DEFAULT_BSC_TOKENS[toLower];
  if (defaultToken) {
    return { currency: defaultToken.symbol as CurrencyType, tokenConfig: defaultToken };
  }

  // If value > 0, it's a native BNB transfer
  if (value > 0n) {
    return { currency: "BNB" };
  }

  // Unknown token - return address as currency
  return { currency: "UNKNOWN", tokenConfig: { address: to, symbol: "UNKNOWN", decimals: 18 } };
}

/**
 * Parse a BSC transaction and convert it to Invoice format
 * @param txHash - Transaction hash to parse
 * @param options - Parse options including custom tokens and RPC URL
 */
export async function parseBscTransaction(txHash: string, options?: ParseOptions): Promise<Invoice> {
  // Check cache first
  const cached = getFromCache(txHash);
  if (cached) {
    return cached;
  }

  try {
    const client = options?.rpcUrl
      ? createPublicClient({
          chain: bsc,
          transport: http(options.rpcUrl),
        })
      : createBscClient();

    // Fetch transaction and receipt in parallel for better performance
    const [tx, receipt] = await Promise.all([
      client.getTransaction({ hash: txHash as Hash }),
      client.getTransactionReceipt({ hash: txHash as Hash }),
    ]);

    if (!tx) {
      throw new Error(`Transaction not found: ${txHash}`);
    }

    if (!receipt) {
      throw new Error(`Transaction receipt not found: ${txHash}`);
    }

    // Validate transaction status
    if (receipt.status === "reverted") {
      throw new Error(`Transaction failed (reverted): ${txHash}`);
    }

    // Get block for timestamp
    const block = await client.getBlock({
      blockNumber: receipt.blockNumber,
    });

    // Build custom tokens map from user options
    const customTokensMap: Record<string, TokenConfig> = {};
    if (options?.customTokens) {
      for (const token of options.customTokens) {
        customTokensMap[token.address.toLowerCase()] = token;
      }
    }

    // Determine currency and amount
    let amount: string;
    let currency: CurrencyType | string;
    let recipient: string;
    let decimals = 18; // Default to 18 decimals

    const detected = detectCurrency(tx.to || undefined, tx.value, customTokensMap);
    currency = detected.currency;

    // Check if this is a token transfer
    if (detected.tokenConfig && tx.input) {
      // Parse token transfer
      const transfer = parseTokenTransfer(tx.input);

      if (transfer) {
        recipient = transfer.recipient;
        decimals = detected.tokenConfig.decimals;
        amount = formatUnits(transfer.amount, decimals);
      } else {
        throw new Error(`Failed to parse token transfer data for ${txHash}`);
      }
    } else {
      // Native BNB transfer
      recipient = tx.to || "";
      amount = formatUnits(tx.value, 18);
      currency = "BNB";

      // Validate this is a simple value transfer
      if (tx.input && tx.input !== "0x") {
        throw new Error(`Transaction ${txHash} appears to be a contract interaction, not a simple payment`);
      }
    }

    // Calculate confirmations
    const currentBlock = await client.getBlockNumber();
    const confirmations = Number(currentBlock - receipt.blockNumber);

    // Create invoice object
    const invoice: Invoice = {
      id: txHash,
      amount,
      currency: currency as CurrencyType,
      recipientAddress: recipient,
      creatorAddress: tx.from,
      transactionHash: txHash,
      blockNumber: receipt.blockNumber.toString(),
      paidAt: new Date(Number(block.timestamp) * 1000),
      status: receipt.status === "success" ? "paid" : "cancelled",
      createdAt: new Date(Number(block.timestamp) * 1000),
      updatedAt: new Date(),
      dueDate: new Date(Number(block.timestamp) * 1000), // Set due date to payment date
      description: "On-chain payment",
      blockchainConfirmations: confirmations,
      creatorId: 0, // Not applicable for external transactions
    };

    // Add to cache
    addToCache(txHash, invoice);

    return invoice;
  } catch (error) {
    console.error("Error parsing BSC transaction:", error);
    throw new Error(`Failed to parse transaction: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Get BSC transaction details (lightweight version)
 */
export async function getBscTransactionDetails(txHash: string): Promise<ParsedTransaction> {
  try {
    const client = createBscClient();

    const tx = await client.getTransaction({
      hash: txHash as Hash,
    });

    if (!tx) {
      throw new Error(`Transaction not found: ${txHash}`);
    }

    const receipt = await client.getTransactionReceipt({
      hash: txHash as Hash,
    });

    const block = await client.getBlock({
      blockNumber: receipt.blockNumber,
    });

    const detected = detectCurrency(tx.to || undefined, tx.value);

    return {
      hash: txHash,
      from: tx.from,
      to: tx.to || "",
      value: formatUnits(tx.value, 18),
      timestamp: Number(block.timestamp),
      blockNumber: receipt.blockNumber.toString(),
      currency: detected.currency as CurrencyType,
      status: receipt.status === "success" ? "success" : "failed",
    };
  } catch (error) {
    console.error("Error fetching BSC transaction:", error);
    throw error;
  }
}

/**
 * Verify if a transaction hash is valid
 */
export function isValidBscTxHash(txHash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(txHash);
}
