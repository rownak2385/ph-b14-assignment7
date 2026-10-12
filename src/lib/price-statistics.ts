import type { MarketPrice } from "@/types/product";

export type ValidMarketRange = {
  min: number;
  max: number;
  midpoint: number;
};

export type PriceStatistics = ValidMarketRange & {
  marketCount: number;
};

export function getValidMarketRange(
  market: Pick<MarketPrice, "min" | "max">,
): ValidMarketRange | null {
  if (
    typeof market.min !== "number" ||
    !Number.isFinite(market.min) ||
    market.min <= 0 ||
    typeof market.max !== "number" ||
    !Number.isFinite(market.max) ||
    market.max <= 0 ||
    market.min > market.max
  ) {
    return null;
  }

  return {
    min: market.min,
    max: market.max,
    midpoint: (market.min + market.max) / 2,
  };
}

export function calculatePriceStatistics(
  markets: readonly Pick<MarketPrice, "min" | "max">[],
): PriceStatistics | null {
  const validRanges = markets
    .map(getValidMarketRange)
    .filter((range): range is ValidMarketRange => range !== null);

  if (validRanges.length === 0) {
    return null;
  }

  return {
    min: Math.min(...validRanges.map((range) => range.min)),
    max: Math.max(...validRanges.map((range) => range.max)),
    midpoint:
      validRanges.reduce((sum, range) => sum + range.midpoint, 0) /
      validRanges.length,
    marketCount: validRanges.length,
  };
}

export function calculateDifferencePercent(
  value: number,
  comparison: number,
): number | null {
  if (
    !Number.isFinite(value) ||
    !Number.isFinite(comparison) ||
    comparison <= 0
  ) {
    return null;
  }

  return ((value - comparison) / comparison) * 100;
}
