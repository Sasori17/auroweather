export const en = {
  common: {
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    notFound: 'Not found',
    back: 'Back',
    retry: 'Retry',
  },
  header: {
    home: 'Home',
  },
  footer: {
    aboutText:
      'Your modern weather app with real-time forecasts, elegant interface and accurate data for all your activities.',
    quickLinks: 'Quick links',
    legal: 'Legal information',
    copyright: 'All rights reserved.',
    dataSource: 'Weather data provided by OpenWeatherMap',
    links: {
      about: 'About',
      blog: 'Weather blog',
      guide: 'Weather guide',
      glossary: 'Glossary',
      contact: 'Contact',
      privacy: 'Privacy policy',
      terms: 'Terms of use',
    },
  },
  weather: {
    wind: 'Wind',
    humidity: 'Humidity',
    pressure: 'Atmospheric pressure',
    visibility: 'Visibility',
    feelsLike: 'Feels like',
    minMax: 'Min / Max',
    cloudCover: 'Cloud cover',
    windDirection: 'Wind direction',
    rainRisk: 'Rain risk (3h)',
    airQuality: 'Air quality',
    pressureVis: 'Pressure & Visibility',
    otherInfo: 'Other information',
    pressure_low: 'Low',
    pressure_normal: 'Normal',
    pressure_high: 'High',
    visibility_low: 'Low',
    visibility_moderate: 'Moderate',
    visibility_excellent: 'Excellent',
    rain_low: 'Low',
    rain_moderate: 'Moderate',
    rain_high: 'High',
    air_good: 'Good',
    air_moderate: 'Moderate',
    air_bad: 'Poor',
    air_quality_good: 'Good',
    air_quality_fair: 'Fair',
    air_quality_moderate: 'Moderate',
    air_quality_poor: 'Poor',
    air_quality_very_poor: 'Very poor',
    air_quality_unknown: 'Unknown',
    windAbbr: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
    windFull: [
      'North', 'North-Northeast', 'Northeast', 'East-Northeast',
      'East', 'East-Southeast', 'Southeast', 'South-Southeast',
      'South', 'South-Southwest', 'Southwest', 'West-Southwest',
      'West', 'West-Northwest', 'Northwest', 'North-Northwest',
    ],
  },
  home: {
    welcome: 'Welcome to AuroWeather',
    subtitle:
      'Discover real-time weather forecasts with a modern, elegant interface. Search for your city to get started.',
    realtime: 'Real-time weather',
    realtimeDesc: 'Get accurate, current weather conditions for any city',
    forecast: '6-day forecast',
    forecastDesc: 'View detailed forecasts to plan your activities with peace of mind',
    data: 'Complete data',
    dataDesc: 'Temperature, wind, humidity, pressure, visibility and air quality',
    useLocation: 'Use my location',
  },
  search: {
    placeholder: 'Search for a city...',
  },
  errors: {
    rateLimit: 'Daily API call limit reached (1000/day). Try again tomorrow at midnight.',
    apiKey:
      'Invalid or inactive API key. New OpenWeatherMap keys can take up to 2 hours to activate.',
    cityNotFound: 'City not found. Check the spelling and try again.',
    generic: 'Error retrieving weather data',
    geolocation: 'Geolocation is not supported by your browser',
    location: 'Unable to retrieve your location',
    apiKeyCoords:
      'Invalid or inactive API key. New OpenWeatherMap keys can take up to 2 hours to activate. Test your key at: https://openweathermap.org/api',
  },
  cookie: {
    title: 'Cookie management',
    description:
      'We use cookies to improve your experience, analyze our traffic and display personalized ads. You can choose which cookies you accept.',
    learnMore:
      'By clicking "Accept all", you consent to the use of all cookies. To learn more, see our',
    privacyPolicy: 'Privacy policy',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    customize: 'Customize',
    settingsTitle: 'Cookie settings',
    necessary: 'Necessary cookies',
    necessaryDesc:
      'These cookies are essential for the website to function. They cannot be disabled.',
    necessaryAlways: 'Always active',
    necessaryExamples: 'Examples: language preferences, user session',
    analytics: 'Analytics cookies',
    analyticsDesc:
      'These cookies help us understand how visitors use our site so we can improve it.',
    analyticsExamples: 'Examples: Google Analytics, visit statistics',
    advertising: 'Advertising cookies',
    advertisingDesc:
      'These cookies enable us to display ads tailored to your interests via Google AdSense.',
    advertisingExamples: 'Examples: Google AdSense, personalized ads',
    modifyInfo:
      'You can change your preferences at any time. For more information, see our',
    saveChoices: 'Save my choices',
  },
  meta: {
    home: {
      title: 'AuroWeather - Real-time weather',
      description:
        'Modern weather app with real-time data, smooth 3D elements and elegant glassmorphism design. Get weather forecasts, alerts and climate trends.',
    },
    about: {
      title: 'About AuroWeather - Your modern weather companion',
      description:
        'Discover AuroWeather, your modern and reliable weather app. Elegant interface, real-time data and cutting-edge technology for accurate forecasts.',
    },
    blog: {
      title: 'Weather Blog - Guides, Analysis and Tips - AuroWeather',
      description:
        'Comprehensive guides, in-depth analysis and practical tips to better understand weather and its impact on your daily life.',
    },
    contact: {
      title: 'Contact - AuroWeather',
      description: 'Contact the AuroWeather team for any question or suggestion.',
    },
    privacy: {
      title: 'Privacy policy - AuroWeather',
      description: 'Our privacy policy explains how we collect and use your data.',
    },
    terms: {
      title: 'Terms of use - AuroWeather',
      description: 'Read our terms of use to understand your rights and obligations.',
    },
    guide: {
      title: 'Weather Guide - AuroWeather',
      description:
        'Comprehensive guide to understanding meteorological phenomena and interpreting forecasts.',
    },
    glossary: {
      title: 'Weather Glossary - AuroWeather',
      description: 'Discover essential weather terms with our comprehensive glossary.',
    },
  },
} as const;
