"use client";
import { Flame, Percent, Plus } from "lucide-react";
import { OFFER } from "../config";
import { SiteLink } from "../lib/adapter";

const ITEMS = [
  `${OFFER.discountPercent}% OFF on first ${OFFER.totalSpots} orders`,
  `Only ${OFFER.spotsLeft} spots left`,
  "Free consultation on WhatsApp",
  "Website Development",
  "Google Ads Management",
  "Don't miss out",
  "Biggest launch deal of the year",
];

export function PromoBar() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <SiteLink
      href="/#offer"
      className="group relative block overflow-hidden bg-gradient-promo text-promo-foreground"
      aria-label={`Launch offer: ${OFFER.discountPercent}% off, ${OFFER.spotsLeft} spots left`}
    >
      <div className="flex w-max animate-marquee items-center py-2 group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {row.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-6 px-6 text-sm font-bold whitespace-nowrap">
                {i % 3 === 0 ? <Flame className="size-4" /> : null}
                {item}
                {i % 2 === 0 ? <Plus className="size-4 opacity-80" /> : <Percent className="size-4 opacity-80" />}
              </span>
            ))}
          </div>
        ))}
      </div>
    </SiteLink>
  );
}
