import { Container } from "@/components/container";

export default function ProductLoading() {
  return (
    <div aria-busy="true" aria-label="পণ্যের বিস্তারিত তথ্য লোড হচ্ছে">
      <section className="border-b border-emerald-100 bg-emerald-50/60">
        <Container className="py-10 sm:py-14">
          <div className="grid animate-pulse gap-8 lg:grid-cols-[1fr_18rem] lg:items-center" aria-hidden="true">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="size-20 shrink-0 rounded-3xl bg-emerald-100 sm:size-24" />
              <div className="w-full max-w-xl">
                <div className="h-4 w-36 rounded bg-emerald-100" />
                <div className="mt-3 h-10 w-64 max-w-full rounded bg-slate-200" />
                <div className="mt-4 h-4 w-full rounded bg-slate-200" />
                <div className="mt-2 h-4 w-4/5 rounded bg-slate-200" />
                <div className="mt-5 h-9 w-48 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="h-40 rounded-3xl bg-white shadow-sm" />
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <div className="animate-pulse" aria-hidden="true">
          <div className="h-4 w-32 rounded bg-emerald-100" />
          <div className="mt-3 h-8 w-56 rounded bg-slate-200" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="h-36 rounded-2xl bg-white shadow-sm" />
            ))}
          </div>
          <div className="mt-12 h-8 w-72 max-w-full rounded bg-slate-200" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="h-64 rounded-2xl bg-white shadow-sm" />
            ))}
          </div>
        </div>
        <span className="sr-only">পণ্যের বিস্তারিত তথ্য লোড হচ্ছে…</span>
      </Container>
    </div>
  );
}
