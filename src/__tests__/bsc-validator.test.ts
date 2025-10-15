import { describe, it, expect } from "vitest";
import { isValidBscTxHash } from "../chains/bsc";

describe("BSC Chain Validators", () => {
  describe("isValidBscTxHash", () => {
    it("should validate correct BSC transaction hash", () => {
      const validHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
      expect(isValidBscTxHash(validHash)).toBe(true);
    });

    it("should reject invalid hash - too short", () => {
      const invalidHash = "0x1234";
      expect(isValidBscTxHash(invalidHash)).toBe(false);
    });

    it("should reject invalid hash - no 0x prefix", () => {
      const invalidHash = "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
      expect(isValidBscTxHash(invalidHash)).toBe(false);
    });

    it("should reject invalid hash - invalid characters", () => {
      const invalidHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdeg";
      expect(isValidBscTxHash(invalidHash)).toBe(false);
    });

    it("should accept mixed case hash", () => {
      const validHash = "0x1234567890ABCDEF1234567890abcdef1234567890ABCDEF1234567890abcdef";
      expect(isValidBscTxHash(validHash)).toBe(true);
    });
  });
});
