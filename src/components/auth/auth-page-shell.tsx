import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { Container } from "@/components/container";

type AuthPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthPageShell({ eyebrow, title, description, children }: AuthPageShellProps) {
  return (
    <section className="bg-[linear-gradient(135deg,#ecfdf5_0%,#f8fafc_52%,#fff7ed_100%)] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-white/80 bg-white shadow-2xl shadow-emerald-950/10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative hidden overflow-hidden bg-emerald-900 px-10 py-12 text-white lg:block">
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-emerald-500/20 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-28 -left-20 size-72 rounded-full bg-amber-300/10 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <ShieldCheck aria-hidden="true" size={30} />
              </span>
              <p className="mt-10 text-sm font-bold text-emerald-200">নিরাপদ অ্যাকাউন্ট</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">নিজের বাজার তালিকা, সব সময় হাতের কাছে</h2>
              <p className="mt-4 leading-7 text-emerald-100/90">
                নিরাপদে প্রবেশ করুন এবং বাজার দরের সর্বশেষ তথ্য নির্বিঘ্নে দেখুন।
              </p>
            </div>
          </div>

          <div className="px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <p className="text-sm font-bold text-emerald-700">{eyebrow}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
            <p className="mt-3 leading-7 text-slate-600">{description}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
