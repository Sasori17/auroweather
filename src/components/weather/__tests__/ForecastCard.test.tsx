import { render, screen } from '@testing-library/react';
import { ForecastCard } from '../ForecastCard';
import type { ForecastData } from '@/types/weather';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, animate, initial, transition, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('ForecastCard', () => {
  const mockForecastData: ForecastData = {
    cod: '200',
    message: 0,
    cnt: 40,
    list: [
      // Today at noon
      {
        dt: new Date().setHours(12, 0, 0, 0) / 1000,
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
        pop: 0.1,
        sys: { pod: 'd' },
        dt_txt: '2024-01-01 12:00:00',
      },
      // Tomorrow at noon
      {
        dt: new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(12, 0, 0, 0) / 1000,
        main: {
          temp: 18,
          feels_like: 17,
          temp_min: 16,
          temp_max: 20,
          pressure: 1015,
          humidity: 70,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
          },
        ],
        clouds: { all: 75 },
        wind: { speed: 4.2, deg: 200 },
        visibility: 8000,
        pop: 0.65,
        sys: { pod: 'd' },
        dt_txt: '2024-01-02 12:00:00',
      },
      // Day after tomorrow at noon
      {
        dt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).setHours(12, 0, 0, 0) / 1000,
        main: {
          temp: 22,
          feels_like: 21,
          temp_min: 19,
          temp_max: 24,
          pressure: 1012,
          humidity: 60,
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d',
          },
        ],
        clouds: { all: 20 },
        wind: { speed: 3.0, deg: 150 },
        visibility: 10000,
        pop: 0.2,
        sys: { pod: 'd' },
        dt_txt: '2024-01-03 12:00:00',
      },
      // Day 3 at noon
      {
        dt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).setHours(12, 0, 0, 0) / 1000,
        main: {
          temp: 21,
          feels_like: 20,
          temp_min: 18,
          temp_max: 23,
          pressure: 1014,
          humidity: 65,
        },
        weather: [
          {
            id: 600,
            main: 'Snow',
            description: 'light snow',
            icon: '13d',
          },
        ],
        clouds: { all: 90 },
        wind: { speed: 5.0, deg: 350 },
        visibility: 5000,
        pop: 0.8,
        sys: { pod: 'd' },
        dt_txt: '2024-01-04 12:00:00',
      },
      // Day 4 at noon
      {
        dt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).setHours(12, 0, 0, 0) / 1000,
        main: {
          temp: 19,
          feels_like: 18,
          temp_min: 17,
          temp_max: 21,
          pressure: 1016,
          humidity: 68,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        clouds: { all: 5 },
        wind: { speed: 2.5, deg: 100 },
        visibility: 10000,
        pop: 0.05,
        sys: { pod: 'd' },
        dt_txt: '2024-01-05 12:00:00',
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

  it('should render forecast card with title', () => {
    render(<ForecastCard forecast={mockForecastData} />);

    expect(screen.getByText(/Prévisions pour les 4 prochains jours/i)).toBeInTheDocument();
  });

  it('should display forecast items', () => {
    const { container } = render(<ForecastCard forecast={mockForecastData} />);

    // The component displays forecast days
    // Check that at least some forecast items are rendered
    const forecastSection = container.querySelector('.grid');
    expect(forecastSection).toBeTruthy();
    expect(forecastSection?.children.length).toBeGreaterThan(0);
  });

  it('should display temperature ranges for each day', () => {
    render(<ForecastCard forecast={mockForecastData} />);

    // Check that temperatures are displayed
    expect(screen.getByText(/20°/)).toBeInTheDocument(); // Max temp from tomorrow
    expect(screen.getByText(/16°/)).toBeInTheDocument(); // Min temp from tomorrow
  });

  it('should display rain probability for each forecast', () => {
    render(<ForecastCard forecast={mockForecastData} />);

    // Check for rain probability text
    expect(screen.getByText(/65% pluie/i)).toBeInTheDocument(); // Tomorrow's rain probability
    expect(screen.getByText(/20% pluie/i)).toBeInTheDocument(); // Day after tomorrow
  });

  it('should translate weather descriptions', () => {
    render(<ForecastCard forecast={mockForecastData} />);

    // The weather descriptions should be translated by the translateWeatherDescription function
    // We just verify that some descriptions are present
    const descriptions = screen.getAllByText(/ciel|pluie|neige|nuages/i);
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it('should format day labels correctly', () => {
    render(<ForecastCard forecast={mockForecastData} />);

    // Tomorrow should be displayed as "Demain"
    expect(screen.getByText(/Demain/i)).toBeInTheDocument();
  });

  it('should handle forecast with fewer than 4 days', () => {
    const shortForecast: ForecastData = {
      ...mockForecastData,
      list: mockForecastData.list.slice(0, 2), // Only today and tomorrow
    };

    const { container } = render(<ForecastCard forecast={shortForecast} />);

    // Should render the component without errors
    const forecastSection = container.querySelector('.grid');
    expect(forecastSection).toBeTruthy();
  });

  it('should display weather icons for different conditions', () => {
    const { container } = render(<ForecastCard forecast={mockForecastData} />);

    // Check that SVG icons are rendered
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });
});
