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
  return {
    title: site.title,
    description: site.description,
    metadataBase: site.url ? new URL(site.url) : undefined,
    openGraph: {
      title: site.title,
      description: site.description,
      type: "website",
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
