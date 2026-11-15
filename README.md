# PixelToPPC — Website

Next.js (App Router) + Tailwind CSS v4 + Motion. Dark design in the PixelToPPC greens, red offer bar,
85%-off launch offer with a spots counter, Hostinger-style pricing, and WhatsApp-first contact.

Pages: Home `/`, Services `/services`, About `/about`, Contact `/contact`, Privacy `/privacy`.

## Run it on your computer

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # open http://localhost:3000
```

## Build for hosting

```bash
npm run build
```

This creates an `out/` folder with plain HTML/CSS/JS. Upload the **contents** of `out/` to any host:
Hostinger (File Manager → `public_html`), Netlify, Vercel, Cloudflare Pages, cPanel, etc.
Preview the built site locally with `npm start`.

## Edit your business details, offer and prices

Everything lives in **`src/site/config.ts`**:

- `SITE` — name, website URL (used for SEO/sitemap), email, WhatsApp number (never shown on the page)
- `OFFER` — discount percent (85), total spots (10) and spots left (9). Lower `spotsLeft` as you close orders.
- `PLAN_GROUPS` — every plan's original price (the discounted price is calculated automatically), features and bonus.

The countdown runs to the last day of the current month (`offerDeadline`).

## Google Ads conversion tracking (optional)

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_GOOGLE_TAG_ID` (e.g. `AW-123456789`), then rebuild.
The site sends `whatsapp_click` (with a `source`, e.g. `hero`, `plan_web-business`) and `generate_lead` events
that you can mark as conversions in Google Ads / GA4.

## Google Sheets contact form (optional)

The static contact form can POST to a Google Apps Script web app. Deploy a script that accepts a JSON POST and appends
the `submittedAt`, `name`, `email`, `phone`, `service`, and `message` values to your spreadsheet. Set
`NEXT_PUBLIC_GOOGLE_SHEETS_URL` in `.env.local` to the deployed web app URL, then rebuild and redeploy the site.
The browser sends the request in `no-cors` mode, so it cannot read the script's response; verify submissions in the
spreadsheet when setting up the endpoint. Until the URL is configured, the form will explain that it is unavailable
and show the WhatsApp and email alternatives.

## Where things are

```
src/app/            Next.js routes, page titles & descriptions (SEO)
src/site/config.ts  business details, offer, prices
src/site/pages/     the five pages
src/site/sections/  home page sections (hero, offer, pricing, FAQ…)
src/site/components/ navbar, red promo bar, footer, WhatsApp button…
src/app/globals.css colours, fonts and animations (design system)
public/             logo and favicon
```
"# claude" 
