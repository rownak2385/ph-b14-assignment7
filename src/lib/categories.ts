import { cache } from "react";

import { fetchBazarDorData } from "@/lib/api";
import type { Category, CategoryResult } from "@/types/category";

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

function parseCategories(data: unknown): Category[] | null {
  if (!Array.isArray(data) || !data.every(isCategory)) {
    return null;
  }

  return data;
}

export const getCategoryResult = cache(async (): Promise<CategoryResult> => {
  const categories = await fetchBazarDorData("/categories", parseCategories);

  if (categories === null) {
    return { categories: [], status: "error" };
  }

  return { categories, status: "success" };
});

export async function getCategories(): Promise<Category[]> {
  return (await getCategoryResult()).categories;
}

