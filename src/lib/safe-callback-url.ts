const APP_ORIGIN = "https://bazardor.local";

export function getSafeCallbackUrl(
  value: string | string[] | null | undefined,
  fallback = "/",
): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  let decodedValue: string;

  try {
    decodedValue = decodeURIComponent(value);
  } catch {
    return fallback;
  }

  if (
    decodedValue.startsWith("//") ||
    decodedValue.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(decodedValue)
  ) {
    return fallback;
  }

  try {
    const url = new URL(value, APP_ORIGIN);

    if (url.origin !== APP_ORIGIN) {
      return fallback;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
