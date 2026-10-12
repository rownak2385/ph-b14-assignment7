import { ArrowDown } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/container";

export function HeroSection() {
  return (
    <section className="overflow-hidden border-b border-emerald-100 bg-[linear-gradient(135deg,#ecfdf5_0%,#f8fafc_52%,#fff7ed_100%)]">
      <Container className="grid min-h-[34rem] items-center gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20 lg:gap-16">
        <div className="max-w-2xl text-center md:text-left">
          <p className="mb-4 inline-flex rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm">
            আজকের বাজার, এখন আরও সহজ
          </p>
          <h1 className="text-4xl font-bold leading-[1.18] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            নিত্যপণ্যের <span className="text-emerald-700">বাজারদর</span> জানুন এক নজরে
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ ও মাংসসহ প্রয়োজনীয় পণ্যের সর্বশেষ দাম এবং দৈনিক পরিবর্তন সহজে দেখুন।
          </p>
          <a
            href="#সব-পণ্য"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-base font-bold text-white shadow-lg shadow-emerald-900/15 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4"
          >
            সব পণ্য দেখুন
            <ArrowDown aria-hidden="true" size={18} />
          </a>
        </div>

        <div className="relative mx-auto flex min-h-72 w-full max-w-md items-center justify-center md:min-h-96">
          <div className="absolute inset-8 rounded-full bg-emerald-200/60 blur-3xl" aria-hidden="true" />
          <div className="relative rounded-[2.5rem] border border-white/80 bg-white/70 p-8 shadow-2xl shadow-emerald-900/10 backdrop-blur sm:p-10">
            <Image
              src="/bazar-hero.png"
              alt="তাজা বাজারের পণ্যভর্তি ঝুড়ি"
              width={315}
              height={263}
              sizes="(max-width: 768px) 260px, 315px"
              className="h-auto w-[16rem] sm:w-[19.6875rem]"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

