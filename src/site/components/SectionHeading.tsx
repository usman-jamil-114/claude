"use client";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:px-4",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("mb-14 max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-5 text-3xl font-extrabold leading-tight text-foreground md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}
