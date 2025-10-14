/**
 * Basic Usage Example
 * Demonstrates the simplest way to use PieverseReceipt
 */

import React from "react";
import { PieverseReceipt } from "@pieverse/receipt";

export default function BasicExample() {
  // Replace with a real BSC transaction hash
  const txHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Basic Usage Example</h1>
      <p className="mb-4 text-gray-600">
        Click the button to generate a receipt from a BSC transaction.
      </p>

      <PieverseReceipt
        tx={txHash}
        chain="bsc"
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
