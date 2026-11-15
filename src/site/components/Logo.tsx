"use client";
import { SiteLink } from "../lib/adapter";
import { cn } from "../lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <SiteLink href="/" aria-label="PixelToPPC home" className={cn("inline-flex shrink-0 items-center", className)}>
      <img src="/brand/logo-light.svg" alt="PixelToPPC" width={205} height={40} className="h-9 w-auto md:h-10" />
    </SiteLink>
  );
}
