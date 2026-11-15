type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Sends an event to Google tag (Ads / Analytics) when it is installed on the page. */
export function track(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
