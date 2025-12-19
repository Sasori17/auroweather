'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface GlobeProps {
  latitude?: number;
  longitude?: number;
  className?: string;
}

// Convert lat/lon to 2D coordinates on a flat projection
function latLonToXY(lat: number, lon: number, size: number) {
  // Equirectangular projection (simple lat/lon to x/y)
  // The x coordinate is calculated from longitude
  const x = ((lon + 180) / 360) * size;
  // The y coordinate is calculated from latitude
  const y = ((90 - lat) / 180) * size;
  return { x, y };
}

export function Globe3D({ latitude = 48.8566, longitude = 2.3522, className = '' }: GlobeProps) {
  const position = useMemo(() => {
    // Calculate position on a 192x192 circle (w-48 = 12rem = 192px)
    return latLonToXY(latitude, longitude, 192);
  }, [latitude, longitude]);

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="relative w-48 h-48">
        {/* Globe background with gradient */}
        <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-amber-600/40 via-orange-700/50 to-slate-800/60 backdrop-blur-sm">
          {/* World map image overlay */}
          <div
            className="absolute inset-0 w-full h-full opacity-70"
            style={{
              backgroundImage: `url('/texture/ChatGPT Image 15 déc. 2025, 14_02_07.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'invert(1) brightness(1.2)',
              mixBlendMode: 'overlay'
            }}
          />

          {/* Location markers */}
          <div className="absolute inset-0">
            {/* Current location marker with smooth animation */}
            <motion.div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              animate={{
                left: `${position.x}px`,
                top: `${position.y}px`,
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8
              }}
            >
              {/* Pulsing ring animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white/30 rounded-full animate-ping" />
              </div>
              {/* Main marker dot */}
              <motion.div
                className="relative w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Subtle border */}
        <div className="absolute inset-0 rounded-full border border-white/10" />
      </div>
    </div>
  );
}
