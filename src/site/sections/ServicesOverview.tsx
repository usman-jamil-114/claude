"use client";
import { motion } from "motion/react";
import { ArrowRight, Check, Code2, MessageCircle, MousePointerClick, Phone, Search } from "lucide-react";
import { SiteLink } from "../lib/adapter";
import { cn } from "../lib/cn";
import { buttonVariants } from "../components/Button";
import { GoogleAdsIcon } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

function BrowserMock() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-card">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-promo" />
        <span className="size-2.5 rounded-full bg-highlight" />
        <span className="size-2.5 rounded-full bg-primary" />
        <span className="ml-3 h-5 flex-1 rounded-md bg-secondary px-3 text-[10px] leading-5 text-muted-foreground">yourbusiness.pk</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
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
        <div className="mt-auto grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="rounded-xl border border-border bg-background p-3"
            >
              <span className="block size-6 rounded-md bg-brand-deep" />
              <span className="mt-3 block h-2 rounded-full bg-secondary" />
              <span className="mt-1.5 block h-2 w-2/3 rounded-full bg-secondary" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdsMock() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-3 shadow-card sm:p-4">
      <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">
        <Search className="size-3.5" /> best service near me
      </div>
      <div className="mt-4 flex flex-1 flex-col justify-between rounded-xl border border-primary/30 p-3 sm:p-4">
        <div>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded border border-border px-1.5 py-0.5 font-bold text-foreground">Ad</span>
            yourbusiness.com
          </p>
          <p className="mt-2 text-base font-semibold text-sky-400">Your Business | Fast, Trusted Service</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Book today and get a quick reply. Message us on WhatsApp for a free quote.
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5">
            <Phone className="size-3.5" /> Call
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5">
            <MessageCircle className="size-3.5" /> Get a quote
          </span>
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
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-card p-4 shadow-card transition-colors hover:border-primary/50 sm:p-7 md:p-10"
              >
                <div className="absolute -top-24 -right-24 size-64 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100 md:opacity-50" />
                <div className="relative flex h-full flex-col gap-8">
                  <div>
                    <span className="grid size-14 place-items-center rounded-2xl bg-primary/15 text-primary">
                      <s.icon className="size-7" />
                    </span>
                    <h3 className="mt-6 text-2xl font-extrabold text-foreground md:text-3xl">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{s.text}</p>
                    <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-sm text-foreground">
                          <Check className="size-4 text-primary" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-64 w-full">{s.mock}</div>
                  <SiteLink
                    href={`/services#${s.id}`}
                    className={cn(buttonVariants({ variant: "outline" }), "mt-auto self-start")}
                  >
                    Learn more <ArrowRight />
                  </SiteLink>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
