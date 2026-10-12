import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-950/10 bg-emerald-950 text-emerald-50">
      <Container className="flex flex-col gap-3 py-7 text-sm leading-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="font-semibold">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="max-w-xl text-emerald-100 sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </Container>
    </footer>
  );
}

