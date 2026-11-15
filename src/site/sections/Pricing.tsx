"use client";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, Check, Gift, Headphones, MessageCircle, Sparkles, Tag, X } from "lucide-react";
import { useState } from "react";
import { OFFER, PLAN_GROUPS, discountedPrice, formatPKR, type Plan, type PlanGroup } from "../config";
import { cn } from "../lib/cn";
import { openWhatsApp, planMessage } from "../lib/whatsapp";
import { buttonVariants } from "../components/Button";
import { Countdown } from "./Countdown";

function PlanCard({ plan, group, index }: { plan: Plan; group: PlanGroup; index: number }) {
  const price = discountedPrice(plan.original);
  const saving = plan.original - price;
  const suffix = plan.period === "month" ? "/mo" : "/project";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-7 transition-colors",
        plan.popular
          ? "border-primary/60 bg-gradient-featured shadow-glow lg:-my-4 lg:py-11"
          : "border-border bg-card hover:border-primary/30",
      )}
    >
      <div className="absolute top-6 right-6">
        <span className="rounded-md bg-promo px-2.5 py-1 text-xs font-bold text-promo-foreground">
          {plan.popular ? "Most popular • " : ""}
          {OFFER.discountPercent}% off
        </span>
      </div>

      <h3 className="flex items-center gap-2 text-xl font-extrabold text-foreground">
        {plan.popular ? <Sparkles className="size-5 text-primary" /> : null}
        {plan.name}
      </h3>
      <p className="mt-2 min-h-12 pr-4 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

      <p className="mt-6 text-sm text-muted-foreground line-through">{formatPKR(plan.original)}</p>
      <p className="mt-1 flex items-baseline gap-1">
        <span className="font-display text-4xl font-black text-foreground md:text-5xl">{formatPKR(price)}</span>
        <span className="text-base font-medium text-muted-foreground">{suffix}</span>
      </p>
      <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-md bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
        <Tag className="size-3.5" /> Launch discount applied
      </span>

      <button
        type="button"
        onClick={() => openWhatsApp(planMessage(plan.name, group.label, `${formatPKR(price)}${suffix}`), `plan_${plan.id}`)}
        className={cn(
          buttonVariants({ variant: plan.popular ? "primary" : "outline", size: "lg" }),
          "mt-7 w-full",
          plan.popular && "shine",
        )}
      >
        Choose plan
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Today you pay {formatPKR(price)}
        {plan.period === "month" ? " for the first month" : ""} — you save {formatPKR(saving)}. {group.note}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/60 p-4">
        <p className="text-sm text-foreground">
          <span className="font-bold">{plan.bonus.title}</span> {plan.bonus.text}
        </p>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-promo text-promo-foreground">
          <Gift className="size-5" />
        </span>
      </div>

      <ul className="mt-6 space-y-3 border-t border-border pt-6">
        {plan.features.map((f) => {
          const included = f.included !== false;
          return (
            <li key={`${f.strong ?? ""}${f.text}`} className={cn("flex items-start gap-2.5 text-sm", included ? "text-foreground" : "text-muted-foreground/60")}>
              {included ? <Check className="mt-0.5 size-4 shrink-0 text-primary" /> : <X className="mt-0.5 size-4 shrink-0" />}
              <span>
                {f.strong ? <strong className="font-bold text-primary">{f.strong} </strong> : null}
                {f.text}
              </span>
            </li>
          );
        })}
      </ul>
    </motion.article>
  );
}

export function Pricing({ initial = "web" }: { initial?: PlanGroup["id"] }) {
  const [active, setActive] = useState<PlanGroup["id"]>(initial);
  const group = PLAN_GROUPS.find((g) => g.id === active) ?? PLAN_GROUPS[0]!;

  return (
    <section id="pricing" className="relative scroll-mt-28 py-20 md:py-28">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl leading-tight font-extrabold text-foreground md:text-6xl">
            Secure your deal before it's gone
          </h2>
          <p className="mt-4 text-muted-foreground">
            Launch prices for our first {OFFER.totalSpots} clients — {OFFER.spotsLeft} spots left.
          </p>
        </div>

        <div className="mx-auto mt-9 flex w-full max-w-md rounded-2xl border border-border bg-secondary p-1.5" role="tablist">
          {PLAN_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={g.id === active}
              onClick={() => setActive(g.id)}
              className={cn(
                "relative flex-1 rounded-xl px-4 py-3 text-sm font-bold transition-colors",
                g.id === active ? "text-inverse-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {g.id === active ? (
                <motion.span layoutId="pricing-tab" className="absolute inset-0 rounded-xl bg-inverse" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              ) : null}
              <span className="relative">{g.label}</span>
            </button>
          ))}
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-2"><BadgeCheck className="size-4" /> For businesses, shops & brands</li>
          <li className="inline-flex items-center gap-2"><MessageCircle className="size-4" /> Free consultation first</li>
          <li className="inline-flex items-center gap-2"><Headphones className="size-4" /> Direct WhatsApp support</li>
        </ul>

        <AnimatePresence mode="wait">
          <motion.div
            key={group.id}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="mt-14 grid items-stretch gap-6 lg:grid-cols-3"
          >
            {group.plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} group={group} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 rounded-3xl border border-promo/30 bg-promo/10 p-6 text-center md:flex-row md:gap-8 md:text-left">
          <p className="font-display text-lg font-extrabold text-foreground">Launch prices end in</p>
          <Countdown compact />
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prices in Pakistani Rupees (PKR). {PLAN_GROUPS[1]?.note} Need something custom? Message us for a tailored quote.
        </p>
      </div>
    </section>
  );
}
