"use client";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const isActive = (href: string) => (href === "/" ? path === "/" : !href.includes("#") && path.startsWith(href));

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [open]);

  return (
    <header className={cn("sticky top-0", open ? "z-[60]" : "z-50")}>
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
                  aria-current={isActive(link.href) ? "page" : undefined}
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
            ref={menuButtonRef}
            type="button"
            className={cn(buttonVariants({ variant: "dark", size: "icon" }), "lg:hidden")}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] flex justify-end bg-black/60 lg:hidden"
              onClick={() => setOpen(false)}
            >
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className="flex h-full w-[min(82vw,24rem)] flex-col border-l border-border bg-brand-deep shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 px-5">
                  <div onClick={() => setOpen(false)}>
                    <Logo />
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-foreground")}
                    aria-label="Close menu"
                  >
                    <X />
                  </button>
                </div>
                <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-4">
                  <ul className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => {
                      const active = isActive(link.href);
                      return (
                        <li key={link.href}>
                          <SiteLink
                            href={link.href}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "block rounded-r-lg border-l-2 px-3 py-3 text-base font-semibold transition-colors",
                              active
                                ? "border-primary bg-white/10 text-foreground"
                                : "border-transparent text-foreground/75 hover:bg-white/5 hover:text-foreground",
                            )}
                          >
                            {link.label}
                          </SiteLink>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="shrink-0 border-t border-white/10 p-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      openWhatsApp(DEFAULT_WA_MESSAGE, "mobile_menu");
                    }}
                    className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
                  >
                    <Sparkles /> Claim {OFFER.discountPercent}% Off
                  </button>
                </div>
              </motion.aside>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
