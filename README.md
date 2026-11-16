# PixelToPPC — Website

Next.js (App Router) + Tailwind CSS v4 + Motion. Dark design in the PixelToPPC greens, red offer bar,
85%-off launch offer with a spots counter, Hostinger-style pricing, and WhatsApp-first contact.

Pages: Home `/`, Services `/services`, About `/about`, Contact `/contact`, Privacy `/privacy`, Thank You `/thank-you`.

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

This project uses a Next.js API route for contact form submissions, so deploy it to a host that supports Next.js
server features, such as Vercel or a Node.js server. Run the production server with `npm start`.

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

## Google Sheets contact form

The contact form posts to `/api/contact/`, which forwards validated submissions to a Google Apps Script web app.
Set the server-only `SHEET_URL` and `SHEET_SECRET` values in `.env.local`. The script should validate the shared
secret, append the submitted name, email, phone, service and message to the sheet, and respond with the exact text
`ok` on success. Never expose these values through `NEXT_PUBLIC_` variables.

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
