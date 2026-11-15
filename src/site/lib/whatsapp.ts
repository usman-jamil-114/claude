import { SITE } from "../config";
import { track } from "./track";

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE = `Hi ${SITE.name}! I'd like to claim the launch discount. Can we talk?`;

export function planMessage(planName: string, groupLabel: string, price: string): string {
  return `Hi ${SITE.name}! I want the ${groupLabel} "${planName}" plan at the launch price (${price}). Please share the next steps.`;
}

/** Opens WhatsApp in a new tab and reports a conversion event when a tag is installed. */
export function openWhatsApp(message: string, source: string): void {
  track("whatsapp_click", { source });
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}
