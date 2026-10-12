import { ArrowDown, ArrowUp, Minus, Scale, Tag } from "lucide-react";
import Link from "next/link";

import { formatChange, formatPerUnit, formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";

export function ProductSummary({ product }: { product: Product }) {
  const MovementIcon =
    product.change.dir === "up"
      ? ArrowUp
      : product.change.dir === "down"
        ? ArrowDown
        : Minus;
  const movementClass =
    product.change.dir === "up"
      ? "bg-emerald-100 text-emerald-800"
      : product.change.dir === "down"
        ? "bg-rose-100 text-rose-800"
        : "bg-slate-100 text-slate-700";

  return (
    <section
      data-product-detail={product.slug}
      className="border-b border-emerald-100 bg-[linear-gradient(135deg,#ecfdf5_0%,#f8fafc_58%,#fff7ed_100%)]"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
          <span
            className="flex size-20 shrink-0 items-center justify-center rounded-3xl border border-emerald-100 bg-white text-5xl shadow-sm sm:size-24 sm:text-6xl"
            role="img"
            aria-label={`${product.nameBn} পণ্যের প্রতীক`}
          >
            {product.image}
          </span>

          <div className="min-w-0">
            <p className="text-sm font-bold text-emerald-700">পণ্যের বিস্তারিত বাজারদর</p>
            <h1 className="mt-1 break-words text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {product.nameBn}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              দেশের বিভিন্ন বাজারে পাওয়া সর্বনিম্ন ও সর্বোচ্চ মূল্যসীমার তুলনা দেখুন।
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                href={`/category/${product.category}`}
                className="inline-flex min-h-9 items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-bold text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <Tag aria-hidden="true" size={16} />
                <span aria-hidden="true">{product.categoryIcon}</span>
                {product.categoryNameBn}
              </Link>
              <span className="inline-flex min-h-9 items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                <Scale aria-hidden="true" size={16} />
                {formatPerUnit(product.unit)}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full rounded-3xl border border-white/80 bg-white/90 p-5 shadow-lg shadow-emerald-950/5 sm:w-72 sm:p-6">
          <p className="text-sm font-semibold text-slate-500">আজকের নির্দেশক মূল্য</p>
          <p className="mt-2 text-3xl font-bold text-rose-700">{formatPrice(product.today)}</p>
          <p className="mt-1 text-sm text-slate-500">{formatPerUnit(product.unit)}</p>
          <span className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold ${movementClass}`}>
            <MovementIcon aria-hidden="true" size={16} />
            {formatChange(product.change)} গতকালের তুলনায়
          </span>
        </div>
      </div>
    </section>
  );
}
