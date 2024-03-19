import { weatherImageMapper } from '../constants/weatherConstants';
import { ICurrent, WeatherType } from '../models/weather';

export const getWeatherImage = (type: WeatherType) => weatherImageMapper[type];

export const getWeatherType = (current: ICurrent): WeatherType => {
  if (current.precipitation > 0) {
    if (current.snowfall > 0) {
      return WeatherType.SNOW;
    } else if (current.rain > 0) {
      return WeatherType.RAINY;
    }
  }

  if (current.cloud_cover < 50) {
    return WeatherType.SUNNY;
  } else {
    return WeatherType.CLOUDY;
  }
};
