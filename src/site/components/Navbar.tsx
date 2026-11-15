"use client";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS, OFFER } from "../config";
import { SiteLink, useCurrentPath } from "../lib/adapter";
import { cn } from "../lib/cn";
import { DEFAULT_WA_MESSAGE, openWhatsApp } from "../lib/whatsapp";
import { buttonVariants } from "./Button";
import { Logo } from "./Logo";
import { PromoBar } from "./PromoBar";

export function Navbar() {
  const path = useCurrentPath();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const isActive = (href: string) => (href === "/" ? path === "/" : !href.includes("#") && path.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      <PromoBar />
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled ? "border-border bg-background/95 shadow-card backdrop-blur-xl" : "border-transparent bg-background",
        )}
      >
        <nav className="container-site flex h-[72px] items-center justify-between gap-6" aria-label="Main">
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <SiteLink
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-[15px] font-medium transition-colors",
                    isActive(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  {isActive(link.href) ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    />
                  ) : null}
                </SiteLink>
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-3 lg:flex">
            <SiteLink href="/contact" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Free consultation
            </SiteLink>
            <button
              type="button"
              onClick={() => openWhatsApp(DEFAULT_WA_MESSAGE, "navbar")}
              className={cn(buttonVariants({ variant: "primary", size: "sm" }), "shine")}
            >
              <Sparkles /> Claim {OFFER.discountPercent}% Off
            </button>
          </div>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "dark", size: "icon" }), "lg:hidden")}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border bg-background lg:hidden"
            >
              <div className="container-site flex flex-col gap-1 py-4">
                {NAV_LINKS.map((link) => (
                  <SiteLink
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-medium",
                      isActive(link.href) ? "bg-secondary text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </SiteLink>
                ))}
                <button
                  type="button"
                  onClick={() => openWhatsApp(DEFAULT_WA_MESSAGE, "mobile_menu")}
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-3")}
                >
                  <Sparkles /> Claim {OFFER.discountPercent}% Off
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
