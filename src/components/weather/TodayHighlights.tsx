'use client';

import { motion } from 'framer-motion';
import { Wind, Droplets, Sun, Eye, Gauge, Thermometer } from 'lucide-react';
import type { WeatherData } from '@/types/weather';

interface TodayHighlightsProps {
  weather: WeatherData;
}

interface HighlightCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  delay?: number;
}

function HighlightCard({ icon, label, value, subValue, delay = 0 }: HighlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="modern-card rounded-2xl p-4 hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="text-white/70">{icon}</div>
        <span className="text-white/70 text-sm font-medium">{label}</span>
      </div>
      <div className="text-white text-2xl font-bold">{value}</div>
      {subValue && (
        <div className="text-white/50 text-xs mt-1">{subValue}</div>
      )}
    </motion.div>
  );
}

function UVIndexIndicator({ value }: { value: number }) {
  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { label: 'Low', color: 'bg-green-500', position: (uv / 11) * 100 };
    if (uv <= 5) return { label: 'Moderate', color: 'bg-yellow-500', position: (uv / 11) * 100 };
    if (uv <= 7) return { label: 'High', color: 'bg-orange-500', position: (uv / 11) * 100 };
    if (uv <= 10) return { label: 'Very High', color: 'bg-red-500', position: (uv / 11) * 100 };
    return { label: 'Extreme', color: 'bg-purple-500', position: 100 };
  };

  const uvInfo = getUVLevel(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="modern-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sun className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm font-medium">UV Index</span>
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-white text-3xl font-bold">{value.toFixed(1)}</span>
          <span className="text-white/70 text-sm">UV</span>
        </div>
        <div className="text-white/80 text-sm mb-3">{uvInfo.label} UV</div>

        {/* UV Scale */}
        <div className="relative h-2 rounded-full overflow-hidden bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-purple-500">
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: `${uvInfo.position}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
          />
        </div>
      </div>
    </motion.div>
  );
}

function HumidityIndicator({ humidity }: { humidity: number }) {
  const getHumidityStatus = (h: number) => {
    if (h < 30) return 'Dry';
    if (h < 60) return 'Comfortable';
    if (h < 80) return 'Humid';
    return 'Very Humid';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <div className="modern-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Droplets className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm font-medium">Humidity</span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-white text-3xl font-bold">{humidity}</span>
          <span className="text-white/70 text-lg">%</span>
        </div>
        <div className="text-white/60 text-sm">{getHumidityStatus(humidity)}</div>

        {/* Humidity bar */}
        <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${humidity}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

function WindIndicator({ speed, deg }: { speed: number; deg: number }) {
  const getWindDirection = (degree: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  const speedKmh = Math.round(speed * 3.6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0, duration: 0.5 }}
    >
      <div className="modern-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Wind className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm font-medium">Wind Status</span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-white text-3xl font-bold">{speedKmh}</span>
          <span className="text-white/70 text-sm">km/h</span>
        </div>

        {/* Wind direction compass */}
        <div className="flex items-center gap-3 mt-3">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border border-white/20" />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: deg }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-white/80" />
            </motion.div>
          </div>
          <span className="text-white/70 text-sm">{getWindDirection(deg)}</span>
        </div>
      </div>
    </motion.div>
  );
}

function VisibilityCard({ visibility }: { visibility: number }) {
  const visibilityKm = (visibility / 1000).toFixed(1);

  const getVisibilityStatus = (v: number) => {
    if (v >= 10) return 'Excellent';
    if (v >= 5) return 'Good';
    if (v >= 2) return 'Moderate';
    return 'Poor';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="modern-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm font-medium">Visibility</span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-white text-3xl font-bold">{visibilityKm}</span>
          <span className="text-white/70 text-sm">km</span>
        </div>
        <div className="text-white/60 text-sm">{getVisibilityStatus(visibility / 1000)}</div>
      </div>
    </motion.div>
  );
}

function PressureCard({ pressure }: { pressure: number }) {
  const getPressureStatus = (p: number) => {
    if (p < 1000) return 'Low';
    if (p < 1020) return 'Normal';
    return 'High';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="modern-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Gauge className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm font-medium">Pressure</span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-white text-3xl font-bold">{pressure}</span>
          <span className="text-white/70 text-sm">hPa</span>
        </div>
        <div className="text-white/60 text-sm">{getPressureStatus(pressure)}</div>
      </div>
    </motion.div>
  );
}

function FeelsLikeCard({ temp, feelsLike }: { temp: number; feelsLike: number }) {
  const diff = Math.round(feelsLike - temp);
  const diffText = diff > 0 ? `+${diff}°` : diff < 0 ? `${diff}°` : 'Same';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="modern-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Thermometer className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm font-medium">Feels Like</span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-white text-3xl font-bold">{Math.round(feelsLike)}</span>
          <span className="text-white/70 text-lg">°C</span>
        </div>
        <div className="text-white/60 text-sm">
          {diffText} from actual
        </div>
      </div>
    </motion.div>
  );
}

export function TodayHighlights({ weather }: TodayHighlightsProps) {
  // Estimate UV index based on time and weather
  const estimateUV = () => {
    const hour = new Date().getHours();
    const isDay = weather.weather[0].icon.includes('d');
    const cloudCover = weather.clouds?.all || 0;

    if (!isDay || hour < 6 || hour > 20) return 0;

    let baseUV = 0;
    if (hour >= 10 && hour <= 14) baseUV = 8;
    else if (hour >= 8 && hour <= 16) baseUV = 5;
    else baseUV = 2;

    // Reduce by cloud cover
    return Math.max(0, baseUV * (1 - cloudCover / 150));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-white/90 text-lg font-semibold mb-4">Today Highlight</h3>
      <div className="grid grid-cols-2 gap-3">
        <WindIndicator speed={weather.wind.speed} deg={weather.wind.deg} />
        <HumidityIndicator humidity={weather.main.humidity} />
        <UVIndexIndicator value={estimateUV()} />
        <VisibilityCard visibility={weather.visibility} />
        <PressureCard pressure={weather.main.pressure} />
        <FeelsLikeCard temp={weather.main.temp} feelsLike={weather.main.feels_like} />
      </div>
    </div>
  );
}
