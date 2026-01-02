'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import type { FavoriteCity } from '@/types/weather';

interface FavoritesDropdownProps {
  onCitySelect: (city: FavoriteCity) => void;
  border?: any;
  boxShadow?: any;
}

export function FavoritesDropdown({
  onCitySelect,
  border,
  boxShadow,
}: FavoritesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, removeFavorite } = useFavorites();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleCityClick = useCallback((city: FavoriteCity) => {
    onCitySelect(city);
    setIsOpen(false);
  }, [onCitySelect]);

  const handleRemoveClick = useCallback((e: React.MouseEvent, cityId: string) => {
    e.stopPropagation();
    removeFavorite(cityId);
  }, [removeFavorite]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white relative hover:bg-white/10"
        aria-label="Villes favorites"
      >
        <Star className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">Favoris</span>
        {favorites.length > 0 && (
          <motion.span
            key={favorites.length}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-1 -right-1 bg-amber-400 text-gray-950 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
          >
            {favorites.length}
          </motion.span>
        )}
      </Button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ boxShadow }}
            className="absolute top-full right-0 mt-2 bg-gray-950/95 backdrop-blur-md rounded-xl overflow-hidden z-50 min-w-[300px] max-w-[320px] border border-white/10"
          >
            {favorites.length === 0 ? (
              // Empty state
              <div className="px-6 py-8 text-center text-white/60">
                <Star className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Aucun favori enregistré</p>
                <p className="text-xs mt-1 text-white/40">
                  Ajoutez des villes en cliquant sur l'étoile
                </p>
              </div>
            ) : (
              // Favorites list
              <div className="max-h-[400px] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {favorites.map((city, index) => (
                    <motion.div
                      key={city.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative"
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleCityClick(city)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleCityClick(city);
                          }
                        }}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0 cursor-pointer"
                      >
                        <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm truncate block">
                            {city.name}
                            {city.state ? `, ${city.state}` : ''}, {city.country}
                          </span>
                        </div>
                        <motion.button
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1, scale: 1.1 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded flex-shrink-0"
                          onClick={(e) => handleRemoveClick(e, city.id)}
                          aria-label="Supprimer ce favori"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
