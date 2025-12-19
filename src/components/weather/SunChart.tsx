'use client';

import { motion } from 'framer-motion';
import { Sunrise, Sunset } from 'lucide-react';
import type { WeatherData } from '@/types/weather';

interface SunChartProps {
  weather: WeatherData;
}

export function SunChart({ weather }: SunChartProps) {
  const sunrise = new Date(weather.sys.sunrise * 1000);
  const sunset = new Date(weather.sys.sunset * 1000);
  const now = new Date();

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate positions for the sun arc
  const sunriseMinutes = sunrise.getHours() * 60 + sunrise.getMinutes();
  const sunsetMinutes = sunset.getHours() * 60 + sunset.getMinutes();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const totalDaylightMinutes = sunsetMinutes - sunriseMinutes;
  const currentProgress = Math.max(0, Math.min(1, (nowMinutes - sunriseMinutes) / totalDaylightMinutes));

  // SVG path for the sun arc (semi-circle)
  const centerX = 50;
  const centerY = 60;
  const radius = 40;

  // Create arc path
  const startX = centerX - radius;
  const startY = centerY;
  const endX = centerX + radius;
  const endY = centerY;

  const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;

  // Calculate current sun position on arc
  const angle = Math.PI * currentProgress;
  const sunX = centerX - radius * Math.cos(angle);
  const sunY = centerY - radius * Math.sin(angle);

  const isDaytime = nowMinutes >= sunriseMinutes && nowMinutes <= sunsetMinutes;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white/70 text-sm font-medium">Lever & Coucher du soleil</h3>
      </div>

      <div className="relative">
        {/* SVG Sun Arc */}
        <svg
          viewBox="0 0 100 85"
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background arc */}
          <path
            d={arcPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Progress arc (only during daytime) */}
          {isDaytime && (
            <motion.path
              d={arcPath}
              fill="none"
              stroke="url(#sunGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${currentProgress * (Math.PI * radius)}, ${Math.PI * radius}`}
              initial={{ strokeDasharray: '0, 1000' }}
              animate={{ strokeDasharray: `${currentProgress * (Math.PI * radius)}, ${Math.PI * radius}` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          )}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Sunrise marker */}
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <circle cx={startX} cy={startY} r="2.5" fill="#f97316" />
            <foreignObject x={startX - 10} y={startY + 3} width="20" height="20">
              <Sunrise className="w-5 h-5 text-orange-400" />
            </foreignObject>
          </motion.g>

          {/* Sunset marker */}
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <circle cx={endX} cy={endY} r="2.5" fill="#dc2626" />
            <foreignObject x={endX - 10} y={endY + 3} width="20" height="20">
              <Sunset className="w-5 h-5 text-red-400" />
            </foreignObject>
          </motion.g>

          {/* Current sun position (only during daytime) */}
          {isDaytime && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              {/* Glow effect */}
              <circle
                cx={sunX}
                cy={sunY}
                r="4"
                fill="rgba(251, 191, 36, 0.3)"
              />
              {/* Sun dot */}
              <circle
                cx={sunX}
                cy={sunY}
                r="2.5"
                fill="#fbbf24"
                className="animate-pulse-glow"
              />
            </motion.g>
          )}
        </svg>

        {/* Time labels */}
        <div className="flex items-center justify-between mt-2 px-2">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Sunrise className="w-4 h-4 text-orange-400" />
            <div>
              <div className="text-white/50 text-xs">Lever</div>
              <div className="text-white text-sm font-medium">{formatTime(sunrise)}</div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-right">
              <div className="text-white/50 text-xs">Coucher</div>
              <div className="text-white text-sm font-medium">{formatTime(sunset)}</div>
            </div>
            <Sunset className="w-4 h-4 text-red-400" />
          </motion.div>
        </div>

        {/* Daylight duration */}
        <motion.div
          className="text-center mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-white/40 text-xs">Durée du jour</div>
          <div className="text-white/80 text-sm font-medium">
            {Math.floor(totalDaylightMinutes / 60)}h {totalDaylightMinutes % 60}min
          </div>
        </motion.div>
      </div>
    </div>
  );
}
