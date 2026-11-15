"use client";
import { motion } from "motion/react";
import {
  BarChart3, Check, Code2, Gauge, Globe, LayoutTemplate, LineChart, MousePointerClick, Search,
  ShoppingCart, Smartphone, Sparkles, Target, Users, Wrench,
} from "lucide-react";
import { OFFER } from "../config";
import { cn } from "../lib/cn";
import { openWhatsApp } from "../lib/whatsapp";
import { buttonVariants } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { FAQ, FAQS } from "../sections/FAQ";
import { FinalCTA } from "../sections/FinalCTA";
import { Pricing } from "../sections/Pricing";
import { Process } from "../sections/Process";

type Service = {
  id: "web" | "ads";
  icon: typeof Code2;
  title: string;
  intro: string;
  image: string;
  forWho: string[];
  deliverables: { icon: typeof Code2; title: string; text: string }[];
  cta: string;
};

const SERVICES: Service[] = [
  {
    id: "web",
    icon: Code2,
    title: "Website Development",
    intro:
      "Your website is your 24/7 salesperson. We design and build modern, fast and secure websites that make a great first impression and turn visitors into paying customers.",
    image: "/images/cursor-3d.webp",
    forWho: ["Local businesses & shops", "Startups launching a product", "Service providers & clinics", "Brands selling online"],
    deliverables: [
      { icon: LayoutTemplate, title: "Landing pages", text: "Single, focused pages built to convert ad traffic into leads." },
      { icon: Globe, title: "Business websites", text: "Multi-page sites that tell your story and build trust." },
      { icon: ShoppingCart, title: "E-commerce stores", text: "Online shops with cart, checkout, COD and payment gateways." },
      { icon: Smartphone, title: "Mobile-first design", text: "Pixel-perfect on every phone, tablet and desktop." },
      { icon: Gauge, title: "Speed & SEO", text: "Optimised for Core Web Vitals and Google search from day one." },
      { icon: Wrench, title: "Support & updates", text: "We stay with you after launch for fixes and improvements." },
    ],
    cta: "Hi PixelToPPC! I'm interested in Website Development with the launch discount.",
  },
  {
    id: "ads",
    icon: MousePointerClick,
    title: "Google Ads Management",
    intro:
      "Reach customers at the exact moment they're searching for what you sell. We build, run and optimise Google Ads campaigns focused on real results — calls, WhatsApp messages, leads and sales.",
    image: "/images/percent-green.webp",
    forWho: ["Businesses wanting leads fast", "E-commerce stores", "Service businesses in any city", "Anyone wasting money on ads"],
    deliverables: [
      { icon: Search, title: "Keyword research", text: "Find the searches your best customers actually make." },
      { icon: Target, title: "Campaign setup", text: "Search, Performance Max, Display, YouTube & Shopping." },
      { icon: Sparkles, title: "Ad copywriting", text: "Compelling ads tested to win more clicks for less." },
      { icon: BarChart3, title: "Conversion tracking", text: "GA4 & Tag Manager so every lead is measured." },
      { icon: Users, title: "Remarketing", text: "Bring back visitors who didn't buy the first time." },
      { icon: LineChart, title: "Reports & optimisation", text: "Clear reports and constant tweaks to lower your cost per lead." },
    ],
    cta: "Hi PixelToPPC! I'm interested in Google Ads Management with the launch discount.",
  },
];

function ServiceBlock({ s, reverse }: { s: Service; reverse: boolean }) {
  return (
    <section id={s.id} className="scroll-mt-32 py-16 md:py-24">
      <div className="container-site">
        <div className={cn("grid items-center gap-12 lg:grid-cols-2", reverse && "lg:[&>*:first-child]:order-2")}>
          <Reveal className="min-w-0">
            <span className="grid size-14 place-items-center rounded-2xl bg-primary/15 text-primary">
              <s.icon className="size-7" />
            </span>
            <h2 className="mt-6 text-3xl font-extrabold text-foreground md:text-5xl">{s.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{s.intro}</p>
            <p className="mt-8 text-sm font-bold tracking-widest text-foreground uppercase">Perfect for</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {s.forWho.map((w) => (
                <li key={w} className="flex items-center gap-2.5 text-sm text-foreground">
                  <Check className="size-4 text-primary" /> {w}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => openWhatsApp(s.cta, `services_${s.id}`)}
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "shine mt-9 h-auto min-h-14 py-3 whitespace-normal")}
            >
              <Sparkles /> Get {OFFER.discountPercent}% off {s.title}
            </button>
          </Reveal>
          <Reveal delay={0.1} className="min-w-0">
            <div className="relative rounded-[2rem] border border-border bg-gradient-card p-6 shadow-card md:p-8">
              <img
                src={s.image}
                alt=""
                width={640}
                height={640}
                loading="lazy"
                className="pointer-events-none absolute -top-12 -right-2 w-28 md:-right-8 animate-float md:w-44"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {s.deliverables.map((d, i) => (
                  <motion.div
                    key={d.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="rounded-2xl border border-border bg-background/70 p-5 transition-colors hover:border-primary/40"
                  >
                    <d.icon className="size-6 text-primary" />
                    <h3 className="mt-3 text-base font-bold text-foreground">{d.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={<>Websites & Google Ads that <span className="text-gradient">grow your business</span></>}
        subtitle={`Everything you need to get found, build trust and win customers online — now ${OFFER.discountPercent}% off for our first ${OFFER.totalSpots} clients.`}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#web" className={buttonVariants({ variant: "inverse", size: "lg" })}>
            <Code2 /> Website Development
          </a>
          <a href="#ads" className={buttonVariants({ variant: "dark", size: "lg" })}>
            <MousePointerClick /> Google Ads
          </a>
        </div>
      </PageHero>
      {SERVICES.map((s, i) => (
        <ServiceBlock key={s.id} s={s} reverse={i % 2 === 1} />
      ))}
      <Pricing />
      <Process />
      <FAQ items={FAQS.slice(1)} />
      <FinalCTA />
    </>
  );
}
