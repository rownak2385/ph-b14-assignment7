import { Container } from "@/components/container";
import { HeroSection } from "@/components/home/hero-section";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";

function SkeletonSection({ count = 6 }: { count?: number }) {
  return (
    <section className="py-14 sm:py-18">
      <Container>
        <div className="mb-8 animate-pulse">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-3 h-9 w-64 max-w-full rounded bg-slate-200" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="পণ্যের তথ্য লোড হচ্ছে">
      <HeroSection />
      <SkeletonSection />
      <div className="bg-slate-50">
        <SkeletonSection />
      </div>
      <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে…</span>
    </div>
  );
}

