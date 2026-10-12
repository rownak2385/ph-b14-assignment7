import { Container } from "@/components/container";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

type PriceMovementSectionProps = {
  id: string;
  title: string;
  description: string;
  products: Product[];
  emptyMessage: string;
  tone: "positive" | "negative";
};

export function PriceMovementSection({
  id,
  title,
  description,
  products,
  emptyMessage,
  tone,
}: PriceMovementSectionProps) {
  return (
    <section id={id} className="py-14 sm:py-18" aria-labelledby={`${id}-heading`}>
      <Container>
        <div className="mb-7 flex flex-col gap-2 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`text-sm font-bold ${tone === "positive" ? "text-emerald-700" : "text-rose-700"}`}>
              দৈনিক মূল্য পরিবর্তন
            </p>
            <h2 id={`${id}-heading`} className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {title}
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-slate-500 sm:text-right">{description}</p>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-slate-600">
            {emptyMessage}
          </div>
        )}
      </Container>
    </section>
  );
}

