export default function ProfileLoading() {
  return (
    <main aria-busy="true" aria-label="প্রোফাইল লোড হচ্ছে" className="bg-slate-50/70 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-5xl animate-pulse px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="h-52 bg-slate-900 sm:h-60" />
          <div className="space-y-8 px-5 pb-8 sm:px-10 sm:pb-10">
            <div className="-mt-12 flex items-end gap-4 sm:-mt-14">
              <div className="size-24 rounded-3xl border-4 border-white bg-slate-200 sm:size-28" />
              <div className="w-52 space-y-3 pb-2">
                <div className="h-7 rounded bg-slate-200" />
                <div className="h-4 w-4/5 rounded bg-slate-100" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-24 rounded-2xl bg-slate-100" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
