"use client";
// Router adapter for Next.js: keeps the shared site code framework-agnostic.
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

export function SiteLink({ href, children, ...rest }: SiteLinkProps) {
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export function useCurrentPath(): string {
  const path = usePathname() ?? "/";
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}
