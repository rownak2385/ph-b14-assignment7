import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { formatChange, formatPerUnit, formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const movementClass =
    product.change.pct > 0
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : product.change.pct < 0
        ? "bg-rose-50 text-rose-700 ring-rose-200"
        : "bg-slate-100 text-slate-600 ring-slate-200";

  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn} পণ্যের বিস্তারিত দেখুন`}
      data-product-card={product.slug}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-emerald-200 group-hover:shadow-lg group-hover:shadow-emerald-900/5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span
            className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-4xl ring-1 ring-emerald-100"
            role="img"
            aria-label={`${product.nameBn} পণ্যের প্রতীক`}
          >
            {product.image}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${movementClass}`}>
            {formatChange(product.change)}
          </span>
        </div>

        <div className="mt-5 flex-1">
          <p className="text-xs font-bold text-emerald-700">{product.categoryNameBn}</p>
          <h3 className="mt-1.5 text-xl font-bold leading-7 text-slate-950">{product.nameBn}</h3>
          <p className="mt-1 text-sm text-slate-500">{formatPerUnit(product.unit)}</p>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs font-medium text-slate-500">আজকের দাম</p>
            <p className="mt-1 text-xl font-bold text-rose-700">{formatPrice(product.today)}</p>
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
            <ArrowUpRight aria-hidden="true" size={17} />
          </span>
        </div>
      </article>
    </Link>
  );
}

