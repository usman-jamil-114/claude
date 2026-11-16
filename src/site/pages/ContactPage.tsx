"use client";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Clock, Mail, MessageSquareText, Send, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { OFFER, SITE } from "../config";
import { cn } from "../lib/cn";
import { track } from "../lib/track";
import { DEFAULT_WA_MESSAGE, openWhatsApp } from "../lib/whatsapp";
import { buttonVariants } from "../components/Button";
import { WhatsAppIcon } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { Eyebrow } from "../components/SectionHeading";

const SERVICES = ["Website Development", "Google Ads", "Both (Website + Google Ads)", "Not sure yet"];

type Form = { name: string; email: string; phone: string; service: string; message: string };
type FormField = keyof Form;
type ContactResponse = { ok: true } | { ok: false; error: string };
const EMPTY: Form = { name: "", email: "", phone: "", service: SERVICES[0]!, message: "" };

function isContactResponse(value: unknown): value is ContactResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "ok" in value &&
    (value.ok === true || (value.ok === false && "error" in value && typeof value.error === "string"))
  );
}

function validate(f: Form): Partial<Record<keyof Form, string>> {
  const e: Partial<Record<keyof Form, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email";
  const phone = f.phone.trim().replace(/[\s-]/g, "");
  if (!phone) e.phone = "Please enter your phone number";
  else if (!/^(?:03\d{9}|\+?92\d{10})$/.test(phone)) e.phone = "Please enter a valid Pakistani mobile number";
  if (f.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters)";
  return e;
}

const inputClass =
  "w-full rounded-xl border border-input bg-background px-3 py-3 text-foreground placeholder:text-muted-foreground/70 transition focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none sm:px-4";

export function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [website, setWebsite] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (k: FormField) => (e: { target: { value: string } }) => {
    const value = e.target.value;
    const next = { ...form, [k]: value };
    setForm(next);
    setSubmitError("");
    if (hasSubmitted) setErrors(validate(next));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setSubmitError("");
    const errs = website.trim() ? {} : validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      const result: unknown = await response.json();
      if (!isContactResponse(result)) {
        throw new Error("The server returned an invalid response.");
      }
      if (!response.ok || !result.ok) {
        throw new Error(result.ok ? "Could not save your message" : result.error);
      }

      track("generate_lead", { method: "google_sheets", service: form.service });
      setSent(true);
      router.push("/thank-you/");
    } catch (error) {
      console.error("Could not submit the contact form.", error);
      setSubmitError(error instanceof Error ? error.message : "Could not save your message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (k: FormField) =>
    cn(inputClass, errors[k] && "border-red-500 focus:border-red-500 focus:ring-red-500/30");
  const field = (k: FormField) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-xs font-medium text-red-500">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-[130px] lg:px-[100px]">
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
              className="group rounded-2xl border border-border bg-card p-4 text-left transition hover:-translate-y-1 hover:border-whatsapp/60 sm:p-6"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-whatsapp/15 text-whatsapp">
                <WhatsAppIcon className="size-7" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-foreground">WhatsApp</p>
              <p className="mt-1 text-sm text-muted-foreground">Fastest way to reach us. Tap to start chatting.</p>
            </button>
            <a
              href={`mailto:${SITE.email}`}
              className="group rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-primary/60 sm:p-6"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
                <Mail className="size-6" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-foreground">Email</p>
              <p className="mt-1 text-sm break-all text-muted-foreground">{SITE.email}</p>
            </a>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card/60 p-4 sm:p-6">
            <p className="font-display font-bold text-foreground">What happens next?</p>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                { icon: MessageSquareText, t: "Your details are sent through our contact form." },
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
          <div className="rounded-[2rem] border border-border bg-card p-4 shadow-card sm:p-6 md:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <CheckCircle2 className="mx-auto size-16 text-primary" />
                  <h2 className="mt-6 text-2xl font-extrabold text-foreground">Message submitted</h2>
                  <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                    Thanks for reaching out. We’ll get back to you using the contact details you provided.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm(EMPTY);
                      setErrors({});
                      setHasSubmitted(false);
                    }}
                    className={cn(buttonVariants({ variant: "outline" }), "mt-8")}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className={cn("mb-2 block text-sm font-semibold", errors.name ? "text-red-500" : "text-foreground")}>Name *</label>
                    <input id="name" name="name" className={fieldClass("name")} placeholder="Your name" value={form.name} onChange={set("name")} autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
                    {field("name")}
                  </div>
                  <div>
                    <label htmlFor="email" className={cn("mb-2 block text-sm font-semibold", errors.email ? "text-red-500" : "text-foreground")}>Email *</label>
                    <input id="email" name="email" type="email" className={fieldClass("email")} placeholder="you@example.com" value={form.email} onChange={set("email")} autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
                    {field("email")}
                  </div>
                  <div>
                    <label htmlFor="phone" className={cn("mb-2 block text-sm font-semibold", errors.phone ? "text-red-500" : "text-foreground")}>Phone number</label>
                    <input id="phone" name="phone" type="tel" className={fieldClass("phone")} placeholder="03XX XXXXXXX" value={form.phone} onChange={set("phone")} autoComplete="tel" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
                    {field("phone")}
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-semibold text-foreground">Service *</label>
                    <select id="service" name="service" className={cn(inputClass, "appearance-none")} value={form.service} onChange={set("service")} required>
                      {SERVICES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className={cn("mb-2 block text-sm font-semibold", errors.message ? "text-red-500" : "text-foreground")}>Message *</label>
                    <textarea id="message" name="message" rows={5} className={cn(fieldClass("message"), "resize-y")} placeholder="Tell us about your business and what you need..." value={form.message} onChange={set("message")} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
                    {field("message")}
                  </div>
                  {submitError ? (
                    <p role="alert" className="text-sm font-medium text-red-500">
                      {submitError}. Please try again or{" "}
                      <a
                        href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(DEFAULT_WA_MESSAGE)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline"
                      >
                        contact us on WhatsApp
                      </a>
                      .
                    </p>
                  ) : null}
                  <button type="submit" disabled={isSubmitting} className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "shine w-full hover:bg-inverse hover:text-inverse-foreground disabled:cursor-not-allowed disabled:opacity-60")}>
                    <Send /> {isSubmitting ? "Sending..." : "Send message"}
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
