/** Return a safe same-site redirect path, or the fallback for invalid input. */
export function safeRedirectPath(value: string | null, fallback = "/"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }

  try {
    const destination = new URL(value, "http://carcare.local");
    if (destination.origin !== "http://carcare.local") return fallback;
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return fallback;
  }
}
