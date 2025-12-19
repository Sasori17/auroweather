import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { WeatherData, ForecastData, AirQualityData } from '@/types/weather';
import { Droplets, Wind, Eye, Sunrise, Sunset, Gauge, Cloud, CloudRain, Snowflake, Sun, Moon, CloudLightning, CloudFog as CloudMist, Thermometer, CloudDrizzle, Wind as AirIcon } from 'lucide-react';
import { translateWeatherDescription } from '@/lib/weatherTranslations';
import { motion } from 'framer-motion';

interface WeatherCardProps {
  weather: WeatherData;
  forecast?: ForecastData | null;
  airQuality?: AirQualityData | null;
}

export function WeatherCard({ weather, forecast, airQuality }: WeatherCardProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const getAirQualityInfo = (aqi: number) => {
    switch (aqi) {
      case 1:
        return { label: 'Bonne', color: 'text-green-500 dark:text-green-400' };
      case 2:
        return { label: 'Correcte', color: 'text-lime-500 dark:text-lime-400' };
      case 3:
        return { label: 'Moyenne', color: 'text-yellow-500 dark:text-yellow-400' };
      case 4:
        return { label: 'Mauvaise', color: 'text-orange-500 dark:text-orange-400' };
      case 5:
        return { label: 'Très mauvaise', color: 'text-red-500 dark:text-red-400' };
      default:
        return { label: 'Inconnue', color: 'text-gray-500 dark:text-gray-400' };
    }
  };

  const getRainProbability = () => {
    if (!forecast || !forecast.list || forecast.list.length === 0) return null;
    // Get the first forecast period (next 3 hours)
    return Math.round(forecast.list[0].pop * 100);
  };

  const getWeatherIcon = () => {
    const condition = weather.weather[0].main.toLowerCase();
    const isDay = weather.weather[0].icon.includes('d');
    const iconClass = "w-48 h-48";

    if (condition.includes('clear')) {
      return isDay ? (
        <motion.div
          className="relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <Sun className={`${iconClass} text-amber-400 dark:text-amber-300`} />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Sun className={`${iconClass} text-amber-400 dark:text-amber-300`} />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Moon className={`${iconClass} text-slate-300 dark:text-slate-200`} />
        </motion.div>
      );
    }
    if (condition.includes('cloud')) {
      return (
        <motion.div className="relative">
          <Cloud className={`${iconClass} text-slate-500 dark:text-slate-300`} />
          <motion.div
            className="absolute -left-6 top-2"
            animate={{
              x: [0, 8, 0],
              transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }}
          >
            <Cloud className="w-20 h-20 text-slate-400/70 dark:text-slate-400/80" />
          </motion.div>
        </motion.div>
      );
    }
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return (
        <motion.div className="relative">
          <CloudRain className={`${iconClass} text-blue-500 dark:text-blue-400`} />
          <div className="absolute bottom-0 left-2 right-2 h-16">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 bg-blue-400 dark:bg-blue-300 w-[3px] h-[12px] rounded-full opacity-0"
                style={{ left: `${15 + i * 17}%` }}
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, 40],
                  transition: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                    delay: i * 0.2
                  }
                }}
              />
            ))}
          </div>
        </motion.div>
      );
    }
    if (condition.includes('snow')) {
      return (
        <motion.div className="relative">
          <Snowflake className={`${iconClass} text-blue-300 dark:text-blue-200`} />
          <div className="absolute bottom-0 left-0 right-0 h-16">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 bg-blue-300 dark:bg-blue-200 w-[5px] h-[5px] rounded-full opacity-0"
                style={{ left: `${15 + i * 17}%` }}
                initial={{ opacity: 0, y: -5 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, 30],
                  x: [0, (i % 2 === 0 ? 10 : -10), 0],
                  transition: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }
                }}
              />
            ))}
          </div>
        </motion.div>
      );
    }
    if (condition.includes('thunder')) {
      return (
        <motion.div className="relative">
          <CloudLightning className={`${iconClass} text-amber-400 dark:text-amber-300`} />
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0.5, 1, 0],
              transition: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.1, 0.2, 0.21, 0.3],
                repeatDelay: 1.5
              }
            }}
          >
            <CloudLightning className={`${iconClass} text-amber-300 dark:text-amber-200`} />
          </motion.div>
        </motion.div>
      );
    }
    if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
      return (
        <motion.div className="relative">
          <CloudMist className={`${iconClass} text-slate-400 dark:text-slate-300`} />
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ opacity: 0.3, x: -20 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              x: [-20, 20, -20],
              transition: {
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }
            }}
          >
            <CloudMist className={`${iconClass} text-slate-400 dark:text-slate-300`} />
          </motion.div>
        </motion.div>
      );
    }
    return <Thermometer className={`${iconClass} text-slate-500 dark:text-slate-300`} />;
  };

  return (
    <Card className="w-full modern-card shadow-xl animate-fade-in border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-800 dark:text-white" style={{ fontFamily: 'var(--font-urbanist)' }}>{weather.name}, {weather.sys.country}</span>
          <Badge variant="secondary" className="text-base px-4 py-2 modern-card">
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main weather info */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center">
              {getWeatherIcon()}
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-800 dark:text-white">{Math.round(weather.main.temp)}°C</div>
              <div className="text-xl text-gray-700 dark:text-gray-200 capitalize mt-2 font-medium">
                {translateWeatherDescription(weather.weather[0].description)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Ressenti: {Math.round(weather.main.feels_like)}°C
              </div>
            </div>
          </div>

          {/* Additional weather details */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="flex items-center gap-3 p-4 rounded-xl modern-card hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Droplets className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </motion.div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Humidité</div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{weather.main.humidity}%</div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 p-4 rounded-xl modern-card hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <Wind className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </motion.div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Vent</div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{Math.round(weather.wind.speed * 3.6)} km/h</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{getWindDirection(weather.wind.deg)}</div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 p-4 rounded-xl modern-card hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <Gauge className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              </motion.div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Pression</div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{weather.main.pressure} hPa</div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 p-4 rounded-xl modern-card hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Eye className="w-8 h-8 text-green-500 dark:text-green-400" />
              </motion.div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Visibilité</div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{(weather.visibility / 1000).toFixed(1)} km</div>
              </div>
            </motion.div>

            {getRainProbability() !== null && (
              <motion.div
                className="flex items-center gap-3 p-4 rounded-xl modern-card hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <CloudDrizzle className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                </motion.div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Risque pluie</div>
                  <div className="text-xl font-bold text-gray-800 dark:text-white">{getRainProbability()}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">3h</div>
                </div>
              </motion.div>
            )}

            {airQuality && airQuality.list && airQuality.list.length > 0 && (
              <motion.div
                className="flex items-center gap-3 p-4 rounded-xl modern-card hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <AirIcon className={`w-8 h-8 ${getAirQualityInfo(airQuality.list[0].main.aqi).color}`} />
                </motion.div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Qualité air</div>
                  <div className={`text-xl font-bold ${getAirQualityInfo(airQuality.list[0].main.aqi).color}`}>
                    {getAirQualityInfo(airQuality.list[0].main.aqi).label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">AQI: {airQuality.list[0].main.aqi}</div>
                </div>
              </motion.div>
            )}

            <motion.div
              className="flex items-center gap-3 p-4 rounded-xl modern-card hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <Sunrise className="w-8 h-8 text-orange-500 dark:text-orange-400" />
              </motion.div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Lever</div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{formatTime(weather.sys.sunrise)}</div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 p-4 rounded-xl modern-card hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <Sunset className="w-8 h-8 text-red-500 dark:text-red-400" />
              </motion.div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Coucher</div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{formatTime(weather.sys.sunset)}</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Min/Max temperature and clouds */}
        <div className="mt-6 flex justify-center gap-8">
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Min</div>
            <div className="text-2xl font-semibold text-blue-500 dark:text-blue-400">
              {Math.round(weather.main.temp_min)}°C
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Max</div>
            <div className="text-2xl font-semibold text-red-500 dark:text-red-400">
              {Math.round(weather.main.temp_max)}°C
            </div>
          </div>
          {weather.clouds && (
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Nuages</div>
              <div className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                {weather.clouds.all}%
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
