/**
 * Custom Tokens Example
 * Demonstrates how to add support for custom ERC20 tokens
 */

import React from "react";
import { PieverseReceipt, type TokenConfig } from "@pieverse/receipt";

export default function CustomTokensExample() {
  // Example transaction hash (replace with real one)
  const txHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

  // Define your custom tokens
  const customTokens: TokenConfig[] = [
    {
      address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", // CAKE token on BSC
      symbol: "CAKE",
      decimals: 18,
      name: "PancakeSwap Token",
    },
    {
      address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D", // SHIB token on BSC
      symbol: "SHIB",
      decimals: 18,
      name: "SHIBA INU",
    },
    {
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47", // ADA token on BSC
      symbol: "ADA",
      decimals: 18,
      name: "Cardano Token",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Custom Tokens Example</h1>
      <p className="mb-4 text-gray-600">
        Generate receipts for custom ERC20 token transfers.
      </p>

      <div className="space-y-6">
        {/* Example 1: With custom tokens */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">With Custom Token Support</h3>
          <p className="text-sm text-gray-600 mb-3">
            This will detect CAKE, SHIB, or ADA tokens if the transaction involves them.
          </p>
          <PieverseReceipt
            tx={txHash}
            chain="bsc"
            customTokens={customTokens}
            label="Download Receipt (Custom Tokens)"
            onDownload={(success, error) => {
              if (success) {
                console.log("Receipt generated successfully!");
              } else {
                console.error("Failed:", error);
              }
            }}
          />
        </div>

        {/* Example 2: With custom RPC */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">With Custom RPC Endpoint</h3>
          <p className="text-sm text-gray-600 mb-3">
            Use your own RPC endpoint for better reliability and rate limits.
          </p>
          <PieverseReceipt
            tx={txHash}
            chain="bsc"
            rpcUrl="https://your-custom-rpc-endpoint.com"
            customTokens={customTokens}
            label="Download (Custom RPC)"
          />
        </div>

        {/* Example 3: Single custom token */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Single Custom Token</h3>
          <p className="text-sm text-gray-600 mb-3">
            Support just one specific token.
          </p>
          <PieverseReceipt
            tx={txHash}
            chain="bsc"
            customTokens={[
              {
                address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
                symbol: "CAKE",
                decimals: 18,
              },
            ]}
            label="Download CAKE Receipt"
          />
        </div>

        {/* Example 4: Token with custom decimals */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Token with Custom Decimals</h3>
          <p className="text-sm text-gray-600 mb-3">
            Some tokens use different decimal places (e.g., 6 or 8 instead of 18).
          </p>
          <PieverseReceipt
            tx={txHash}
            chain="bsc"
            customTokens={[
              {
                address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
                symbol: "USDC",
                decimals: 6, // USDC on some chains uses 6 decimals
                name: "USD Coin",
              },
            ]}
            label="Download USDC Receipt"
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold text-blue-900 mb-2">💡 How It Works</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>The component automatically detects if the transaction involves your custom tokens</li>
          <li>Token address matching is case-insensitive</li>
          <li>If a token is not in the custom list, it falls back to default tokens (USDT, BUSD, USDC)</li>
          <li>For unknown tokens, it will show "UNKNOWN" as the currency</li>
          <li>You can specify different decimals for accurate amount formatting</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded">
        <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Notes</h3>
        <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
          <li>Make sure the token address is correct (checksummed or lowercase)</li>
          <li>Verify the decimals value matches the token's actual decimals</li>
          <li>Custom RPC endpoints should support standard Ethereum JSON-RPC methods</li>
          <li>Transaction parsing is cached, so repeated calls are fast</li>
        </ul>
      </div>
    </div>
  );
}

// Example: Fetching token info dynamically
async function getTokenInfo(tokenAddress: string): Promise<TokenConfig> {
  // In a real app, you might fetch this from an API or blockchain
  // For example, using viem to call token contract methods
  
  // Pseudo-code:
  // const symbol = await tokenContract.read.symbol();
  // const decimals = await tokenContract.read.decimals();
  // const name = await tokenContract.read.name();
  
  return {
    address: tokenAddress,
    symbol: "CUSTOM", // Replace with actual symbol
    decimals: 18,     // Replace with actual decimals
    name: "Custom Token", // Replace with actual name
  };
}

// Example: Helper to create custom token list
export function createTokenList(...tokens: TokenConfig[]): TokenConfig[] {
  return tokens;
}

// Usage:
// const myTokens = createTokenList(
//   { address: "0x...", symbol: "TOKEN1", decimals: 18 },
//   { address: "0x...", symbol: "TOKEN2", decimals: 6 },
// );
