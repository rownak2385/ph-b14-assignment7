"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Category } from "@/types/category";

type NavigationLinksProps = {
  categories: Category[];
  mobile?: boolean;
  onNavigate?: () => void;
};

export function NavigationLinks({
  categories,
  mobile = false,
  onNavigate,
}: NavigationLinksProps) {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "হোম", icon: "⌂", isActive: pathname === "/" },
    ...categories.map((category) => ({
      href: `/category/${category.slug}`,
      label: category.nameBn,
      icon: category.icon,
      isActive: pathname === `/category/${category.slug}`,
    })),
  ];

  if (categories.length === 0) {
    return (
      <p className="text-sm text-slate-500" role="status">
        বিভাগগুলো এখন লোড করা যাচ্ছে না। পরে আবার চেষ্টা করুন।
      </p>
    );
  }

  return (
    <ul
      className={
        mobile
          ? "grid grid-cols-2 gap-2"
          : "flex min-w-max items-center gap-1"
      }
    >
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onNavigate}
            aria-current={link.isActive ? "page" : undefined}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
              mobile ? "w-full" : "whitespace-nowrap"
            } ${
              link.isActive
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
            }`}
          >
            <span aria-hidden="true">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

