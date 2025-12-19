'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sunset } from 'lucide-react';

interface SunriseSunsetProps {
  sunrise: number;
  sunset: number;
  timezone?: number;
}

export function SunriseSunset({ sunrise, sunset, timezone = 0 }: SunriseSunsetProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sunPosition = useMemo(() => {
    const now = Date.now() / 1000;
    const sunriseTime = sunrise;
    const sunsetTime = sunset;

    if (now < sunriseTime) return 0;
    if (now > sunsetTime) return 100;

    const dayDuration = sunsetTime - sunriseTime;
    const elapsed = now - sunriseTime;
    return Math.min(100, Math.max(0, (elapsed / dayDuration) * 100));
  }, [sunrise, sunset]);

  const isDay = sunPosition > 0 && sunPosition < 100;

  // Calculate sun position on arc
  const getSunCoordinates = (percentage: number) => {
    const angle = Math.PI * (1 - percentage / 100);
    const x = 50 + 40 * Math.cos(angle);
    const y = 45 - 35 * Math.sin(angle);
    return { x, y };
  };

  const sunCoords = getSunCoordinates(sunPosition);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="modern-card rounded-2xl p-4">
        <h4 className="text-white/70 text-sm font-medium mb-4">Sunrise & Sunset</h4>

      {/* Arc visualization */}
      <div className="relative">
        <svg viewBox="0 0 100 50" className="w-full h-24">
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.8)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 1)" />
              <stop offset="100%" stopColor="rgba(249, 115, 22, 0.8)" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.8)" />
              <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
            </radialGradient>
          </defs>

          {/* Dashed arc background */}
          <path
            d="M 10 45 A 40 35 0 0 1 90 45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="4 2"
          />

          {/* Progress arc */}
          {isDay && (
            <motion.path
              d="M 10 45 A 40 35 0 0 1 90 45"
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: sunPosition / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          )}

          {/* Horizon line */}
          <line
            x1="5"
            y1="45"
            x2="95"
            y2="45"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />

          {/* Sun glow */}
          {isDay && (
            <motion.circle
              cx={sunCoords.x}
              cy={sunCoords.y}
              r="8"
              fill="url(#sunGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
          )}

          {/* Sun */}
          {isDay && (
            <motion.circle
              cx={sunCoords.x}
              cy={sunCoords.y}
              r="3"
              fill="#fbbf24"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
          )}

          {/* Sunrise icon position marker */}
          <circle cx="10" cy="45" r="1.5" fill="rgba(255,255,255,0.3)" />

          {/* Sunset icon position marker */}
          <circle cx="90" cy="45" r="1.5" fill="rgba(255,255,255,0.3)" />
        </svg>

        {/* Sunrise/Sunset times */}
        <div className="flex justify-between mt-2">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Sunrise className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-white/50 text-xs">Sunrise</div>
              <div className="text-white text-sm font-medium">{formatTime(sunrise)}</div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-right">
              <div className="text-white/50 text-xs">Sunset</div>
              <div className="text-white text-sm font-medium">{formatTime(sunset)}</div>
            </div>
            <Sunset className="w-4 h-4 text-orange-500" />
          </motion.div>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
