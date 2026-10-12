import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Mail, PencilLine, UserRound } from "lucide-react";

type ProfileCardProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
};

const accountDateFormatter = new Intl.DateTimeFormat("bn-BD", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

function formatAccountDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? "তথ্য পাওয়া যায়নি" : accountDateFormatter.format(date);
}

function getSafeImageUrl(image: string | null | undefined) {
  if (!image) {
    return null;
  }

  try {
    const url = new URL(image);
    return url.protocol === "https:" || url.protocol === "http:" ? image : null;
  } catch {
    return null;
  }
}

export function ProfileCard({ user }: ProfileCardProps) {
  const imageUrl = getSafeImageUrl(user.image);
  const initial = user.name.trim().charAt(0).toLocaleUpperCase("bn-BD") || "U";

  return (
    <main data-profile-page className="bg-slate-50/70 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_-42px_rgba(17,24,39,0.4)]">
          <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-5 pb-20 pt-8 sm:px-10 sm:pb-24 sm:pt-12">
            <div className="pointer-events-none absolute -right-12 -top-20 size-64 rounded-full bg-emerald-400/10 blur-2xl" />
            <p className="relative text-sm font-semibold tracking-[0.18em] text-emerald-300 uppercase">
              আমার অ্যাকাউন্ট
            </p>
            <h1 className="relative mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              প্রোফাইল
            </h1>
            <p className="relative mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              আপনার সংরক্ষিত অ্যাকাউন্ট তথ্য দেখুন এবং প্রয়োজন হলে নাম হালনাগাদ করুন।
            </p>
          </div>

          <div className="px-5 pb-7 sm:px-10 sm:pb-10">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 items-end gap-4">
                <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-emerald-100 text-3xl font-bold text-emerald-900 shadow-lg sm:size-28">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${user.name}-এর প্রোফাইল ছবি`}
                      fill
                      sizes="112px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span aria-hidden="true">{initial}</span>
                  )}
                </div>
                <div className="min-w-0 pb-1">
                  <h2
                    data-profile-name
                    className="truncate text-2xl font-bold text-slate-950 sm:text-3xl"
                  >
                    {user.name}
                  </h2>
                  <p data-profile-email className="mt-1 truncate text-sm text-slate-500 sm:text-base">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/profile/edit"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <PencilLine aria-hidden="true" className="size-4" />
                তথ্য আপডেট করুন
              </Link>
            </div>

            <dl className="mt-9 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                <dt className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <UserRound aria-hidden="true" className="size-4 text-emerald-600" />
                  পূর্ণ নাম
                </dt>
                <dd className="mt-2 break-words font-semibold text-slate-950">{user.name}</dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                <dt className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <Mail aria-hidden="true" className="size-4 text-emerald-600" />
                  ইমেইল ঠিকানা
                </dt>
                <dd className="mt-2 break-all font-semibold text-slate-950">{user.email}</dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                <dt className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <CalendarDays aria-hidden="true" className="size-4 text-emerald-600" />
                  অ্যাকাউন্ট তৈরি
                </dt>
                <dd className="mt-2 font-semibold text-slate-950">
                  {formatAccountDate(user.createdAt)}
                </dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                <dt className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <CalendarDays aria-hidden="true" className="size-4 text-emerald-600" />
                  সর্বশেষ হালনাগাদ
                </dt>
                <dd className="mt-2 font-semibold text-slate-950">
                  {formatAccountDate(user.updatedAt)}
                </dd>
              </div>
            </dl>

            <div className="mt-7 border-t border-slate-200 pt-6">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                হোমে ফিরে যান
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
