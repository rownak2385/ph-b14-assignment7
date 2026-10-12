import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  date: string;
};

export function Brand({ date }: BrandProps) {
  return (
    <Link
      href="/"
      className="group inline-flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4"
      aria-label="বাজার দর হোম পেজ"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-100 sm:size-12">
        <Image
          src="/logo-icon.png"
          alt=""
          width={36}
          height={36}
          className="size-8 object-contain sm:size-9"
          priority
        />
      </span>
      <span className="min-w-0">
        <span className="block text-xl font-bold leading-tight text-slate-950 sm:text-2xl">
          বাজার দর
        </span>
        <span className="mt-0.5 block truncate text-xs leading-5 text-slate-500 sm:text-sm">
          {date}
        </span>
      </span>
    </Link>
  );
}

