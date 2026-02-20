'use client';

import Link from 'next/link';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Search, MapPin, Wind, Droplets, Cloud, CloudRain, Sun, Snowflake, CloudLightning, Gauge, Eye, Compass, Thermometer, ArrowUpDown, CloudDrizzle, Star } from 'lucide-react';
import { useWeatherData } from '@/hooks/useWeatherData';
import { useFavorites } from '@/hooks/useFavorites';
import { useTranslation } from '@/i18n/useTranslation';
import { TemperatureGraph } from './TemperatureGraph';
import { SunChart } from './SunChart';
import { CompassDirection } from './CompassDirection';
import { FavoriteButton } from './FavoriteButton';
import { FavoritesDropdown } from './FavoritesDropdown';
import type { CitySuggestion } from '@/types/weather';
import { useCitySuggestions } from '@/hooks/useCitySuggestions';
import { HorizontalAdBanner } from '@/components/ads/AdBanner';
import { LanguageSelector } from '@/components/layout/LanguageSelector';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function getWeatherIcon(main: string, size: 'sm' | 'lg' = 'sm') {
  const condition = main.toLowerCase();
  const className = size === 'sm' ? 'w-5 h-5' : 'w-8 h-8';

  if (condition.includes('clear')) {
    return <Sun className={`${className} text-amber-400`} />;
  }
  if (condition.includes('cloud')) {
    return <Cloud className={`${className} text-slate-300`} />;
  }
  if (condition.includes('rain') || condition.includes('drizzle')) {
    return <CloudRain className={`${className} text-blue-400`} />;
  }
  if (condition.includes('snow')) {
    return <Snowflake className={`${className} text-blue-200`} />;
  }
  if (condition.includes('thunder')) {
    return <CloudLightning className={`${className} text-amber-400`} />;
  }
  return <Cloud className={`${className} text-slate-300`} />;
}

function getWindDirection(deg: number, windAbbr: readonly string[]): string {
  const index = Math.round(((deg % 360) / 22.5));
  return windAbbr[index % 16];
}

function getFullWindDirection(deg: number, windFull: readonly string[]): string {
  const index = Math.round(((deg % 360) / 22.5));
  return windFull[index % 16];
}

type AirQualityLabels = {
  air_quality_good: string;
  air_quality_fair: string;
  air_quality_moderate: string;
  air_quality_poor: string;
  air_quality_very_poor: string;
  air_quality_unknown: string;
};

