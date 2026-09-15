// Thin wrapper around the Meta Pixel's global fbq(). Every call is a no-op
// until NEXT_PUBLIC_META_PIXEL_ID is set and the base snippet (see
// MetaPixel.tsx) has loaded — so pages can call trackEvent() unconditionally
// without checking pixel state themselves.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", name, params);
}
