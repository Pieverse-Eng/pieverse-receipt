# PieverseReceipt Examples

This directory contains example implementations of the `@pieverse/receipt` component.

## Examples

### 1. Basic Usage (`basic-usage.tsx`)
The simplest way to use PieverseReceipt. Just pass a transaction hash and you're done!

```tsx
<PieverseReceipt tx="0x..." chain="bsc" />
```

### 2. Custom Branding (`custom-branding.tsx`)
Add your custom brand colors and logo to receipts.

```tsx
<PieverseReceipt
  tx="0x..."
  brandConfig={{
    partnerName: "My DApp",
    primaryColor: "#9333ea",
    logoUrl: "/logo.png"
  }}
/>
```

### 3. Button Variants (`button-variants.tsx`)
Different button styles: default button, icon, link, and custom styled.

```tsx
<PieverseReceipt tx="0x..." variant="icon" />
<PieverseReceipt tx="0x..." variant="link" />
```

### 4. Advanced Callbacks (`advanced-callbacks.tsx`)
Track receipt generation and download events with callbacks.

```tsx
<PieverseReceipt
  tx="0x..."
  onGenerate={(invoice) => console.log('Generated:', invoice)}
  onDownload={(success) => console.log('Downloaded:', success)}
/>
```

## Running Examples

These examples are designed to be integrated into a Next.js or React application.

### Option 1: Copy into Your App
Copy any example file into your `app/` or `pages/` directory and import the component.

### Option 2: Create a Test Page
1. Install the package: `npm install @pieverse/receipt`
2. Create a new page in your app
3. Import and use any example component

## Testing with Real Transactions

Replace the example transaction hash with a real BSC transaction:

```tsx
// Example USDT transfer on BSC
const txHash = '0xabcdef...';

// Example BNB transfer on BSC  
const txHash = '0x123456...';
```

You can find transaction hashes on [BSCScan](https://bscscan.com).

## Notes

- Make sure your app has Tailwind CSS configured for the default styles
- The component works in both client and server components (Next.js)
- For production use, handle loading states and errors appropriately

