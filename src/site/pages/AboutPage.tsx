"use client";
import { motion } from "motion/react";
import { Eye, Handshake, HeartHandshake, Lightbulb, Rocket, ShieldCheck, Sparkles, Target } from "lucide-react";
import { OFFER, SITE } from "../config";
import { cn } from "../lib/cn";
import { DEFAULT_WA_MESSAGE, openWhatsApp } from "../lib/whatsapp";
import { buttonVariants } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { FinalCTA } from "../sections/FinalCTA";

const VALUES = [
  { icon: Target, title: "Results first", text: "Pretty is not enough. Everything we make is measured by the customers it brings you." },
  { icon: Eye, title: "Total transparency", text: "Clear prices, honest advice and reports you can actually understand." },
  { icon: HeartHandshake, title: "Real partnership", text: "We treat your business like our own and stay with you after launch." },
  { icon: Lightbulb, title: "Always learning", text: "Google and the web change fast — we keep up so you don't have to." },
];

const PROMISES = [
  "We reply quickly on WhatsApp and email",
  "We explain everything in simple words",
  "We never lock you in — you own everything",
  "We only recommend what your business really needs",
];

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${SITE.name}`}
        title={<>We're new. <span className="text-gradient">That's your advantage.</span></>}
        subtitle="PixelToPPC is a fresh digital studio from Pakistan, built to give small and growing businesses the kind of websites and Google Ads results that used to be reserved for big brands."
      />

      <section className="py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">From pixels to pay-per-click</h2>
            <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Our name says exactly what we do. <strong className="text-foreground">Pixel</strong> stands for the
                websites we design and build, down to the last pixel.{" "}
                <strong className="text-foreground">PPC</strong> — pay-per-click — is the Google Ads that bring the right
                people to them.
              </p>
              <p>
                Most businesses get these two things from different people who never talk to each other. The result?
                Beautiful websites nobody visits, or expensive ads that send traffic to pages that don't convert. We do
                both, together, so every rupee works harder.
              </p>
              <p>
                We're just getting started, and we want our first clients to become our biggest success stories.
                That's why the first {OFFER.totalSpots} orders get {OFFER.discountPercent}% off — and our full attention.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative grid grid-cols-2 gap-4">
              {[
                { icon: Rocket, big: "2", small: "Core services" },
                { icon: Sparkles, big: `${OFFER.discountPercent}%`, small: "Launch discount" },
                { icon: Handshake, big: `${OFFER.spotsLeft}`, small: "Spots remaining" },
                { icon: ShieldCheck, big: "100%", small: "Ownership for you" },
              ].map((s, i) => (
                <motion.div
                  key={s.small}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "rounded-3xl border p-4 sm:p-7",
                    i === 1 ? "border-primary/40 bg-gradient-featured shadow-glow" : "border-border bg-card",
                  )}
                >
                  <s.icon className="size-6 text-primary" />
                  <p className="mt-5 font-display text-4xl font-black text-foreground md:text-5xl">{s.big}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.small}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="What we stand for" title={<>Our <span className="text-gradient">values</span></>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 sm:p-7">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-deep/60 text-primary">
                    <v.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <div className="grid gap-10 rounded-[2rem] border border-border bg-gradient-card p-4 sm:p-8 md:p-14 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Our promise to you</h2>
                <p className="mt-4 text-muted-foreground">
                  Working with a new studio should feel safe. Here's what you can always expect from us.
                </p>
                <button
                  type="button"
                  onClick={() => openWhatsApp(DEFAULT_WA_MESSAGE, "about_promise")}
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "shine mt-8")}
                >
                  <Sparkles /> Start with a free consultation
                </button>
              </div>
              <ul className="space-y-4">
                {PROMISES.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-background/60 p-3 text-foreground sm:p-5"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-display font-black text-primary-foreground">
                      {i + 1}
                    </span>
                    {p}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA title="Be one of our first success stories." />
    </>
  );
}
