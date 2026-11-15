"use client";
import { ArrowRight, Mail } from "lucide-react";
import { OFFER, SITE } from "../config";
import { SiteLink } from "../lib/adapter";
import { cn } from "../lib/cn";
import { DEFAULT_WA_MESSAGE, openWhatsApp } from "../lib/whatsapp";
import { buttonVariants } from "../components/Button";
import { WhatsAppIcon } from "../components/Icons";
import { Reveal } from "../components/Reveal";

export function FinalCTA({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <section className="py-20 md:py-24">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-brand p-8 text-center md:p-16">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <img
              src="/images/pixel-cubes.webp"
              alt=""
              width={640}
              height={640}
              loading="lazy"
              className="pointer-events-none absolute -bottom-10 -left-10 w-40 animate-float-slow opacity-50 md:w-60"
            />
            <img
              src="/images/cursor-3d.webp"
              alt=""
              width={640}
              height={640}
              loading="lazy"
              className="pointer-events-none absolute -top-6 -right-6 w-28 animate-float opacity-70 md:w-44"
            />
            <div className="relative">
              <p className="inline-flex rounded-full bg-background/20 px-4 py-1.5 text-sm font-bold text-primary-foreground">
                Only {OFFER.spotsLeft} of {OFFER.totalSpots} spots left
              </p>
              <h2 className="mx-auto mt-6 max-w-3xl text-3xl leading-tight font-black text-primary-foreground md:text-5xl">
                {title ?? `Ready to grow? Claim your ${OFFER.discountPercent}% launch discount today.`}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-primary-foreground/80 md:text-lg">
                {subtitle ?? "Send us one message. We'll reply with a free plan for your business — no strings attached."}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openWhatsApp(DEFAULT_WA_MESSAGE, "final_cta")}
                  className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "shine w-full sm:w-auto")}
                >
                  <WhatsAppIcon className="text-whatsapp" /> Chat on WhatsApp
                </button>
                <a
                  href={`mailto:${SITE.email}`}
                  className={cn(buttonVariants({ variant: "dark", size: "lg" }), "w-full sm:w-auto")}
                >
                  <Mail /> Email us
                </a>
                <SiteLink href="/contact" className="inline-flex items-center gap-1.5 px-3 text-sm font-semibold text-primary-foreground hover:underline">
                  Or fill the form <ArrowRight className="size-4" />
                </SiteLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
