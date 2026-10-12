import { ArrowDownToLine, ArrowUpToLine, ChartNoAxesCombined } from "lucide-react";

import { formatPerUnit, formatPrice } from "@/lib/format-price";
import type { PriceStatistics as PriceStatisticsValue } from "@/lib/price-statistics";
import type { ProductUnit } from "@/types/product";

type PriceStatisticsProps = {
  statistics: PriceStatisticsValue | null;
  unit: ProductUnit;
};

export function PriceStatistics({ statistics, unit }: PriceStatisticsProps) {
  const cards = statistics
    ? [
        {
          label: "সর্বনিম্ন দাম",
          value: statistics.min,
          Icon: ArrowDownToLine,
          tone: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        },
        {
          label: "সর্বোচ্চ দাম",
          value: statistics.max,
          Icon: ArrowUpToLine,
          tone: "bg-rose-50 text-rose-700 ring-rose-100",
        },
        {
          label: "গড় দাম",
          value: statistics.midpoint,
          Icon: ChartNoAxesCombined,
          tone: "bg-amber-50 text-amber-700 ring-amber-100",
        },
      ]
    : [];

  return (
    <section aria-labelledby="price-statistics-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-emerald-700">মূল্যসীমার সারাংশ</p>
          <h2 id="price-statistics-heading" className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
            আজকের দাম এক নজরে
          </h2>
        </div>
        <p className="text-sm text-slate-500">{formatPerUnit(unit)}</p>
      </div>

      {statistics ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {cards.map(({ label, value, Icon, tone }) => (
              <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className={`flex size-10 items-center justify-center rounded-xl ring-1 ring-inset ${tone}`}>
                  <Icon aria-hidden="true" size={20} />
                </span>
                <p className="mt-4 text-sm font-semibold text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-950">{formatPrice(value)}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            গড় দাম {statistics.marketCount.toLocaleString("bn-BD")}টি বৈধ বাজারের সর্বনিম্ন ও সর্বোচ্চ মূল্যসীমার মধ্যমান থেকে হিসাব করা হয়েছে।
          </p>
        </>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center text-slate-600" role="status">
          এই পণ্যের জন্য বৈধ বাজারমূল্য পাওয়া যায়নি।
        </div>
      )}
    </section>
  );
}
