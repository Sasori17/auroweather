'use client';

import { useState, useCallback, useEffect } from 'react';
import type { CitySuggestion, FavoriteCity, FavoritesData } from '@/types/weather';

const STORAGE_KEY = 'auroWeatherFavorites';
const MAX_FAVORITES = 10;

// Check if we're in a browser environment
const isClient = typeof window !== 'undefined';

/**
 * Initialize fresh favorites data
 */
function initializeFavorites(): FavoritesData {
  const data: FavoritesData = {
    cities: [],
    maxFavorites: MAX_FAVORITES,
  };
  saveFavorites(data);
  return data;
}

/**
 * Load favorites from localStorage
 */
function loadFavorites(): FavoritesData {
  if (!isClient) {
    return { cities: [], maxFavorites: MAX_FAVORITES };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return initializeFavorites();
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading favorites:', error);
    return initializeFavorites();
  }
}

/**
 * Save favorites to localStorage
 */
function saveFavorites(data: FavoritesData): void {
  if (!isClient) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving favorites:', error);
    // Handle quota exceeded
    if ((error as Error).name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Unable to save favorites.');
    }
  }
}

/**
 * Generate unique ID for a city
 */
function generateCityId(city: CitySuggestion): string {
  return `${city.name}-${city.country}-${city.lat.toFixed(2)}-${city.lon.toFixed(2)}`;
}

/**
 * Convert CitySuggestion to FavoriteCity
 */
function citySuggestionToFavorite(city: CitySuggestion): FavoriteCity {
  return {
    id: generateCityId(city),
    name: city.name,
    country: city.country,
    state: city.state,
    lat: city.lat,
    lon: city.lon,
    addedAt: Date.now(),
  };
}

/**
 * Custom hook for managing favorite cities
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [maxReached, setMaxReached] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (isClient) {
      const data = loadFavorites();
      setFavorites(data.cities);
      setMaxReached(data.cities.length >= MAX_FAVORITES);
    }
  }, []);

  /**
   * Check if a city is in favorites
   */
  const isFavorite = useCallback((city: CitySuggestion): boolean => {
    const id = generateCityId(city);
    return favorites.some(fav => fav.id === id);
  }, [favorites]);

  /**
   * Add a city to favorites
   */
  const addFavorite = useCallback((city: CitySuggestion): void => {
    if (maxReached) {
      console.warn('Maximum favorites limit reached (10/10)');
      return;
    }

    if (isFavorite(city)) {
      console.warn('City already in favorites');
      return;
    }

    const newFavorite = citySuggestionToFavorite(city);
    const updated = [...favorites, newFavorite];
    setFavorites(updated);
    saveFavorites({ cities: updated, maxFavorites: MAX_FAVORITES });
    setMaxReached(updated.length >= MAX_FAVORITES);
  }, [favorites, maxReached, isFavorite]);

  /**
   * Remove a city from favorites
   */
  const removeFavorite = useCallback((id: string): void => {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    saveFavorites({ cities: updated, maxFavorites: MAX_FAVORITES });
    setMaxReached(false);
  }, [favorites]);

  /**
   * Toggle a city in/out of favorites
   */
  const toggleFavorite = useCallback((city: CitySuggestion): void => {
    if (isFavorite(city)) {
      removeFavorite(generateCityId(city));
    } else {
      addFavorite(city);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  /**
   * Clear all favorites
   */
  const clearAllFavorites = useCallback((): void => {
    setFavorites([]);
    saveFavorites({ cities: [], maxFavorites: MAX_FAVORITES });
    setMaxReached(false);
  }, []);

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearAllFavorites,
    maxReached,
  };
}
