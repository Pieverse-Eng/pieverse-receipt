import { describe, it, expect } from "vitest";
import {
  formatAddress,
  formatCurrencyAmount,
  formatShortDate,
  getExplorerLink,
  getExplorerName,
  getBlockchainName,
  isValidAddress,
} from "../lib/utils";

describe("Utils", () => {
  describe("formatAddress", () => {
    it("should format valid address with default length", () => {
      const address = "0x1234567890123456789012345678901234567890";
      const formatted = formatAddress(address);
      expect(formatted).toBe("0x1234...7890");
    });

    it("should format valid address with custom length", () => {
      const address = "0x1234567890123456789012345678901234567890";
      const formatted = formatAddress(address, 6);
      expect(formatted).toBe("0x123456...567890");
    });

    it("should return original if address is too short", () => {
      const address = "0x123";
      const formatted = formatAddress(address);
      expect(formatted).toBe("0x123");
    });
  });

  describe("formatCurrencyAmount", () => {
    it("should format amount with 2 decimals by default", () => {
      expect(formatCurrencyAmount("123.456")).toBe("123.46");
    });

    it("should format amount with custom decimals", () => {
      expect(formatCurrencyAmount("123.456789", 4)).toBe("123.4568");
    });

    it("should handle large numbers", () => {
      expect(formatCurrencyAmount("1000000.123")).toBe("1,000,000.12");
    });

    it("should handle zero", () => {
      expect(formatCurrencyAmount("0")).toBe("0.00");
    });
  });

  describe("formatShortDate", () => {
    it("should format date correctly", () => {
      const date = new Date("2024-10-14T12:00:00Z");
      const formatted = formatShortDate(date);
      expect(formatted).toMatch(/Oct 14, 2024/);
    });
  });

  describe("getExplorerLink", () => {
    it("should return BSC explorer link", () => {
      const link = getExplorerLink("0x123", "bsc");
      expect(link).toBe("https://bscscan.com/tx/0x123");
    });

    it("should return Ethereum explorer link", () => {
      const link = getExplorerLink("0x123", "ethereum");
      expect(link).toBe("https://etherscan.io/tx/0x123");
    });

    it("should return Polygon explorer link", () => {
      const link = getExplorerLink("0x123", "polygon");
      expect(link).toBe("https://polygonscan.com/tx/0x123");
    });

    it("should return Arbitrum explorer link", () => {
      const link = getExplorerLink("0x123", "arbitrum");
      expect(link).toBe("https://arbiscan.io/tx/0x123");
    });

    it("should return Optimism explorer link", () => {
      const link = getExplorerLink("0x123", "optimism");
      expect(link).toBe("https://optimistic.etherscan.io/tx/0x123");
    });

    it("should return Base explorer link", () => {
      const link = getExplorerLink("0x123", "base");
      expect(link).toBe("https://basescan.org/tx/0x123");
    });
  });

  describe("getExplorerName", () => {
    it("should return correct explorer names", () => {
      expect(getExplorerName("bsc")).toBe("BscScan");
      expect(getExplorerName("ethereum")).toBe("Etherscan");
      expect(getExplorerName("polygon")).toBe("PolygonScan");
      expect(getExplorerName("arbitrum")).toBe("Arbiscan");
      expect(getExplorerName("optimism")).toBe("Optimism Etherscan");
      expect(getExplorerName("base")).toBe("BaseScan");
    });
  });

  describe("getBlockchainName", () => {
    it("should return correct blockchain names", () => {
      expect(getBlockchainName("bsc")).toBe("BNB Smart Chain");
      expect(getBlockchainName("ethereum")).toBe("Ethereum");
      expect(getBlockchainName("polygon")).toBe("Polygon");
      expect(getBlockchainName("arbitrum")).toBe("Arbitrum");
      expect(getBlockchainName("optimism")).toBe("Optimism");
      expect(getBlockchainName("base")).toBe("Base");
    });
  });

  describe("isValidAddress", () => {
    it("should validate correct Ethereum address", () => {
      expect(isValidAddress("0x1234567890123456789012345678901234567890")).toBe(true);
    });

    it("should reject invalid addresses", () => {
      expect(isValidAddress("0x123")).toBe(false);
      expect(isValidAddress("invalid")).toBe(false);
      expect(isValidAddress("")).toBe(false);
    });

    it("should handle mixed case addresses", () => {
      expect(isValidAddress("0xAbCdEf1234567890123456789012345678901234")).toBe(true);
    });
  });
});
