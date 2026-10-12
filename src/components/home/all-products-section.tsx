import { Container } from "@/components/container";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

type AllProductsSectionProps = {
  products: Product[];
};

export function AllProductsSection({ products }: AllProductsSectionProps) {
  return (
    <section
      id="সব-পণ্য"
      className="scroll-mt-8 bg-slate-50 py-14 sm:py-20"
      aria-labelledby="all-products-heading"
    >
      <Container>
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-sm font-bold text-emerald-700">আজকের পূর্ণ তালিকা</p>
          <h2 id="all-products-heading" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            সব পণ্য
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            নিত্যপ্রয়োজনীয় সব পণ্যের আজকের দাম ও গতকালের তুলনায় পরিবর্তন দেখুন।
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

