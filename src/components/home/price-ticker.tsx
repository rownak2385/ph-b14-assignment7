import { formatChange, formatPrice, formatUnit } from "@/lib/format-price";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types/product";

type TickerListProps = {
  products: Product[];
  duplicate?: boolean;
};

function TickerList({ products, duplicate = false }: TickerListProps) {
  return (
    <ul
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={duplicate ? true : undefined}
    >
      {products.map((product) => {
        const movementClass =
          product.change.pct > 0
            ? "text-emerald-700"
            : product.change.pct < 0
              ? "text-rose-700"
              : "text-slate-500";

        return (
          <li
            key={`${duplicate ? "duplicate" : "primary"}-${product.id}`}
            className="flex items-center gap-2.5 whitespace-nowrap text-sm"
            data-ticker-item={product.slug}
          >
            <span className="text-xl" aria-hidden="true">
              {product.image}
            </span>
            <span className="font-bold text-slate-800">{product.nameBn}</span>
            <span className="text-slate-500">
              {formatPrice(product.today)}/{formatUnit(product.unit)}
            </span>
            <span className={`font-bold ${movementClass}`}>{formatChange(product.change)}</span>
          </li>
        );
      })}
    </ul>
  );
}

type PriceTickerProps = {
  products: Product[];
  unavailable?: boolean;
};

export function PriceTicker({ products, unavailable = false }: PriceTickerProps) {
  if (products.length === 0) {
    return (
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-center text-sm text-slate-500" role="status">
        {unavailable
          ? "লাইভ বাজারদর এখন লোড করা যাচ্ছে না।"
          : "আজকের বাজারদরের কোনো তথ্য পাওয়া যায়নি।"}
      </div>
    );
  }

  return (
    <section
      className="overflow-hidden border-b border-emerald-100 bg-emerald-50/80 py-2.5"
      aria-label="আজকের বাজারদরের চলমান তালিকা"
    >
      <div className="ticker-track flex w-max items-center">
        <TickerList products={products} />
        <TickerList products={products} duplicate />
      </div>
    </section>
  );
}

export function PriceTickerSkeleton() {
  return (
    <div className="h-11 animate-pulse border-b border-slate-200 bg-slate-100" aria-hidden="true" />
  );
}

export async function LivePriceTicker() {
  const result = await getProducts();
  return <PriceTicker products={result.products} unavailable={result.status === "error"} />;
}

