import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { GoogleAdsense } from "@/components/ads/GoogleAdsense";
import { RecaptchaProvider } from "@/components/providers/RecaptchaProvider";
import { headers } from "next/headers";

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
  metadataBase: new URL('https://auroweather.fr'),
  authors: [{ name: "AuroWeather" }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo/logo.jpg',
    apple: '/logo/logo.jpg',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get('x-locale') ?? 'fr';

  return (
    <html lang={locale} className="dark">
      <body
        className={`${inter.variable} ${urbanist.variable} antialiased flex flex-col min-h-screen`}
      >
        <GoogleAdsense />
        <RecaptchaProvider>
          {children}
        </RecaptchaProvider>
      </body>
    </html>
  );
}
