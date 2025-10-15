import { createPublicClient, http, formatUnits, type Hash } from "viem";
import { base } from "viem/chains";
import type { Invoice, CurrencyType, ParsedTransaction, TokenConfig, ParseOptions } from "../types";

const BASE_RPC_ENDPOINTS = ["https://mainnet.base.org", "https://base.llamarpc.com"];
const TRANSFER_METHOD_ID = "a9059cbb";
const MIN_TRANSFER_DATA_LENGTH = 138;

const DEFAULT_BASE_TOKENS: Record<string, TokenConfig> = {
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913": {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
  },
};

const txCache = new Map<string, Invoice>();
const MAX_CACHE_SIZE = 100;

function addToCache(txHash: string, invoice: Invoice) {
  if (txCache.size >= MAX_CACHE_SIZE) {
    const firstKey = txCache.keys().next().value;
    if (firstKey) txCache.delete(firstKey);
  }
  txCache.set(txHash, invoice);
}

function getFromCache(txHash: string): Invoice | undefined {
  return txCache.get(txHash);
}

function createBaseClient(rpcUrl?: string) {
  return createPublicClient({
    chain: base,
    transport: http(rpcUrl || BASE_RPC_ENDPOINTS[0], { batch: true, retryCount: 3 }),
  });
}

function parseTokenTransfer(data: string): { recipient: string; amount: bigint } | null {
  if (!data || data.length < MIN_TRANSFER_DATA_LENGTH) return null;
  const methodId = data.slice(2, 10);
  if (methodId !== TRANSFER_METHOD_ID) return null;
  try {
    return {
      recipient: `0x${data.slice(34, 74)}`,
      amount: BigInt(`0x${data.slice(74, 138)}`),
    };
  } catch {
    return null;
  }
}

function detectCurrency(
  to: string | undefined,
  value: bigint,
  customTokens: Record<string, TokenConfig> = {},
): { currency: CurrencyType | string; tokenConfig?: TokenConfig } {
  if (!to) return { currency: "ETH" };
  const toLower = to.toLowerCase();
  const customToken = customTokens[toLower];
  if (customToken) return { currency: customToken.symbol as CurrencyType, tokenConfig: customToken };
  const defaultToken = DEFAULT_BASE_TOKENS[toLower];
  if (defaultToken) return { currency: defaultToken.symbol as CurrencyType, tokenConfig: defaultToken };
  if (value > 0n) return { currency: "ETH" };
  return { currency: "UNKNOWN", tokenConfig: { address: to, symbol: "UNKNOWN", decimals: 18 } };
}

export async function parseBaseTransaction(txHash: string, options?: ParseOptions): Promise<Invoice> {
  const cached = getFromCache(txHash);
  if (cached) return cached;

  const client = createBaseClient(options?.rpcUrl);
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

  let amount: string,
    currency: CurrencyType | string,
    recipient: string,
    decimals = 18;
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
    description: `Payment via Base`,
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
}

export async function getBaseTransactionDetails(txHash: string, options?: ParseOptions): Promise<ParsedTransaction> {
  const client = createBaseClient(options?.rpcUrl);
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

export function isValidBaseTxHash(txHash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(txHash);
}
