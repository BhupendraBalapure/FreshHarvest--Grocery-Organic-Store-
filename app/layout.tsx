import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = "https://freshharvest.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FreshHarvest — Premium Farm Fresh & Organic Groceries Delivered",
    template: "%s · FreshHarvest",
  },
  description:
    "Shop premium farm-fresh fruits, crisp vegetables, dairy, bakery and certified organic foods. Same-day delivery, hand-picked quality, delivered to your door.",
  keywords: [
    "grocery delivery",
    "organic food",
    "farm fresh",
    "fruits",
    "vegetables",
    "same day delivery",
    "FreshHarvest",
  ],
  authors: [{ name: "FreshHarvest" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "FreshHarvest — Premium Farm Fresh & Organic Groceries",
    description:
      "Hand-picked produce and certified organic essentials, delivered fresh the same day.",
    siteName: "FreshHarvest",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreshHarvest — Premium Farm Fresh & Organic Groceries",
    description:
      "Hand-picked produce and certified organic essentials, delivered fresh the same day.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} font-sans`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
