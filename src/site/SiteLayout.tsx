"use client";
import type { ReactNode } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
