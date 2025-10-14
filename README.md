# @pieverse/receipt

> One-click receipt generation for Web3 transactions with tax compliance

[![npm version](https://badge.fury.io/js/@pieverse%2Freceipt.svg)](https://www.npmjs.com/package/@pieverse/receipt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🚀 **One-Click Generation** - Generate professional receipts from any blockchain transaction
- 🎨 **Custom Branding** - Add your logo and brand colors to receipts
- 🌐 **Multi-Chain Support** - BSC, Ethereum, Polygon, and more (coming soon)
- 📱 **Mobile Optimized** - Works seamlessly on wallet browsers and mobile devices
- 🔒 **Privacy First** - Tax data never leaves the client
- 📄 **PDF Export** - High-quality PDF receipts with progressive download strategies
- 🎯 **TypeScript** - Full type safety out of the box
- 🪶 **Lightweight** - Small bundle size with tree-shaking support

## 📦 Installation

```bash
npm install @pieverse/receipt
# or
yarn add @pieverse/receipt
# or
pnpm add @pieverse/receipt
```

## 🚀 Quick Start

```tsx
import { PieverseReceipt } from '@pieverse/receipt';

function App() {
  return (
    <PieverseReceipt
      tx="0xabcdef..."
      chain="bsc"
      onDownload={(success) => {
        console.log('Receipt downloaded:', success);
      }}
    />
  );
}
```

That's it! Your users can now download professional receipts for their transactions.

## 📖 Usage Examples

### Basic Usage

```tsx
<PieverseReceipt tx="0xabcdef..." chain="bsc" />
```

### With Custom Branding

```tsx
<PieverseReceipt
  tx="0xabcdef..."
  chain="bsc"
  brandConfig={{
    partnerName: "My DApp",
    logoUrl: "/my-logo.png",
    primaryColor: "#9333ea",
    secondaryColor: "#10b981"
  }}
/>
```

### Different Button Variants

```tsx
{/* Default button */}
<PieverseReceipt tx="0x..." variant="button" label="Download Receipt" />

{/* Icon button */}
<PieverseReceipt tx="0x..." variant="icon" />

{/* Link style */}
<PieverseReceipt tx="0x..." variant="link" label="Get Receipt" />

{/* Custom styled */}
<PieverseReceipt
  tx="0x..."
  className="px-6 py-3 bg-purple-600 text-white rounded-lg"
/>
```

### With Callbacks

```tsx
<PieverseReceipt
  tx="0xabcdef..."
  chain="bsc"
  onGenerate={(invoice) => {
    console.log('Invoice generated:', invoice);
    // Track analytics, update UI, etc.
  }}
  onDownload={(success, error) => {
    if (success) {
      showSuccessToast('Receipt downloaded!');
    } else {
      showErrorToast(`Failed: ${error}`);
    }
  }}
/>
```

## 🎨 Customization

### Brand Configuration

Customize the receipt appearance with your brand:

```tsx
interface BrandConfig {
  partnerName?: string;        // Your DApp name
  logoUrl?: string;            // URL to your logo
  primaryColor?: string;       // Primary brand color (hex)
  secondaryColor?: string;     // Secondary color (hex)
  backgroundColor?: string;    // Background color
  textColor?: string;          // Text color
}
```

### Button Variants

Choose from three built-in variants or use custom styling:

- `button` - Standard button (default)
- `icon` - Compact icon button
- `link` - Text link style

## 🌍 Supported Chains

| Chain | Status | Chain ID |
|-------|--------|----------|
| BSC (BNB Smart Chain) | ✅ Ready | 56 |
| Ethereum | 🔜 Coming Soon | 1 |
| Polygon | 🔜 Coming Soon | 137 |
| Arbitrum | 🔜 Coming Soon | 42161 |

## 📚 API Reference

### `<PieverseReceipt>`

Main component for receipt generation.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tx` | `string` | **required** | Transaction hash |
| `chain` | `'bsc' \| 'ethereum' \| 'polygon'` | `'bsc'` | Blockchain network |
| `brandConfig` | `BrandConfig` | `undefined` | Custom branding |
| `variant` | `'button' \| 'icon' \| 'link'` | `'button'` | Button style |
| `label` | `string` | `'Download Receipt'` | Button text |
| `className` | `string` | `undefined` | Custom CSS class |
| `includeTheme` | `boolean` | `true` | Include partner branding |
| `taxMetadata` | `TaxMetadata` | `undefined` | Tax compliance data |
| `onGenerate` | `(invoice: Invoice) => void` | `undefined` | Called after parsing |
| `onDownload` | `(success: boolean, error?: string) => void` | `undefined` | Called after download |

### Utility Functions

```tsx
import {
  parseBscTransaction,     // Parse a BSC transaction
  downloadReceiptPDF,      // Generate and download PDF
  formatAddress,           // Format wallet addresses
  formatCurrencyAmount,    // Format amounts with proper decimals
  getExplorerLink,         // Get block explorer link
} from '@pieverse/receipt';
```

## 🏗️ Advanced Usage

### Headless API

For custom implementations without the UI component:

```tsx
import { parseBscTransaction, downloadReceiptPDF } from '@pieverse/receipt';

async function customDownload(txHash: string) {
  // Parse transaction
  const invoice = await parseBscTransaction(txHash);
  
  // Generate and download PDF
  const result = await downloadReceiptPDF(
    invoice,
    { partnerName: 'My DApp' },
    true  // Include branding
  );
  
  if (result.success) {
    console.log('Downloaded via:', result.method);
  }
}
```

### Transaction Parser

Parse transactions without generating receipts:

```tsx
import { parseBscTransaction } from '@pieverse/receipt';

const invoice = await parseBscTransaction('0xabcdef...');
console.log(invoice);
// {
//   id: '0xabcdef...',
//   amount: '100.00',
//   currency: 'USDT',
//   creatorAddress: '0x...',
//   recipientAddress: '0x...',
//   // ... more fields
// }
```

## 🎯 Use Cases

- **DeFi Protocols** - Receipts for swaps, stakes, and yields
- **NFT Marketplaces** - Purchase receipts for tax reporting
- **DAOs** - Contributor payment receipts
- **Payroll Apps** - Employee payment documentation
- **Payment Gateways** - Merchant transaction receipts

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run type checking
pnpm typecheck
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Mobile wallet browsers (MetaMask, Trust Wallet, Binance Wallet, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © TimePot Team

## 🙏 Acknowledgments

Built with:
- [@react-pdf/renderer](https://react-pdf.org/) - PDF generation
- [viem](https://viem.sh/) - Ethereum utilities
- [date-fns](https://date-fns.org/) - Date formatting

## 📞 Support

- 📧 Email: support@pieverse.io
- 💬 Discord: [Join our community](https://discord.gg/pieverse)
- 🐛 Issues: [GitHub Issues](https://github.com/timepot/pieverse-receipt/issues)

## 🗺️ Roadmap

- [x] BSC support
- [x] Custom branding
- [x] Mobile optimization
- [ ] Ethereum support
- [ ] Polygon support
- [ ] Tax compliance engine
- [ ] Wallet signature verification
- [ ] Multi-language support
- [ ] Theme marketplace

---

**Made with ❤️ by the TimePot team**

