import type { Category } from "@/types/category";

const CATEGORY_ENDPOINTS = [
  "https://openapi.programming-hero.com/api/bazardor/categories",
  "https://api.api-store.workers.dev/api/bazardor/categories",
  "https://api.abcz.workers.dev/api/bazardor/categories",
] as const;

function isCategory(value: unknown): value is Category {
  if (!value || typeof value !== "object") {
    return false;
  }

  const category = value as Record<string, unknown>;

  return (
    typeof category.id === "string" &&
    typeof category.slug === "string" &&
    typeof category.nameBn === "string" &&
    typeof category.icon === "string"
  );
}

export async function getCategories(): Promise<Category[]> {
  for (const endpoint of CATEGORY_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        next: { revalidate: 60 * 60 },
        signal: AbortSignal.timeout(5_000),
      });

      if (!response.ok) {
        continue;
      }

      const data: unknown = await response.json();

      if (Array.isArray(data) && data.every(isCategory)) {
        return data;
      }
    } catch {
      // Continue to the next documented endpoint. The caller renders a safe
      // empty state if every source is unavailable.
    }
  }

  return [];
}

