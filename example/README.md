# Pieverse Receipt - Example Application

This is a comprehensive example application showcasing the **Pieverse Receipt** component with various configurations and use cases.

## 🎯 What This Example Demonstrates

### Multi-Chain Support
- **BSC (BNB Smart Chain)**: USDT payment example with US tax jurisdiction
- **Ethereum Mainnet**: ETH payment example with EU tax jurisdiction
- **Polygon**: USDC payment example with Singapore tax jurisdiction
- Support for Arbitrum, Optimism, and Base (easily extendable)

### Tax Compliance
- Automatic tax forms based on jurisdiction (US, EU, UK, Singapore, etc.)
- Tax metadata rendering
- Blockchain transaction linking for audit trail

### Custom Branding
- Logo customization
- Brand color theming
- White-label ready

### Advanced Features
- Progressive PDF download for mobile wallet browsers
- Blockchain explorer integration
- Token detection (USDT, USDC, BUSD, native tokens)
- TypeScript type safety throughout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (compatible with Node 21)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Other Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
example/
├── src/
│   ├── App.tsx          # Main example component with all demos
│   ├── App.css          # Example-specific styling
│   ├── main.tsx         # React entry point
│   └── index.css        # Global base styling
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration with path alias
├── tsconfig.json        # TypeScript configuration
├── tsconfig.app.json    # App-specific TypeScript config
└── README.md            # This file
```

## 💡 Usage Examples

### Basic Usage

```tsx
import { PieverseReceipt } from 'pieverse-receipt';
import type { BlockchainInvoice } from 'pieverse-receipt';

const invoice: BlockchainInvoice = {
  id: 'INV-001',
  invoiceNumber: 'INV-001',
  date: '2024-01-15',
  status: 'paid',
  from: {
    name: 'Alice Johnson',
    address: '123 Main St',
    email: 'alice@example.com',
  },
  to: {
    name: 'Acme Corp',
    address: '456 Business Ave',
    email: 'billing@acme.com',
  },
  items: [
    {
      description: 'Services',
      quantity: 1,
      unitPrice: 5000,
      amount: 5000,
      tax: 0,
    },
  ],
  subtotal: 5000,
  tax: 0,
  total: 5000,
  currency: 'USD',
  blockchain: {
    chain: 'bsc',
    txHash: '0x123...',
    fromAddress: '0xabc...',
    toAddress: '0xdef...',
    amount: '5000',
    token: 'USDT',
    timestamp: 1705305600,
    blockNumber: 35000000,
  },
  tax_jurisdiction: 'US',
};

function App() {
  return <PieverseReceipt invoice={invoice} />;
}
```

### With Custom Branding

```tsx
<PieverseReceipt 
  invoice={invoice}
  logoUrl="https://your-company.com/logo.png"
  brandColor="#4F46E5"
/>
```

### Different Chains

```tsx
// Ethereum
const ethInvoice = {
  ...invoice,
  blockchain: {
    chain: 'ethereum',
    txHash: '0xabc...',
    // ... other fields
    token: 'ETH',
  },
};

// Polygon
const polygonInvoice = {
  ...invoice,
  blockchain: {
    chain: 'polygon',
    txHash: '0xdef...',
    // ... other fields
    token: 'USDC',
  },
};
```

### Different Tax Jurisdictions

```tsx
// US Tax
const usInvoice = { ...invoice, tax_jurisdiction: 'US' };

// EU Tax
const euInvoice = { ...invoice, tax_jurisdiction: 'EU' };

// UK Tax
const ukInvoice = { ...invoice, tax_jurisdiction: 'UK' };

// Singapore Tax
const sgInvoice = { ...invoice, tax_jurisdiction: 'SG' };
```

## 🎨 Customization

### Branding Options

The component accepts the following customization props:

- `logoUrl` (string): URL to your company logo
- `brandColor` (string): Primary brand color (hex format)

### Supported Chains

- `bsc` - BNB Smart Chain
- `ethereum` - Ethereum Mainnet
- `polygon` - Polygon PoS
- `arbitrum` - Arbitrum One
- `optimism` - Optimism
- `base` - Base

### Supported Tax Jurisdictions

- `US` - United States
- `EU` - European Union
- `UK` - United Kingdom
- `SG` - Singapore
- `CA` - Canada
- `AU` - Australia
- `JP` - Japan
- `IN` - India
- `BR` - Brazil

## 🔍 Features in Detail

### Transaction Validation
Each transaction is automatically validated against blockchain data to ensure authenticity.

### Tax Compliance Forms
Tax forms are automatically included based on the `tax_jurisdiction` field, ensuring compliance with local regulations.

### PDF Generation
- **Desktop browsers**: Direct download
- **Mobile wallet browsers**: Progressive download with chunked generation

### Explorer Links
Automatic blockchain explorer links are generated for each transaction, allowing users to verify on-chain.

### Token Detection
Supports multiple token types:
- Stablecoins: USDT, USDC, BUSD, DAI
- Native tokens: ETH, BNB, MATIC, etc.
- Custom ERC-20 tokens

## 📚 Learn More

- [Main Documentation](../README.md)
- [Component API](../docs/api.md)
- [Tax Compliance Guide](../docs/tax-compliance.md)
- [Chain Integration Guide](../docs/chains.md)

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Ensure you're using Node.js 18+
```bash
node --version
```

### Type Errors

Make sure the path alias is correctly set in `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "pieverse-receipt": ["../src"]
    }
  }
}
```

### Import Errors

If imports fail, check that `vite.config.ts` has the correct alias:

```ts
export default defineConfig({
  resolve: {
    alias: {
      'pieverse-receipt': path.resolve(__dirname, '../src'),
    },
  },
});
```

## 🤝 Contributing

Found a bug or want to contribute? Please see the [main contributing guide](../CONTRIBUTING.md).

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
