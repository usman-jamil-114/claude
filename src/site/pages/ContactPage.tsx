"use client";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Clock, Mail, MessageSquareText, Send, Sparkles } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { OFFER, PLAN_GROUPS, SITE } from "../config";
import { cn } from "../lib/cn";
import { track } from "../lib/track";
import { DEFAULT_WA_MESSAGE, openWhatsApp, whatsappLink } from "../lib/whatsapp";
import { buttonVariants } from "../components/Button";
import { WhatsAppIcon } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { Eyebrow } from "../components/SectionHeading";

const SERVICES = ["Website Development", "Google Ads", "Both (Website + Google Ads)", "Not sure yet"];

type Form = { name: string; email: string; phone: string; service: string; plan: string; message: string };
const EMPTY: Form = { name: "", email: "", phone: "", service: SERVICES[0]!, plan: "", message: "" };

export function buildContactMessage(f: Form): string {
  return [
    `Hi ${SITE.name}! I'd like to claim the ${OFFER.discountPercent}% launch discount.`,
    "",
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.phone ? `Phone: ${f.phone}` : null,
    `Service: ${f.service}`,
    f.plan ? `Plan: ${f.plan}` : null,
    "",
    f.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

function validate(f: Form): Partial<Record<keyof Form, string>> {
  const e: Partial<Record<keyof Form, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email";
  if (f.phone && !/^[+\d][\d\s-]{6,}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number";
  if (f.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters)";
  return e;
}

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/70 transition focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none";

export function ContactPage() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan) setForm((f) => ({ ...f, plan }));
  }, []);

  const set = (k: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    openWhatsApp(buildContactMessage(form), "contact_form");
    track("generate_lead", { method: "contact_form", service: form.service });
    setSent(true);
  };

  const field = (k: keyof Form) => (errors[k] ? <p className="mt-1.5 text-xs font-medium text-promo">{errors[k]}</p> : null);

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Contact us</Eyebrow>
          <h1 className="mt-6 text-4xl leading-tight font-black text-foreground md:text-6xl">
            Let's grow your <span className="text-gradient">business</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            We're available for questions, quotes and free consultations. Tell us what you need and we'll get back to you
            with a plan — and your {OFFER.discountPercent}% launch discount.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => openWhatsApp(DEFAULT_WA_MESSAGE, "contact_card")}
              className="group rounded-2xl border border-border bg-card p-6 text-left transition hover:-translate-y-1 hover:border-whatsapp/60"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-whatsapp/15 text-whatsapp">
                <WhatsAppIcon className="size-7" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-foreground">WhatsApp</p>
              <p className="mt-1 text-sm text-muted-foreground">Fastest way to reach us. Tap to start chatting.</p>
            </button>
            <a
              href={`mailto:${SITE.email}`}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/60"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
                <Mail className="size-6" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-foreground">Email</p>
              <p className="mt-1 text-sm break-all text-muted-foreground">{SITE.email}</p>
            </a>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card/60 p-6">
            <p className="font-display font-bold text-foreground">What happens next?</p>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                { icon: MessageSquareText, t: "Your message opens in WhatsApp — just press send." },
                { icon: Clock, t: "We reply and set up a free consultation at a time that suits you." },
                { icon: Sparkles, t: `You get a clear plan and price with ${OFFER.discountPercent}% off.` },
              ].map((s) => (
                <li key={s.t} className="flex items-start gap-3">
                  <s.icon className="mt-0.5 size-4 shrink-0 text-primary" /> {s.t}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-card md:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <CheckCircle2 className="mx-auto size-16 text-primary" />
                  <h2 className="mt-6 text-2xl font-extrabold text-foreground">Almost done!</h2>
                  <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                    WhatsApp has opened with your details. Just press <strong className="text-foreground">send</strong>{" "}
                    and we'll get back to you.
                  </p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <a
                      href={whatsappLink(buildContactMessage(form))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({ variant: "whatsapp" })}
                    >
                      <WhatsAppIcon /> Open WhatsApp again
                    </a>
                    <button type="button" onClick={() => { setSent(false); setForm(EMPTY); }} className={buttonVariants({ variant: "outline" })}>
                      Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">Name *</label>
                      <input id="name" className={inputClass} placeholder="Your name" value={form.name} onChange={set("name")} autoComplete="name" />
                      {field("name")}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">Email *</label>
                      <input id="email" type="email" className={inputClass} placeholder="you@example.com" value={form.email} onChange={set("email")} autoComplete="email" />
                      {field("email")}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-foreground">Phone number</label>
                    <input id="phone" type="tel" className={inputClass} placeholder="03XX XXXXXXX" value={form.phone} onChange={set("phone")} autoComplete="tel" />
                    {field("phone")}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="service" className="mb-2 block text-sm font-semibold text-foreground">Service *</label>
                      <select id="service" className={inputClass} value={form.service} onChange={set("service")}>
                        {SERVICES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="plan" className="mb-2 block text-sm font-semibold text-foreground">Plan</label>
                      <select id="plan" className={inputClass} value={form.plan} onChange={set("plan")}>
                        <option value="">Help me choose</option>
                        {PLAN_GROUPS.map((g) => (
                          <optgroup key={g.id} label={g.label}>
                            {g.plans.map((p) => <option key={p.id} value={`${g.label} – ${p.name}`}>{p.name}</option>)}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">Message *</label>
                    <textarea id="message" rows={5} className={cn(inputClass, "resize-y")} placeholder="Tell us about your business and what you need..." value={form.message} onChange={set("message")} />
                    {field("message")}
                  </div>
                  <button type="submit" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "shine w-full")}>
                    <Send /> Send message on WhatsApp
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    Prefer email? Write to us at{" "}
                    <a href={`mailto:${SITE.email}`} className="font-semibold text-primary hover:underline">{SITE.email}</a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
