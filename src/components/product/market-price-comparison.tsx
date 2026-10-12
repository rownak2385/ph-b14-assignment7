import { MapPin } from "lucide-react";

import { formatPerUnit, formatPrice } from "@/lib/format-price";
import {
  calculateDifferencePercent,
  getValidMarketRange,
  type PriceStatistics,
} from "@/lib/price-statistics";
import type { MarketPrice, ProductUnit } from "@/types/product";

const percentageFormatter = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

type MarketPriceComparisonProps = {
  markets: MarketPrice[];
  statistics: PriceStatistics | null;
  unit: ProductUnit;
};

export function MarketPriceComparison({
  markets,
  statistics,
  unit,
}: MarketPriceComparisonProps) {
  return (
    <section className="mt-12" aria-labelledby="market-prices-heading">
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-emerald-700">বাস্তব API-র বাজারতথ্য</p>
        <h2 id="market-prices-heading" className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <p className="mt-3 leading-7 text-slate-600">
          প্রতিটি বাজারে {formatPerUnit(unit)} সর্বনিম্ন ও সর্বোচ্চ দামের সীমা তুলনা করুন।
        </p>
      </div>

      {markets.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center text-slate-600" role="status">
          এই পণ্যের বাজারভিত্তিক দামের তথ্য এখন পাওয়া যাচ্ছে না।
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {markets.map((market, index) => (
            <MarketPriceCard
              key={`${market.division}-${market.market}-${index}`}
              market={market}
              statistics={statistics}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function MarketPriceCard({
  market,
  statistics,
}: {
  market: MarketPrice;
  statistics: PriceStatistics | null;
}) {
  const range = getValidMarketRange(market);
  const difference =
    range && statistics
      ? calculateDifferencePercent(range.midpoint, statistics.midpoint)
      : null;
  const barWidth =
    range && statistics && statistics.max > 0
      ? Math.max(8, Math.min(100, (range.midpoint / statistics.max) * 100))
      : 0;
  const isMinimum = Boolean(range && statistics && range.min === statistics.min);
  const isMaximum = Boolean(range && statistics && range.max === statistics.max);

  return (
    <article data-market-price className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-lg font-bold text-slate-950">{market.market}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin aria-hidden="true" size={15} />
            {market.division} বিভাগ
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {isMinimum ? <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">সর্বনিম্ন</span> : null}
          {isMaximum ? <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-800">সর্বোচ্চ</span> : null}
        </div>
      </div>

      {range ? (
        <>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-xs font-semibold text-slate-500">সর্বনিম্ন</dt>
              <dd className="mt-1 font-bold text-slate-900">{formatPrice(range.min)}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-xs font-semibold text-slate-500">সর্বোচ্চ</dt>
              <dd className="mt-1 font-bold text-slate-900">{formatPrice(range.max)}</dd>
            </div>
          </dl>

          {statistics ? (
            <div className="mt-5">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-slate-600">বাজারের মধ্যমান</span>
                <span className="font-bold text-slate-900">{formatPrice(range.midpoint)}</span>
              </div>
              <div
                className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"
                role="img"
                aria-label={`${market.market} বাজারের মধ্যমান ${formatPrice(range.midpoint)}`}
              >
                <div className="h-full rounded-full bg-emerald-600" style={{ width: `${barWidth}%` }} />
              </div>
              {difference !== null ? (
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  সামগ্রিক আনুমানিক গড়ের চেয়ে {percentageFormatter.format(Math.abs(difference))}% {difference > 0 ? "বেশি" : difference < 0 ? "কম" : "সমান"}
                </p>
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800" role="status">
          এই বাজারের বৈধ মূল্যসীমা পাওয়া যায়নি।
        </p>
      )}
    </article>
  );
}
