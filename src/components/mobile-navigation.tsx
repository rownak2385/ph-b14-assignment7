"use client";

import { LogIn, Menu, UserPlus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { NavigationLinks } from "@/components/navigation-links";
import type { Category } from "@/types/category";

type MobileNavigationProps = {
  categories: Category[];
};

export function MobileNavigation({ categories }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        aria-label={isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
        aria-expanded={isOpen}
        aria-controls="mobile-site-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>

      {isOpen ? (
        <div
          id="mobile-site-navigation"
          className="absolute inset-x-0 top-full z-50 border-t border-slate-100 bg-white shadow-xl shadow-slate-900/10"
        >
          <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
            <nav aria-label="মোবাইল বিভাগ নেভিগেশন">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                পণ্যের বিভাগ
              </p>
              <NavigationLinks
                categories={categories}
                mobile
                onNavigate={closeMenu}
              />
            </nav>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
              <Link
                href="/signin"
                onClick={closeMenu}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-700 px-4 py-2.5 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                <LogIn aria-hidden="true" size={17} />
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                onClick={closeMenu}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                <UserPlus aria-hidden="true" size={17} />
                সাইন আপ
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

