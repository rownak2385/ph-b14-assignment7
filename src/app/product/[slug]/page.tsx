import { notFound, redirect } from "next/navigation";

import { Container } from "@/components/container";
import { MarketPriceComparison } from "@/components/product/market-price-comparison";
import { PriceStatistics } from "@/components/product/price-statistics";
import { ProductDetailState } from "@/components/product/product-detail-state";
import { ProductSummary } from "@/components/product/product-summary";
import { getServerSession } from "@/lib/auth-session";
import { calculatePriceStatistics } from "@/lib/price-statistics";
import { getProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  let session: Awaited<ReturnType<typeof getServerSession>>;

  try {
    session = await getServerSession();
  } catch {
    return <ProductDetailState kind="auth-error" />;
  }

  if (!session) {
    const callbackUrl = `/product/${encodeURIComponent(slug)}`;
    redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const result = await getProductBySlug(slug);

  if (result.status === "not-found") {
    notFound();
  }

  if (result.status === "error") {
    return <ProductDetailState kind="api-error" />;
  }

  const statistics = calculatePriceStatistics(result.product.markets);

  return (
    <div>
      <ProductSummary product={result.product} />
      <Container className="py-10 sm:py-14">
        <PriceStatistics statistics={statistics} unit={result.product.unit} />
        <MarketPriceComparison
          markets={result.product.markets}
          statistics={statistics}
          unit={result.product.unit}
        />
      </Container>
    </div>
  );
}
