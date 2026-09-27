// Sends a conversion to Meta (every pixel on the page) and to Google Analytics. Safe to call before
// the scripts load or if a blocker removes them: it quietly does nothing.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

// Meta standard event -> GA4 recommended event.
const GA_EVENT: Record<string, string> = {
  Lead: "generate_lead",
  CompleteRegistration: "sign_up",
  InitiateCheckout: "begin_checkout",
  Schedule: "schedule",
};

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", name, params);
  window.gtag?.("event", GA_EVENT[name] ?? name, params ?? {});
}
