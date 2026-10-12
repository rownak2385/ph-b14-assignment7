import { AlertTriangle, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";

export function ProductDetailState({ kind }: { kind: "api-error" | "auth-error" }) {
  const isAuthError = kind === "auth-error";
  const Icon = isAuthError ? ShieldAlert : AlertTriangle;

  return (
    <Container className="py-16 sm:py-24">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm" role="alert">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <Icon aria-hidden="true" size={34} />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
          {isAuthError ? "সেশন যাচাই করা যায়নি" : "পণ্যের তথ্য লোড করা যায়নি"}
        </h1>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
          {isAuthError
            ? "নিরাপত্তার জন্য পণ্যের বিস্তারিত দেখানো হয়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।"
            : "বাজারদরের সেবাটি সাময়িকভাবে পাওয়া যাচ্ছে না। এটি পণ্য না পাওয়ার ত্রুটি নয়—সংযোগ ঠিক হলে আবার চেষ্টা করুন।"}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href=""
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            আবার চেষ্টা করুন
          </a>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    </Container>
  );
}
