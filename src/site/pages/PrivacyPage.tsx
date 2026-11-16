"use client";
import type { ReactNode } from "react";
import { SITE } from "../config";
import { PageHero } from "../components/PageHero";

const UPDATED = "November 2026";

const SECTIONS: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "who",
    title: "Who we are",
    body: (
      <p>
        {SITE.name} ("we", "us", "our") is a digital studio based in {SITE.country} offering website development and
        Google Ads management. This policy explains what information we collect when you visit our website or contact us,
        how we use it, and the choices you have.
      </p>
    ),
  },
  {
    id: "collect",
    title: "Information we collect",
    body: (
      <>
        <p><strong>Information you give us.</strong> When you fill in our contact form or message us, we receive the details you choose to share — such as your name, email address, phone number, the service you're interested in and your message.</p>
        <p><strong>Information collected automatically.</strong> Like most websites, our hosting provider and analytics or advertising tools may collect technical data such as your browser type, device, approximate location (country/city), pages visited, the website that referred you, and the time and date of your visit.</p>
      </>
    ),
  },
  {
    id: "contact-form",
    title: "Contact form and WhatsApp",
    body: (
      <p>
        When configured, our contact form sends the details you submit to a Google Sheets spreadsheet managed by us
        through a Google Apps Script web app. Google processes that information as our service provider. If the form
        has not been configured, it will tell you and you can contact us through WhatsApp or email instead. Messages
        sent through WhatsApp (operated by Meta Platforms, Inc.) are subject to{" "}
        <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">WhatsApp's Privacy Policy</a>.
      </p>
    ),
  },
  {
    id: "use",
    title: "How we use your information",
    body: (
      <ul>
        <li>To reply to your enquiry and provide a quote or consultation</li>
        <li>To deliver the services you order from us</li>
        <li>To improve our website, content and offers</li>
        <li>To measure how well our advertising works</li>
        <li>To meet legal, tax or accounting requirements</li>
      </ul>
    ),
  },
  {
    id: "cookies",
    title: "Cookies, analytics and advertising",
    body: (
      <>
        <p>
          We advertise using Google Ads and may use Google tools (such as Google Analytics and Google Ads conversion
          tracking) to understand how visitors find and use our website. These tools may use cookies or similar
          technologies to collect information such as the pages you view and whether you contacted us after clicking an
          ad. Google may also use this information to show you relevant ads on other websites (remarketing).
        </p>
        <p>
          You can learn how Google uses data at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>,
          control ad personalisation at{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>, and
          block cookies in your browser settings at any time.
        </p>
      </>
    ),
  },
  {
    id: "share",
    title: "Sharing your information",
    body: (
      <p>
        We do not sell your personal information. We only share it with service providers that help us run our business
        (for example hosting, email, Google Sheets, WhatsApp and Google advertising tools), or when required by law.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: <p>We keep enquiry and client information only for as long as needed to respond to you, provide our services and meet legal obligations, then delete it.</p>,
  },
  {
    id: "rights",
    title: "Your rights",
    body: <p>You can ask us to access, correct or delete the personal information we hold about you, or to stop contacting you, at any time by emailing us.</p>,
  },
  {
    id: "children",
    title: "Children's privacy",
    body: <p>Our services are intended for businesses and adults. We do not knowingly collect information from children under 13.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>We may update this policy from time to time. The latest version will always be on this page with the date it was last updated.</p>,
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about this policy? Email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    ),
  },
];

export function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle={`Last updated: ${UPDATED}. Your privacy matters to us — here's exactly how we handle your information.`} />
      <section className="pb-24">
        <div className="container-site grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-40 space-y-1 rounded-2xl border border-border bg-card p-4 text-sm" aria-label="Sections">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="block rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>
          <div className="min-w-0 space-y-6">
            {SECTIONS.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className="scroll-mt-40 rounded-2xl border border-border bg-card p-4 md:p-9 sm:p-7 [&_a]:font-semibold [&_a]:[overflow-wrap:anywhere] [&_a]:text-primary [&_a]:hover:underline [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p+p]:mt-4 [&_strong]:text-foreground [&_ul]:space-y-2 [&_ul]:text-muted-foreground"
              >
                <h2 className="mb-4 flex items-center gap-3 text-xl font-extrabold text-foreground md:text-2xl">
                  <span className="grid size-8 place-items-center rounded-lg bg-primary/15 font-display text-sm text-primary">{i + 1}</span>
                  {s.title}
                </h2>
                {s.body}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
