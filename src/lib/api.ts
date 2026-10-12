export const BAZARDOR_API_BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
] as const;

type ResponseParser<T> = (data: unknown) => T | null;

export type BazarDorResourceResult<T> =
  | { status: "success"; data: T }
  | { status: "not-found" }
  | { status: "error" };

export async function fetchBazarDorResource<T>(
  path: `/${string}`,
  parse: ResponseParser<T>,
): Promise<BazarDorResourceResult<T>> {
  let notFoundResponses = 0;

  for (const baseUrl of BAZARDOR_API_BASES) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        next: { revalidate: 60 * 60 },
        signal: AbortSignal.timeout(5_000),
      });

      if (response.status === 404) {
        notFoundResponses += 1;
        continue;
      }

      if (!response.ok) {
        continue;
      }

      const parsed = parse(await response.json());

      if (parsed !== null) {
        return { status: "success", data: parsed };
      }
    } catch {
      // Try the next endpoint documented by the assignment.
    }
  }

  return notFoundResponses === BAZARDOR_API_BASES.length
    ? { status: "not-found" }
    : { status: "error" };
}

export async function fetchBazarDorData<T>(
  path: `/${string}`,
  parse: ResponseParser<T>,
): Promise<T | null> {
  const result = await fetchBazarDorResource(path, parse);
  return result.status === "success" ? result.data : null;
}

