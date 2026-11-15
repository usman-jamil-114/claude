"use client";
import { Heart, Mail } from "lucide-react";
import { OFFER, SITE } from "../config";
import { SiteLink } from "../lib/adapter";
import { DEFAULT_WA_MESSAGE, openWhatsApp } from "../lib/whatsapp";
import { WhatsAppIcon } from "./Icons";
import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Main",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services#web", label: "Website Development" },
      { href: "/services#ads", label: "Google Ads" },
      { href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Legal",
    links: [{ href: "/privacy", label: "Privacy Policy" }],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border bg-surface">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.1fr_0.9fr_1.6fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {SITE.tagline} A Pakistan-based studio helping businesses grow online — launching with {OFFER.discountPercent}% off
            for our first {OFFER.totalSpots} clients.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-base font-bold text-foreground">{col.title}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <SiteLink href={l.href} className="text-[15px] text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-base font-bold text-foreground">Get in touch</h3>
          <ul className="mt-5 space-y-3">
            <li>
              <button
                type="button"
                onClick={() => openWhatsApp(DEFAULT_WA_MESSAGE, "footer")}
                className="inline-flex items-center gap-2.5 text-[15px] text-muted-foreground transition-colors hover:text-whatsapp"
              >
                <WhatsAppIcon className="size-5 text-whatsapp" /> Chat on WhatsApp
              </button>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2.5 text-[15px] [overflow-wrap:anywhere] text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-5 shrink-0 text-primary" /> {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with <Heart className="size-4 fill-promo text-promo" /> and ☕ in {SITE.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
