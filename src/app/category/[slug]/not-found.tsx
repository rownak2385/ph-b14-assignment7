import { SearchX } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";

export default function CategoryNotFound() {
  return (
    <Container className="py-16 sm:py-24">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-700">
          <SearchX aria-hidden="true" size={34} />
        </span>
        <p className="mt-6 text-sm font-bold text-rose-700">ত্রুটি ৪০৪</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          বিভাগটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
          আপনি যে পণ্যের বিভাগটি খুঁজছেন সেটি নেই অথবা ঠিকানাটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          হোম পেজে ফিরে যান
        </Link>
      </section>
    </Container>
  );
}
