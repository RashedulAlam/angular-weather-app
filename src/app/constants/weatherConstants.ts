import { WeatherType } from '../models/weather';

export const weatherImageMapper = {
  [WeatherType.CLOUDY]: 'assets/animated/cloudy.svg',
  [WeatherType.RAINY]: 'assets/animated/rainy-4.svg',
  [WeatherType.SNOW]: 'assets/animated/snowy-6.svg',
  [WeatherType.SUNNY]: 'assets/animated/day.svg',
};
