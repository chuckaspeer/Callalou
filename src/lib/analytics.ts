/**
 * Minimal analytics event helper. No backend.
 * In development: console.log. In production: no-op or wire to provider later.
 */

export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("[analytics]", name, props ?? {});
  }

  // Optional: dispatch custom event for tag manager or other listeners
  try {
    window.dispatchEvent(
      new CustomEvent("track", { detail: { name, props } })
    );
  } catch {
    // ignore
  }
}
