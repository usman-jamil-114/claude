"use client";
import { Check, Minus, X } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

type Cell = "yes" | "no" | "some";
const ROWS: { label: string; us: Cell; agency: Cell; freelancer: Cell }[] = [
  { label: "Affordable, fixed PKR pricing", us: "yes", agency: "no", freelancer: "some" },
  { label: "Website + Google Ads under one roof", us: "yes", agency: "yes", freelancer: "no" },
  { label: "Direct WhatsApp access", us: "yes", agency: "no", freelancer: "yes" },
  { label: "Conversion-focused design", us: "yes", agency: "some", freelancer: "some" },
  { label: "Conversion tracking setup", us: "yes", agency: "yes", freelancer: "no" },
  { label: "You own all accounts & files", us: "yes", agency: "some", freelancer: "some" },
  { label: `Launch discount on every plan`, us: "yes", agency: "no", freelancer: "no" },
];

function Mark({ v }: { v: Cell }) {
  if (v === "yes") return <Check className="mx-auto size-5 text-primary" aria-label="Yes" />;
  if (v === "no") return <X className="mx-auto size-5 text-promo" aria-label="No" />;
  return <Minus className="mx-auto size-5 text-muted-foreground" aria-label="Sometimes" />;
}

export function Comparison() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Compare"
          title={<>Why businesses choose <span className="text-gradient">PixelToPPC</span></>}
          subtitle="Agency-level quality without agency-level prices."
        />
        <Reveal>
          <div className="overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 text-left font-semibold text-muted-foreground">Feature</th>
                  <th className="bg-brand-deep/40 p-5 font-display text-base font-extrabold text-primary">PixelToPPC</th>
                  <th className="p-5 font-semibold text-muted-foreground">Typical agency</th>
                  <th className="p-5 font-semibold text-muted-foreground">Freelancer</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label} className="border-b border-border last:border-0">
                    <td className="p-5 text-foreground">{r.label}</td>
                    <td className="bg-brand-deep/20 p-5"><Mark v={r.us} /></td>
                    <td className="p-5"><Mark v={r.agency} /></td>
                    <td className="p-5"><Mark v={r.freelancer} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
