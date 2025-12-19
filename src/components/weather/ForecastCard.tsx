import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, CloudRain, Snowflake, Sun, Moon, CloudLightning, CloudFog as CloudMist, Thermometer } from 'lucide-react';
import { translateWeatherDescription } from '@/lib/weatherTranslations';
import type { ForecastData } from '@/types/weather';
import { motion } from 'framer-motion';

interface ForecastCardProps {
  forecast: ForecastData;
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  // Group forecasts by day and get one forecast per day (at noon if available)
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toLocaleDateString('fr-FR');

    // Get the forecast closest to noon (12:00) for each day
    if (!acc[dateKey] || Math.abs(date.getHours() - 12) < Math.abs(new Date(acc[dateKey].dt * 1000).getHours() - 12)) {
      acc[dateKey] = item;
    }

    return acc;
  }, {} as Record<string, typeof forecast.list[0]>);

  const dailyForecastArray = Object.values(dailyForecasts);
  const availableDays = dailyForecastArray.length;

  // Show 4-day forecast (excluding today)
  const daysToShow = Math.min(availableDays, 4);
  // Skip today (index 0) and show the next 4 days
  const displayArray = dailyForecastArray.slice(1, daysToShow + 1);

  const formatDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Demain';
    } else {
      return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' });
    }
  };

  const getWeatherIcon = (weatherMain: string, icon: string) => {
    const condition = weatherMain.toLowerCase();
    const isDay = icon.includes('d');
    const iconClass = "w-16 h-16";

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
            className="absolute -left-3 top-1"
            animate={{
              x: [0, 5, 0],
              transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }}
          >
            <Cloud className="w-12 h-12 text-slate-400/70 dark:text-slate-400/80" />
          </motion.div>
        </motion.div>
      );
    }
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return (
        <motion.div className="relative">
          <CloudRain className={`${iconClass} text-blue-500 dark:text-blue-400`} />
          <div className="absolute bottom-0 left-1 right-1 h-12">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 bg-blue-400 dark:bg-blue-300 w-[2px] h-[8px] rounded-full opacity-0"
                style={{ left: `${20 + i * 25}%` }}
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, 25],
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
          <div className="absolute bottom-0 left-0 right-0 h-12">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 bg-blue-300 dark:bg-blue-200 w-[3px] h-[3px] rounded-full opacity-0"
                style={{ left: `${20 + i * 25}%` }}
                initial={{ opacity: 0, y: -5 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, 20],
                  x: [0, (i % 2 === 0 ? 7 : -7), 0],
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
            initial={{ opacity: 0.3, x: -15 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              x: [-15, 15, -15],
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
    <Card className="w-full modern-card shadow-xl animate-fade-in border-white/40 dark:border-white/20">
      <CardHeader>
        <CardTitle className="text-2xl">
          <span className="font-bold text-gray-800 dark:text-white" style={{ fontFamily: 'var(--font-urbanist)' }}>
            Prévisions pour les 4 prochains jours
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayArray.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-4 rounded-xl modern-card hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm font-bold text-center mb-2 text-gray-800 dark:text-white">
                {formatDay(item.dt)}
              </div>
              <div className="flex items-center justify-center mb-2">
                {getWeatherIcon(item.weather[0].main, item.weather[0].icon)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 capitalize text-center mb-2 font-medium">
                {translateWeatherDescription(item.weather[0].description)}
              </div>
              <div className="flex gap-3 items-center">
                <motion.div
                  className="text-lg font-bold text-red-500 dark:text-red-400"
                  whileHover={{ scale: 1.1 }}
                >
                  {Math.round(item.main.temp_max)}°
                </motion.div>
                <motion.div
                  className="text-lg font-bold text-blue-500 dark:text-blue-400"
                  whileHover={{ scale: 1.1 }}
                >
                  {Math.round(item.main.temp_min)}°
                </motion.div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">
                {Math.round(item.pop * 100)}% pluie
              </div>
          </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
