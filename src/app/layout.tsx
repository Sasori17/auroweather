import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { GoogleAdsense } from "@/components/ads/GoogleAdsense";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AuroWeather - Beautiful Weather Dashboard",
  description: "A stunning weather dashboard with real-time data, fluid 3D elements, and beautiful glassmorphism design. Get weather updates, forecasts, and climate trends with clarity and precision.",
  keywords: ["weather", "forecast", "dashboard", "glassmorphism", "3D", "real-time", "météo", "prévisions"],
  authors: [{ name: "AuroWeather" }],
  openGraph: {
    title: "AuroWeather - Beautiful Weather Dashboard",
    description: "Real-time weather updates in a clean, visual layout with subtle 3D animations",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuroWeather - Beautiful Weather Dashboard",
    description: "Real-time weather updates with fluid 3D elements",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${urbanist.variable} antialiased`}
      >
        <GoogleAdsense />
        {children}
      </body>
    </html>
  );
}
