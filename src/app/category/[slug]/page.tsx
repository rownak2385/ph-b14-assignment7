import { notFound } from "next/navigation";

import { CategoryProductList } from "@/components/category/category-product-list";
import { CategoryState } from "@/components/category/category-state";
import { Container } from "@/components/container";
import { getCategoryResult } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryResult = await getCategoryResult();

  if (categoryResult.status === "error") {
    return (
      <Container className="py-14 sm:py-20">
        <CategoryState kind="error" retryHref={`/category/${encodeURIComponent(slug)}`} />
      </Container>
    );
  }

  const category = categoryResult.categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const productResult = await getProductsByCategory(category.slug);

  return (
    <div>
      <section className="border-b border-emerald-100 bg-[linear-gradient(135deg,#ecfdf5_0%,#f8fafc_65%,#fff7ed_100%)]">
        <Container className="py-10 sm:py-14">
          <div className="flex max-w-3xl items-start gap-4 sm:items-center sm:gap-5">
            <span
              className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-4xl shadow-sm sm:size-20 sm:text-5xl"
              role="img"
              aria-label={`${category.nameBn} বিভাগের প্রতীক`}
            >
              {category.icon}
            </span>
            <div>
              <p className="text-sm font-bold text-emerald-700">পণ্যের বিভাগ</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {category.nameBn}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                {category.nameBn} বিভাগের পণ্যগুলোর আজকের বাজারদর ও দৈনিক পরিবর্তন দেখুন।
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-10 sm:py-14" aria-label={`${category.nameBn} বিভাগের পণ্য`}>
        <Container>
          {productResult.status === "error" ? (
            <CategoryState kind="error" retryHref={`/category/${category.slug}`} />
          ) : productResult.products.length === 0 ? (
            <CategoryState kind="empty" categoryName={category.nameBn} />
          ) : (
            <CategoryProductList key={category.slug} products={productResult.products} />
          )}
        </Container>
      </section>
    </div>
  );
}
