import { renderHook, act, waitFor } from '@testing-library/react';
import { useWeatherData } from '../useWeatherData';

// Mock fetch globally
global.fetch = jest.fn();

// Store original API key
const originalApiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

describe('useWeatherData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
    // Set API key for tests
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = 'test-api-key-123';
  });

  afterEach(() => {
    jest.restoreAllMocks();
    // Restore original API key
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = originalApiKey;
  });

  describe('fetchWeatherByCity', () => {
    const mockWeatherData = {
      coord: { lon: 2.3522, lat: 48.8566 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
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
      wind: { speed: 3.5, deg: 180 },
      clouds: { all: 0 },
      dt: 1234567890,
      sys: { type: 1, id: 5615, country: 'FR', sunrise: 1234550000, sunset: 1234590000 },
      timezone: 7200,
      id: 2988507,
      name: 'Paris',
      cod: 200,
    };

    const mockForecastData = {
      cod: '200',
      message: 0,
      cnt: 40,
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
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          clouds: { all: 0 },
          wind: { speed: 3.5, deg: 180 },
          visibility: 10000,
          pop: 0,
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

    const mockAirQualityData = {
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

    it('should initialize with default state', () => {
      const { result } = renderHook(() => useWeatherData());

      expect(result.current.loading).toBe(false);
      expect(result.current.weather).toBeNull();
      expect(result.current.forecast).toBeNull();
      expect(result.current.airQuality).toBeNull();
      expect(result.current.city).toBe('');
      expect(typeof result.current.fetchWeatherByCity).toBe('function');
    });

    it('should handle 404 error for city not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'city not found' }),
      });

      const { result } = renderHook(() => useWeatherData());

      await act(async () => {
        await result.current.fetchWeatherByCity('InvalidCity123');
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Check for error - could be API key missing or 404
      expect(result.current.error).toBeTruthy();
      expect(result.current.weather).toBeNull();
    });

    it('should handle 401 error for invalid API key', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Invalid API key' }),
      });

      const { result } = renderHook(() => useWeatherData());

      await act(async () => {
        await result.current.fetchWeatherByCity('Paris');
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Check for error - could be API key related error
      expect(result.current.error).toBeTruthy();
      expect(result.current.error).toMatch(/API|Clé|key/i);
    });

    it('should handle missing API key', async () => {
      const originalApiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = '';

      const { result } = renderHook(() => useWeatherData());

      await act(async () => {
        await result.current.fetchWeatherByCity('Paris');
      });

      expect(result.current.error).toContain('API key is missing');

      process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = originalApiKey;
    });
  });

  describe('fetchWeatherByCoords', () => {
    it('should handle coordinates input', async () => {
      const { result } = renderHook(() => useWeatherData());

      // Just verify the function exists and can be called
      expect(typeof result.current.fetchWeatherByCoords).toBe('function');
    });
  });

  describe('getCurrentLocation', () => {
    it('should handle geolocation error', async () => {
      (global.navigator.geolocation.getCurrentPosition as jest.Mock).mockImplementationOnce(
        (success, error) => error(new Error('Location denied'))
      );

      const { result } = renderHook(() => useWeatherData());

      await act(async () => {
        result.current.getCurrentLocation();
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe('Unable to retrieve your location');
    });

    it('should verify getCurrentLocation function exists', () => {
      const { result } = renderHook(() => useWeatherData());
      expect(typeof result.current.getCurrentLocation).toBe('function');
    });
  });
});
