'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import Link from 'next/link';
import { getTranslation } from '@/i18n/getTranslation';
import type { Locale } from '@/i18n/index';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
};

interface CookieConsentProps {
  locale?: Locale;
}

export function CookieConsent({ locale = 'fr' }: CookieConsentProps) {
  const t = getTranslation(locale).cookie;
  const prefix = locale === 'en' ? '/en' : '';

  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        console.error('Error parsing cookie consent:', e);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);

    if (prefs.analytics) {
      console.log('Analytics enabled');
    }
    if (prefs.advertising) {
      console.log('Advertising cookies enabled');
    }
  };

  const acceptAll = () => {
    savePreferences({ necessary: true, analytics: true, advertising: true });
  };

  const rejectAll = () => {
    savePreferences({ necessary: true, analytics: false, advertising: false });
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => !showSettings && setShowBanner(false)}
          />

          {/* Cookie Banner */}
          {!showSettings ? (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
            >
              <div className="max-w-6xl mx-auto bg-slate-950/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Cookie className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {t.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <p className="text-white/80 leading-relaxed mb-4">
                      {t.description}
                    </p>
                    <p className="text-white/60 text-sm">
                      {t.learnMore}{' '}
                      <Link
                        href={`${prefix}/confidentialite`}
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        {t.privacyPolicy}
                      </Link>.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={acceptAll}
                      className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      {t.acceptAll}
                    </button>
                    <button
                      onClick={rejectAll}
                      className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium flex items-center justify-center gap-2 border border-white/20"
                    >
                      <X className="w-5 h-5" />
                      {t.rejectAll}
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors font-medium flex items-center justify-center gap-2 border border-white/10"
                    >
                      <Settings className="w-5 h-5" />
                      {t.customize}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Settings Panel */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Settings className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">
                        {t.settingsTitle}
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-white/60" />
                    </button>
                  </div>

                  {/* Cookie Categories */}
                  <div className="space-y-4 mb-6">
                    {/* Necessary Cookies */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">{t.necessary}</h4>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {t.necessaryDesc}
                          </p>
                        </div>
                        <div className="ml-4 flex items-center">
                          <div className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
                            {t.necessaryAlways}
                          </div>
                        </div>
                      </div>
                      <p className="text-white/40 text-xs mt-2">{t.necessaryExamples}</p>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">{t.analytics}</h4>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {t.analyticsDesc}
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() =>
                              setPreferences({ ...preferences, analytics: !preferences.analytics })
                            }
                            className={`relative w-14 h-8 rounded-full transition-colors ${
                              preferences.analytics ? 'bg-blue-600' : 'bg-white/20'
                            }`}
                          >
                            <motion.div
                              animate={{ x: preferences.analytics ? 24 : 2 }}
                              className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                            />
                          </button>
                        </div>
                      </div>
                      <p className="text-white/40 text-xs mt-2">{t.analyticsExamples}</p>
                    </div>

                    {/* Advertising Cookies */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">{t.advertising}</h4>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {t.advertisingDesc}
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() =>
                              setPreferences({ ...preferences, advertising: !preferences.advertising })
                            }
                            className={`relative w-14 h-8 rounded-full transition-colors ${
                              preferences.advertising ? 'bg-blue-600' : 'bg-white/20'
                            }`}
                          >
                            <motion.div
                              animate={{ x: preferences.advertising ? 24 : 2 }}
                              className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                            />
                          </button>
                        </div>
                      </div>
                      <p className="text-white/40 text-xs mt-2">{t.advertisingExamples}</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
                    <p className="text-blue-200 text-sm leading-relaxed">
                      {t.modifyInfo}{' '}
                      <Link
                        href={`${prefix}/confidentialite`}
                        className="underline hover:text-blue-300"
                      >
                        {t.privacyPolicy}
                      </Link>.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={saveCustom}
                      className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      {t.saveChoices}
                    </button>
                    <button
                      onClick={acceptAll}
                      className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium border border-white/20"
                    >
                      {t.acceptAll}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
