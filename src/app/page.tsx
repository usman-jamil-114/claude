import type { Metadata } from "next";
import { HomePage } from "@/site/pages/HomePage";

const title = "PixelToPPC — 85% Off Websites & Google Ads | Pakistan";
const description =
  "Get a high-converting website or a fully managed Google Ads campaign at 85% off. Only 9 of 10 launch spots left. Free consultation on WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/" },
};

export default function Page() {
  return <HomePage />;
}
