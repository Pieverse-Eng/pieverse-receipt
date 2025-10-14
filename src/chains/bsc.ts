/**
 * BSC (BNB Smart Chain) Transaction Parser
 * Parses transactions from BSC blockchain to generate receipts
 */

import { createPublicClient, http, formatUnits, type Hash } from "viem";
import { bsc } from "viem/chains";
import type { Invoice, CurrencyType, ParsedTransaction } from "../types";

// BSC Chain configuration
const BSC_RPC_ENDPOINTS = [
  "https://bsc-dataseed1.binance.org",
  "https://bsc-dataseed2.binance.org",
  "https://bsc-dataseed3.binance.org",
  "https://bsc-dataseed4.binance.org",
];

// Known token addresses on BSC
const TOKEN_ADDRESSES = {
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
} as const;

// ERC20 transfer method signature
const TRANSFER_METHOD_ID = "a9059cbb";

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
  if (!data || data.length < 138) return null;

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
 */
function detectCurrency(to: string | undefined, value: bigint): CurrencyType {
  if (!to) return "BNB";

  const toLower = to.toLowerCase();

  if (toLower === TOKEN_ADDRESSES.USDT.toLowerCase()) {
    return "USDT";
  }

  // If value > 0, it's a native BNB transfer
  if (value > 0n) {
    return "BNB";
  }

  // Default to BNB
  return "BNB";
}

/**
 * Parse a BSC transaction and convert it to Invoice format
 */
export async function parseBscTransaction(
  txHash: string,
  options?: {
    rpcUrl?: string;
  },
): Promise<Invoice> {
  try {
    const client = options?.rpcUrl
      ? createPublicClient({
          chain: bsc,
          transport: http(options.rpcUrl),
        })
      : createBscClient();

    // Fetch transaction
    const tx = await client.getTransaction({
      hash: txHash as Hash,
    });

    if (!tx) {
      throw new Error(`Transaction not found: ${txHash}`);
    }

    // Fetch receipt for confirmations and timestamp
    const receipt = await client.getTransactionReceipt({
      hash: txHash as Hash,
    });

    if (!receipt) {
      throw new Error(`Transaction receipt not found: ${txHash}`);
    }

    // Get block for timestamp
    const block = await client.getBlock({
      blockNumber: receipt.blockNumber,
    });

    // Determine currency and amount
    let amount: string;
    let currency: CurrencyType;
    let recipient: string;

    const detectedCurrency = detectCurrency(tx.to || undefined, tx.value);

    if (detectedCurrency === "USDT" && tx.input) {
      // Parse token transfer
      const transfer = parseTokenTransfer(tx.input);

      if (transfer) {
        recipient = transfer.recipient;
        amount = formatUnits(transfer.amount, 18); // USDT uses 18 decimals on BSC
        currency = "USDT";
      } else {
        throw new Error("Failed to parse token transfer data");
      }
    } else {
      // Native BNB transfer
      recipient = tx.to || "";
      amount = formatUnits(tx.value, 18);
      currency = "BNB";
    }

    // Calculate confirmations
    const currentBlock = await client.getBlockNumber();
    const confirmations = Number(currentBlock - receipt.blockNumber);

    // Create invoice object
    const invoice: Invoice = {
      id: txHash,
      amount,
      currency,
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

    return invoice;
  } catch (error) {
    console.error("Error parsing BSC transaction:", error);
    throw new Error(
      `Failed to parse transaction: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
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

    const currency = detectCurrency(tx.to || undefined, tx.value);

    return {
      hash: txHash,
      from: tx.from,
      to: tx.to || "",
      value: formatUnits(tx.value, 18),
      timestamp: Number(block.timestamp),
      blockNumber: receipt.blockNumber.toString(),
      currency,
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
