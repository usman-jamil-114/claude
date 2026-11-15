import type { Metadata } from "next";
import { ServicesPage } from "@/site/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services — Website Development & Google Ads",
  description: "Landing pages, business websites, online stores and Google Ads management for Pakistani businesses. Launch pricing in PKR.",
  alternates: { canonical: "/services/" },
  openGraph: { title: "Services — Website Development & Google Ads", description: "Landing pages, business websites, online stores and Google Ads management for Pakistani businesses. Launch pricing in PKR.", url: "/services/" },
};

export default function Page() {
  return <ServicesPage />;
}
