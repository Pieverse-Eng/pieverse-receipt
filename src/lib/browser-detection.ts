/**
 * Browser Detection Utilities
 * Detects various browser environments, especially mobile wallet browsers
 */

// Constants for browser detection
const BROWSER_DETECTION = {
  IOS_REGEX: /iPhone|iPad|iPod/,
  ANDROID_REGEX: /Android/i,
  BNC_TOKEN_REGEX: /\bBNC\/\d+/i,
  BMP_TOKEN_REGEX: /\bBMP\/\d+/i,
  WEBVIEW_REGEX: /\bwv\b/,
  CHROME_VERSION_REGEX: /Version\/4\.0\s+Chrome/i,
  MOBILE_REGEX: /Mobile\//,
  BINANCE_HINT: "binance",
  METAMASK_REGEX: /MetaMask/i,
  TRUST_WALLET_REGEX: /Trust/i,
  COINBASE_REGEX: /CoinbaseBrowser|coinbase/i,
} as const;

/**
 * Detect if running on Android device
 */
export function isAndroidDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return BROWSER_DETECTION.ANDROID_REGEX.test(navigator.userAgent);
}

/**
 * Detect if running on iOS device
 */
export function isIOSDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return BROWSER_DETECTION.IOS_REGEX.test(navigator.userAgent);
}

/**
 * Detect Binance Wallet browser on mobile (iOS & Android)
 */
export function isBinanceWalletMobileBrowser(): boolean {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent;
  const uaLower = ua.toLowerCase();

  const isIOS = BROWSER_DETECTION.IOS_REGEX.test(ua);
  const isAndroid = BROWSER_DETECTION.ANDROID_REGEX.test(ua);
  const isMobile = isIOS || isAndroid;

  const hasBncToken = BROWSER_DETECTION.BNC_TOKEN_REGEX.test(ua);
  const hasBmpToken = BROWSER_DETECTION.BMP_TOKEN_REGEX.test(ua);

  if (isMobile && (hasBncToken || hasBmpToken)) return true;

  const hasInjected = typeof (window as any).BinanceChain !== "undefined";
  const androidWebView =
    isAndroid && (BROWSER_DETECTION.WEBVIEW_REGEX.test(uaLower) || BROWSER_DETECTION.CHROME_VERSION_REGEX.test(ua));
  const iosMobileWebView = isIOS && BROWSER_DETECTION.MOBILE_REGEX.test(ua);

  if (isMobile && hasInjected && (androidWebView || iosMobileWebView)) return true;
  if (isMobile && uaLower.includes(BROWSER_DETECTION.BINANCE_HINT)) return true;

  return false;
}

/**
 * Detect MetaMask mobile browser
 */
export function isMetaMaskMobileBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isMobile = isAndroidDevice() || isIOSDevice();
  return isMobile && BROWSER_DETECTION.METAMASK_REGEX.test(ua);
}

/**
 * Detect Trust Wallet mobile browser
 */
export function isTrustWalletMobileBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isMobile = isAndroidDevice() || isIOSDevice();
  return isMobile && BROWSER_DETECTION.TRUST_WALLET_REGEX.test(ua);
}

/**
 * Detect Coinbase Wallet mobile browser
 */
export function isCoinbaseWalletMobileBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isMobile = isAndroidDevice() || isIOSDevice();
  return isMobile && BROWSER_DETECTION.COINBASE_REGEX.test(ua);
}

/**
 * Detect any known wallet browser
 */
export function isWalletBrowser(): boolean {
  return (
    isBinanceWalletMobileBrowser() ||
    isMetaMaskMobileBrowser() ||
    isTrustWalletMobileBrowser() ||
    isCoinbaseWalletMobileBrowser()
  );
}

/**
 * Get the name of the wallet browser
 */
export function getWalletBrowserName(): string | null {
  if (isBinanceWalletMobileBrowser()) return "Binance Wallet";
  if (isMetaMaskMobileBrowser()) return "MetaMask";
  if (isTrustWalletMobileBrowser()) return "Trust Wallet";
  if (isCoinbaseWalletMobileBrowser()) return "Coinbase Wallet";
  return null;
}
