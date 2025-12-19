'use client';

import { useState, useCallback, useRef } from 'react';
import type { CitySuggestion } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export function useCitySuggestions() {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    if (!API_KEY) {
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setLoading(true);

    try {
      const response = await fetch(
        `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data: CitySuggestion[] = await response.json();
      setSuggestions(data);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setSuggestions([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    loading,
    fetchSuggestions,
    clearSuggestions,
  };
}
