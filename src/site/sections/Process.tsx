"use client";
import { motion } from "motion/react";
import { MessageSquare, PenTool, Rocket, TrendingUp } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

const STEPS = [
  { icon: MessageSquare, title: "Free consultation", text: "Tell us about your business and goals on WhatsApp or the contact form." },
  { icon: PenTool, title: "Plan & design", text: "We map out your website or ad strategy and share it for your approval." },
  { icon: Rocket, title: "Build & launch", text: "We build, test and launch — your site goes live or your ads start running." },
  { icon: TrendingUp, title: "Grow & optimise", text: "We track results and keep improving so you get more from every rupee." },
];

export function Process() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="How it works"
          title={<>From first message to <span className="text-gradient">first customer</span></>}
          subtitle="A simple, transparent 4-step process. No jargon, no stress."
        />
        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute top-10 right-[12%] left-[12%] hidden h-0.5 origin-left bg-gradient-brand lg:block"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} className="relative text-center">
              <div className="relative mx-auto grid size-20 place-items-center rounded-2xl border border-primary/40 bg-background text-primary shadow-glow">
                <s.icon className="size-8" />
                <span className="absolute -top-2.5 -right-2.5 grid size-7 place-items-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
