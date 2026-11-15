"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Eyebrow } from "./SectionHeading";

export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow: ReactNode; title: ReactNode; subtitle?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="absolute inset-0 -z-10 bg-grid" />
      <img
        src="/images/pixel-cubes.webp"
        alt=""
        width={640}
        height={640}
        className="pointer-events-none absolute top-8 -right-16 -z-10 w-40 animate-float-slow opacity-50 md:right-[4%] md:w-56"
      />
      <div className="container-site text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-4xl text-4xl leading-[1.08] font-black text-foreground md:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {subtitle}
          </motion.p>
        ) : null}
        {children ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-9">
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
