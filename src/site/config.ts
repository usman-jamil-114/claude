// Central place for business details, offer numbers and prices.
// Edit these values to update the whole website.

export const SITE = {
  name: "PixelToPPC",
  tagline: "Websites that sell. Google Ads that convert.",
  url: "https://pixeltoppc.shop",
  email: "usman.jamill.114@gmail.com",
  // International format, digits only (03144178331 -> 923144178331). Never rendered on the page.
  whatsappNumber: "923144178331",
  country: "Pakistan",
} as const;

export const OFFER = {
  discountPercent: 85,
  totalSpots: 10,
  spotsLeft: 9,
} as const;

export const spotsClaimed = OFFER.totalSpots - OFFER.spotsLeft;

/** Price after the launch discount, rounded to the nearest rupee. */
export function discountedPrice(original: number, discountPercent: number = OFFER.discountPercent): number {
  return Math.round((original * (100 - discountPercent)) / 100);
}

export function formatPKR(amount: number): string {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

/** Last moment of the current month — the launch offer deadline shown in the countdown. */
export function offerDeadline(now: Date = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

export type PlanFeature = { text: string; strong?: string; included?: boolean };

export type Plan = {
  id: string;
  name: string;
  description: string;
  original: number;
  period: "one-time" | "month";
  popular?: boolean;
  bonus: { title: string; text: string };
  features: PlanFeature[];
};

export type PlanGroup = {
  id: "web" | "ads";
  label: string;
  note: string;
  plans: Plan[];
};

export const PLAN_GROUPS: PlanGroup[] = [
  {
    id: "web",
    label: "Website Development",
    note: "One-time payment. You own your website 100%.",
    plans: [
      {
        id: "web-starter",
        name: "Starter",
        description: "A fast, high-converting landing page — perfect for running ads.",
        original: 40000,
        period: "one-time",
        bonus: { title: "Launch bonus:", text: "Free WhatsApp chat button setup" },
        features: [
          { strong: "1-page", text: "landing page" },
          { text: "Mobile-first, responsive design" },
          { text: "WhatsApp & call buttons" },
          { text: "Lead / contact form" },
          { text: "Basic on-page SEO" },
          { text: "Speed optimised" },
          { strong: "2", text: "revision rounds" },
          { text: "Blog setup", included: false },
          { text: "Online store", included: false },
        ],
      },
      {
        id: "web-business",
        name: "Business",
        description: "A complete multi-page website that builds trust and brings leads.",
        original: 90000,
        period: "one-time",
        popular: true,
        bonus: { title: "Launch bonus:", text: "Free Google Business Profile setup" },
        features: [
          { strong: "Up to 6", text: "custom pages" },
          { text: "Premium custom design" },
          { text: "WhatsApp, call & Google Maps" },
          { text: "Blog / news section" },
          { text: "On-page SEO + sitemap" },
          { text: "Google Analytics & Search Console" },
          { text: "Speed & security optimised" },
          { strong: "4", text: "revision rounds" },
          { strong: "1 month", text: "free support" },
        ],
      },
      {
        id: "web-store",
        name: "E-commerce",
        description: "A full online store ready to take orders and payments.",
        original: 160000,
        period: "one-time",
        bonus: { title: "Launch bonus:", text: "Free conversion tracking setup" },
        features: [
          { strong: "Up to 50", text: "products uploaded" },
          { text: "Cart, checkout & order emails" },
          { text: "Cash on delivery + payment gateway" },
          { text: "Easy admin panel" },
          { text: "Product SEO + sitemap" },
          { text: "Analytics & conversion tracking" },
          { text: "Speed & security optimised" },
          { strong: "6", text: "revision rounds" },
          { strong: "2 months", text: "free support" },
        ],
      },
    ],
  },
  {
    id: "ads",
    label: "Google Ads",
    note: "Monthly management fee. Ad spend is paid directly to Google.",
    plans: [
      {
        id: "ads-starter",
        name: "Starter",
        description: "Get your first profitable Google Search campaign live.",
        original: 30000,
        period: "month",
        bonus: { title: "Launch bonus:", text: "Free account & tracking audit" },
        features: [
          { strong: "1", text: "Search campaign" },
          { strong: "Up to 50", text: "researched keywords" },
          { text: "Ad copywriting" },
          { text: "Conversion tracking setup" },
          { text: "Negative keyword cleanup" },
          { text: "Monthly performance report" },
          { text: "Display & YouTube ads", included: false },
          { text: "Remarketing", included: false },
        ],
      },
      {
        id: "ads-growth",
        name: "Growth",
        description: "Scale leads and sales with multiple optimised campaigns.",
        original: 60000,
        period: "month",
        popular: true,
        bonus: { title: "Launch bonus:", text: "Free landing page review" },
        features: [
          { strong: "Up to 3", text: "campaigns (Search + Performance Max)" },
          { strong: "Up to 150", text: "researched keywords" },
          { text: "A/B tested ad copy" },
          { text: "GA4 + Tag Manager setup" },
          { text: "Weekly bid & keyword optimisation" },
          { text: "Remarketing audiences" },
          { text: "Bi-weekly reports" },
          { text: "Priority WhatsApp support" },
        ],
      },
      {
        id: "ads-scale",
        name: "Scale",
        description: "Full-funnel Google Ads for brands ready to grow fast.",
        original: 100000,
        period: "month",
        bonus: { title: "Launch bonus:", text: "Free competitor ads research" },
        features: [
          { strong: "Unlimited", text: "campaigns" },
          { text: "Search, PMax, Display, YouTube & Shopping" },
          { text: "Advanced remarketing funnels" },
          { text: "Landing page optimisation advice" },
          { text: "Offline / call conversion tracking" },
          { text: "Daily monitoring" },
          { text: "Weekly reports + strategy call" },
          { text: "Dedicated WhatsApp support" },
        ],
      },
    ],
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
