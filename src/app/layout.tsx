import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";

import { LivePriceTicker, PriceTickerSkeleton } from "@/components/home/price-ticker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/lib/categories";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "বাজার দর | BazarDor",
    template: "%s | বাজার দর",
  },
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।",
  applicationName: "বাজার দর",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const categories = await getCategories();

  return (
    <html lang="bn">
      <body>
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-lg bg-white px-4 py-3 font-bold text-emerald-800 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          মূল কনটেন্টে যান
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader categories={categories} />
          <Suspense fallback={<PriceTickerSkeleton />}>
            <LivePriceTicker />
          </Suspense>
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

