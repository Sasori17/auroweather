import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en'] as const;
type Locale = typeof locales[number];
const defaultLocale: Locale = 'fr';

function getLocaleFromRequest(request: NextRequest): Locale {
  // 1. Check cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferred = acceptLanguage.split(',').map((lang) => lang.split(';')[0].trim().toLowerCase());

  for (const lang of preferred) {
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('fr')) return 'fr';
  }

  return defaultLocale;
}

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip if path already has a locale prefix
  if (pathnameHasLocale(pathname)) {
    return NextResponse.next();
  }

  const locale = getLocaleFromRequest(request);

  if (locale === 'en') {
    // Redirect to /en/... for English
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === '/' ? '/' : pathname}`;
    const response = NextResponse.redirect(url, 307);
    response.headers.set('x-locale', 'en');
    return response;
  }

  // Default: French — internal rewrite to /fr/...
  const url = request.nextUrl.clone();
  url.pathname = `/fr${pathname === '/' ? '/' : pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set('x-locale', 'fr');
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|ads\\.txt|robots\\.txt|sitemap\\.xml|logo|icons|.*\\..*).*)',
  ],
};
