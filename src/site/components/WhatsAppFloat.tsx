"use client";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DEFAULT_WA_MESSAGE, openWhatsApp } from "../lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppFloat() {
  const [showPill, setShowPill] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowPill(true), 4500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showPill ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 md:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border border-primary/40 bg-inverse py-1.5 pr-1.5 pl-5 text-inverse-foreground shadow-glow">
                <Sparkles className="size-4 text-brand-deep" />
                <span className="text-sm font-medium">Not sure which plan? Ask us — it's free</span>
                <button
                  type="button"
                  onClick={() => openWhatsApp("Hi PixelToPPC! I'm not sure which plan fits my business. Can you help?", "help_pill")}
                  className="rounded-full bg-brand-deep px-4 py-2 text-sm font-semibold text-foreground transition hover:brightness-125"
                >
                  Ask now
                </button>
              </div>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => setShowPill(false)}
                className="grid size-8 place-items-center rounded-full bg-surface-raised text-foreground hover:bg-secondary"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => openWhatsApp(DEFAULT_WA_MESSAGE, "floating_button")}
        aria-label="Chat with us on WhatsApp"
        className="group fixed right-5 bottom-5 z-50 grid size-16 place-items-center rounded-full bg-whatsapp text-inverse-foreground shadow-glow transition-transform hover:scale-110 md:right-8 md:bottom-8"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp" />
        <WhatsAppIcon className="relative size-8" />
        <span className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-inverse px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-inverse-foreground opacity-0 transition group-hover:opacity-100 md:block">
          Chat with us
        </span>
      </button>
    </>
  );
}
