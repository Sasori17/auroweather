import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { WeatherData } from '@/types/weather';
import { Droplets, Wind, Eye, Sunrise, Sunset, Gauge } from 'lucide-react';
import { translateWeatherDescription } from '@/lib/weatherTranslations';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="w-full glass-card border-white/50 shadow-xl animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-urbanist)' }}>{weather.name}, {weather.sys.country}</span>
          <Badge variant="secondary" className="text-base px-4 py-2 glass">
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
            <div className="relative w-32 h-32">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</div>
              <div className="text-xl text-gray-700 capitalize mt-2 font-medium">
                {translateWeatherDescription(weather.weather[0].description)}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Ressenti: {Math.round(weather.main.feels_like)}°C
              </div>
            </div>
          </div>

          {/* Additional weather details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl glass hover:scale-105 transition-transform duration-300">
              <Droplets className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-sm text-gray-600">Humidité</div>
                <div className="text-xl font-bold text-gray-800">{weather.main.humidity}%</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl glass hover:scale-105 transition-transform duration-300">
              <Wind className="w-8 h-8 text-gray-400" />
              <div>
                <div className="text-sm text-gray-600">Vent</div>
                <div className="text-xl font-bold text-gray-800">{Math.round(weather.wind.speed * 3.6)} km/h</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl glass hover:scale-105 transition-transform duration-300">
              <Gauge className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-sm text-gray-600">Pression</div>
                <div className="text-xl font-bold text-gray-800">{weather.main.pressure} hPa</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl glass hover:scale-105 transition-transform duration-300">
              <Eye className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-sm text-gray-600">Visibilité</div>
                <div className="text-xl font-bold text-gray-800">{(weather.visibility / 1000).toFixed(1)} km</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl glass hover:scale-105 transition-transform duration-300">
              <Sunrise className="w-8 h-8 text-orange-400" />
              <div>
                <div className="text-sm text-gray-600">Lever</div>
                <div className="text-xl font-bold text-gray-800">{formatTime(weather.sys.sunrise)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl glass hover:scale-105 transition-transform duration-300">
              <Sunset className="w-8 h-8 text-red-400" />
              <div>
                <div className="text-sm text-gray-600">Coucher</div>
                <div className="text-xl font-bold text-gray-800">{formatTime(weather.sys.sunset)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Min/Max temperature */}
        <div className="mt-6 flex justify-center gap-8">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Min</div>
            <div className="text-2xl font-semibold text-blue-500">
              {Math.round(weather.main.temp_min)}°C
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Max</div>
            <div className="text-2xl font-semibold text-red-500">
              {Math.round(weather.main.temp_max)}°C
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
