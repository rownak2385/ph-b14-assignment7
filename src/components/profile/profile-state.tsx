import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

type ProfileStateProps = {
  title: string;
  description: string;
  retryHref: string;
};

export function ProfileState({ title, description, retryHref }: ProfileStateProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full rounded-3xl border border-amber-200 bg-white p-6 text-center shadow-[0_24px_70px_-40px_rgba(17,24,39,0.35)] sm:p-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <AlertTriangle aria-hidden="true" className="size-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            হোমে ফিরে যান
          </Link>
          <Link
            href={retryHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <RefreshCw aria-hidden="true" className="size-4" />
            আবার চেষ্টা করুন
          </Link>
        </div>
      </section>
    </main>
  );
}
