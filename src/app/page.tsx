import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-3xl rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm sm:p-12">
        <Image
          className="mx-auto mb-5 h-12 w-12"
          src="/logo-icon.png"
          alt="বাজার দর লোগো"
          width={48}
          height={48}
          priority
        />
        <p className="mb-3 text-sm font-semibold tracking-wide text-emerald-700">
          বাজারের খবর, এক নজরে
        </p>
        <h1 className="text-4xl font-bold text-slate-950 sm:text-5xl">বাজার দর</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
          বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর সহজে জানার একটি নির্ভরযোগ্য প্ল্যাটফর্ম।
        </p>
        <p className="mt-8 text-sm text-slate-500">পূর্ণ অভিজ্ঞতা শিগগিরই আসছে।</p>
      </section>
    </main>
  );
}

