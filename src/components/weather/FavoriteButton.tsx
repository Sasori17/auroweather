'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import type { CitySuggestion } from '@/types/weather';

interface FavoriteButtonProps {
  city: CitySuggestion;
  className?: string;
}

export function FavoriteButton({ city, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, maxReached } = useFavorites();
  const favorite = isFavorite(city);
  const disabled = !favorite && maxReached;

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => toggleFavorite(city)}
        disabled={disabled}
        className={`relative ${className}`}
        aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        title={
          disabled
            ? 'Limite de favoris atteinte (10/10)'
            : favorite
            ? 'Retirer des favoris'
            : 'Ajouter aux favoris'
        }
      >
        <motion.div
          animate={{
            scale: favorite ? [1, 1.3, 1] : 1,
            rotate: favorite ? [0, -15, 15, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              favorite
                ? 'fill-amber-400 text-amber-400'
                : disabled
                ? 'text-white/30'
                : 'text-white/60 hover:text-amber-300'
            }`}
          />
        </motion.div>
      </Button>
    </motion.div>
  );
}
