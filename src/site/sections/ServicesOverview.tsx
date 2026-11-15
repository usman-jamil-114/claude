"use client";
import { motion } from "motion/react";
import { ArrowRight, Check, Code2, MousePointerClick, Search, TrendingUp } from "lucide-react";
import { SiteLink } from "../lib/adapter";
import { cn } from "../lib/cn";
import { buttonVariants } from "../components/Button";
import { GoogleAdsIcon } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

function BrowserMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-card">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-promo" />
        <span className="size-2.5 rounded-full bg-highlight" />
        <span className="size-2.5 rounded-full bg-primary" />
        <span className="ml-3 h-5 flex-1 rounded-md bg-secondary px-3 text-[10px] leading-5 text-muted-foreground">yourbusiness.pk</span>
      </div>
      <div className="space-y-3 p-5">
        <motion.div
          initial={{ width: "20%" }}
          whileInView={{ width: "70%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="h-4 rounded bg-foreground/80"
        />
        <motion.div
          initial={{ width: "10%" }}
          whileInView={{ width: "50%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="h-3 rounded bg-muted-foreground/40"
        />
        <div className="flex gap-2 pt-2">
          <span className="h-8 w-28 rounded-lg bg-primary" />
          <span className="h-8 w-20 rounded-lg border border-border" />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="h-16 rounded-lg bg-secondary"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AdsMock() {
  const bars = [30, 45, 38, 60, 55, 78, 92];
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border bg-background p-4 shadow-card">
        <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">
          <Search className="size-3.5" /> best web developer in lahore
        </div>
        <div className="mt-3 rounded-lg p-2">
          <p className="text-[11px] text-muted-foreground">
            <span className="font-bold text-foreground">Sponsored</span> · yourbusiness.pk
          </p>
          <p className="mt-0.5 text-sm font-semibold text-primary">Your Business — Book Today, 85% Off</p>
          <p className="text-[11px] text-muted-foreground">Fast, trusted service. Call or WhatsApp now.</p>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-background p-4 shadow-card">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">Leads this month</span>
          <span className="inline-flex items-center gap-1 font-bold text-primary">
            <TrendingUp className="size-3.5" /> growing
          </span>
        </div>
        <div className="mt-4 flex h-20 items-end gap-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
              className={cn("flex-1 rounded-t-md", i === bars.length - 1 ? "bg-primary" : "bg-brand-deep")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  {
    id: "web",
    icon: Code2,
    title: "Website Development",
    text: "Lightning-fast, mobile-first websites designed to turn visitors into customers — from single landing pages to full online stores.",
    points: ["Landing pages for ads", "Business websites", "E-commerce stores", "SEO-ready & secure"],
    mock: <BrowserMock />,
  },
  {
    id: "ads",
    icon: MousePointerClick,
    title: "Google Ads Management",
    text: "Show up exactly when customers search for you. We plan, launch and optimise campaigns that bring calls, leads and sales.",
    points: ["Search & Performance Max", "Keyword & competitor research", "Conversion tracking", "Clear monthly reports"],
    mock: <AdsMock />,
  },
];

export function ServicesOverview() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow={<><GoogleAdsIcon className="size-4 text-primary" /> What we do</>}
          title={<>Two services. <span className="text-gradient">One goal: more customers.</span></>}
          subtitle="A great website builds trust. Great ads bring the traffic. Together they grow your business on autopilot."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-card p-7 shadow-card transition-colors hover:border-primary/50 md:p-10"
              >
                <div className="absolute -top-24 -right-24 size-64 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100 md:opacity-50" />
                <div className="relative grid gap-8 md:grid-cols-[1fr_0.9fr]">
                  <div>
                    <span className="grid size-14 place-items-center rounded-2xl bg-primary/15 text-primary">
                      <s.icon className="size-7" />
                    </span>
                    <h3 className="mt-6 text-2xl font-extrabold text-foreground md:text-3xl">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{s.text}</p>
                    <ul className="mt-6 space-y-2.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-sm text-foreground">
                          <Check className="size-4 text-primary" /> {p}
                        </li>
                      ))}
                    </ul>
                    <SiteLink href={`/services#${s.id}`} className={cn(buttonVariants({ variant: "outline" }), "mt-8")}>
                      Learn more <ArrowRight />
                    </SiteLink>
                  </div>
                  <div className="self-center">{s.mock}</div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
