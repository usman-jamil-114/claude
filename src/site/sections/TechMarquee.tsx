"use client";

const ITEMS = [
  "Next.js", "React", "WordPress", "Shopify", "Tailwind CSS", "Google Ads", "Performance Max",
  "Google Analytics 4", "Tag Manager", "Search Console", "Meta Pixel", "SEO", "Core Web Vitals", "YouTube Ads",
];

export function TechMarquee() {
  return (
    <section aria-label="Tools we work with" className="border-y border-border bg-surface py-6">
      <p className="mb-4 text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        Built with the tools top brands trust
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee-slow gap-4">
          {[...ITEMS, ...ITEMS].map((t, i) => (
            <span
              key={i}
              className="rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold whitespace-nowrap text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
