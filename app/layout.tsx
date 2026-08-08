import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import DotGrid from "@/components/DotGrid";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arnav Verma — ML Engineer & LLM Researcher",
  description:
    "I build and evaluate large language models, from multi dimensional generalization research to production AI products used by real people.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrumentSans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-bg text-fg antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* <div style={{ width: '100%', height: '65%', position: 'absolute' }}>
                  <DotGrid
                    dotSize={5}
                    gap={15}
                    baseColor="#2F293A"
                    activeColor="#ff5959"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    style={{marginRight: 'spacing' + 'em'}}
                    returnDuration={1.5}
                  />
                </div> */}
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
