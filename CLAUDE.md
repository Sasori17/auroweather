# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AuroWeather is a modern weather application built with Next.js 16.0.10 LTS and React 19, displaying real-time weather data and forecasts using the OpenWeatherMap API. The app is ad-supported with Google AdSense integration.

## Development Commands

```bash
# Development with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Note: All commands use Turbopack (`--turbopack` flag) for faster builds.

## Environment Setup

Required environment variable in `.env.local`:
```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key_here
```

- Get free API key at https://openweathermap.org/api
- New keys can take up to 2 hours to activate
- Test API key at `/test-api` route

## Architecture

### Core Data Flow

1. **useWeatherData Hook** (`src/hooks/useWeatherData.ts`)
   - Central hook for all weather API calls
   - Manages loading, error states, and data fetching
   - Methods: `fetchWeatherByCity()`, `fetchWeatherByCoords()`, `getCurrentLocation()`
   - Auto-detects location on first page load

2. **Weather Data Types** (`src/types/weather.ts`)
   - `WeatherData`: Current weather structure from OpenWeatherMap
   - `ForecastData`: 5-day forecast structure
   - `WeatherTheme`: Union type for dynamic background themes

### Component Architecture

**Main Pages:**
- `/` - Home page with weather display and search
- `/test-api` - API key testing utility

**Key Components:**
- `WeatherCard` - Current weather display with detailed metrics
- `ForecastCard` - Shows 5-day forecast
- `Header` - Navigation header
- `AdBanner` components - Google AdSense integration with multiple formats

### Dynamic Theme System

Background gradients change based on:
- Weather conditions (rain, snow, clouds, clear, etc.)
- Time of day (night mode: 20h-6h)

Theme colors defined in `src/app/page.tsx` as `themeColors` object.

## Google AdSense Integration

**Component Structure:**
- `GoogleAdsense.tsx` - Script loader (Next.js Script with `afterInteractive`)
- `AdBanner.tsx` - Base ad component for displaying ads
- `HorizontalAdBanner`, `VerticalAdBanner`, `SquareAdBanner` - Preset formats

**Placement:**
- Top banner: After header in layout
- Bottom banner: Before footer in layout

**Setup for Production:**
See `ADSENSE_SETUP.md` for complete AdSense configuration guide including:
- Publisher ID replacement
- Slot ID configuration
- GDPR compliance requirements

## Next.js Configuration

**Image Optimization** (`next.config.ts`):
- Remote pattern configured for `openweathermap.org/img/wn/**`
- Required for weather icon display via Next.js Image component

**Path Aliases** (`tsconfig.json`):
- `@/*` maps to `./src/*`
- Used throughout codebase for clean imports

## Key Technical Details

**Turbopack:**
All build and dev commands use Turbopack for faster compilation.

**Tailwind CSS v4:**
- Uses `@theme inline` syntax in globals.css
- Custom color variables for shadcn/ui integration
- tw-animate-css for animations

**shadcn/ui Components:**
Installed components: card, button, input, badge, alert
Add new components: `npx shadcn@latest add <component-name>`

**OpenWeatherMap API:**
- Current weather: `weather` endpoint
- Forecast: `forecast` endpoint (3-hour intervals, 5 days)
- Units: metric (Celsius, km/h)
- Error handling includes 401 detection for inactive API keys

## Common Patterns

**Error Handling:**
All API calls in `useWeatherData` hook include specific error messages for:
- 401 (API key not activated)
- 404 (City not found)
- Network errors

**State Management:**
- Weather data: `useWeatherData` custom hook
- Local state: React useState for UI interactions

## Deployment Notes

**Vercel (Recommended):**
1. Push to GitHub
2. Import to Vercel
3. Add `NEXT_PUBLIC_OPENWEATHER_API_KEY` environment variable
4. Deploy

**Before Production:**
- Replace AdSense test IDs with real Publisher/Slot IDs
- Implement GDPR cookie consent for ads
- Test API key activation status

## File References

Key files for understanding system:
- `src/hooks/useWeatherData.ts` - API integration logic
- `src/app/layout.tsx` - Ad placement and global structure
- `src/components/weather/ForecastCard.tsx` - Forecast display logic
- `src/components/ads/AdBanner.tsx` - Ad component implementation
- `ADSENSE_SETUP.md` - Complete AdSense setup guide
