# Tax Jurisdictions Data

This directory contains structured reference data for cryptocurrency tax compliance across different jurisdictions.

## Overview

The tax jurisdiction data provides comprehensive information about:
- Tax classification of cryptocurrencies
- Receipt requirements and mandatory fields
- Transaction types and their tax treatment
- Cost basis calculation methods
- Holding period rules
- VAT/GST treatment
- Jurisdiction-specific features and regulations

## Data Structure

### Supported Jurisdictions

The following 18 jurisdictions are currently supported (ordered by priority):

| Code | Country       | Emoji | Tax Treatment Highlights                              |
|------|---------------|-------|-------------------------------------------------------|
| US   | United States | 🇺🇸    | Property; 1099 reporting; LTCG discount after 1 year  |
| UK   | United Kingdom| 🇬🇧    | Cryptoasset; Pooling method; 18-24% CGT               |
| SG   | Singapore     | 🇸🇬    | No capital gains tax; 7% GST exempt                   |
| CA   | Canada        | 🇨🇦    | Commodity; ACB method; 50% inclusion rate             |
| AU   | Australia     | 🇦🇺    | CGT asset; 50% discount after 1 year; 10% GST         |
| DE   | Germany       | 🇩🇪    | Private money; Tax-free after 1 year holding          |
| JP   | Japan         | 🇯🇵    | Miscellaneous income; Up to 55% rate; No LT discount  |
| FR   | France        | 🇫🇷    | Digital asset; Flat 30% PFU; Crypto-to-crypto deferred|
| HK   | Hong Kong     | 🇭🇰    | Virtual asset; No CGT for investors                   |
| CH   | Switzerland   | 🇨🇭    | Private asset; No CGT; Wealth tax only                |
| BD   | Bangladesh    | 🇧🇩    | Restricted; Freelancer reporting; 0-25% progressive   |
| VN   | Vietnam       | 🇻🇳    | Restricted payment; 0.5% presumptive or 5-35%         |
| PK   | Pakistan      | 🇵🇰    | Unregulated; Freelancer income; 0-35% + advance tax   |
| TW   | Taiwan        | 🇹🇼    | Virtual currency; Property income; 5-40%              |
| UA   | Ukraine       | 🇺🇦    | Virtual asset (2022 law); 19.5% flat (18% + 1.5%)     |
| IN   | India         | 🇮🇳    | VDA; 30% + cess + 1% TDS; Harshest regime             |
| ID   | Indonesia     | 🇮🇩    | Regulated commodity; 0.1% final tax option            |
| KR   | South Korea   | 🇰🇷    | Virtual asset; 22% tax from 2025; KRW 2.5M exemption  |

### File Structure

```
src/data/tax-jurisdictions/
├── README.md           # This file
├── types.ts            # TypeScript interfaces and types
├── index.ts            # Main exports and utility functions
├── us.ts               # United States
├── uk.ts               # United Kingdom
├── sg.ts               # Singapore
├── ca.ts               # Canada
├── au.ts               # Australia
├── de.ts               # Germany
├── jp.ts               # Japan
├── fr.ts               # France
├── hk.ts               # Hong Kong
├── ch.ts               # Switzerland
├── bd.ts               # Bangladesh
├── vn.ts               # Vietnam
├── pk.ts               # Pakistan
├── tw.ts               # Taiwan
├── ua.ts               # Ukraine
├── in.ts               # India
├── id.ts               # Indonesia
└── kr.ts               # South Korea
```

## Usage

### Basic Usage

```typescript
import { TAX_JURISDICTIONS, getJurisdiction, getJurisdictionOptions } from '@/data/tax-jurisdictions';

// Get all jurisdictions
const allJurisdictions = TAX_JURISDICTIONS;

// Get specific jurisdiction
const usInfo = getJurisdiction('US');

// Get dropdown options
const options = getJurisdictionOptions();
// Returns: [{ value: 'US', label: '🇺🇸 United States' }, ...]
```

### Advanced Queries

