# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0-alpha.2] - 2025-10-14

### Added
- **Custom Token Support**: Users can now specify custom ERC20 tokens to detect beyond the built-in USDT, BUSD, and USDC
  - New `customTokens` prop accepts an array of `TokenConfig` objects
  - Support for tokens with custom decimals (6, 8, 18, etc.)
  - Case-insensitive token address matching
  - Falls back to default tokens if custom token not found
- **Custom RPC Endpoint**: New `rpcUrl` prop allows users to specify their own RPC endpoint for better reliability and rate limits
- **Transaction Caching**: Implemented LRU cache (max 100 entries) to avoid re-parsing the same transactions
- **Input Validation**: 
  - Transaction hash format validation for BSC
  - Sanitization of brand config to prevent XSS attacks
  - Failed transaction detection (rejects reverted transactions)
  - Simple payment validation (rejects complex contract interactions)
- **Loading State Customization**: 
  - New `loadingText` prop for custom loading messages
  - New `loadingComponent` prop for completely custom loading UI
- **Better Error Messages**: More descriptive error messages with transaction hash context

### Changed
- **Optimized RPC Calls**: Transaction and receipt fetching now use `Promise.all` for parallel execution
- **Improved Constants**: Replaced magic numbers with named constants (e.g., `MIN_TRANSFER_DATA_LENGTH`)
- **Enhanced Token Detection**: Refactored `detectCurrency` to support custom tokens and return detailed token info
- **Better Type Safety**: Added `ParseOptions` interface for transaction parser configuration

### Fixed
- Fixed hardcoded values in token transfer parsing
- Fixed missing error context in transaction parsing failures
- Improved error handling for edge cases

### Performance
- Transaction parsing is now cached (LRU cache with 100 entry limit)
- RPC calls are batched using `Promise.all` (33% faster for BSC transactions)
- Dynamic import for `@react-pdf/renderer` remains to keep initial bundle small

## [0.1.0-alpha.1] - 2025-10-13

### Added
- Initial alpha release
- BSC (BNB Smart Chain) transaction parsing support
- Built-in support for USDT and BNB
- Custom partner branding with logo and colors
- Progressive download strategy (Share API, direct download, new tab fallback)
- Browser detection for wallet browsers (Binance, MetaMask, Trust Wallet, Coinbase)
- PDF receipt generation with professional formatting
- Tax metadata support (structure only, tax engine not yet included)
- TypeScript-first with full type safety
- Three button variants: button, icon, link
- Examples directory with 4 usage examples

### Known Limitations
- Only BSC chain supported
- Only USDT and BNB tokens by default
- Tax compliance engine not yet ported
- No tests yet
- Not published to npm yet

[0.1.0-alpha.2]: https://github.com/Pieverse-Eng/pieverse-receipt/releases/tag/v0.1.0-alpha.2
[0.1.0-alpha.1]: https://github.com/Pieverse-Eng/pieverse-receipt/releases/tag/v0.1.0-alpha.1
