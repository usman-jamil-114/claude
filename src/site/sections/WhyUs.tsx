"use client";
import { motion } from "motion/react";
import { BadgeDollarSign, Gauge, MessageCircle, ShieldCheck, Smartphone, Target } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

const ITEMS = [
  { icon: Target, title: "Built for conversions", text: "Every page and ad is designed around one thing — getting you more calls, messages and sales." },
  { icon: Gauge, title: "Blazing fast", text: "Fast sites rank higher, convert better and lower your ad costs. We optimise every millisecond." },
  { icon: Smartphone, title: "Mobile-first", text: "Most of your customers are on their phones. Your site will look stunning on every screen." },
  { icon: BadgeDollarSign, title: "Honest, clear pricing", text: "Fixed prices in PKR. No hidden fees, no surprises — you know exactly what you pay for." },
  { icon: MessageCircle, title: "Talk to us on WhatsApp", text: "No ticket systems or waiting days. Message us directly and get real answers quickly." },
  { icon: ShieldCheck, title: "You own everything", text: "Your website, domain, ad account and data are 100% yours — always." },
];

export function WhyUs() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-96 max-w-4xl rounded-full bg-primary/5 blur-3xl" />
      <div className="container-site">
        <SectionHeading
          eyebrow="Why PixelToPPC"
          title={<>Everything your business needs to <span className="text-gradient">win online</span></>}
          subtitle="We combine design, development and paid advertising under one roof — so your website and ads work together."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-brand-deep/60 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <it.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
