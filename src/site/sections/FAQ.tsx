"use client";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { OFFER } from "../config";
import { cn } from "../lib/cn";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

export const FAQS = [
  {
    q: `Is the ${OFFER.discountPercent}% discount real?`,
    a: `Yes. We're a new studio and want to build long-term relationships, so our first ${OFFER.totalSpots} clients get ${OFFER.discountPercent}% off any plan. Once the spots are gone, regular prices apply.`,
  },
  {
    q: "How do I get started?",
    a: "Tap any WhatsApp button or fill in the contact form. We'll have a free consultation, understand your goals and recommend the right plan — no pressure.",
  },
  {
    q: "Is the Google Ads budget included in the price?",
    a: "No. Our price is the management fee. Your ad spend is paid directly to Google from your own account, so you stay in full control of your budget.",
  },
  {
    q: "Will my website work on mobile phones?",
    a: "Absolutely. Every website we build is mobile-first, fast and tested on phones, tablets and desktops.",
  },
  {
    q: "Do I own my website and ad account?",
    a: "Yes, 100%. Your domain, website files, Google Ads account and data always belong to you.",
  },
  {
    q: "Can you build a landing page specifically for my ads?",
    a: "Yes — that's our speciality. A dedicated landing page usually converts far better than sending ad traffic to a general homepage.",
  },
];

export function FAQ({ items = FAQS }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28">
      <div className="container-site max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="Questions? We've got answers." />
        <div className="space-y-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className={cn("rounded-2xl border bg-card transition-colors", isOpen ? "border-primary/40" : "border-border")}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-display text-base font-bold text-foreground md:text-lg">{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 leading-relaxed text-muted-foreground">{f.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
