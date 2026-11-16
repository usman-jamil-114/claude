import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been received. The PixelToPPC team will be in touch soon.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="container-site">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-border bg-card/80 p-6 text-center shadow-card sm:p-10">
          <CheckCircle2 className="mx-auto size-16 text-primary" />
          <p className="mt-6 text-sm font-bold tracking-widest text-primary uppercase">Message received</p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-5xl">Thanks for reaching out!</h1>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted-foreground">
            Your message is safely with us. We’ll review your details and get back to you soon.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-14 items-center justify-center rounded-xl bg-inverse px-5 font-semibold text-inverse-foreground transition hover:bg-inverse sm:px-8"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
