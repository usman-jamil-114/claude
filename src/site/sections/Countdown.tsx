"use client";
import { useEffect, useState } from "react";
import { offerDeadline } from "../config";
import { cn } from "../lib/cn";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { label: "Days", value: Math.floor(s / 86400) },
    { label: "Hours", value: Math.floor((s % 86400) / 3600) },
    { label: "Mins", value: Math.floor((s % 3600) / 60) },
    { label: "Secs", value: s % 60 },
  ];
}

export function Countdown({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const items = now === null ? parts(0).map((p) => ({ ...p, value: -1 })) : parts(offerDeadline(new Date(now)).getTime() - now);

  return (
    <div
      className={cn("flex items-center", compact ? "gap-0 sm:gap-2 md:gap-3" : "gap-1 sm:gap-2 md:gap-3", className)}
      role="timer"
      aria-label="Time left on the launch offer"
    >
      {items.map((p, i) => (
        <div key={p.label} className={cn("flex items-center", compact ? "gap-0.5 sm:gap-2 md:gap-3" : "gap-1 sm:gap-2 md:gap-3")}>
          <div
            className={cn(
              "flex flex-col items-center rounded-xl border border-border bg-background/60",
              compact
                ? "min-w-9 px-1 py-1.5 sm:min-w-16 sm:px-3 sm:py-3 md:min-w-20"
                : "min-w-14 px-2 py-2.5 sm:min-w-16 sm:px-3 sm:py-3 md:min-w-20",
            )}
          >
            <span
              className={cn(
                "font-display font-black tabular-nums text-foreground",
                compact ? "text-base sm:text-2xl md:text-4xl" : "text-xl sm:text-2xl md:text-4xl",
              )}
            >
              {p.value < 0 ? "--" : String(p.value).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "font-semibold text-muted-foreground uppercase",
                compact ? "text-[9px] tracking-wide sm:text-[10px] sm:tracking-widest" : "text-[10px] tracking-widest",
              )}
            >
              {p.label}
            </span>
          </div>
          {i < items.length - 1 ? (
            <span className={cn("font-display font-black text-primary", compact ? "text-base sm:text-xl" : "text-xl")}>:</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
