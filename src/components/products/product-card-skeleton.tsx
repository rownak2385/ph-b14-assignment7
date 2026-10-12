export function ProductCardSkeleton() {
  return (
    <div className="h-[19rem] animate-pulse rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-hidden="true">
      <div className="flex items-start justify-between">
        <div className="size-16 rounded-2xl bg-slate-200" />
        <div className="h-7 w-16 rounded-full bg-slate-200" />
      </div>
      <div className="mt-5 h-3 w-16 rounded bg-slate-200" />
      <div className="mt-3 h-6 w-2/3 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-20 rounded bg-slate-100" />
      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="h-3 w-20 rounded bg-slate-100" />
        <div className="mt-3 h-7 w-28 rounded bg-slate-200" />
      </div>
    </div>
  );
}

