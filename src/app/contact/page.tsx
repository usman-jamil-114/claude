import type { Metadata } from "next";
import { ContactPage } from "@/site/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Free Consultation on WhatsApp",
  description: "Tell us about your business and get a free plan for your website or Google Ads. Reach us on WhatsApp or email.",
  alternates: { canonical: "/contact/" },
  openGraph: { title: "Contact — Free Consultation on WhatsApp", description: "Tell us about your business and get a free plan for your website or Google Ads. Reach us on WhatsApp or email.", url: "/contact/" },
};

export default function Page() {
  return <ContactPage />;
}
