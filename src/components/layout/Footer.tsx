import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto py-8 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">AuroWeather</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Votre application météo moderne avec prévisions en temps réel,
              interface élégante et données précises pour toutes vos activités.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/a-propos"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Guide météo
                </Link>
              </li>
              <li>
                <Link
                  href="/glossaire"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Glossaire
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/confidentialite"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © {currentYear} AuroWeather. Tous droits réservés.
          </p>
          <p className="text-white/40 text-xs mt-2">
            Données météo fournies par OpenWeatherMap
          </p>
        </div>
      </div>
    </footer>
  );
}
