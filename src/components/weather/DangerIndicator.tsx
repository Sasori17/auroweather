'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Droplets, AlertTriangle } from 'lucide-react';

interface DangerIndicatorProps {
  humidity: number;
  windSpeed: number;
  visibility: number;
  weatherMain: string;
}

interface RiskLevel {
  level: string;
  color: string;
  percentage: number;
  description: string;
}

export function DangerIndicator({ humidity, windSpeed, visibility, weatherMain }: DangerIndicatorProps) {
  const riskAssessment = useMemo((): RiskLevel => {
    let riskScore = 0;

    // Humidity risk (too high or too low)
    if (humidity > 85) riskScore += 20;
    else if (humidity > 70) riskScore += 10;
    else if (humidity < 20) riskScore += 15;

    // Wind speed risk
    const windKmh = windSpeed * 3.6;
    if (windKmh > 60) riskScore += 30;
    else if (windKmh > 40) riskScore += 20;
    else if (windKmh > 25) riskScore += 10;

    // Visibility risk
    const visKm = visibility / 1000;
    if (visKm < 1) riskScore += 30;
    else if (visKm < 2) riskScore += 20;
    else if (visKm < 5) riskScore += 10;

    // Weather condition risk
    const condition = weatherMain.toLowerCase();
    if (condition.includes('thunder')) riskScore += 35;
    else if (condition.includes('snow')) riskScore += 25;
    else if (condition.includes('rain')) riskScore += 15;
    else if (condition.includes('fog') || condition.includes('mist')) riskScore += 20;

    // Normalize to 0-100
    const normalizedScore = Math.min(100, riskScore);

    if (normalizedScore <= 20) {
      return {
        level: 'Safe',
        color: '#22c55e',
        percentage: normalizedScore,
        description: 'Conditions are favorable',
      };
    } else if (normalizedScore <= 45) {
      return {
        level: 'Moderate',
        color: '#eab308',
        percentage: normalizedScore,
        description: 'Exercise normal caution',
      };
    } else if (normalizedScore <= 70) {
      return {
        level: 'Elevated',
        color: '#f97316',
        percentage: normalizedScore,
        description: 'Be aware of changing conditions',
      };
    } else {
      return {
        level: 'Dangerous',
        color: '#ef4444',
        percentage: normalizedScore,
        description: 'Take precautionary measures',
      };
    }
  }, [humidity, windSpeed, visibility, weatherMain]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="modern-card rounded-2xl p-4">
        {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm font-medium">Status</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/50 text-xs">
          <span>{riskAssessment.percentage.toFixed(1)}%</span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <AlertTriangle className="w-3 h-3" />
          </motion.div>
        </div>
      </div>

      {/* Risk gauge */}
      <div className="relative mb-4">
        <svg viewBox="0 0 100 60" className="w-full h-16">
          {/* Background arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Gradient arc background */}
          <defs>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="33%" stopColor="#eab308" />
              <stop offset="66%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Progress arc */}
          <motion.path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="url(#riskGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: riskAssessment.percentage / 100 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Needle indicator */}
          <motion.g
            initial={{ rotate: -90 }}
            animate={{ rotate: -90 + (riskAssessment.percentage / 100) * 180 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ transformOrigin: '50px 50px' }}
          >
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="50" cy="50" r="4" fill="white" />
          </motion.g>
        </svg>

        {/* Level label */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-semibold"
          style={{ backgroundColor: riskAssessment.color }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          {riskAssessment.level}
        </motion.div>
      </div>

      {/* Risk scale legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mt-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-white/60">Safe</span>
          <span className="text-white/40">0.00% - 0.9%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="text-white/60">Moderate</span>
          <span className="text-white/40">12% - 38%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-white/60">Elevated</span>
          <span className="text-white/40">0.9% - 11%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-white/60">Dangerous</span>
          <span className="text-white/40">39% - 90%</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-white/50 text-xs mt-3 text-center">
        {riskAssessment.description}
      </p>
      </div>
    </motion.div>
  );
}
