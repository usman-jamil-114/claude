import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { SITE } from "@/site/config";
import { SiteLayout } from "@/site/SiteLayout";
import "./globals.css";

const display = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800", "900"], variable: "--font-montserrat" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-jakarta" });

const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "PixelToPPC — Website Development & Google Ads in Pakistan",
    template: "%s | PixelToPPC",
  },
  description: "Websites that sell and Google Ads that convert. 85% off for our first 10 clients.",
  applicationName: SITE.name,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
  openGraph: { type: "website", siteName: SITE.name, locale: "en_PK" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0c111d" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable}`}>
      <body>
        <SiteLayout>{children}</SiteLayout>
        {GOOGLE_TAG_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} strategy="afterInteractive" />
            <Script id="google-tag" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GOOGLE_TAG_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
