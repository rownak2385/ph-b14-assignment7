import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { ProductDetailState } from "@/components/product/product-detail-state";
import { getServerSession } from "@/lib/auth-session";

export const dynamic = "force-dynamic";

type ProductLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { slug } = await params;
  let session: Awaited<ReturnType<typeof getServerSession>>;

  try {
    session = await getServerSession();
  } catch {
    return <ProductDetailState kind="auth-error" />;
  }

  if (!session) {
    const callbackUrl = `/product/${encodeURIComponent(slug)}`;
    redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return children;
}
