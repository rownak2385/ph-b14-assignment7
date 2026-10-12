import { AlertTriangle, PackageSearch } from "lucide-react";

import { Container } from "@/components/container";

type ProductStateProps = {
  kind: "error" | "empty";
};

export function ProductState({ kind }: ProductStateProps) {
  const isError = kind === "error";
  const Icon = isError ? AlertTriangle : PackageSearch;

  return (
    <Container className="py-16 sm:py-24">
      <section
        className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm"
        role={isError ? "alert" : "status"}
      >
        <Icon
          aria-hidden="true"
          className={`mx-auto ${isError ? "text-amber-600" : "text-slate-500"}`}
          size={40}
        />
        <h2 className="mt-5 text-2xl font-bold text-slate-950">
          {isError ? "পণ্যের তথ্য লোড করা যায়নি" : "কোনো পণ্য পাওয়া যায়নি"}
        </h2>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
          {isError
            ? "বাজারদরের সেবাটি সাময়িকভাবে পাওয়া যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।"
            : "আজকের বাজারদরের তালিকায় এখনো কোনো পণ্য যোগ করা হয়নি।"}
        </p>
      </section>
    </Container>
  );
}

