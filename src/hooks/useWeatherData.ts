'use client';

import { useState, useCallback } from 'react';
import type { WeatherData, ForecastData, AirQualityData } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function useWeatherData() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  const fetchWeatherByCity = useCallback(async (cityName: string) => {
    if (!API_KEY) {
      setError('API key is missing. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 401) {
          throw new Error('Clé API invalide ou non activée. Les nouvelles clés OpenWeatherMap peuvent prendre jusqu\'à 2 heures pour être activées.');
        } else if (weatherResponse.status === 404) {
          throw new Error('Ville non trouvée. Vérifiez l\'orthographe et réessayez.');
        } else {
          const errorData = await weatherResponse.json();
          throw new Error(errorData.message || 'Erreur lors de la récupération des données météo');
        }
      }

      const weatherData: WeatherData = await weatherResponse.json();
      setWeather(weatherData);
      setCity(weatherData.name);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
      );

      if (forecastResponse.ok) {
        const forecastData: ForecastData = await forecastResponse.json();
        setForecast(forecastData);
      }

      // Fetch air quality
      const airQualityResponse = await fetch(
        `${BASE_URL}/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`
      );

      if (airQualityResponse.ok) {
        const airQualityData: AirQualityData = await airQualityResponse.json();
        setAirQuality(airQualityData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    if (!API_KEY) {
      setError('API key is missing. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 401) {
          throw new Error('Clé API invalide ou non activée. Les nouvelles clés OpenWeatherMap peuvent prendre jusqu\'à 2 heures pour être activées. Testez votre clé sur : https://openweathermap.org/api');
        } else {
          const errorData = await weatherResponse.json();
          throw new Error(errorData.message || 'Erreur lors de la récupération des données météo');
        }
      }

      const weatherData: WeatherData = await weatherResponse.json();
      setWeather(weatherData);
      setCity(weatherData.name);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (forecastResponse.ok) {
        const forecastData: ForecastData = await forecastResponse.json();
        setForecast(forecastData);
      }

      // Fetch air quality
      const airQualityResponse = await fetch(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      if (airQualityResponse.ok) {
        const airQualityData: AirQualityData = await airQualityResponse.json();
        setAirQuality(airQualityData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
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
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  }, [fetchWeatherByCoords]);

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
  };
}
