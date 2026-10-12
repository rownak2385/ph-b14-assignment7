import type { Product } from "../types/product";

export type ProductSort = "default" | "price-asc" | "price-desc";

function getSortablePrice(product: Product): number | null {
  return Number.isFinite(product.today) ? product.today : null;
}

export function sortProducts(
  products: readonly Product[],
  sort: ProductSort,
): Product[] {
  const indexedProducts = products.map((product, index) => ({ product, index }));

  if (sort === "default") {
    return indexedProducts.map(({ product }) => product);
  }

  return indexedProducts
    .sort((a, b) => {
      const aPrice = getSortablePrice(a.product);
      const bPrice = getSortablePrice(b.product);

      if (aPrice === null && bPrice === null) {
        return a.index - b.index;
      }

      if (aPrice === null) {
        return 1;
      }

      if (bPrice === null) {
        return -1;
      }

      const priceDifference =
        sort === "price-asc" ? aPrice - bPrice : bPrice - aPrice;

      return priceDifference || a.index - b.index;
    })
    .map(({ product }) => product);
}
