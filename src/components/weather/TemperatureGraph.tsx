'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Snowflake, Sun, CloudLightning } from 'lucide-react';
import type { ForecastData, WeatherData } from '@/types/weather';

interface TemperatureGraphProps {
  forecast: ForecastData;
  currentWeather?: WeatherData;
}

function getWeatherIcon(main: string, icon: string, size: number = 20) {
  const condition = main.toLowerCase();
  const className = size === 24 ? 'w-6 h-6' : size === 20 ? 'w-5 h-5' : 'w-6 h-6';

  if (condition.includes('clear')) {
    return <Sun className={`${className} text-amber-400 drop-shadow-md`} />;
  }
  if (condition.includes('cloud')) {
    return <Cloud className={`${className} text-slate-200 drop-shadow-md`} />;
  }
  if (condition.includes('rain') || condition.includes('drizzle')) {
    return <CloudRain className={`${className} text-blue-300 drop-shadow-md`} />;
  }
  if (condition.includes('snow')) {
    return <Snowflake className={`${className} text-blue-200 drop-shadow-md`} />;
  }
  if (condition.includes('thunder')) {
    return <CloudLightning className={`${className} text-amber-300 drop-shadow-md`} />;
  }
  return <Cloud className={`${className} text-slate-200 drop-shadow-md`} />;
}

export function TemperatureGraph({ forecast, currentWeather }: TemperatureGraphProps) {
  const dailyData = useMemo(() => {
    // Utiliser le timezone de la ville pour afficher l'heure locale
    const timezoneOffsetSeconds = forecast.city.timezone;

    const forecastData = forecast.list.slice(0, 8).map((item) => {
      // Calculer l'heure locale en utilisant le timezone de la ville
      const utcDate = new Date(item.dt * 1000);
      const localTime = new Date(utcDate.getTime() + timezoneOffsetSeconds * 1000);
      const hour = localTime.getUTCHours();
      const formattedTime = `${hour.toString().padStart(2, '0')}:00`;

      return {
        day: formattedTime,
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        main: item.weather[0].main,
        timestamp: item.dt,
        isLive: false,
      };
    });

    // Ajouter le point "Maintenant" au début si currentWeather est disponible
    if (currentWeather) {
      const now = new Date();
      const localTime = new Date(now.getTime() + timezoneOffsetSeconds * 1000);
      const hour = localTime.getUTCHours();
      const minute = localTime.getUTCMinutes();
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      const livePoint = {
        day: formattedTime,
        temp: Math.round(currentWeather.main.temp),
        icon: currentWeather.weather[0].icon,
        main: currentWeather.weather[0].main,
        timestamp: Math.floor(Date.now() / 1000),
        isLive: true,
      };

      // Insérer le point live au début et limiter à 8 points au total
      return [livePoint, ...forecastData.slice(0, 7)];
    }

    return forecastData;
  }, [forecast, currentWeather]);

  // Padding horizontal en pourcentage pour ne pas coller aux bords
  const paddingX = 3;

  const graphData = useMemo(() => {
    if (dailyData.length === 0) return { path: '', areaPath: '', points: [], minTemp: 0, maxTemp: 0 };

    const temps = dailyData.map(d => d.temp);
    const minTemp = Math.min(...temps) - 3;
    const maxTemp = Math.max(...temps) + 3;
    const tempRange = maxTemp - minTemp;

    const height = 100;
    const paddingY = 20; // Plus de padding vertical pour voir les températures

    const points = dailyData.map((data, index) => {
      // X en pourcentage avec padding (de paddingX% à (100-paddingX)%)
      const xPercent = paddingX + (index / (dailyData.length - 1)) * (100 - paddingX * 2);
      const y = paddingY + ((maxTemp - data.temp) / tempRange) * (height - paddingY * 2);
      return { xPercent, y, ...data };
    });

    // Créer le path avec des pourcentages
    let path = `M ${points[0].xPercent} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.xPercent + next.xPercent) / 2;
      path += ` C ${midX} ${current.y}, ${midX} ${next.y}, ${next.xPercent} ${next.y}`;
    }

    // Path pour le remplissage - s'arrête à 85% de la hauteur (pas tout en bas)
    const areaPath = `${path} L ${points[points.length - 1].xPercent} 85 L ${points[0].xPercent} 85 Z`;

    return { path, areaPath, points, minTemp, maxTemp };
  }, [dailyData, paddingX]);

  // Calculer dynamiquement l'index actif en fonction de l'heure actuelle
  const activeIndex = useMemo(() => {
    // Si le premier point est le point live, il est toujours actif
    if (dailyData.length > 0 && dailyData[0].isLive) {
      return 0;
    }

    const nowUtc = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes

    // Trouver le point le plus proche de l'heure actuelle
    let closestIndex = 0;
    let minDiff = Math.abs(dailyData[0].timestamp - nowUtc);

    for (let i = 1; i < dailyData.length; i++) {
      const diff = Math.abs(dailyData[i].timestamp - nowUtc);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    return closestIndex;
  }, [dailyData]);

  return (
    <div className="w-full px-2">
      {/* Container principal avec position relative */}
      <div className="relative h-36 mb-2">
        {/* SVG pour la courbe uniquement */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Fill area */}
          <motion.path
            d={graphData.areaPath}
            fill="url(#tempGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Curve line */}
          <motion.path
            d={graphData.path}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Ligne verticale active - limitée à la zone du graphe */}
          {graphData.points[activeIndex] && (
            <motion.line
              x1={graphData.points[activeIndex].xPercent}
              x2={graphData.points[activeIndex].xPercent}
              y1={graphData.points[activeIndex].y}
              y2="85"
              stroke={dailyData[activeIndex]?.isLive ? "rgba(250,204,21,0.6)" : "rgba(255,255,255,0.25)"}
              strokeWidth={dailyData[activeIndex]?.isLive ? "0.5" : "0.3"}
              strokeDasharray="2 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            />
          )}
        </svg>

        {/* Points, températures et icônes en HTML */}
        {graphData.points.map((point, index) => {
          const isLivePoint = dailyData[index]?.isLive;

          return (
            <motion.div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${point.xPercent}%`,
                top: `${point.y}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {/* Point */}
              {index === activeIndex ? (
                <div className="relative flex items-center justify-center">
                  {isLivePoint ? (
                    <div className="w-3 h-3 bg-yellow-400 rounded-full relative" />
                  ) : (
                    <>
                      <div className="absolute w-6 h-6 bg-amber-300/20 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-amber-300 rounded-full relative" />
                    </>
                  )}
                </div>
              ) : (
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              )}

              {/* Température et icône au-dessus */}
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 whitespace-nowrap">
                <span className={`text-sm font-semibold drop-shadow-md ${isLivePoint ? 'text-yellow-300' : 'text-white'}`}>
                  {point.temp}°
                </span>
                {getWeatherIcon(point.main, point.icon, 20)}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Heures en dessous - avec le même padding que le graphe */}
      <div
        className="flex justify-between"
        style={{
          paddingLeft: `${paddingX}%`,
          paddingRight: `${paddingX}%`
        }}
      >
        {dailyData.map((data, index) => (
          <motion.div
            key={data.day + index}
            className={`text-xs text-center ${data.isLive ? 'text-yellow-300 font-semibold' : 'text-white/40'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {data.isLive ? 'Maintenant' : data.day}
          </motion.div>
        ))}
      </div>
    </div>
  );
}