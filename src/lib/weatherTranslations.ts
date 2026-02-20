/**
 * Traductions des descriptions météo de l'OpenWeatherMap API
 */

export const weatherTranslations: Record<string, string> = {
  // Thunderstorm
  'thunderstorm with light rain': 'orage avec pluie légère',
  'thunderstorm with rain': 'orage avec pluie',
  'thunderstorm with heavy rain': 'orage avec forte pluie',
  'light thunderstorm': 'orage léger',
  'thunderstorm': 'orage',
  'heavy thunderstorm': 'orage violent',
  'ragged thunderstorm': 'orage irrégulier',
  'thunderstorm with light drizzle': 'orage avec bruine légère',
  'thunderstorm with drizzle': 'orage avec bruine',
  'thunderstorm with heavy drizzle': 'orage avec forte bruine',

  // Drizzle
  'light intensity drizzle': 'bruine légère',
  'drizzle': 'bruine',
  'heavy intensity drizzle': 'bruine forte',
  'light intensity drizzle rain': 'pluie et bruine légères',
  'drizzle rain': 'pluie et bruine',
  'heavy intensity drizzle rain': 'pluie et bruine fortes',
  'shower rain and drizzle': 'averses et bruine',
  'heavy shower rain and drizzle': 'fortes averses et bruine',
  'shower drizzle': 'averses de bruine',

  // Rain
  'light rain': 'pluie légère',
  'moderate rain': 'pluie modérée',
  'heavy intensity rain': 'forte pluie',
  'very heavy rain': 'très forte pluie',
  'extreme rain': 'pluie extrême',
  'freezing rain': 'pluie verglaçante',
  'light intensity shower rain': 'légères averses',
  'shower rain': 'averses',
  'heavy intensity shower rain': 'fortes averses',
  'ragged shower rain': 'averses irrégulières',
  'rain': 'pluie',

  // Snow
  'light snow': 'neige légère',
  'snow': 'neige',
  'heavy snow': 'forte neige',
  'sleet': 'grésil',
  'light shower sleet': 'légères averses de grésil',
  'shower sleet': 'averses de grésil',
  'light rain and snow': 'pluie et neige légères',
  'rain and snow': 'pluie et neige',
  'light shower snow': 'légères averses de neige',
  'shower snow': 'averses de neige',
  'heavy shower snow': 'fortes averses de neige',

  // Atmosphere
  'mist': 'brume',
  'smoke': 'fumée',
  'haze': 'brume sèche',
  'sand/dust whirls': 'tourbillons de sable/poussière',
  'fog': 'brouillard',
  'sand': 'sable',
  'dust': 'poussière',
  'volcanic ash': 'cendres volcaniques',
  'squalls': 'bourrasques',
  'tornado': 'tornade',

  // Clear
  'clear sky': 'ciel dégagé',
  'clear': 'dégagé',

  // Clouds
  'few clouds': 'quelques nuages',
  'scattered clouds': 'nuages épars',
  'broken clouds': 'nuages fragmentés',
  'overcast clouds': 'ciel couvert',
  'clouds': 'nuageux',
};

/**
 * Traduit une description météo selon la locale.
 * Pour locale 'fr' : traduit de l'anglais vers le français.
 * Pour locale 'en' : retourne la description telle quelle (déjà en anglais via API lang=en).
 */
export function translateWeatherDescription(description: string, locale: string = 'fr'): string {
  if (locale !== 'fr') {
    return description;
  }
  const lowerDescription = description.toLowerCase();
  return weatherTranslations[lowerDescription] || description;
}
