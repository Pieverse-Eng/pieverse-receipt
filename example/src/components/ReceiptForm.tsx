import { useState } from "react";
import { PieverseReceipt } from "pieverse-receipt";
import type { BrandConfig, TaxMetadata, TransactionType, UserRole } from "pieverse-receipt";

// Import jurisdiction utilities - we'll need to export these from the main package
const jurisdictions = [
  { value: "US", label: "🇺🇸 United States" },
  { value: "UK", label: "🇬🇧 United Kingdom" },
  { value: "SG", label: "🇸🇬 Singapore" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "AU", label: "🇦🇺 Australia" },
  { value: "DE", label: "🇩🇪 Germany" },
  { value: "JP", label: "🇯🇵 Japan" },
  { value: "FR", label: "🇫🇷 France" },
  { value: "HK", label: "🇭🇰 Hong Kong" },
  { value: "CH", label: "🇨🇭 Switzerland" },
  { value: "BD", label: "🇧🇩 Bangladesh" },
  { value: "VN", label: "🇻🇳 Vietnam" },
  { value: "PK", label: "🇵🇰 Pakistan" },
  { value: "TW", label: "🇹🇼 Taiwan" },
  { value: "UA", label: "🇺🇦 Ukraine" },
  { value: "IN", label: "🇮🇳 India" },
  { value: "ID", label: "🇮🇩 Indonesia" },
  { value: "KR", label: "🇰🇷 South Korea" },
];

