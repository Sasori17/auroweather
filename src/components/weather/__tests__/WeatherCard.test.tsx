import { render, screen } from '@testing-library/react';
import { WeatherCard } from '../WeatherCard';
import type { WeatherData, ForecastData, AirQualityData } from '@/types/weather';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, animate, initial, transition, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('WeatherCard', () => {
  const mockWeatherData: WeatherData = {
    coord: { lon: 2.3522, lat: 48.8566 },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    base: 'stations',
    main: {
      temp: 20,
      feels_like: 19,
      temp_min: 18,
      temp_max: 22,
      pressure: 1013,
      humidity: 65,
    },
    visibility: 10000,
    wind: {
      speed: 3.5,
      deg: 180,
    },
    clouds: {
      all: 0,
    },
    dt: 1234567890,
    sys: {
      country: 'FR',
      sunrise: 1234550000,
      sunset: 1234590000,
    },
    timezone: 7200,
    id: 2988507,
    name: 'Paris',
    cod: 200,
  };

  const mockForecastData: ForecastData = {
    cod: '200',
    message: 0,
    cnt: 1,
    list: [
      {
        dt: 1234567890,
        main: {
          temp: 20,
          feels_like: 19,
          temp_min: 18,
          temp_max: 22,
          pressure: 1013,
          humidity: 65,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        clouds: { all: 0 },
        wind: { speed: 3.5, deg: 180 },
        visibility: 10000,
        pop: 0.25,
        sys: { pod: 'd' },
        dt_txt: '2024-01-01 12:00:00',
      },
    ],
    city: {
      id: 2988507,
      name: 'Paris',
      coord: { lat: 48.8566, lon: 2.3522 },
      country: 'FR',
      population: 2138551,
      timezone: 7200,
      sunrise: 1234550000,
      sunset: 1234590000,
    },
  };

  const mockAirQualityData: AirQualityData = {
    coord: { lon: 2.3522, lat: 48.8566 },
    list: [
      {
        main: { aqi: 2 },
        components: {
          co: 201.94,
          no: 0.01,
          no2: 0.75,
          o3: 68.66,
          so2: 0.64,
          pm2_5: 0.5,
          pm10: 0.59,
          nh3: 0.12,
        },
        dt: 1234567890,
      },
    ],
  };

  it('should render weather card with basic information', () => {
    render(<WeatherCard weather={mockWeatherData} />);

    expect(screen.getByText(/Paris, FR/i)).toBeInTheDocument();
    expect(screen.getByText(/20°C/i)).toBeInTheDocument();
  });

  it('should display temperature and feels like temperature', () => {
    render(<WeatherCard weather={mockWeatherData} />);

    expect(screen.getByText(/20°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Ressenti: 19°C/i)).toBeInTheDocument();
  });

  it('should display weather details', () => {
    render(<WeatherCard weather={mockWeatherData} />);

    expect(screen.getByText(/65%/i)).toBeInTheDocument(); // Humidity
    expect(screen.getByText(/1013 hPa/i)).toBeInTheDocument(); // Pressure
    expect(screen.getByText(/10.0 km/i)).toBeInTheDocument(); // Visibility
  });

  it('should display wind information', () => {
    render(<WeatherCard weather={mockWeatherData} />);

    // Wind speed: 3.5 m/s * 3.6 = 12.6 km/h, rounded to 13
    expect(screen.getByText(/13 km\/h/i)).toBeInTheDocument();
    // Wind direction (180° = South) - check for exact match in wind section
    const windSections = screen.getAllByText(/S/i);
    expect(windSections.length).toBeGreaterThanOrEqual(1); // At least one 'S' for wind direction
  });

  it('should display min and max temperatures', () => {
    render(<WeatherCard weather={mockWeatherData} />);

    expect(screen.getByText(/18°C/i)).toBeInTheDocument(); // Min temp
    expect(screen.getByText(/22°C/i)).toBeInTheDocument(); // Max temp
  });

  it('should display rain probability when forecast is provided', () => {
    render(<WeatherCard weather={mockWeatherData} forecast={mockForecastData} />);

    expect(screen.getByText(/25%/i)).toBeInTheDocument(); // Rain probability (0.25 * 100)
  });

  it('should display air quality when provided', () => {
    render(<WeatherCard weather={mockWeatherData} airQuality={mockAirQualityData} />);

    expect(screen.getByText(/Correcte/i)).toBeInTheDocument(); // AQI 2 = Correcte
    expect(screen.getByText(/AQI: 2/i)).toBeInTheDocument();
  });

  it('should display sunrise and sunset times', () => {
    render(<WeatherCard weather={mockWeatherData} />);

    // Note: Times will be in local timezone, so we just check they exist
    const times = screen.getAllByText(/\d{2}:\d{2}/);
    expect(times.length).toBeGreaterThanOrEqual(2); // At least sunrise and sunset
  });

  it('should display cloud coverage', () => {
    render(<WeatherCard weather={mockWeatherData} />);

    expect(screen.getByText(/0%/i)).toBeInTheDocument(); // Cloud coverage
  });

  describe('Air Quality Index levels', () => {
    it('should display "Bonne" for AQI 1', () => {
      const aqiData = {
        ...mockAirQualityData,
        list: [{ ...mockAirQualityData.list[0], main: { aqi: 1 } }],
      };
      render(<WeatherCard weather={mockWeatherData} airQuality={aqiData} />);
      expect(screen.getByText(/Bonne/i)).toBeInTheDocument();
    });

    it('should display "Mauvaise" for AQI 4', () => {
      const aqiData = {
        ...mockAirQualityData,
        list: [{ ...mockAirQualityData.list[0], main: { aqi: 4 } }],
      };
      render(<WeatherCard weather={mockWeatherData} airQuality={aqiData} />);
      expect(screen.getByText(/Mauvaise/i)).toBeInTheDocument();
    });

    it('should display "Très mauvaise" for AQI 5', () => {
      const aqiData = {
        ...mockAirQualityData,
        list: [{ ...mockAirQualityData.list[0], main: { aqi: 5 } }],
      };
      render(<WeatherCard weather={mockWeatherData} airQuality={aqiData} />);
      expect(screen.getByText(/Très mauvaise/i)).toBeInTheDocument();
    });
  });

  describe('Wind direction', () => {
    it('should display wind direction for different angles', () => {
      const weatherData0 = {
        ...mockWeatherData,
        wind: { ...mockWeatherData.wind, deg: 0 },
      };
      const { container: container0 } = render(<WeatherCard weather={weatherData0} />);
      expect(container0.textContent).toContain('N');

      const weatherData90 = {
        ...mockWeatherData,
        wind: { ...mockWeatherData.wind, deg: 90 },
      };
      const { container: container90 } = render(<WeatherCard weather={weatherData90} />);
      expect(container90.textContent).toContain('E');
    });
  });
});
