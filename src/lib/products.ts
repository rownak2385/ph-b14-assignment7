import { cache } from "react";

import { fetchBazarDorData } from "@/lib/api";
import type {
  MarketPrice,
  PriceDirection,
  Product,
  ProductResult,
  ProductUnit,
} from "@/types/product";

const BENGALI_DIGITS: Record<string, string> = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

const PRODUCT_UNITS = new Set<ProductUnit>(["kg", "litre", "dozen", "piece"]);
const PRICE_DIRECTIONS = new Set<PriceDirection>(["up", "down", "flat"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(record: Record<string, unknown>, key: string): string | null {
  const value = record[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function normalizeNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalized = value
    .trim()
    .replace(/[০-৯]/g, (digit) => BENGALI_DIGITS[digit])
    .replace(/[,٬]/g, "");
  const number = Number(normalized);

  return Number.isFinite(number) ? number : null;
}

function normalizeMarket(value: unknown): MarketPrice | null {
  if (!isRecord(value)) {
    return null;
  }

  const market = readString(value, "market");
  const division = readString(value, "division");
  const min = normalizeNumber(value.min);
  const max = normalizeNumber(value.max);

  if (!market || !division || min === null || max === null) {
    return null;
  }

  return { market, division, min, max };
}

function normalizeProduct(value: unknown): Product | null {
  if (!isRecord(value) || !isRecord(value.change) || !Array.isArray(value.markets)) {
    return null;
  }

  const id = normalizeNumber(value.id);
  const slug = readString(value, "slug");
  const nameBn = readString(value, "nameBn");
  const category = readString(value, "category");
  const categoryNameBn = readString(value, "categoryNameBn");
  const categoryIcon = readString(value, "categoryIcon");
  const unit = readString(value, "unit");
  const image = readString(value, "image");
  const today = normalizeNumber(value.today);
  const yesterday = normalizeNumber(value.yesterday);
  const lastWeek = normalizeNumber(value.lastWeek);
  const lastMonth = normalizeNumber(value.lastMonth);
  const dir = readString(value.change, "dir");
  const pct = normalizeNumber(value.change.pct);
  const markets: MarketPrice[] = [];

  for (const marketValue of value.markets) {
    const market = normalizeMarket(marketValue);

    if (!market) {
      return null;
    }

    markets.push(market);
  }

  if (
    id === null ||
    !Number.isInteger(id) ||
    !slug ||
    !nameBn ||
    !category ||
    !categoryNameBn ||
    !categoryIcon ||
    !unit ||
    !PRODUCT_UNITS.has(unit as ProductUnit) ||
    !image ||
    today === null ||
    yesterday === null ||
    lastWeek === null ||
    lastMonth === null ||
    !dir ||
    !PRICE_DIRECTIONS.has(dir as PriceDirection) ||
    pct === null
  ) {
    return null;
  }

  return {
    id,
    slug,
    nameBn,
    category,
    categoryNameBn,
    categoryIcon,
    unit: unit as ProductUnit,
    image,
    today,
    yesterday,
    lastWeek,
    lastMonth,
    change: { dir: dir as PriceDirection, pct },
    markets,
  };
}

function parseProducts(data: unknown): Product[] | null {
  if (!Array.isArray(data)) {
    return null;
  }

  const products: Product[] = [];

  for (const value of data) {
    const product = normalizeProduct(value);

    if (!product) {
      return null;
    }

    products.push(product);
  }

  return products;
}

export const getProducts = cache(async (): Promise<ProductResult> => {
  const products = await fetchBazarDorData("/products", parseProducts);

  if (products === null) {
    return { products: [], status: "error" };
  }

  return { products, status: "success" };
});

export function getTopPriceIncreases(products: Product[], limit = 6): Product[] {
  return products
    .filter((product) => product.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export function getTopPriceDecreases(products: Product[], limit = 6): Product[] {
  return products
    .filter((product) => product.change.pct < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, limit);
}

