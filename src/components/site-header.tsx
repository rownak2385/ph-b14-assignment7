import { AuthControls } from "@/components/auth-controls";
import { Brand } from "@/components/brand";
import { Container } from "@/components/container";
import { MobileNavigation } from "@/components/mobile-navigation";
import { NavigationLinks } from "@/components/navigation-links";
import { formatBanglaDate } from "@/lib/format-date";
import type { Category } from "@/types/category";

type SiteHeaderProps = {
  categories: Category[];
};

export function SiteHeader({ categories }: SiteHeaderProps) {
  const date = formatBanglaDate();

  return (
    <header className="relative z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3 sm:min-h-24">
        <Brand date={date} />

        <AuthControls />

        <MobileNavigation categories={categories} />
      </Container>

      <div className="hidden border-t border-slate-100 md:block">
        <Container>
          <nav
            aria-label="পণ্যের বিভাগ"
            className="overflow-x-auto py-2 [scrollbar-width:thin]"
          >
            <NavigationLinks categories={categories} />
          </nav>
        </Container>
      </div>
    </header>
  );
}

