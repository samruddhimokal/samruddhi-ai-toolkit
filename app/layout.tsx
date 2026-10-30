import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const siteTitle = "The AI Toolkit — Curated by Samruddhi Mokal";
const siteDescription =
  "A free learning guide to AI: 125+ hand-picked tools, a 30-day path, free YouTube courses, prompts, and who to follow. Curated by Samruddhi Mokal.";

export const metadata: Metadata = {
  title: { default: siteTitle, template: "%s · The AI Toolkit" },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    siteName: "Pace Labz",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@samruddhi_mokal",
  },
  metadataBase: new URL("https://pacelabz.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <SiteNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
