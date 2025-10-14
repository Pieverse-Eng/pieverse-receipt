/**
 * Button Variants Example
 * Demonstrates different button styles and variants
 */

import React from "react";
import { PieverseReceipt } from "@pieverse/receipt";

export default function ButtonVariantsExample() {
  const txHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Button Variants Example</h1>
      <p className="mb-6 text-gray-600">Different ways to display the receipt download button.</p>

      <div className="space-y-6">
        {/* Default button variant */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Default Button</h3>
          <PieverseReceipt tx={txHash} chain="bsc" variant="button" label="Download Receipt" />
        </div>

        {/* Icon variant */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Icon Button</h3>
          <PieverseReceipt tx={txHash} chain="bsc" variant="icon" label="Download Receipt" />
        </div>

        {/* Link variant */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Link Style</h3>
          <PieverseReceipt tx={txHash} chain="bsc" variant="link" label="Download Receipt" />
        </div>

        {/* Custom styled button */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Custom Styled Button</h3>
          <PieverseReceipt
            tx={txHash}
            chain="bsc"
            variant="button"
            label="Get My Receipt"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
