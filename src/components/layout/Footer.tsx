import Link from 'next/link';
import { getTranslation } from '@/i18n/getTranslation';
import type { Locale } from '@/i18n/index';

interface FooterProps {
  locale?: Locale;
}

export function Footer({ locale = 'fr' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = getTranslation(locale);
  const prefix = locale === 'en' ? '/en' : '';

  return (
    <footer className="relative z-10 mt-auto py-8 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">AuroWeather</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {t.footer.aboutText}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${prefix}/a-propos`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {t.footer.links.about}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/blog`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {t.footer.links.blog}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/guide`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {t.footer.links.guide}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/glossaire`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {t.footer.links.glossary}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/contact`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {t.footer.links.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${prefix}/confidentialite`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {t.footer.links.privacy}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/conditions`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {t.footer.links.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © {currentYear} AuroWeather. {t.footer.copyright}
          </p>
          <p className="text-white/40 text-xs mt-2">
            {t.footer.dataSource}
          </p>
        </div>
      </div>
    </footer>
  );
}
