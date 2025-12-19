'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Wind, Droplets, Cloud, CloudRain, Sun, Snowflake, CloudLightning, Gauge, Eye, Compass, CloudSun, Thermometer, ArrowUpDown, CloudDrizzle } from 'lucide-react';
import { useWeatherData } from '@/hooks/useWeatherData';
import { TemperatureGraph } from './TemperatureGraph';
import { SunChart } from './SunChart';
import { CompassDirection } from './CompassDirection';
import type { CitySuggestion } from '@/types/weather';
import { useCitySuggestions } from '@/hooks/useCitySuggestions';

interface RecentCity {
  name: string;
  country: string;
  temp: number;
  icon: string;
  main: string;
}

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

// Convert wind degrees to cardinal direction
function getWindDirection(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  const index = Math.round(((deg % 360) / 22.5));
  return directions[index % 16];
}

// Get full compass direction name in French
function getFullWindDirection(deg: number): string {
  const directions = [
    'Nord', 'Nord-Nord-Est', 'Nord-Est', 'Est-Nord-Est',
    'Est', 'Est-Sud-Est', 'Sud-Est', 'Sud-Sud-Est',
    'Sud', 'Sud-Sud-Ouest', 'Sud-Ouest', 'Ouest-Sud-Ouest',
    'Ouest', 'Ouest-Nord-Ouest', 'Nord-Ouest', 'Nord-Nord-Ouest'
  ];
  const index = Math.round(((deg % 360) / 22.5));
  return directions[index % 16];
}

