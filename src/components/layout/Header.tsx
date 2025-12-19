'use client';

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl transition-all hover:opacity-80 hover:scale-105 cursor-pointer">
          <Image
            src="/logo/auroraweather-logo.svg"
            alt="AuroWeather Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AuroWeather
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Accueil
          </Link>
        </nav>
      </div>
    </header>
  );
}
