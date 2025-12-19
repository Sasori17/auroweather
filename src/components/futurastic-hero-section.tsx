'use client';

import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Search, MapPin } from "lucide-react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useCitySuggestions } from '@/hooks/useCitySuggestions';
import type { CitySuggestion } from '@/types/weather';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

interface AuroraHeroProps {
  onCitySelect?: (lat: number, lon: number, cityName: string) => void;
  onLocationClick?: () => void;
}

export const AuroraHero = ({ onCitySelect, onLocationClick }: AuroraHeroProps) => {
  const color = useMotionValue(COLORS_TOP[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, loading: suggestionsLoading, fetchSuggestions, clearSuggestions } = useCitySuggestions();
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length >= 2) {
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 300);
    } else {
      clearSuggestions();
    }
  };

  const handleSuggestionClick = useCallback((suggestion: CitySuggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    clearSuggestions();
    if (onCitySelect) {
      onCitySelect(suggestion.lat, suggestion.lon, suggestion.name);
    }
  }, [onCitySelect, clearSuggestions]);

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <img
            src="/logo/auroraweather-logo.svg"
            alt="AuroWeather Logo"
            className="w-16 h-16"
          />
          <h1 className="text-3xl font-bold text-white">AuroWeather</h1>
        </motion.div>

        {/* Badge */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500/50 to-purple-500/50 backdrop-blur-sm px-3 py-1.5 text-sm font-medium"
        >
          Météo en temps réel
        </motion.span>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight mb-4"
        >
          Prévisions météo précises et en temps réel
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed text-gray-300"
        >
          Découvrez votre application météo moderne avec des prévisions détaillées, des graphiques interactifs et une interface élégante.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          ref={containerRef}
          className="relative w-full max-w-2xl"
        >
          <div className="relative flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <motion.input
                style={{ border, boxShadow }}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Rechercher une ville..."
                className="w-full pl-12 pr-4 py-4 rounded-full bg-gray-950/30 backdrop-blur-md text-white text-lg placeholder:text-white/40 focus:outline-none focus:bg-gray-950/50 transition-all"
              />
            </div>
            <motion.button
              onClick={onLocationClick}
              style={{ border, boxShadow }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 rounded-full bg-gray-950/30 backdrop-blur-md text-white hover:bg-gray-950/50 transition-colors flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              <span className="hidden sm:inline">Ma position</span>
            </motion.button>
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-3 bg-gray-950/95 backdrop-blur-md rounded-2xl overflow-hidden z-50 border border-white/10"
                style={{ boxShadow }}
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.name}-${suggestion.state || ''}-${suggestion.country}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-6 py-4 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
                  >
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-base">{suggestion.name}, {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};