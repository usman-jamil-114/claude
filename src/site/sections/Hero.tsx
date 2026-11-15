"use client";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { OFFER } from "../config";
import { SiteLink } from "../lib/adapter";
import { cn } from "../lib/cn";
import { DEFAULT_WA_MESSAGE, openWhatsApp } from "../lib/whatsapp";
import { buttonVariants } from "../components/Button";

const WORDS = ["Websites that sell", "Google Ads that convert", "Landing pages for ads", "Online stores that grow"];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  useEffect(() => {
    const word = WORDS[index];
    let characterCount = 0;
    let nextWordTimeout: number | undefined;

    const typingInterval = window.setInterval(() => {
      characterCount += 1;
      setVisibleCharacters(characterCount);

      if (characterCount === word.length) {
        window.clearInterval(typingInterval);
        nextWordTimeout = window.setTimeout(() => {
          setVisibleCharacters(0);
          setIndex((current) => (current + 1) % WORDS.length);
        }, 1400);
      }
    }, 65);

    return () => {
      window.clearInterval(typingInterval);
      if (nextWordTimeout !== undefined) window.clearTimeout(nextWordTimeout);
    };
  }, [index]);

  return (
    <span className="inline-flex items-baseline">
      <span className="inline-block text-primary">{WORDS[index].slice(0, visibleCharacters)}</span>
      <span aria-hidden="true" className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-blink bg-primary" />
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="absolute inset-0 -z-10 bg-grid animate-grid" />

      <div className="container-site relative text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <SiteLink
            href="/#offer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 py-1.5 pr-4 pl-1.5 text-sm font-medium text-foreground transition hover:border-primary/50"
          >
            <span className="rounded-full bg-promo px-2.5 py-0.5 text-xs font-bold text-promo-foreground">
              {OFFER.discountPercent}% OFF
            </span>
            Launch offer for our first {OFFER.totalSpots} clients
            <ArrowRight className="size-4" />
          </SiteLink>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-5xl text-4xl leading-[1.05] font-black text-foreground sm:text-6xl lg:text-7xl"
        >
          Grow your business with <span className="text-gradient">PixelToPPC</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 min-h-[1.3em] font-display text-2xl font-bold text-foreground md:text-4xl"
        >
          We build <Typewriter />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Confused about how to get more customers online? We design fast, beautiful websites and run Google Ads
          campaigns that turn clicks into calls, WhatsApp messages and sales — at a price built for growing Pakistani
          businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => openWhatsApp(DEFAULT_WA_MESSAGE, "hero")}
            className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "shine w-full sm:w-auto")}
          >
            <Sparkles /> Claim {OFFER.discountPercent}% Off Now
          </button>
          <SiteLink href="/#pricing" className={cn(buttonVariants({ variant: "dark", size: "lg" }), "w-full sm:w-auto")}>
            View Pricing <ArrowRight />
          </SiteLink>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-muted-foreground"
        >
          {["Free consultation", "Transparent pricing", "Mobile-first & fast", "Direct WhatsApp support"].map((t) => (
            <li key={t} className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> {t}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 inline-flex items-center gap-3 rounded-2xl border border-promo/40 bg-promo/10 px-5 py-3 text-sm"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-promo opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-promo" />
          </span>
          <span className="font-semibold text-foreground">
            Hurry — only {OFFER.spotsLeft} of {OFFER.totalSpots} discounted spots left
          </span>
        </motion.div>
      </div>
    </section>
  );
}
