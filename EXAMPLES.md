# PieverseReceipt Usage Examples

This document contains example implementations of the `pieverse-receipt` component. For a full-fledged demo application, see the `/example` directory.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Custom Branding](#custom-branding)
3. [Button Variants](#button-variants)
4. [Advanced Callbacks](#advanced-callbacks)
5. [Custom Tokens](#custom-tokens)

---

## Basic Usage

The simplest way to use PieverseReceipt. Just pass a transaction hash and you're done!

```tsx
import React from "react";
import { PieverseReceipt } from "pieverse-receipt";

export default function BasicExample() {
  // Replace with a real BSC transaction hash
  const txHash = "0xe74240d638ae8d8407cc7a3d2a9b492dfb2c9ea9545c86fb048157146563b909";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Basic Usage Example</h1>
      <p className="mb-4 text-gray-600">
        Click the button to generate a receipt from a BSC transaction.
      </p>

      <PieverseReceipt
        txHash={txHash}
        chainId="bsc"
        onDownload={(success, error) => {
          if (success) {
            console.log("Receipt downloaded successfully!");
          } else {
            console.error("Failed to download receipt:", error);
          }
        }}
      />
    </div>
  );
}
```

---

## Custom Branding

Add your custom brand colors and logo to receipts.

```tsx
import React from "react";
import { PieverseReceipt } from "pieverse-receipt";

export default function CustomBrandingExample() {
  const txHash = "0xe74240d638ae8d8407cc7a3d2a9b492dfb2c9ea9545c86fb048157146563b909";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Custom Branding Example</h1>
      <p className="mb-4 text-gray-600">
        Generate receipts with your custom brand colors and logo.
      </p>

      <div className="space-y-4">
        {/* Default Pieverse branding */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Default Pieverse Branding</h3>
          <PieverseReceipt txHash={txHash} chainId="bsc" />
        </div>

        {/* Custom branding example 1 */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Custom Branding - Purple Theme</h3>
          <PieverseReceipt
            txHash={txHash}
            chainId="bsc"
            branding={{
              companyName: "My DApp",
              primaryColor: "#9333ea",
              logo: "https://example.com/logo.png",
            }}
          />
        </div>

        {/* Custom branding example 2 */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Custom Branding - Orange Theme</h3>
          <PieverseReceipt
            txHash={txHash}
            chainId="bsc"
            branding={{
              companyName: "Pudgy Penguins",
              primaryColor: "#f97316",
              logo: "https://example.com/pudgy-logo.png",
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

---

## Button Variants

Different button styles: default button, custom styled, and more.

```tsx
import React from "react";
import { PieverseReceipt } from "pieverse-receipt";

export default function ButtonVariantsExample() {
  const txHash = "0xe74240d638ae8d8407cc7a3d2a9b492dfb2c9ea9545c86fb048157146563b909";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Button Variants Example</h1>
      <p className="mb-6 text-gray-600">Different ways to display the receipt download button.</p>

      <div className="space-y-6">
        {/* Default button */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Default Button</h3>
          <PieverseReceipt txHash={txHash} chainId="bsc" />
        </div>

        {/* Custom styled button */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Custom Styled Button</h3>
          <PieverseReceipt
            txHash={txHash}
            chainId="bsc"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
```

---

## Advanced Callbacks

Track receipt generation and download events with callbacks.

```tsx
import React, { useState } from "react";
import { PieverseReceipt } from "pieverse-receipt";
import type { Invoice } from "pieverse-receipt";

export default function AdvancedCallbacksExample() {
  const [status, setStatus] = useState<string>("Ready");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [downloadCount, setDownloadCount] = useState(0);

  const txHash = "0xe74240d638ae8d8407cc7a3d2a9b492dfb2c9ea9545c86fb048157146563b909";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Advanced Callbacks Example</h1>
      <p className="mb-6 text-gray-600">Track receipt generation and download events.</p>

      <div className="border p-4 rounded mb-6">
        <PieverseReceipt
          txHash={txHash}
          chainId="bsc"
          onGenerate={(generatedInvoice) => {
            setStatus("Receipt generated, preparing download...");
            setInvoice(generatedInvoice);
            console.log("Generated invoice:", generatedInvoice);
          }}
          onDownload={(success, error) => {
            if (success) {
              setStatus("✅ Receipt downloaded successfully!");
              setDownloadCount((prev) => prev + 1);
            } else {
              setStatus(`❌ Download failed: ${error}`);
            }
          }}
        />
      </div>

      {/* Status Display */}
      <div className="bg-gray-100 p-4 rounded space-y-2">
        <div>
          <span className="font-semibold">Status:</span> {status}
        </div>
        <div>
          <span className="font-semibold">Download Count:</span> {downloadCount}
        </div>
        {invoice && (
          <div>
            <span className="font-semibold">Last Invoice:</span>
            <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">
              {JSON.stringify(
                {
                  id: invoice.id,
                  amount: invoice.amount,
                  currency: invoice.currency,
                  from: invoice.from,
                  to: invoice.to,
                },
                null,
                2,
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Custom Tokens

Add support for custom ERC20 tokens.

```tsx
import React from "react";
import { PieverseReceipt, type CustomToken } from "pieverse-receipt";

export default function CustomTokensExample() {
  const txHash = "0xe74240d638ae8d8407cc7a3d2a9b492dfb2c9ea9545c86fb048157146563b909";

  // Define your custom tokens
  const customTokens: CustomToken[] = [
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
            txHash={txHash}
            chainId="bsc"
            customTokens={customTokens}
            onDownload={(success, error) => {
              if (success) {
                console.log("Receipt generated successfully!");
              } else {
                console.error("Failed:", error);
              }
            }}
          />
        </div>

        {/* Example 2: Single custom token */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Single Custom Token</h3>
          <p className="text-sm text-gray-600 mb-3">
            Support just one specific token.
          </p>
          <PieverseReceipt
            txHash={txHash}
            chainId="bsc"
            customTokens={[
              {
                address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
                symbol: "CAKE",
                decimals: 18,
              },
            ]}
          />
        </div>

        {/* Example 3: Token with custom decimals */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Token with Custom Decimals</h3>
          <p className="text-sm text-gray-600 mb-3">
            Some tokens use different decimal places (e.g., 6 or 8 instead of 18).
          </p>
          <PieverseReceipt
            txHash={txHash}
            chainId="bsc"
            customTokens={[
              {
                address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
                symbol: "USDC",
                decimals: 6, // USDC on some chains uses 6 decimals
                name: "USD Coin",
              },
            ]}
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
          <li>Transaction parsing is cached, so repeated calls are fast</li>
        </ul>
      </div>
    </div>
  );
}
```

---

## Testing with Real Transactions

Replace the example transaction hash with real BSC transactions:

```tsx
// Example BNB transfer on BSC
const txHash = '0xe74240d638ae8d8407cc7a3d2a9b492dfb2c9ea9545c86fb048157146563b909';

// Find more transaction hashes on BSCScan: https://bscscan.com
```

## Running Examples

### Option 1: Use the Example App

The `/example` directory contains a full-fledged React application showcasing all features:

```bash
cd example
npm install
npm run dev
```

### Option 2: Copy into Your App

Copy any example code into your React or Next.js application:

1. Install the package: `npm install pieverse-receipt`
2. Copy the example code into your component
3. Import and use the component

## Notes

- Make sure your app has React 18+ installed
- The component works in both client and server components (Next.js)
- For production use, handle loading states and errors appropriately
- Tailwind CSS is recommended but not required for styling
