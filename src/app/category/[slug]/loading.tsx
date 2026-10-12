import { Container } from "@/components/container";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";

export default function CategoryLoading() {
  return (
    <div aria-busy="true" aria-label="বিভাগের পণ্য লোড হচ্ছে">
      <section className="border-b border-emerald-100 bg-emerald-50/60">
        <Container className="py-10 sm:py-14">
          <div className="flex animate-pulse items-center gap-5" aria-hidden="true">
            <div className="size-16 shrink-0 rounded-2xl bg-emerald-100 sm:size-20" />
            <div className="w-full max-w-lg">
              <div className="h-4 w-24 rounded bg-emerald-100" />
              <div className="mt-3 h-9 w-40 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-full rounded bg-slate-200" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-10 sm:py-14">
        <Container>
          <div className="mb-7 flex animate-pulse flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between" aria-hidden="true">
            <div className="h-4 w-36 rounded bg-slate-200" />
            <div className="h-11 w-full rounded-xl bg-slate-200 sm:w-72" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
