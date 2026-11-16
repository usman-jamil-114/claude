"use client";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-glow hover:bg-primary-glow hover:-translate-y-0.5",
        inverse: "bg-inverse text-inverse-foreground hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5",
        outline:
          "border border-border bg-transparent text-foreground hover:border-primary/60 hover:bg-primary/10",
        dark: "border border-border bg-surface text-foreground hover:bg-surface-raised hover:-translate-y-0.5",
        promo: "bg-gradient-promo text-promo-foreground shadow-promo hover:-translate-y-0.5 hover:brightness-110",
        whatsapp: "bg-whatsapp text-inverse-foreground hover:brightness-110 hover:-translate-y-0.5",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-5 text-base sm:px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
