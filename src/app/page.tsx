import { AllProductsSection } from "@/components/home/all-products-section";
import { HeroSection } from "@/components/home/hero-section";
import { PriceMovementSection } from "@/components/home/price-movement-section";
import { ProductState } from "@/components/home/product-state";
import {
  getProducts,
  getTopPriceDecreases,
  getTopPriceIncreases,
} from "@/lib/products";

export default async function Home() {
  const result = await getProducts();

  return (
    <>
      <HeroSection />

      {result.status === "error" ? (
        <ProductState kind="error" />
      ) : result.products.length === 0 ? (
        <ProductState kind="empty" />
      ) : (
        <>
          <PriceMovementSection
            id="price-risers"
            title="আজ দাম বেড়েছে ▲"
            description="গতকালের তুলনায় শতাংশের হিসাবে সবচেয়ে বেশি দাম বেড়েছে যেসব পণ্যের।"
            products={getTopPriceIncreases(result.products)}
            emptyMessage="আজ দাম বেড়েছে—এমন কোনো পণ্য পাওয়া যায়নি।"
            tone="positive"
          />
          <div className="bg-rose-50/40">
            <PriceMovementSection
              id="price-fallers"
              title="আজ দাম কমেছে ▼"
              description="গতকালের তুলনায় শতাংশের হিসাবে সবচেয়ে বেশি দাম কমেছে যেসব পণ্যের।"
              products={getTopPriceDecreases(result.products)}
              emptyMessage="আজ দাম কমেছে—এমন কোনো পণ্য পাওয়া যায়নি।"
              tone="negative"
            />
          </div>
          <AllProductsSection products={result.products} />
        </>
      )}
    </>
  );
}

