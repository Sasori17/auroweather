import { translateWeatherDescription, weatherTranslations } from '../weatherTranslations';

describe('weatherTranslations', () => {
  describe('translateWeatherDescription', () => {
    it('should translate "clear sky" to French', () => {
      expect(translateWeatherDescription('clear sky')).toBe('ciel dégagé');
    });

    it('should translate "light rain" to French', () => {
      expect(translateWeatherDescription('light rain')).toBe('pluie légère');
    });

    it('should translate "thunderstorm" to French', () => {
      expect(translateWeatherDescription('thunderstorm')).toBe('orage');
    });

    it('should translate "snow" to French', () => {
      expect(translateWeatherDescription('snow')).toBe('neige');
    });

    it('should translate "mist" to French', () => {
      expect(translateWeatherDescription('mist')).toBe('brume');
    });

    it('should handle uppercase input', () => {
      expect(translateWeatherDescription('CLEAR SKY')).toBe('ciel dégagé');
    });

    it('should handle mixed case input', () => {
      expect(translateWeatherDescription('Light Rain')).toBe('pluie légère');
    });

    it('should return original description for unknown weather', () => {
      expect(translateWeatherDescription('unknown weather condition')).toBe('unknown weather condition');
    });

    it('should handle empty string', () => {
      expect(translateWeatherDescription('')).toBe('');
    });

    it('should translate all thunderstorm variations', () => {
      expect(translateWeatherDescription('thunderstorm with light rain')).toBe('orage avec pluie légère');
      expect(translateWeatherDescription('heavy thunderstorm')).toBe('orage violent');
      expect(translateWeatherDescription('ragged thunderstorm')).toBe('orage irrégulier');
    });

    it('should translate all drizzle variations', () => {
      expect(translateWeatherDescription('drizzle')).toBe('bruine');
      expect(translateWeatherDescription('light intensity drizzle')).toBe('bruine légère');
      expect(translateWeatherDescription('heavy intensity drizzle')).toBe('bruine forte');
    });

    it('should translate all rain variations', () => {
      expect(translateWeatherDescription('rain')).toBe('pluie');
      expect(translateWeatherDescription('moderate rain')).toBe('pluie modérée');
      expect(translateWeatherDescription('extreme rain')).toBe('pluie extrême');
      expect(translateWeatherDescription('freezing rain')).toBe('pluie verglaçante');
    });

    it('should translate all snow variations', () => {
      expect(translateWeatherDescription('light snow')).toBe('neige légère');
      expect(translateWeatherDescription('heavy snow')).toBe('forte neige');
      expect(translateWeatherDescription('sleet')).toBe('grésil');
      expect(translateWeatherDescription('rain and snow')).toBe('pluie et neige');
    });

    it('should translate all atmosphere conditions', () => {
      expect(translateWeatherDescription('fog')).toBe('brouillard');
      expect(translateWeatherDescription('smoke')).toBe('fumée');
      expect(translateWeatherDescription('haze')).toBe('brume sèche');
      expect(translateWeatherDescription('tornado')).toBe('tornade');
    });

    it('should translate all cloud variations', () => {
      expect(translateWeatherDescription('few clouds')).toBe('quelques nuages');
      expect(translateWeatherDescription('scattered clouds')).toBe('nuages épars');
      expect(translateWeatherDescription('broken clouds')).toBe('nuages fragmentés');
      expect(translateWeatherDescription('overcast clouds')).toBe('ciel couvert');
    });
  });

  describe('weatherTranslations object', () => {
    it('should have all expected keys', () => {
      expect(weatherTranslations).toHaveProperty('clear sky');
      expect(weatherTranslations).toHaveProperty('rain');
      expect(weatherTranslations).toHaveProperty('snow');
      expect(weatherTranslations).toHaveProperty('thunderstorm');
      expect(weatherTranslations).toHaveProperty('mist');
      expect(weatherTranslations).toHaveProperty('clouds');
    });

    it('should have all values as strings', () => {
      Object.values(weatherTranslations).forEach((value) => {
        expect(typeof value).toBe('string');
      });
    });

    it('should have all keys in lowercase', () => {
      Object.keys(weatherTranslations).forEach((key) => {
        expect(key).toBe(key.toLowerCase());
      });
    });

    it('should contain at least 50 translations', () => {
      expect(Object.keys(weatherTranslations).length).toBeGreaterThanOrEqual(50);
    });
  });
});
