'use client';

import { useState, useCallback } from 'react';
import type { WeatherData, ForecastData, AirQualityData } from '@/types/weather';
import { checkRateLimit, incrementCallCount } from '@/lib/rateLimiter';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function useWeatherData(locale: string = 'fr') {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  // Use 'fr' for French API descriptions; 'en' otherwise (API default is English)
  const apiLang = locale === 'fr' ? 'fr' : 'en';

  const getErrorMessages = useCallback(() => {
    if (locale === 'en') {
      return {
        rateLimit: 'Daily API call limit reached (1000/day). Try again tomorrow at midnight.',
        apiKey: 'Invalid or inactive API key. New OpenWeatherMap keys can take up to 2 hours to activate.',
        apiKeyCoords: 'Invalid or inactive API key. New OpenWeatherMap keys can take up to 2 hours to activate. Test your key at: https://openweathermap.org/api',
        cityNotFound: 'City not found. Check the spelling and try again.',
        generic: 'Error retrieving weather data',
        geolocation: 'Geolocation is not supported by your browser',
        location: 'Unable to retrieve your location',
      };
    }
    return {
      rateLimit: "Limite quotidienne d'appels API atteinte (1000/jour). Réessayez demain à minuit.",
      apiKey: "Clé API invalide ou non activée. Les nouvelles clés OpenWeatherMap peuvent prendre jusqu'à 2 heures pour être activées.",
      apiKeyCoords: "Clé API invalide ou non activée. Les nouvelles clés OpenWeatherMap peuvent prendre jusqu'à 2 heures pour être activées. Testez votre clé sur : https://openweathermap.org/api",
      cityNotFound: "Ville non trouvée. Vérifiez l'orthographe et réessayez.",
      generic: 'Erreur lors de la récupération des données météo',
      geolocation: "La géolocalisation n'est pas supportée par votre navigateur",
      location: 'Impossible de récupérer votre position',
    };
  }, [locale]);

  const fetchWeatherByCity = useCallback(async (cityName: string) => {
    if (!API_KEY) {
      setError('API key is missing. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.');
      return;
    }

    const msgs = getErrorMessages();

    // Check rate limit before making API calls
    if (!checkRateLimit(3)) {
      setError(msgs.rateLimit);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&units=metric&lang=${apiLang}&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 401) {
          throw new Error(msgs.apiKey);
        } else if (weatherResponse.status === 404) {
          throw new Error(msgs.cityNotFound);
        } else {
          const errorData = await weatherResponse.json();
          throw new Error(errorData.message || msgs.generic);
        }
      }

      const weatherData: WeatherData = await weatherResponse.json();
      setWeather(weatherData);
      setCity(weatherData.name);
      incrementCallCount(1);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&units=metric&lang=${apiLang}&appid=${API_KEY}`
      );

      if (forecastResponse.ok) {
        const forecastData: ForecastData = await forecastResponse.json();
        setForecast(forecastData);
        incrementCallCount(1);
      }

      // Fetch air quality
      const airQualityResponse = await fetch(
        `${BASE_URL}/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`
      );

      if (airQualityResponse.ok) {
        const airQualityData: AirQualityData = await airQualityResponse.json();
        setAirQuality(airQualityData);
        incrementCallCount(1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  }, [apiLang, getErrorMessages]);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    if (!API_KEY) {
      setError('API key is missing. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.');
      return;
    }

    const msgs = getErrorMessages();

    // Check rate limit before making API calls
    if (!checkRateLimit(3)) {
      setError(msgs.rateLimit);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&lang=${apiLang}&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 401) {
          throw new Error(msgs.apiKeyCoords);
        } else {
          const errorData = await weatherResponse.json();
          throw new Error(errorData.message || msgs.generic);
        }
      }

      const weatherData: WeatherData = await weatherResponse.json();
      setWeather(weatherData);
      setCity(weatherData.name);
      incrementCallCount(1);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${apiLang}&appid=${API_KEY}`
      );

      if (forecastResponse.ok) {
        const forecastData: ForecastData = await forecastResponse.json();
        setForecast(forecastData);
        incrementCallCount(1);
      }

      // Fetch air quality
      const airQualityResponse = await fetch(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      if (airQualityResponse.ok) {
        const airQualityData: AirQualityData = await airQualityResponse.json();
        setAirQuality(airQualityData);
        incrementCallCount(1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  }, [apiLang, getErrorMessages]);

  const getCurrentLocation = useCallback(() => {
    const msgs = getErrorMessages();

    if (!navigator.geolocation) {
      setError(msgs.geolocation);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        setError(msgs.location);
        setLoading(false);
      }
    );
  }, [fetchWeatherByCoords, getErrorMessages]);

  const clearWeather = useCallback(() => {
    setWeather(null);
    setForecast(null);
    setAirQuality(null);
    setCity('');
    setError(null);
  }, []);

  return {
    weather,
    forecast,
    airQuality,
    loading,
    error,
    city,
    userLocation,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    getCurrentLocation,
    clearWeather,
  };
}
