"use client";
import { motion } from "motion/react";
import { Check, Flame, Gift, Lock, Sparkles } from "lucide-react";
import { OFFER, spotsClaimed } from "../config";
import { cn } from "../lib/cn";
import { DEFAULT_WA_MESSAGE, openWhatsApp } from "../lib/whatsapp";
import { buttonVariants } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { Countdown } from "./Countdown";

export function OfferSpots() {
  const slots = Array.from({ length: OFFER.totalSpots }, (_, i) => i < spotsClaimed);
  const pct = (spotsClaimed / OFFER.totalSpots) * 100;

  return (
    <section id="offer" className="relative scroll-mt-32 py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/30 bg-gradient-featured p-5 shadow-glow md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <img
              src="/images/percent-green.webp"
              alt=""
              width={640}
              height={640}
              loading="lazy"
              className="pointer-events-none absolute -top-10 -right-10 w-48 animate-float opacity-30 md:w-80 md:opacity-60"
            />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <motion.div
                    initial={{ rotate: -20, scale: 0 }}
                    whileInView={{ rotate: -10, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="grid size-20 place-items-center rounded-full bg-inverse font-display text-sm leading-tight font-black text-inverse-foreground [clip-path:polygon(50%_0%,61%_10%,75%_4%,79%_19%,94%_22%,90%_37%,100%_50%,90%_63%,94%_78%,79%_81%,75%_96%,61%_90%,50%_100%,39%_90%,25%_96%,21%_81%,6%_78%,10%_63%,0%_50%,10%_37%,6%_22%,21%_19%,25%_4%,39%_10%)]"
                  >
                    <span className="text-center">
                      UP
                      <br />
                      TO
                    </span>
                  </motion.div>
                  <span className="rounded-2xl bg-gradient-promo px-4 py-2 font-display text-4xl font-black sm:px-5 sm:text-5xl text-promo-foreground shadow-promo md:text-7xl">
                    {OFFER.discountPercent}% OFF
                  </span>
                </div>

                <h2 className="mt-8 text-3xl leading-tight font-extrabold text-foreground md:text-5xl">
                  On our first {OFFER.totalSpots} orders. <span className="text-gradient">Only {OFFER.spotsLeft} left.</span>
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  We're a new studio, so instead of spending on big ad budgets, we're investing in our first clients.
                  Get a premium website or a fully managed Google Ads campaign at {OFFER.discountPercent}% off — same
                  quality, same care, a fraction of the price.
                </p>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Valid on all website & Google Ads plans",
                    "Free consultation before you pay",
                    "Launch bonus included in every plan",
                    "Lock your spot with one WhatsApp message",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/20 text-primary">
                        <Check className="size-3.5" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0 rounded-3xl border border-border bg-background/70 p-5 backdrop-blur md:p-8">
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
                    <Flame className="size-4 text-promo" /> Discounted spots
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-primary">{OFFER.spotsLeft}</span> / {OFFER.totalSpots} remaining
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-5 gap-2.5">
                  {slots.map((claimed, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
                      className={cn(
                        "flex aspect-square flex-col items-center justify-center rounded-xl border text-xs font-bold",
                        claimed
                          ? "border-promo/40 bg-promo/15 text-promo"
                          : "border-primary/40 bg-primary/10 text-primary",
                      )}
                    >
                      {claimed ? <Lock className="size-4" /> : <Gift className="size-4" />}
                      <span className="mt-1">{claimed ? "Taken" : `#${i + 1}`}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-promo"
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {spotsClaimed} claimed • {OFFER.spotsLeft} remaining — once they're gone, regular prices apply.
                </p>

                <p className="mt-7 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Offer ends in</p>
                <Countdown className="mt-3" />

                <button
                  type="button"
                  onClick={() => openWhatsApp(DEFAULT_WA_MESSAGE, "offer_section")}
                  className={cn(buttonVariants({ variant: "promo", size: "lg" }), "shine mt-8 w-full")}
                >
                  <Sparkles /> Grab my spot before it's gone
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
