import type { Metadata } from "next";
import { PrivacyPage } from "@/site/pages/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PixelToPPC collects, uses and protects your information, including our use of WhatsApp and Google advertising tools.",
  alternates: { canonical: "/privacy/" },
  openGraph: { title: "Privacy Policy", description: "How PixelToPPC collects, uses and protects your information, including our use of WhatsApp and Google advertising tools.", url: "/privacy/" },
};

export default function Page() {
  return <PrivacyPage />;
}