function getAirQualityInfo(aqi: number, labels: AirQualityLabels): { label: string; color: string; bgColor: string } {
  switch (aqi) {
    case 1:
      return { label: labels.air_quality_good, color: 'text-green-400', bgColor: 'bg-green-500/20' };
    case 2:
      return { label: labels.air_quality_fair, color: 'text-lime-400', bgColor: 'bg-lime-500/20' };
    case 3:
      return { label: labels.air_quality_moderate, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
    case 4:
      return { label: labels.air_quality_poor, color: 'text-orange-400', bgColor: 'bg-orange-500/20' };
    case 5:
      return { label: labels.air_quality_very_poor, color: 'text-red-400', bgColor: 'bg-red-500/20' };
    default:
      return { label: labels.air_quality_unknown, color: 'text-gray-400', bgColor: 'bg-gray-500/20' };
  }
}

function LargeWeatherIcon({ main }: { main: string }) {
  const condition = main.toLowerCase();

  if (condition.includes('clear')) {
    return (
      <motion.div
        className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          <Sun className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 text-amber-400 drop-shadow-[0_0_50px_rgba(251,191,36,0.5)]" />
        </motion.div>
      </motion.div>
    );
  }

  if (condition.includes('rain') || condition.includes('drizzle')) {
    return (
      <motion.div
        className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
        initial={{ scale: 0, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <CloudRain className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 text-blue-400 drop-shadow-[0_0_50px_rgba(96,165,250,0.5)]" />
      </motion.div>
    );
  }

  if (condition.includes('thunder')) {
    return (
      <motion.div
        className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <CloudLightning className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 text-amber-400 drop-shadow-[0_0_50px_rgba(251,191,36,0.5)]" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            times: [0, 0.1, 0.2, 0.21, 0.3],
            repeatDelay: 2
          }}
        >
          <CloudLightning className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 text-yellow-300" />
        </motion.div>
      </motion.div>
    );
  }

  if (condition.includes('snow')) {
    return (
      <motion.div
        className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <Snowflake className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 text-blue-200 drop-shadow-[0_0_50px_rgba(186,230,253,0.5)]" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <Cloud className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 text-slate-400 drop-shadow-[0_0_50px_rgba(148,163,184,0.5)]" />
    </motion.div>
  );
}

export function IntegratedWeatherPage() {
  const { t, locale } = useTranslation();
  const color = useMotionValue(COLORS_TOP[0]);
  const { weather, forecast, airQuality, loading, error, fetchWeatherByCoords, getCurrentLocation, clearWeather } = useWeatherData(locale);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, loading: suggestionsLoading, fetchSuggestions, clearSuggestions } = useCitySuggestions();
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites();
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length >= 2) {
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 300);
    } else {
      clearSuggestions();
    }
  };

  const handleSuggestionClick = useCallback((suggestion: CitySuggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    clearSuggestions();
    fetchWeatherByCoords(suggestion.lat, suggestion.lon);
  }, [fetchWeatherByCoords, clearSuggestions]);

  const handleLocationClick = useCallback(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const handleHomeClick = useCallback(() => {
    // Retourner à la page de présentation (hero section)
    setSearchQuery('');
    setShowSuggestions(false);
    clearSuggestions();
    clearWeather();
  }, [clearWeather, clearSuggestions]);

  const formatDate = () => {
    return new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDailyForecast = () => {
    if (!forecast) return [];

    const dailyMap: Record<string, {
      day: string;
      temp: number;
      icon: string;
      main: string;
      description: string;
      hour: number;
    }> = {};

    const today = new Date().toDateString();

    for (let i = 0; i < forecast.list.length; i++) {
      const item = forecast.list[i];
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (dateKey === today) continue;

      const hour = date.getHours();

      if (!dailyMap[dateKey] || Math.abs(hour - 12) < Math.abs(dailyMap[dateKey].hour - 12)) {
        dailyMap[dateKey] = {
          day: date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long' }),
          temp: Math.round(item.main.temp),
          icon: item.weather[0].icon,
          main: item.weather[0].main,
          description: item.weather[0].description,
          hour: hour,
        };
      }
    }

    return Object.values(dailyMap).slice(0, 6);
  };

  const dailyForecast = getDailyForecast();

  return (
    <motion.div
      style={{ backgroundImage }}
      className="min-h-screen w-full relative overflow-hidden bg-gray-950"
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6"
        >
          {/* Left side - Logo */}
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-3 transition-all hover:opacity-80 hover:scale-105 cursor-pointer bg-transparent border-none p-0"
          >
            <img
              src="/logo/auroraweather-logo.svg"
              alt="AuroWeather Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <h1 className="text-lg sm:text-xl font-bold text-white">AuroWeather</h1>
          </button>

          {/* Center - Date */}
          <div className="text-white/80 text-xs sm:text-sm hidden md:block">({formatDate()})</div>

          {/* Language Selector */}
          <LanguageSelector />

          {/* Favorites Dropdown */}
          <FavoritesDropdown
            onCitySelect={(city) => fetchWeatherByCoords(city.lat, city.lon)}
            border={border}
            boxShadow={boxShadow}
          />

          {/* Right side - Search */}
          <div ref={containerRef} className="relative w-full sm:w-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 z-10 pointer-events-none" />
              <motion.input
                style={{ border, boxShadow }}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder={t.search.placeholder}
                className="w-full sm:w-56 pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-md text-white text-sm placeholder:text-white/50 focus:outline-none sm:focus:w-72 transition-all focus:bg-white/15"
              />
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ boxShadow }}
                  className="absolute top-full left-0 sm:right-0 sm:left-auto mt-2 bg-gray-950/95 backdrop-blur-md rounded-xl overflow-hidden z-50 w-full sm:min-w-[300px] border border-white/10"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion.name}-${suggestion.state || ''}-${suggestion.country}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
                    >
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{suggestion.name}, {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        {/* Weather Content */}
        <AnimatePresence mode="wait">
          {!weather && !loading && !error ? (
            <motion.div
              key="presentation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[600px] px-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6 sm:mb-8"
              >
                <img
                  src="/logo/auroraweather-logo.svg"
                  alt="AuroWeather"
                  className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent text-center mb-4 px-4"
              >
                {t.home.welcome}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-white/70 text-center max-w-2xl mb-8 sm:mb-12 px-6"
              >
                {t.home.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full px-6"
              >
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
                  <div className="flex justify-center mb-4">
                    <Sun className="w-12 h-12 text-amber-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{t.home.realtime}</h3>
                  <p className="text-white/60 text-sm">{t.home.realtimeDesc}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
                  <div className="flex justify-center mb-4">
                    <CloudRain className="w-12 h-12 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{t.home.forecast}</h3>
                  <p className="text-white/60 text-sm">{t.home.forecastDesc}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
                  <div className="flex justify-center mb-4">
                    <Wind className="w-12 h-12 text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{t.home.data}</h3>
                  <p className="text-white/60 text-sm">{t.home.dataDesc}</p>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={handleLocationClick}
                style={{ border, boxShadow }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-12 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors flex items-center gap-3 text-lg"
              >
                <MapPin className="w-6 h-6" />
                {t.home.useLocation}
              </motion.button>

              {/* Ad Banner */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12 max-w-4xl w-full"
              >
                <HorizontalAdBanner className="rounded-xl overflow-hidden" />
              </motion.div>
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-96"
            >
              <div className="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-96"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={handleLocationClick}
                  className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white hover:bg-white/30 transition-colors border border-white/30"
                >
                  {t.common.retry}
                </button>
              </div>
            </motion.div>
          ) : weather && (
            <div key="weather-main" className="px-4 sm:px-6 pb-6">
              {/* Main Content - Three columns */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr_1fr] gap-8 mb-12">
                {/* Left Side - Temperature and Description */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col justify-center space-y-4 sm:space-y-8 px-4 sm:pl-12"
                >
                  {/* City and Country */}
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{weather.name}, {weather.sys.country}</span>
                    <FavoriteButton
                      city={{
                        name: weather.name,
                        country: weather.sys.country,
                        lat: weather.coord.lat,
                        lon: weather.coord.lon,
                      }}
                    />
                  </div>

                  {/* Large Temperature */}
                  <div className="flex items-start gap-1">
                    <motion.span
                      className="text-6xl sm:text-8xl lg:text-[140px] font-extralight text-white leading-none"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                    >
                      {Math.round(weather.main.temp)}
                    </motion.span>
                    <div className="text-2xl sm:text-3xl lg:text-4xl text-white/60 mt-2 sm:mt-4 lg:mt-6">°C</div>
                  </div>

                  {/* Weather Description */}
                  <motion.h2
                    className="text-xl sm:text-2xl lg:text-3xl font-light text-white/80 capitalize"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {weather.weather[0].description}
                  </motion.h2>

                  {/* Wind and Humidity */}
                  <motion.div
                    className="flex items-center gap-4 sm:gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-white/60" />
                      <div className="text-left">
                        <div className="text-white/50 text-xs">{t.weather.wind}</div>
                        <div className="text-white text-base sm:text-lg font-light">{Math.round(weather.wind.speed * 3.6)} km/h</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-white/60" />
                      <div className="text-left">
                        <div className="text-white/50 text-xs">{t.weather.humidity}</div>
                        <div className="text-white text-base sm:text-lg font-light">{weather.main.humidity}%</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Center - Large Weather Icon */}
                <motion.div
                  className="flex items-center justify-center lg:-ml-80 lg:-mr-4 order-first lg:order-none"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <LargeWeatherIcon main={weather.weather[0].main} />
                </motion.div>

                {/* Right Side - Forecast */}
                <motion.aside
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center px-4 sm:pr-12"
                >
                  <div className="bg-white/10 backdrop-blur-md p-6 w-full rounded-2xl border border-white/20">
                    <div className="space-y-3">
                      {dailyForecast.map((day, index) => (
                        <motion.div
                          key={day.day}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            {getWeatherIcon(day.main, 'sm')}
                            <div>
                              <div className="text-white text-sm font-medium">{day.day}</div>
                              <div className="text-white/50 text-xs capitalize">{day.description}</div>
                            </div>
                          </div>
                          <div className="text-white text-lg font-light">{day.temp}°</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.aside>
              </div>

              {/* Temperature Graph - Full Width */}
              {forecast && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="w-full mb-12"
                >
                  <TemperatureGraph forecast={forecast} currentWeather={weather} />
                </motion.div>
              )}

              {/* Ad Banner after Temperature Graph */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="w-full mb-12 flex justify-center"
              >
                <div className="max-w-5xl w-full">
                  <HorizontalAdBanner className="rounded-xl overflow-hidden" />
                </div>
              </motion.div>

              {/* Additional Weather Details - Bottom Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              >
                {/* Sun Chart */}
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <SunChart weather={weather} />
                </div>

                {/* Pressure & Visibility */}
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <h3 className="text-white/70 text-sm font-medium mb-6">{t.weather.pressureVis}</h3>

                  <div className="space-y-6">
                    {/* Pressure */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20">
                          <Gauge className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white/50 text-xs mb-1">{t.weather.pressure}</div>
                          <div className="text-white text-2xl font-light">{weather.main.pressure} hPa</div>
                        </div>
                      </div>

                      <div className="mt-3 relative">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-red-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${((weather.main.pressure - 950) / 100) * 100}%` }}
                            transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-white/40">
                          <span>{t.weather.pressure_low}</span>
                          <span>{t.weather.pressure_normal}</span>
                          <span>{t.weather.pressure_high}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Visibility */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20">
                          <Eye className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white/50 text-xs mb-1">{t.weather.visibility}</div>
                          <div className="text-white text-2xl font-light">
                            {(weather.visibility / 1000).toFixed(1)} km
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 relative">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((weather.visibility / 10000) * 100, 100)}%` }}
                            transition={{ delay: 1.1, duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-white/40">
                          <span>{t.weather.visibility_low}</span>
                          <span>{t.weather.visibility_moderate}</span>
                          <span>{t.weather.visibility_excellent}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Rain Probability */}
                    {forecast && forecast.list && forecast.list.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20">
                            <CloudDrizzle className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white/50 text-xs mb-1">{t.weather.rainRisk}</div>
                            <div className="text-white text-2xl font-light">
                              {Math.round(forecast.list[0].pop * 100)}%
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 relative">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400"
                              initial={{ width: 0 }}
                              animate={{ width: `${forecast.list[0].pop * 100}%` }}
                              transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                            />
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-white/40">
                            <span>{t.weather.rain_low}</span>
                            <span>{t.weather.rain_moderate}</span>
                            <span>{t.weather.rain_high}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Air Quality */}
                    {airQuality && airQuality.list && airQuality.list.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${getAirQualityInfo(airQuality.list[0].main.aqi, t.weather).bgColor}`}>
                            <Wind className={`w-6 h-6 ${getAirQualityInfo(airQuality.list[0].main.aqi, t.weather).color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white/50 text-xs mb-1">{t.weather.airQuality}</div>
                            <div className={`text-2xl font-light ${getAirQualityInfo(airQuality.list[0].main.aqi, t.weather).color}`}>
                              {getAirQualityInfo(airQuality.list[0].main.aqi, t.weather).label}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 relative">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-400"
                              initial={{ width: 0 }}
                              animate={{ width: `${(airQuality.list[0].main.aqi / 5) * 100}%` }}
                              transition={{ delay: 1.3, duration: 1, ease: 'easeOut' }}
                            />
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-white/40">
                            <span>{t.weather.air_good}</span>
                            <span>{t.weather.air_moderate}</span>
                            <span>{t.weather.air_bad}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <h3 className="text-white/70 text-sm font-medium mb-6">{t.weather.otherInfo}</h3>

                  <div className="space-y-4">
                    {/* Feels Like */}
                    <motion.div
                      className="flex items-center gap-4 py-3 border-b border-white/5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 flex-shrink-0">
                        <Thermometer className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex items-center justify-between flex-1">
                        <span className="text-white/60 text-sm">{t.weather.feelsLike}</span>
                        <span className="text-white text-lg font-light">{Math.round(weather.main.feels_like)}°C</span>
                      </div>
                    </motion.div>

                    {/* Min/Max */}
                    <motion.div
                      className="flex items-center gap-4 py-3 border-b border-white/5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 flex-shrink-0">
                        <ArrowUpDown className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex items-center justify-between flex-1">
                        <span className="text-white/60 text-sm">{t.weather.minMax}</span>
                        <span className="text-white text-lg font-light">
                          <span className="text-blue-400">{Math.round(weather.main.temp_min)}°</span>
                          {' / '}
                          <span className="text-red-400">{Math.round(weather.main.temp_max)}°</span>
                        </span>
                      </div>
                    </motion.div>

                    {/* Clouds */}
                    {weather.clouds && (
                      <motion.div
                        className="flex items-center gap-4 py-3 border-b border-white/5"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 flex-shrink-0">
                          <Cloud className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex items-center justify-between flex-1">
                          <span className="text-white/60 text-sm">{t.weather.cloudCover}</span>
                          <span className="text-white text-lg font-light">{weather.clouds.all}%</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Wind Direction & Speed */}
                    <motion.div
                      className="flex flex-col py-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Compass className="w-4 h-4 text-blue-400" style={{ transform: `rotate(${weather.wind.deg}deg)` }} />
                          <span className="text-white/60 text-sm">{t.weather.windDirection}</span>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-white text-lg font-light">{getWindDirection(weather.wind.deg, t.weather.windAbbr)}</span>
                            <span className="text-white/50 text-sm">({Math.round(weather.wind.speed * 3.6)} km/h)</span>
                          </div>
                          <span className="text-white/60 text-xs">{getFullWindDirection(weather.wind.deg, t.weather.windFull)}</span>
                        </div>
                      </div>

                      <CompassDirection
                        windDeg={weather.wind.deg}
                        windSpeed={weather.wind.speed}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
