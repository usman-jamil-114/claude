import type { Metadata } from "next";
import { AboutPage } from "@/site/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Us — From Pixels to Pay-Per-Click",
  description: "PixelToPPC is a new Pakistan-based digital studio building websites and running Google Ads that bring real customers.",
  alternates: { canonical: "/about/" },
  openGraph: { title: "About Us — From Pixels to Pay-Per-Click", description: "PixelToPPC is a new Pakistan-based digital studio building websites and running Google Ads that bring real customers.", url: "/about/" },
};

export default function Page() {
  return <AboutPage />;
}