```typescript
import {
  getJurisdictionsWithStates,
  getNoCapitalGainsTaxJurisdictions,
  getHoldingPeriodDiscountJurisdictions,
  getVATGSTJurisdictions,
} from '@/data/tax-jurisdictions';

// Jurisdictions with states/provinces (US, CA, AU)
const withStates = getJurisdictionsWithStates();

// No capital gains tax (SG, HK, CH for private investors)
const noCGT = getNoCapitalGainsTaxJurisdictions();

// Long-term holding discounts (US, CA, AU, DE)
const withDiscounts = getHoldingPeriodDiscountJurisdictions();

// VAT/GST applicable jurisdictions
const withVAT = getVATGSTJurisdictions();
```

### Accessing Jurisdiction Properties

```typescript
const usInfo = getJurisdiction('US');

// Classification and guidance
console.log(usInfo.classification); // "Property"
console.log(usInfo.officialGuidanceUrl); // IRS guidance URL

// Receipt requirements
console.log(usInfo.receiptRequirements.mandatoryFields);
// ["date_time", "crypto_amount", "fiat_amount_usd", ...]
console.log(usInfo.receiptRequirements.retentionYears); // 7

// Transaction types
const recipientTypes = usInfo.transactionTypes.recipient;
const payerTypes = usInfo.transactionTypes.payer;

// Cost basis methods
console.log(usInfo.costBasisMethods); // ["specific_id", "fifo", "lifo", "hifo"]
console.log(usInfo.defaultCostBasisMethod); // "specific_id"

// Holding period rules
console.log(usInfo.holdingPeriodRules.hasDiscount); // true
console.log(usInfo.holdingPeriodRules.longTermThresholdDays); // 365

// VAT/GST rules
console.log(usInfo.vatGstRules.applicable); // false

// Special features
console.log(usInfo.specialFeatures);
// ["Form 1099 reporting thresholds...", "Specific ID tracking...", ...]
```

## Key Tax Differences

### Cost Basis Methods

| Jurisdiction | Methods Available          | Default      | Notes                    |
|--------------|----------------------------|--------------|--------------------------|
| US           | Specific ID, FIFO, LIFO, HIFO | Specific ID | Best tracking required   |
| UK           | Pooling only               | Pooling      | Same-day & 30-day rules  |
| SG           | FIFO                       | FIFO         | For business income      |
| CA           | ACB (Adjusted Cost Base)   | ACB          | Weighted average method  |
| AU           | FIFO, Average Cost         | FIFO         | Pre-CGT assets exempt    |
| DE           | FIFO                       | FIFO         | 1-year holding exemption |
| JP           | Average Cost, FIFO         | Average Cost | Moving/Total Average     |
| FR           | Average Cost               | Average Cost | Portfolio-wide calc      |
| HK           | FIFO                       | FIFO         | For business traders     |
| CH           | FIFO                       | FIFO         | For professional traders |

### Holding Period Discounts

| Jurisdiction | Has Discount | Threshold | Benefit                           |
|--------------|--------------|-----------|-----------------------------------|
| US           | ✅           | 365 days  | LTCG rates (0-20% vs 10-37%)      |
| UK           | ❌           | N/A       | Flat 18-24% CGT                   |
| SG           | ❌           | N/A       | No CGT                            |
| CA           | ✅           | None      | 50% inclusion rate                |
| AU           | ✅           | 365 days  | 50% discount                      |
| DE           | ✅           | 365 days  | Tax-free (private investors)      |
| JP           | ❌           | N/A       | All as ordinary income (15-55%)   |
| FR           | ❌           | N/A       | Flat 30% PFU                      |
| HK           | ❌           | N/A       | No CGT for private investors      |
| CH           | ❌           | N/A       | No CGT for private investors      |

### VAT/GST Treatment

| Jurisdiction | Rate  | Crypto-to-Fiat Exempt | Notes                           |
|--------------|-------|------------------------|---------------------------------|
| US           | N/A   | N/A                    | No VAT/GST in US                |
| UK           | 20%   | ✅                     | Exempt on crypto exchange       |
| SG           | 9%    | ✅                     | GST exempt                      |
| CA           | 5-15% | ✅                     | GST/HST exempt                  |
| AU           | 10%   | ✅                     | GST exempt                      |
| DE           | 19%   | ✅                     | VAT exempt                      |
| JP           | 10%   | ✅                     | Consumption tax exempt          |
| FR           | 20%   | ✅                     | VAT exempt on exchange          |
| HK           | N/A   | N/A                    | No VAT/GST in Hong Kong         |
| CH           | 8.1%  | ✅                     | VAT exempt on crypto            |

