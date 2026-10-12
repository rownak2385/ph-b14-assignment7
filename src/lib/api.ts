export const BAZARDOR_API_BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
] as const;

type ResponseParser<T> = (data: unknown) => T | null;

export async function fetchBazarDorData<T>(
  path: `/${string}`,
  parse: ResponseParser<T>,
): Promise<T | null> {
  for (const baseUrl of BAZARDOR_API_BASES) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        next: { revalidate: 60 * 60 },
        signal: AbortSignal.timeout(5_000),
      });

      if (!response.ok) {
        continue;
      }

      const parsed = parse(await response.json());

      if (parsed !== null) {
        return parsed;
      }
    } catch {
      // Try the next endpoint documented by the assignment.
    }
  }

  return null;
}

