import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { GoogleAdsense } from "@/components/ads/GoogleAdsense";
import { Header } from "@/components/layout/Header";
import { HorizontalAdBanner } from "@/components/ads/AdBanner";

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
  title: "AuroWeather - Météo en temps réel et prévisions",
  description: "Application météo moderne et gratuite. Consultez la météo actuelle, les prévisions à 5 jours et les données détaillées pour toutes les villes du monde. Température, humidité, vent et plus encore.",
  keywords: ["météo", "prévisions météo", "temps réel", "température", "climat", "weather", "forecast"],
  authors: [{ name: "AuroWeather" }],
  openGraph: {
    title: "AuroWeather - Météo en temps réel",
    description: "Consultez la météo actuelle et les prévisions à 5 jours pour votre ville",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuroWeather - Météo en temps réel",
    description: "Consultez la météo actuelle et les prévisions à 5 jours",
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
    <html lang="fr">
      <body
        className={`${inter.variable} ${urbanist.variable} antialiased min-h-screen flex flex-col`}
      >
        <GoogleAdsense />

        {/* Navigation */}
        <Header />

        {/* Banner publicitaire en haut */}
        <div className="container mx-auto px-4 py-4">
          <HorizontalAdBanner className="max-w-4xl mx-auto" />
        </div>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Banner publicitaire en bas */}
        <div className="container mx-auto px-4 py-4">
          <HorizontalAdBanner className="max-w-4xl mx-auto" />
        </div>

        {/* Footer */}
        <footer className="w-full border-t bg-background">
          <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-20 md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <Image
                src="/logo/auroraweather-logo.svg"
                alt="AuroWeather Logo"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Construit avec Next.js 15, Tailwind CSS et OpenWeatherMap API
              </p>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-right">
              &copy; {new Date().getFullYear()} AuroWeather. Tous droits réservés.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
