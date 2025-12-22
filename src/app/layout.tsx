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
  title: "AuroWeather - Météo en temps réel",
  description: "Application météo moderne avec données en temps réel, éléments 3D fluides et design glassmorphism élégant. Obtenez les prévisions météo, alertes et tendances climatiques avec clarté et précision.",
  keywords: ["météo", "prévisions", "dashboard", "glassmorphism", "3D", "temps réel", "weather", "forecast"],
  authors: [{ name: "AuroWeather" }],
  openGraph: {
    title: "AuroWeather - Météo en temps réel",
    description: "Prévisions météo en temps réel dans une interface visuelle élégante avec animations 3D",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuroWeather - Météo en temps réel",
    description: "Prévisions météo en temps réel avec éléments 3D fluides",
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