const usStates = [
  { value: "CA", label: "California" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
  { value: "FL", label: "Florida" },
  { value: "IL", label: "Illinois" },
  { value: "WA", label: "Washington" },
  { value: "MA", label: "Massachusetts" },
];

const transactionTypes: Array<{ value: TransactionType; label: string; category: string }> = [
  { value: "business_income", label: "Business Income", category: "Income" },
  { value: "personal_income", label: "Personal Income", category: "Income" },
  { value: "capital_gain", label: "Capital Gain", category: "Income" },
  { value: "gift_received", label: "Gift Received", category: "Income" },
  { value: "royalty", label: "Royalty", category: "Income" },
  { value: "other_income", label: "Other Income", category: "Income" },
  { value: "business_expense", label: "Business Expense", category: "Expense" },
  { value: "personal_expense", label: "Personal Expense", category: "Expense" },
  { value: "capital_loss", label: "Capital Loss", category: "Expense" },
  { value: "gift_given", label: "Gift Given", category: "Expense" },
  { value: "charitable_donation", label: "Charitable Donation", category: "Expense" },
  { value: "other_expense", label: "Other Expense", category: "Expense" },
];

export function ReceiptForm() {
  // Receipt mode
  const [includeTaxInfo, setIncludeTaxInfo] = useState(false);

  // Transaction details
  const [txHash, setTxHash] = useState("0xe74240d638ae8d8407cc7a3d2a9b492dfb2c9ea9545c86fb048157146563b909");
  const [chain, setChain] = useState<"bsc" | "ethereum" | "polygon">("bsc");

  // Tax metadata
  const [userRole, setUserRole] = useState<UserRole>("creator");
  const [country, setCountry] = useState("US");
  const [state, setState] = useState("CA");
  const [transactionType, setTransactionType] = useState<TransactionType>("business_income");
  const [taxId, setTaxId] = useState("");
  const [businessName, setBusinessName] = useState("");

  // Branding
  const [companyName, setCompanyName] = useState("My Company");
  const [logoUrl, setLogoUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#4F46E5");

  const [status, setStatus] = useState<string>("");

  const handleDownload = (success: boolean, error?: string) => {
    if (success) {
      setStatus("✅ Receipt downloaded successfully!");
    } else {
      setStatus(`❌ Download failed: ${error}`);
    }
  };

  // Build tax metadata (only if tax-compliant mode is enabled)
  const taxMetadata: TaxMetadata | undefined =
    includeTaxInfo && country
      ? {
          userRole,
          jurisdiction: {
            country,
            countryName: jurisdictions.find((j) => j.value === country)?.label.split(" ")[1] || country,
            ...(country === "US" && state ? { state, stateName: usStates.find((s) => s.value === state)?.label } : {}),
          },
          transactionType,
          ...(taxId ? { taxId } : {}),
          ...(businessName ? { businessName } : {}),
        }
      : undefined;

  // Build brand config
  const brandConfig: BrandConfig | undefined =
    companyName || logoUrl || primaryColor
      ? {
          partnerName: companyName || undefined,
          logoUrl: logoUrl || undefined,
          primaryColor: primaryColor || undefined,
        }
      : undefined;

  const selectedJurisdiction = jurisdictions.find((j) => j.value === country);

  return (
    <div className="receipt-form-container">
      <h2>Interactive Receipt Generator</h2>
      <p className="form-description">
        Configure all parameters and generate a custom PDF receipt from any blockchain transaction.
      </p>

      {/* Receipt Mode Toggle */}
      <div className="mode-toggle-section">
        <div className="mode-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={includeTaxInfo}
              onChange={(e) => setIncludeTaxInfo(e.target.checked)}
              className="toggle-checkbox"
            />
            <span className="toggle-text">
              {includeTaxInfo ? "📊 Tax-Compliant Receipt Mode" : "📄 Simple Receipt Mode"}
            </span>
          </label>
          <p className="toggle-description">
            {includeTaxInfo
              ? "Generate receipts with tax compliance information for your jurisdiction. Includes tax forms and detailed metadata."
              : "Generate basic receipts with transaction details only. Quick and simple, no tax information required."}
          </p>
        </div>
      </div>

      <div className="form-sections">
        {/* Transaction Details Section */}
        <div className="form-section">
          <h3>📝 Transaction Details</h3>
          <div className="form-group">
            <label htmlFor="chain">Blockchain</label>
            <select id="chain" value={chain} onChange={(e) => setChain(e.target.value as any)}>
              <option value="bsc">BSC (BNB Smart Chain)</option>
              <option value="ethereum">Ethereum (Coming Soon)</option>
              <option value="polygon">Polygon (Coming Soon)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="txHash">Transaction Hash</label>
            <input
              id="txHash"
              type="text"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="0x..."
            />
            <small>Enter a valid wallet-to-wallet transfer transaction hash</small>
          </div>
        </div>

        {/* Tax Metadata Section - Only shown when tax mode is enabled */}
        {includeTaxInfo && (
          <div className="form-section">
            <h3>🏛️ Tax Information</h3>
          <div className="form-group">
            <label htmlFor="userRole">Your Role</label>
            <select id="userRole" value={userRole} onChange={(e) => setUserRole(e.target.value as UserRole)}>
              <option value="creator">Creator/Sender (I sent the payment)</option>
              <option value="payer">Payer/Recipient (I received the payment)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jurisdiction">Tax Jurisdiction</label>
            <select id="jurisdiction" value={country} onChange={(e) => setCountry(e.target.value)}>
              {jurisdictions.map((j) => (
                <option key={j.value} value={j.value}>
                  {j.label}
                </option>
              ))}
            </select>
          </div>

          {country === "US" && (
            <div className="form-group">
              <label htmlFor="state">State</label>
              <select id="state" value={state} onChange={(e) => setState(e.target.value)}>
                {usStates.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="transactionType">Transaction Type</label>
            <select
              id="transactionType"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value as TransactionType)}
            >
              {["Income", "Expense"].map((category) => (
                <optgroup key={category} label={category}>
                  {transactionTypes
                    .filter((t) => t.category === category)
                    .map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="taxId">Tax ID (Optional)</label>
            <input
              id="taxId"
              type="text"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              placeholder="TIN/EIN/VAT Number"
            />
            <small>⚠️ Never stored - used only for PDF generation</small>
          </div>

          <div className="form-group">
            <label htmlFor="businessName">Business Name (Optional)</label>
            <input
              id="businessName"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Your Business Name"
            />
          </div>
        </div>
        )}

        {/* Branding Section */}
        <div className="form-section">
          <h3>🎨 Custom Branding</h3>
          <div className="form-group">
            <label htmlFor="companyName">Company/Partner Name</label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your Company Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="logoUrl">Logo URL (Optional)</label>
            <input
              id="logoUrl"
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryColor">Primary Brand Color</label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                id="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                style={{ width: "60px", height: "40px" }}
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#4F46E5"
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="preview-section">
        <h3>📄 Receipt Preview</h3>
        <div className="preview-info">
          <div className="preview-item">
            <strong>Mode:</strong> {includeTaxInfo ? "Tax-Compliant" : "Simple"}
          </div>
          <div className="preview-item">
            <strong>Chain:</strong> {chain.toUpperCase()}
          </div>
          {includeTaxInfo && (
            <>
              <div className="preview-item">
                <strong>Jurisdiction:</strong> {selectedJurisdiction?.label}
                {country === "US" && state && ` - ${usStates.find((s) => s.value === state)?.label}`}
              </div>
              <div className="preview-item">
                <strong>Role:</strong> {userRole === "creator" ? "Sender" : "Recipient"}
              </div>
              <div className="preview-item">
                <strong>Type:</strong> {transactionTypes.find((t) => t.value === transactionType)?.label}
              </div>
              {businessName && (
                <div className="preview-item">
                  <strong>Business:</strong> {businessName}
                </div>
              )}
              {taxId && (
                <div className="preview-item">
                  <strong>Tax ID:</strong> {taxId.substring(0, 3)}***
                </div>
              )}
            </>
          )}
          <div className="preview-item">
            <strong>Branding:</strong> {companyName || "Default"}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="generate-section">
        <PieverseReceipt
          tx={txHash}
          chain={chain}
          brandConfig={brandConfig}
          taxMetadata={taxMetadata}
          onDownload={handleDownload}
          label="🚀 Generate & Download Receipt"
          className="generate-button"
        />
        {status && (
          <div className={`status-message ${status.includes("✅") ? "success" : "error"}`}>{status}</div>
        )}
      </div>

      <div className="info-box">
        <h4>💡 How to Use</h4>
        <ol>
          <li>Choose between Simple or Tax-Compliant receipt mode</li>
          <li>Enter a valid transaction hash from a wallet-to-wallet token transfer</li>
          {includeTaxInfo && <li>Select your tax jurisdiction and transaction type</li>}
          <li>Customize branding with your company name and colors</li>
          <li>Click the generate button to download your PDF receipt</li>
        </ol>
        {includeTaxInfo && (
          <p>
            <strong>🔒 Privacy Note:</strong> Tax ID and business information are never stored or transmitted - they are
            only used locally in your browser to generate your PDF.
          </p>
        )}
      </div>
    </div>
  );
}
