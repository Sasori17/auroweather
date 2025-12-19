'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';

interface CompassDirectionProps {
  windDeg: number;
  windSpeed: number;
}

// Get compass direction from degrees
function getCompassDirection(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}

// Get full compass direction name in French
function getFullCompassDirection(deg: number): string {
  const directions = [
    'Nord', 'Nord-Nord-Est', 'Nord-Est', 'Est-Nord-Est',
    'Est', 'Est-Sud-Est', 'Sud-Est', 'Sud-Sud-Est',
    'Sud', 'Sud-Sud-Ouest', 'Sud-Ouest', 'Ouest-Sud-Ouest',
    'Ouest', 'Ouest-Nord-Ouest', 'Nord-Ouest', 'Nord-Nord-Ouest'
  ];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}

export function CompassDirection({ windDeg, windSpeed }: CompassDirectionProps) {
  const compassDirection = getCompassDirection(windDeg);
  const fullCompassDirection = getFullCompassDirection(windDeg);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: 'spring' }}
      className="flex flex-col items-center gap-4 mt-6 pt-4 border-t border-white/10"
    >
      {/* Compass Circle - Larger and centered */}
      <div className="relative w-24 h-24">
        {/* Compass Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/30 border-2 border-blue-400/40 shadow-lg shadow-blue-500/20" />

        {/* Cardinal Directions - All 8 directions */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* North */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-xs text-blue-400 font-bold">N</span>

            {/* North-East */}
            <span className="absolute top-[7%] right-[7%] text-[10px] text-white/40 font-semibold">NE</span>

            {/* East */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 text-xs text-white/40 font-bold">E</span>

            {/* South-East */}
            <span className="absolute bottom-[7%] right-[7%] text-[10px] text-white/40 font-semibold">SE</span>

            {/* South */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-xs text-white/40 font-bold">S</span>

            {/* South-West */}
            <span className="absolute bottom-[7%] left-[7%] text-[10px] text-white/40 font-semibold">SO</span>

            {/* West */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 text-xs text-white/40 font-bold">O</span>

            {/* North-West */}
            <span className="absolute top-[7%] left-[7%] text-[10px] text-white/40 font-semibold">NO</span>
          </div>
        </div>

        {/* Rotating Arrow pointing to wind direction */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: windDeg }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <Navigation className="w-10 h-10 text-blue-400 fill-blue-400 drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Direction Info - Centered */}
      <div className="text-center">
        <div className="text-white/50 text-xs mb-1">Boussole du vent</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-white text-lg font-semibold">{compassDirection}</span>
            <span className="text-blue-400 text-sm">({Math.round(windDeg)}°)</span>
          </div>
          <div className="text-white/60 text-sm">{fullCompassDirection}</div>
        </div>
        <div className="text-white/40 text-xs mt-1">
          Vitesse: {Math.round(windSpeed * 3.6)} km/h
        </div>
      </div>
    </motion.div>
  );
}
