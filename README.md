# AuroWeather

A modern, feature-rich weather application built with Next.js 16 and React 19, providing real-time weather data, forecasts, and beautiful visualizations.

![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **Real-time Weather Data**: Current conditions and detailed metrics
- **5-Day Forecast**: Hour-by-hour forecasts with visual charts
- **Weather Alerts**: Severe weather notifications and warnings
- **City Search**: Smart city suggestions with autocomplete
- **Location Detection**: Automatic geolocation on first visit
- **Dynamic Themes**: Background changes based on weather and time of day
- **3D Globe Visualization**: Interactive globe showing current location
- **Sun Charts**: Sunrise/sunset times with visual arc
- **Temperature Trends**: Interactive charts for temperature analysis
- **Responsive Design**: Optimized for desktop and mobile
- **Dark Mode**: Built-in theme toggle
- **Weather Highlights**: UV index, wind speed, pressure, humidity, visibility

## Tech Stack

- **Framework**: Next.js 16.0.10 LTS with Turbopack
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Language**: TypeScript 5
- **API**: OpenWeatherMap API
- **Animations**: tw-animate-css
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- OpenWeatherMap API key (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sasori17/auroweather.git
cd auroweather
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your OpenWeatherMap API key to `.env.local`:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

Get your free API key at [OpenWeatherMap](https://openweathermap.org/api). Note: New API keys can take up to 2 hours to activate.

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing API Key

Visit `/test-api` route to verify your API key is working correctly.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   └── weather/           # Weather-specific components
│       ├── WeatherDashboard.tsx
│       ├── WeatherCard.tsx
│       ├── ForecastCard.tsx
│       ├── TodayHighlights.tsx
│       ├── TemperatureGraph.tsx
│       ├── SunChart.tsx
│       └── WeatherAlertsModal.tsx
├── hooks/                 # Custom React hooks
│   ├── useWeatherData.ts
│   ├── useWeatherAlerts.ts
│   └── useCitySuggestions.ts
├── types/                 # TypeScript type definitions
│   └── weather.ts
└── lib/                   # Utility functions
```

## Key Features Explained

### Dynamic Weather Themes

The app automatically adjusts its background gradient based on:
- Current weather conditions (clear, rain, snow, clouds, etc.)
- Time of day (day/night modes from 6h-20h)

### Weather Data

All weather data is fetched through the `useWeatherData` hook which provides:
- Current weather by city name
- Current weather by coordinates
- Automatic geolocation
- 5-day forecast with 3-hour intervals
- Error handling for API issues

### Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Touch-friendly controls
- Optimized layouts for all screen sizes

## API Integration

The app uses [OpenWeatherMap API](https://openweathermap.org/api) with the following endpoints:

- **Current Weather**: `api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `api.openweathermap.org/data/2.5/forecast`

All measurements use the metric system (Celsius, km/h).

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sasori17/auroweather)

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Add environment variable: `NEXT_PUBLIC_OPENWEATHER_API_KEY`
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Just ensure you set the `NEXT_PUBLIC_OPENWEATHER_API_KEY` environment variable.

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_OPENWEATHER_API_KEY`: Your OpenWeatherMap API key

See `.env.example` for reference.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)
- Built with [Next.js](https://nextjs.org)

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/Sasori17/auroweather/issues).

---

Made with ❤️ using Next.js and React
