"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { ProductCard } from "@/components/products/product-card";
import { sortProducts, type ProductSort } from "@/lib/sort-products";
import type { Product } from "@/types/product";

type CategoryProductListProps = {
  products: Product[];
};

export function CategoryProductList({ products }: CategoryProductListProps) {
  const [sort, setSort] = useState<ProductSort>("default");
  const sortedProducts = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <>
      <div className="mb-7 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600" aria-live="polite">
          মোট <span className="font-bold text-slate-950">{products.length}</span>টি পণ্য পাওয়া গেছে
        </p>

        <div className="flex items-center gap-3">
          <label htmlFor="category-product-sort" className="shrink-0 text-sm font-bold text-slate-700">
            সাজান
          </label>
          <div className="relative min-w-0 flex-1 sm:w-64 sm:flex-none">
            <select
              id="category-product-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as ProductSort)}
              className="min-h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-slate-800 shadow-sm outline-none transition-colors hover:border-emerald-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
