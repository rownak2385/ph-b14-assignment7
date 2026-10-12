import { AlertTriangle, PackageSearch } from "lucide-react";
import Link from "next/link";

type CategoryStateProps = {
  kind: "empty" | "error";
  categoryName?: string;
  retryHref?: string;
};

export function CategoryState({ kind, categoryName, retryHref }: CategoryStateProps) {
  const isError = kind === "error";
  const Icon = isError ? AlertTriangle : PackageSearch;

  return (
    <section
      className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10"
      role={isError ? "alert" : "status"}
    >
      <span className={`mx-auto flex size-14 items-center justify-center rounded-2xl ${isError ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
        <Icon aria-hidden="true" size={30} />
      </span>
      <h2 className="mt-5 text-2xl font-bold text-slate-950">
        {isError ? "বিভাগের তথ্য লোড করা যায়নি" : `${categoryName ?? "এই বিভাগে"} কোনো পণ্য নেই`}
      </h2>
      <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
        {isError
          ? "বাজারদরের সেবাটি সাময়িকভাবে পাওয়া যাচ্ছে না। সংযোগ ঠিক থাকলে আবার চেষ্টা করুন।"
          : "এই বিভাগে এখনো কোনো পণ্য যোগ করা হয়নি। অন্য বিভাগ দেখুন অথবা হোম পেজে ফিরে যান।"}
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {isError && retryHref ? (
          <a
            href={retryHref}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            আবার চেষ্টা করুন
          </a>
        ) : null}
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}