## Transaction Types

Each jurisdiction defines transaction types for both **recipient** and **payer** roles:

### Recipient Types (Common)
- `business_income` - Income from crypto business operations
- `personal_income` - Personal/miscellaneous crypto income
- `capital_gain` - Gain from disposal of crypto assets
- `gift_received` - Crypto received as gift
- `mining_income` - Mining/staking rewards
- `airdrop` - Airdrop/fork income

### Payer Types (Common)
- `business_expense` - Business payment with crypto
- `personal_expense` - Personal purchase with crypto
- `capital_loss` - Loss on crypto disposal
- `gift_given` - Crypto given as gift
- `charitable_donation` - Donation to charity

Each transaction type includes:
- **label**: Display name
- **description**: Explanation
- **taxFormHint**: Relevant tax form or section
- **taxRate**: Applicable tax rate
- **reportingThreshold**: Minimum amount for reporting (if any)
- **deductible**: Whether expense is deductible
- **notes**: Additional context

## Receipt Requirements

Each jurisdiction specifies:

### Mandatory Fields
Example for US:
```typescript
[
  "date_time",
  "crypto_amount",
  "fiat_amount_usd",
  "description",
  "payer_address",
  "recipient_address",
  "tax_id_tin",
  "transaction_hash",
]
```

### Retention Period
- US, JP, HK: 7 years
- CA: 6 years
- AU, SG: 5 years
- UK: 20 years (longest)
- FR: 3 years (shortest)
- CH: 10 years

## Special Features

Each jurisdiction includes a `specialFeatures` array highlighting unique characteristics:

**US**:
- Form 1099 reporting thresholds ($600 trade/business, $10k+ business)
- Specific ID tracking recommended
- Wash sale rules may apply starting 2025

**UK**:
- Mandatory share pooling with same-day and 30-day matching rules
- £3,000 annual CGT exemption (2024/25)
- 20 year record retention requirement

**Singapore**:
- No capital gains tax for individuals
- Business income from crypto trading taxed as ordinary income
- GST registration threshold: S$1M

**Germany**:
- Tax-free after 1 year holding period (private investors)
- Mining/staking taxed as ordinary income
- €600 annual exemption for miscellaneous income

**Japan**:
- Harshest crypto tax regime - up to 55% top rate
- All gains treated as miscellaneous income (not capital gains)
- Losses cannot be carried forward

**Switzerland**:
- No capital gains tax for private investors (wealth tax only)
- Professional trader classification is strict (FTA criteria)
- Wealth tax on Dec 31 holdings (0.3-1% depending on canton)

## Integration Points

### Tax Compliance Form
The jurisdiction data is used in the tax compliance form to:
- Populate jurisdiction dropdown
- Show/hide state/province selector
- Display transaction type options
- Show cost basis method selector
- Provide tax form hints
- Validate mandatory fields

### PDF Receipt Generation
The jurisdiction data enhances PDF receipts with:
- Jurisdiction-specific mandatory fields
- Tax classification information
- Official guidance URLs
- Transaction type and tax treatment
- Cost basis method used
- Retention period notice
- Special compliance notes

### Validation System
Non-blocking validation warnings based on:
- Missing mandatory fields
- Tax ID requirements
- Reporting thresholds
- Transaction categorization
- Record retention notices

## Data Sources

This data is compiled from extensive research including:
- Official government tax agency guidance
- Tax professional consultations
- Cryptocurrency tax research reports
- Regulatory announcements and updates

**Last Updated**: October 2025

**Maintenance**: This data should be reviewed and updated quarterly or when significant tax law changes occur in any jurisdiction.

## Future Enhancements

Potential additions:
- More jurisdictions (NL, ES, IT, BR, TH, PH, MY, etc.)
- State-level tax differences (e.g., NY BitLicense)
- Tax treaty considerations
- DeFi-specific transaction types
- NFT-specific guidance
- Staking/yield farming categories
- DAO participation treatment
- Historical tax rates and rules

## Contributing

When adding new jurisdictions:
1. Research official tax guidance thoroughly
2. Follow the `JurisdictionInfo` interface in `types.ts`
3. Include all mandatory fields
4. Add comprehensive transaction types
5. Document special features
6. Update this README
7. Add to `JurisdictionCode` type in `types.ts`
8. Export from `index.ts`
