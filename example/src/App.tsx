import { PieverseReceipt } from "pieverse-receipt";
import type { BrandConfig, TaxMetadata } from "pieverse-receipt";
import { ReceiptForm } from "./components/ReceiptForm";
import "./App.css";

function App() {
  // Real BNB Chain transaction hash for demonstration
  // This is an actual confirmed transaction on BSC mainnet
  const exampleTransactions = {
    bsc: "0x322881d146fc1fcc7b563ada4dd4df57e3f941320bb4645cb79dedb9af72fd9f",
    ethereum: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    polygon: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
  };

  // Example brand configurations
  const defaultBrand: BrandConfig = {
    partnerName: "Pieverse Demo",
    primaryColor: "#667eea",
  };

  const customBrand1: BrandConfig = {
    partnerName: "Your Company",
    logoUrl: "https://via.placeholder.com/150x50/4F46E5/FFFFFF?text=Your+Logo",
    primaryColor: "#4F46E5",
    secondaryColor: "#818CF8",
  };

  const customBrand2: BrandConfig = {
    partnerName: "Green Brand",
    logoUrl: "https://via.placeholder.com/150x50/059669/FFFFFF?text=Green+Brand",
    primaryColor: "#059669",
    secondaryColor: "#34D399",
  };

  // Example tax metadata
  const usTaxMetadata: TaxMetadata = {
    userRole: "creator",
    jurisdiction: {
      country: "US",
      countryName: "United States",
      state: "CA",
      stateName: "California",
    },
    transactionType: "business_income",
  };

  const euTaxMetadata: TaxMetadata = {
    userRole: "creator",
    jurisdiction: {
      country: "DE",
      countryName: "Germany",
    },
    transactionType: "business_income",
  };

  const sgTaxMetadata: TaxMetadata = {
    userRole: "creator",
    jurisdiction: {
      country: "SG",
      countryName: "Singapore",
    },
    transactionType: "business_income",
  };

  const handleDownload = (success: boolean, error?: string) => {
    if (success) {
      console.log("✅ Receipt downloaded successfully!");
    } else {
      console.error("❌ Download failed:", error);
    }
  };

  return (
    <div className="container">
      <h1>Pieverse Receipt Examples</h1>
      <p className="intro">
        Interactive examples demonstrating the Pieverse Receipt component. Click any button to generate a receipt PDF
        from a blockchain transaction.
      </p>

      {/* Interactive Form Section */}
      <ReceiptForm />

      <hr style={{ margin: "4rem 0", border: "none", borderTop: "2px solid #333" }} />

      <h2>Pre-configured Examples</h2>
      <p className="intro" style={{ marginTop: "1rem" }}>
        Below are pre-configured examples showcasing various features and use cases.
      </p>

      <div className="info-section">
        <h3>Features Demonstrated</h3>
        <ul>
          <li>✅ One-click PDF generation from transaction hashes</li>
          <li>✅ Multi-chain support (BSC, Ethereum, Polygon, Arbitrum, Optimism, Base)</li>
          <li>✅ Tax compliance for multiple jurisdictions (US, EU, UK, SG, etc.)</li>
          <li>✅ Custom branding with logos and colors</li>
          <li>✅ Progressive PDF download for mobile wallets</li>
          <li>✅ Automatic token detection and formatting</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>✨ Live Demo</h3>
        <p>The BSC examples below use a real confirmed transaction on BNB Smart Chain:</p>
        <ul>
          <li>
            <strong>Tx Hash:</strong> <code>0xe742...b909</code>
          </li>
          <li>The component automatically fetches transaction data from BSC</li>
          <li>Try clicking any button to generate a PDF receipt!</li>
          <li>
            <strong>Note:</strong> The component requires simple payment transactions (token transfers). If you see an
            error about "contract interaction", the transaction may be a smart contract call rather than a direct
            payment.
          </li>
          <li>For testing, use transaction hashes from wallet-to-wallet transfers of USDT, BNB, or other tokens</li>
        </ul>
      </div>

      <h2>Chain-Specific Examples</h2>
      <div className="example-grid">
        <div className="example-card">
          <h3>BSC (BNB Smart Chain)</h3>
          <p>
            Generate a receipt for a BSC transaction with US tax compliance metadata. The component will automatically
            detect USDT, BNB, and other BSC tokens.
          </p>
          <div className="receipt-wrapper">
            <PieverseReceipt
              tx={exampleTransactions.bsc}
              chain="bsc"
              brandConfig={defaultBrand}
              taxMetadata={usTaxMetadata}
              onDownload={handleDownload}
              label="Download BSC Receipt"
            />
          </div>
        </div>

        <div className="example-card">
          <h3>Button Variants</h3>
          <p>Different button styles for integration flexibility. Choose from button, icon, or link variants.</p>
          <div className="receipt-wrapper" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <PieverseReceipt
              tx={exampleTransactions.bsc}
              chain="bsc"
              variant="button"
              label="Button Style"
              onDownload={handleDownload}
            />
            <PieverseReceipt tx={exampleTransactions.bsc} chain="bsc" variant="icon" onDownload={handleDownload} />
            <PieverseReceipt
              tx={exampleTransactions.bsc}
              chain="bsc"
              variant="link"
              label="Link Style"
              onDownload={handleDownload}
            />
          </div>
        </div>

        <div className="example-card">
          <h3>Tax Jurisdictions</h3>
          <p>Demonstrate different tax jurisdictions. Each generates compliant tax forms for the specified region.</p>
          <div className="receipt-wrapper" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <PieverseReceipt
              tx={exampleTransactions.bsc}
              chain="bsc"
              taxMetadata={usTaxMetadata}
              label="US Tax (California)"
              onDownload={handleDownload}
            />
            <PieverseReceipt
              tx={exampleTransactions.bsc}
              chain="bsc"
              taxMetadata={euTaxMetadata}
              label="EU Tax (Germany)"
              onDownload={handleDownload}
            />
            <PieverseReceipt
              tx={exampleTransactions.bsc}
              chain="bsc"
              taxMetadata={sgTaxMetadata}
              label="Singapore Tax"
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>

      <h2>Custom Branding</h2>
      <div className="example-grid">
        <div className="example-card">
          <h3>Custom Logo & Colors #1</h3>
          <p>White-label solution with custom branding. Perfect for integrating into your own platform.</p>
          <div className="receipt-wrapper">
            <PieverseReceipt
              tx={exampleTransactions.bsc}
              chain="bsc"
              brandConfig={customBrand1}
              onDownload={handleDownload}
              label="Download with Brand 1"
            />
          </div>
        </div>

        <div className="example-card">
          <h3>Custom Logo & Colors #2</h3>
          <p>Another branding example with different colors to match your company identity.</p>
          <div className="receipt-wrapper">
            <PieverseReceipt
              tx={exampleTransactions.bsc}
              chain="bsc"
              brandConfig={customBrand2}
              onDownload={handleDownload}
              label="Download with Brand 2"
            />
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>Implementation Notes</h3>
        <ul>
          <li>
            <strong>Transaction Parsing:</strong> The component automatically fetches and parses blockchain transactions
            using chain-specific APIs
          </li>
          <li>
            <strong>Tax Compliance:</strong> Tax forms are automatically included based on jurisdiction metadata
          </li>
          <li>
            <strong>PDF Generation:</strong> Progressive download for mobile wallets, direct download for desktop
            browsers
          </li>
          <li>
            <strong>Explorer Links:</strong> Automatic blockchain explorer links included for transaction verification
          </li>
          <li>
            <strong>Token Detection:</strong> Supports USDT, USDC, BUSD, native tokens, and custom ERC-20 tokens
          </li>
        </ul>
      </div>

      <div className="info-section">
        <h3>Quick Start</h3>
        <p>Install the package:</p>
        <pre>
          <code>npm install @pieverse/receipt</code>
        </pre>
        <p>Import and use:</p>
        <pre>
          <code>{`import { PieverseReceipt } from '@pieverse/receipt';

function MyComponent() {
  return (
    <PieverseReceipt
      tx="0x123..."
      chain="bsc"
      brandConfig={{
        partnerName: "My DApp",
        logoUrl: "https://your-logo.png",
        primaryColor: "#4F46E5"
      }}
      taxMetadata={{
        userRole: "creator",
        jurisdiction: {
          country: "US",
          countryName: "United States"
        },
        transactionType: "business_income"
      }}
      onDownload={(success) => {
        console.log(success ? 'Success!' : 'Failed');
      }}
    />
  );
}`}</code>
        </pre>
      </div>
    </div>
  );
}

export default App;
