'use client';

import { useState, useEffect } from 'react';
import { useWeatherData } from '@/hooks/useWeatherData';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { ForecastCard } from '@/components/weather/ForecastCard';
import { WeatherAnimation3D } from '@/components/weather/WeatherAnimation3D';
import { LoadingScreen } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { WeatherTheme } from '@/types/weather';

export default function Home() {
  const { weather, forecast, loading, error, fetchWeatherByCity, getCurrentLocation } = useWeatherData();
  const [searchCity, setSearchCity] = useState('');
  const [theme, setTheme] = useState<WeatherTheme>('clear');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Auto-detect location on first load
  useEffect(() => {
    if (isInitialLoad) {
      getCurrentLocation();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, getCurrentLocation]);

  // Update theme based on weather
  useEffect(() => {
    if (weather) {
      const weatherMain = weather.weather[0].main.toLowerCase();
      const currentHour = new Date().getHours();
      const isNight = currentHour < 6 || currentHour > 20;

      if (isNight) {
        setTheme('night');
      } else if (weatherMain.includes('rain')) {
        setTheme('rain');
      } else if (weatherMain.includes('drizzle')) {
        setTheme('drizzle');
      } else if (weatherMain.includes('thunder')) {
        setTheme('thunderstorm');
      } else if (weatherMain.includes('snow')) {
        setTheme('snow');
      } else if (weatherMain.includes('cloud')) {
        setTheme('clouds');
      } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
        setTheme('mist');
      } else {
        setTheme('clear');
      }
    }
  }, [weather]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeatherByCity(searchCity);
    }
  };

  // Theme colors - pastel palette
  const themeColors: Record<WeatherTheme, string> = {
    clear: 'from-sky-200 via-blue-100 to-indigo-100',
    clouds: 'from-slate-200 via-gray-100 to-zinc-100',
    rain: 'from-blue-300 via-slate-200 to-gray-200',
    drizzle: 'from-blue-200 via-cyan-100 to-teal-100',
    thunderstorm: 'from-purple-300 via-violet-200 to-indigo-200',
    snow: 'from-blue-50 via-white to-slate-50',
    mist: 'from-gray-100 via-slate-100 to-zinc-50',
    night: 'from-indigo-900 via-purple-800 to-slate-800',
  };

  return (
    <div className={`min-h-[calc(100vh-8rem)] bg-gradient-to-br ${themeColors[theme]} transition-all duration-1000 ease-in-out relative overflow-hidden`}>
      {/* 3D Weather Animation */}
      {weather && <WeatherAnimation3D theme={theme} />}

      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Search section */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center space-y-3 p-6 rounded-2xl glass-card">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-urbanist)' }}>
              Météo en temps réel
            </h1>
            <p className="text-gray-700 text-lg font-medium">
              Recherchez la météo de n&apos;importe quelle ville ou utilisez votre position
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Entrez le nom d'une ville..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="flex-1 glass-card border-white/50 focus:border-white/70 transition-all"
            />
            <Button type="submit" size="icon" className="shrink-0 shadow-lg">
              <Search className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={getCurrentLocation}
              className="shrink-0 glass shadow-lg"
            >
              <MapPin className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Error message */}
        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading state */}
        {loading && <LoadingScreen message="Chargement des données météo..." />}

        {/* Weather data */}
        {!loading && weather && (
          <div className="space-y-6">
            <WeatherCard weather={weather} />
            {forecast && <ForecastCard forecast={forecast} />}
          </div>
        )}

        {/* Initial state (no data yet) */}
        {!loading && !weather && !error && (
          <div className="max-w-2xl mx-auto text-center py-12 glass-card rounded-2xl shadow-xl">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-primary animate-bounce" />
            <h2 className="text-3xl font-bold mb-3 text-gray-800" style={{ fontFamily: 'var(--font-urbanist)' }}>Bienvenue sur AuroWeather</h2>
            <p className="text-gray-600 text-lg">
              Recherchez une ville ou autorisez la géolocalisation pour voir la météo
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
