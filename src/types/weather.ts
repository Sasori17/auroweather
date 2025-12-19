export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number;
      grnd_level?: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export type WeatherTheme = 'clear' | 'clouds' | 'rain' | 'drizzle' | 'thunderstorm' | 'snow' | 'mist' | 'night';

export interface CitySuggestion {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export type AlertLevel = 'Vert' | 'Jaune' | 'Orange' | 'Rouge';

export interface WeatherAlert {
  department: string;
  departmentCode: string;
  level: AlertLevel;
  alertTypes: string[];
  startTime: string;
  endTime: string;
  description?: string;
  consequences?: string;
  advice?: string;
}

export interface AirQualityData {
  coord: {
    lon: number;
    lat: number;
  };
  list: Array<{
    main: {
      aqi: number; // Air Quality Index: 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
    };
    components: {
      co: number;      // Carbon monoxide (μg/m³)
      no: number;      // Nitrogen monoxide (μg/m³)
      no2: number;     // Nitrogen dioxide (μg/m³)
      o3: number;      // Ozone (μg/m³)
      so2: number;     // Sulphur dioxide (μg/m³)
      pm2_5: number;   // Fine particles matter (μg/m³)
      pm10: number;    // Coarse particulate matter (μg/m³)
      nh3: number;     // Ammonia (μg/m³)
    };
    dt: number;
  }>;
}
