/**
 * Advanced Callbacks Example
 * Demonstrates how to use callbacks and handle events
 */

import React, { useState } from "react";
import { PieverseReceipt } from "@pieverse/receipt";
import type { Invoice } from "@pieverse/receipt";

export default function AdvancedCallbacksExample() {
  const [status, setStatus] = useState<string>("Ready");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [downloadCount, setDownloadCount] = useState(0);

  const txHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Advanced Callbacks Example</h1>
      <p className="mb-6 text-gray-600">Track receipt generation and download events.</p>

      <div className="border p-4 rounded mb-6">
        <PieverseReceipt
          tx={txHash}
          chain="bsc"
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
          label="Generate Receipt"
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
                  from: invoice.creatorAddress,
                  to: invoice.recipientAddress,
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