// Get air quality information
function getAirQualityInfo(aqi: number): { label: string; color: string; bgColor: string } {
  switch (aqi) {
    case 1:
      return { label: 'Bonne', color: 'text-green-400', bgColor: 'bg-green-500/20' };
    case 2:
      return { label: 'Correcte', color: 'text-lime-400', bgColor: 'bg-lime-500/20' };
    case 3:
      return { label: 'Moyenne', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
    case 4:
      return { label: 'Mauvaise', color: 'text-orange-400', bgColor: 'bg-orange-500/20' };
    case 5:
      return { label: 'Très mauvaise', color: 'text-red-400', bgColor: 'bg-red-500/20' };
    default:
      return { label: 'Inconnue', color: 'text-gray-400', bgColor: 'bg-gray-500/20' };
  }
}

// Large animated weather icon for center display
function LargeWeatherIcon({ main }: { main: string }) {
  const condition = main.toLowerCase();

  if (condition.includes('clear')) {
    return (
      <motion.div
        className="relative w-80 h-80"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          <Sun className="w-80 h-80 text-amber-400 drop-shadow-[0_0_50px_rgba(251,191,36,0.5)]" />
        </motion.div>
      </motion.div>
    );
  }

  if (condition.includes('rain') || condition.includes('drizzle')) {
    return (
      <motion.div
        className="relative w-80 h-80"
        initial={{ scale: 0, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <CloudRain className="w-80 h-80 text-blue-400 drop-shadow-[0_0_50px_rgba(96,165,250,0.5)]" />
      </motion.div>
    );
  }

  if (condition.includes('thunder')) {
    return (
      <motion.div
        className="relative w-80 h-80"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <CloudLightning className="w-80 h-80 text-amber-400 drop-shadow-[0_0_50px_rgba(251,191,36,0.5)]" />
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
          <CloudLightning className="w-80 h-80 text-yellow-300" />
        </motion.div>
      </motion.div>
    );
  }

  if (condition.includes('snow')) {
    return (
      <motion.div
        className="relative w-80 h-80"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <Snowflake className="w-80 h-80 text-blue-200 drop-shadow-[0_0_50px_rgba(186,230,253,0.5)]" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative w-80 h-80"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <Cloud className="w-80 h-80 text-slate-400 drop-shadow-[0_0_50px_rgba(148,163,184,0.5)]" />
    </motion.div>
  );
}

interface WeatherDashboardProps {
  withHeroBackground?: boolean;
}

export function WeatherDashboard({ withHeroBackground = false }: WeatherDashboardProps) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const { weather, forecast, airQuality, loading, error, fetchWeatherByCoords, getCurrentLocation } = useWeatherData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, loading: suggestionsLoading, fetchSuggestions, clearSuggestions } = useCitySuggestions();
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleSuggestionClick = useCallback(async (suggestion: CitySuggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    clearSuggestions();
    fetchWeatherByCoords(suggestion.lat, suggestion.lon);
  }, [fetchWeatherByCoords, clearSuggestions]);

  const handleLocationClick = useCallback(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get next 5 days forecast
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

      // Skip today
      if (dateKey === today) continue;

      const hour = date.getHours();

      // If we don't have this day yet, or this forecast is closer to noon (12h)
      if (!dailyMap[dateKey] || Math.abs(hour - 12) < Math.abs(dailyMap[dateKey].hour - 12)) {
        dailyMap[dateKey] = {
          day: date.toLocaleDateString('en-US', { weekday: 'long' }),
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
    <div className="min-h-screen w-full black-bg relative">
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between p-6"
        >
          {/* Left side - Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo/auroraweather-logo.svg"
              alt="AuroWeather Logo"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold text-white">AuroWeather</h1>
          </div>

          {/* Center - Location and Search */}
          <div className="flex items-center gap-4">
            {weather && (
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{weather.name}, {weather.sys.country}</span>
              </div>
            )}
            <div className="text-white/60 text-sm">({formatDate()})</div>
          </div>

          {/* Right side - Search */}
          <div ref={containerRef} className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search city..."
                className="w-48 pl-10 pr-4 py-2 modern-input rounded-full text-white text-sm placeholder:text-white/40 focus:outline-none focus:w-64 transition-all"
              />
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 search-dropdown rounded-xl overflow-hidden z-50 min-w-[300px]"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion.name}-${suggestion.state || ''}-${suggestion.country}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left text-white hover:bg-white/15 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
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
          {loading ? (
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
              <div className="modern-card rounded-3xl p-8 text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={handleLocationClick}
                  className="modern-card px-6 py-3 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : weather && (
            <div key="weather-main" className="px-6 pb-6">
              {/* Main Content - Three columns */}
              <div className="grid grid-cols-[1.5fr_2fr_1fr] gap-8 mb-12">
                {/* Left Side - Temperature and Description */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col justify-center space-y-8 pl-12"
                >
                  {/* Large Temperature */}
                  <div className="flex items-start gap-1">
                    <motion.span
                      className="text-[140px] font-extralight text-white leading-none"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                    >
                      {Math.round(weather.main.temp)}
                    </motion.span>
                    <div className="text-4xl text-white/60 mt-6">°C</div>
                  </div>

                  {/* Weather Description */}
                  <motion.h2
                    className="text-3xl font-light text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {weather.weather[0].main}
                    {weather.weather[0].main.toLowerCase() !== weather.weather[0].description.toLowerCase() && (
                      <> with {weather.weather[0].description}</>
                    )}
                  </motion.h2>

                  {/* Wind and Humidity */}
                  <motion.div
                    className="flex items-center gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-white/60" />
                      <div className="text-left">
                        <div className="text-white/50 text-xs">Wind</div>
                        <div className="text-white text-lg font-light">{Math.round(weather.wind.speed * 3.6)} km/h</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-white/60" />
                      <div className="text-left">
                        <div className="text-white/50 text-xs">Humidity</div>
                        <div className="text-white text-lg font-light">{weather.main.humidity}%</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Center - Large Weather Icon */}
                <motion.div
                  className="flex items-center justify-center -ml-80 -mr-4"
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
                  className="flex items-center pr-12"
                >
                  <div className="dark-card p-6 w-full rounded-2xl">
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
            </div>
          )}

          {/* Additional Weather Details - Bottom Section */}
          {weather && (
            <motion.div
              key="weather-details"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="px-6 pb-6 mt-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sun Chart */}
                <div className="dark-card p-6">
                  <SunChart weather={weather} />
                </div>

                {/* Pressure & Visibility */}
                <div className="dark-card p-6">
                  <h3 className="text-white/70 text-sm font-medium mb-6">Pression & Visibilité</h3>

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
                          <div className="text-white/50 text-xs mb-1">Pression atmosphérique</div>
                          <div className="text-white text-2xl font-light">{weather.main.pressure} hPa</div>
                        </div>
                      </div>

                      {/* Pressure indicator */}
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
                          <span>Bas</span>
                          <span>Normal</span>
                          <span>Haut</span>
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
                          <div className="text-white/50 text-xs mb-1">Visibilité</div>
                          <div className="text-white text-2xl font-light">
                            {(weather.visibility / 1000).toFixed(1)} km
                          </div>
                        </div>
                      </div>

                      {/* Visibility indicator */}
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
                          <span>Faible</span>
                          <span>Modérée</span>
                          <span>Excellente</span>
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
                            <div className="text-white/50 text-xs mb-1">Risque de pluie (3h)</div>
                            <div className="text-white text-2xl font-light">
                              {Math.round(forecast.list[0].pop * 100)}%
                            </div>
                          </div>
                        </div>

                        {/* Rain probability indicator */}
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
                            <span>Faible</span>
                            <span>Modéré</span>
                            <span>Élevé</span>
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
                          <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${getAirQualityInfo(airQuality.list[0].main.aqi).bgColor}`}>
                            <Wind className={`w-6 h-6 ${getAirQualityInfo(airQuality.list[0].main.aqi).color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white/50 text-xs mb-1">Qualité de l'air</div>
                            <div className={`text-2xl font-light ${getAirQualityInfo(airQuality.list[0].main.aqi).color}`}>
                              {getAirQualityInfo(airQuality.list[0].main.aqi).label}
                            </div>
                          </div>
                        </div>

                        {/* AQI indicator */}
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
                            <span>Bonne</span>
                            <span>Moyenne</span>
                            <span>Mauvaise</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="dark-card p-6">
                  <h3 className="text-white/70 text-sm font-medium mb-6">Autres informations</h3>

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
                        <span className="text-white/60 text-sm">Ressenti</span>
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
                        <span className="text-white/60 text-sm">Min / Max</span>
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
                          <span className="text-white/60 text-sm">Couverture nuageuse</span>
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
                          <span className="text-white/60 text-sm">Direction du vent</span>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-white text-lg font-light">{getWindDirection(weather.wind.deg)}</span>
                            <span className="text-white/50 text-sm">({Math.round(weather.wind.speed * 3.6)} km/h)</span>
                          </div>
                          <span className="text-white/60 text-xs">{getFullWindDirection(weather.wind.deg)}</span>
                        </div>
                      </div>

                      {/* Compass showing wind direction */}
                      <CompassDirection
                        windDeg={weather.wind.deg}
                        windSpeed={weather.wind.speed}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
