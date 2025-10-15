import { US_JURISDICTION, US_STATES } from "./us";
import { UK_JURISDICTION } from "./uk";
import { SG_JURISDICTION } from "./sg";
import { CA_JURISDICTION, CA_PROVINCES } from "./ca";
import { AU_JURISDICTION, AU_STATES } from "./au";
import { DE_JURISDICTION } from "./de";
import { JP_JURISDICTION } from "./jp";
import { FR_JURISDICTION } from "./fr";
import { HK_JURISDICTION } from "./hk";
import { CH_JURISDICTION } from "./ch";
import { BD_JURISDICTION } from "./bd";
import { VN_JURISDICTION } from "./vn";
import { PK_JURISDICTION } from "./pk";
import { TW_JURISDICTION } from "./tw";
import { UA_JURISDICTION } from "./ua";
import { IN_JURISDICTION } from "./in";
import { ID_JURISDICTION } from "./id";
import { KR_JURISDICTION } from "./kr";
import type { JurisdictionInfo, JurisdictionCode, StateOption } from "./types";

/**
 * All available tax jurisdictions.
 * Ordered by priority/importance.
 */
export const TAX_JURISDICTIONS: JurisdictionInfo[] = [
  US_JURISDICTION,
  UK_JURISDICTION,
  SG_JURISDICTION,
  CA_JURISDICTION,
  AU_JURISDICTION,
  DE_JURISDICTION,
  JP_JURISDICTION,
  FR_JURISDICTION,
  HK_JURISDICTION,
  CH_JURISDICTION,
  BD_JURISDICTION,
  VN_JURISDICTION,
  PK_JURISDICTION,
  TW_JURISDICTION,
  UA_JURISDICTION,
  IN_JURISDICTION,
  ID_JURISDICTION,
  KR_JURISDICTION,
];

/**
 * Map of jurisdiction codes to jurisdiction info for quick lookup.
 */
export const JURISDICTION_MAP: Record<JurisdictionCode, JurisdictionInfo> = {
  US: US_JURISDICTION,
  UK: UK_JURISDICTION,
  SG: SG_JURISDICTION,
  CA: CA_JURISDICTION,
  AU: AU_JURISDICTION,
  DE: DE_JURISDICTION,
  JP: JP_JURISDICTION,
  FR: FR_JURISDICTION,
  HK: HK_JURISDICTION,
  CH: CH_JURISDICTION,
  BD: BD_JURISDICTION,
  VN: VN_JURISDICTION,
  PK: PK_JURISDICTION,
  TW: TW_JURISDICTION,
  UA: UA_JURISDICTION,
  IN: IN_JURISDICTION,
  ID: ID_JURISDICTION,
  KR: KR_JURISDICTION,
};

/**
 * Get jurisdiction info by code.
 */
export function getJurisdiction(code: JurisdictionCode): JurisdictionInfo | undefined {
  return JURISDICTION_MAP[code];
}

/**
 * Get all jurisdictions that have states/provinces.
 */
export function getJurisdictionsWithStates(): JurisdictionInfo[] {
  return TAX_JURISDICTIONS.filter((j) => j.hasStates);
}

/**
 * Get jurisdictions that have no capital gains tax.
 */
export function getNoCapitalGainsTaxJurisdictions(): JurisdictionInfo[] {
  return TAX_JURISDICTIONS.filter((j) =>
    j.specialFeatures.some((f) => f.toLowerCase().includes("no capital gains tax")),
  );
}

/**
 * Get jurisdictions that have holding period discounts.
 */
export function getHoldingPeriodDiscountJurisdictions(): JurisdictionInfo[] {
  return TAX_JURISDICTIONS.filter((j) => j.holdingPeriodRules.hasDiscount);
}

/**
 * Get jurisdictions with VAT/GST applicable.
 */
export function getVATGSTJurisdictions(): JurisdictionInfo[] {
  return TAX_JURISDICTIONS.filter((j) => j.vatGstRules.applicable);
}

/**
 * Format jurisdiction display name with emoji.
 */
export function formatJurisdictionName(jurisdiction: JurisdictionInfo): string {
  return `${jurisdiction.emoji} ${jurisdiction.name}`;
}

/**
 * Get jurisdiction options for dropdown/select.
 */
export function getJurisdictionOptions(): Array<{
  value: JurisdictionCode;
  label: string;
}> {
  return TAX_JURISDICTIONS.map((j) => ({
    value: j.code,
    label: formatJurisdictionName(j),
  }));
}

/**
 * Get state/province options for jurisdiction with states
 */
export function getStatesForJurisdiction(code: JurisdictionCode): StateOption[] {
  switch (code) {
    case "US":
      return US_STATES;
    case "CA":
      return CA_PROVINCES;
    case "AU":
      return AU_STATES;
    default:
      return [];
  }
}

// Re-export types
export type { JurisdictionInfo, JurisdictionCode } from "./types";

// Re-export state/province data
export { US_STATES, CA_PROVINCES, AU_STATES };
