import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { translateWeatherDescription } from '@/lib/weatherTranslations';
import type { ForecastData } from '@/types/weather';

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

  // Show 5-day forecast
  const daysToShow = Math.min(availableDays, 5);
  const displayArray = dailyForecastArray.slice(0, daysToShow);

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

  return (
    <Card className="w-full glass-card border-white/50 shadow-xl animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">
          <span className="font-bold text-gray-800" style={{ fontFamily: 'var(--font-urbanist)' }}>
            Prévisions à {daysToShow} jour{daysToShow > 1 ? 's' : ''}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {displayArray.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded-xl glass hover:scale-105 transition-all duration-300"
            >
              <div className="text-sm font-bold text-center mb-2 text-gray-800">
                {formatDay(item.dt)}
              </div>
              <div className="relative w-20 h-20">
                <Image
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={translateWeatherDescription(item.weather[0].description)}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-sm text-gray-600 capitalize text-center mb-2">
                {translateWeatherDescription(item.weather[0].description)}
              </div>
              <div className="flex gap-3 items-center">
                <div className="text-lg font-bold text-red-400">
                  {Math.round(item.main.temp_max)}°
                </div>
                <div className="text-lg font-bold text-blue-400">
                  {Math.round(item.main.temp_min)}°
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 font-medium">
                {Math.round(item.pop * 100)}% pluie
              </div>
          </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
