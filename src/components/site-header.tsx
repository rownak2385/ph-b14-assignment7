import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

import { Brand } from "@/components/brand";
import { Container } from "@/components/container";
import { MobileNavigation } from "@/components/mobile-navigation";
import { NavigationLinks } from "@/components/navigation-links";
import { formatBanglaDate } from "@/lib/format-date";
import type { Category } from "@/types/category";

type SiteHeaderProps = {
  categories: Category[];
};

export function SiteHeader({ categories }: SiteHeaderProps) {
  const date = formatBanglaDate();

  return (
    <header className="relative z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3 sm:min-h-24">
        <Brand date={date} />

        <nav className="hidden items-center gap-3 md:flex" aria-label="অ্যাকাউন্ট নেভিগেশন">
          <Link
            href="/signin"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-700 px-4 py-2.5 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <LogIn aria-hidden="true" size={17} />
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <UserPlus aria-hidden="true" size={17} />
            সাইন আপ
          </Link>
        </nav>

        <MobileNavigation categories={categories} />
      </Container>

      <div className="hidden border-t border-slate-100 md:block">
        <Container>
          <nav
            aria-label="পণ্যের বিভাগ"
            className="overflow-x-auto py-2 [scrollbar-width:thin]"
          >
            <NavigationLinks categories={categories} />
          </nav>
        </Container>
      </div>
    </header>
  );
}

