/**
 * Custom Branding Example
 * Demonstrates how to add custom partner branding to receipts
 */

import React from "react";
import { PieverseReceipt } from "@pieverse/receipt";

export default function CustomBrandingExample() {
  const txHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

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
          <PieverseReceipt tx={txHash} chain="bsc" label="Download (Default)" />
        </div>

        {/* Custom branding example 1 */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Custom Branding - Purple Theme</h3>
          <PieverseReceipt
            tx={txHash}
            chain="bsc"
            brandConfig={{
              partnerName: "My DApp",
              primaryColor: "#9333ea",
              secondaryColor: "#10b981",
            }}
            label="Download (Purple Theme)"
          />
        </div>

        {/* Custom branding example 2 */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Custom Branding - Orange Theme</h3>
          <PieverseReceipt
            tx={txHash}
            chain="bsc"
            brandConfig={{
              partnerName: "Pudgy Penguins",
              primaryColor: "#f97316",
              secondaryColor: "#06b6d4",
              logoUrl: "https://example.com/pudgy-logo.png",
            }}
            label="Download (Orange Theme)"
          />
        </div>

        {/* Minimal branding */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">No Partner Branding</h3>
          <PieverseReceipt
            tx={txHash}
            chain="bsc"
            includeTheme={false}
            label="Download (Minimal)"
          />
        </div>
      </div>
    </div>
  );
}
