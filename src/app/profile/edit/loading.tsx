export default function ProfileEditLoading() {
  return (
    <main aria-busy="true" aria-label="প্রোফাইল সম্পাদনা লোড হচ্ছে" className="bg-slate-50/70 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-3xl animate-pulse px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="h-48 bg-slate-900" />
          <div className="space-y-7 p-5 sm:p-10">
            <div className="space-y-3">
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="h-12 rounded-xl bg-slate-100" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-12 rounded-xl bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
