'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useCitySuggestions } from '@/hooks/useCitySuggestions';
import type { CitySuggestion } from '@/types/weather';

interface CitySearchInputProps {
  onCitySelect: (city: string) => void;
  onLocationClick: () => void;
}

export function CitySearchInput({ onCitySelect, onLocationClick }: CitySearchInputProps) {
  const [searchCity, setSearchCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { suggestions, loading, fetchSuggestions, clearSuggestions } = useCitySuggestions();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced fetch suggestions
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchCity.length >= 2) {
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(searchCity);
      }, 300);
    } else {
      clearSuggestions();
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchCity, fetchSuggestions, clearSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    const cityName = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;

    setSearchCity(suggestion.name);
    setShowSuggestions(false);
    clearSuggestions();
    onCitySelect(cityName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (searchCity.trim()) {
      setShowSuggestions(false);
      clearSuggestions();
      onCitySelect(searchCity);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const formatSuggestion = (suggestion: CitySuggestion) => {
    const parts = [suggestion.name];
    if (suggestion.state) parts.push(suggestion.state);
    parts.push(suggestion.country);
    return parts.join(', ');
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none z-10" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Rechercher une ville..."
            value={searchCity}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10 bg-white/20 dark:bg-slate-800/30 backdrop-blur-md border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:bg-white/25 transition-all shadow-lg"
            autoComplete="off"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-white/60" />
            </div>
          )}
        </div>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          onClick={onLocationClick}
          className="shrink-0 bg-white/20 dark:bg-slate-800/30 backdrop-blur-md border-white/30 hover:bg-white/30 text-white shadow-lg"
          title="Utiliser ma position"
        >
          <MapPin className="w-4 h-4" />
        </Button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/30 overflow-hidden">
          <ul className="py-1 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li key={`${suggestion.lat}-${suggestion.lon}`}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-3 ${
                    index === selectedIndex
                      ? 'bg-primary/20 text-primary dark:bg-primary/30'
                      : 'hover:bg-gray-100 dark:hover:bg-slate-700/50 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
                  <span className="truncate font-medium">{formatSuggestion(suggestion)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
