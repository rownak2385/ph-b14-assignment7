import type { ProductChange, ProductUnit } from "@/types/product";

const bengaliNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const bengaliPercentage = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const unitLabels: Record<ProductUnit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function formatPrice(value: number): string {
  return `${bengaliNumber.format(value)} টাকা`;
}

export function formatUnit(unit: ProductUnit): string {
  return unitLabels[unit];
}

export function formatPerUnit(unit: ProductUnit): string {
  return `প্রতি ${formatUnit(unit)}`;
}

export function formatChange(change: ProductChange): string {
  const symbol = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";
  return `${symbol} ${bengaliPercentage.format(Math.abs(change.pct))}%`;
}

