import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { getSite } from "@/lib/content";

import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  const site = getSite();
  /*
    Slack, LinkedIn and X will not follow a relative image path, so the card
    only works if `url` in site.yaml is the real origin — metadataBase is what
    turns "/og.png" into an absolute URL here.
  */
  const image = site.og_image ?? "/og.png";
  const alt = site.og_image_alt ?? site.title;

  return {
    title: site.title,
    description: site.description,
    metadataBase: site.url ? new URL(site.url) : undefined,
    alternates: { canonical: "/" },
    openGraph: {
      title: site.title,
      description: site.description,
      siteName: site.title,
      url: "/",
      locale: "en_US",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      images: [{ url: image, alt }],
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const site = getSite();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SiteHeader
            brand={site.brand ?? site.title}
            nav={site.nav}
            vibe={site.vibe}
          />
          <div className="flex-1">{children}</div>
          {site.footer ? (
            <footer className="border-t border-rule">
              <div className="mx-auto w-full max-w-[900px] px-6 py-10 text-center text-[13px] text-muted-foreground">
                {site.footer}
              </div>
            </footer>
          ) : null}
        </ThemeProvider>
      </body>
    </html>
  );
}
