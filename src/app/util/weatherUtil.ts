import { weatherImageMapper } from '../constants/weatherConstants';
import { ICurrent, IHour, WeatherType } from '../models/weather';

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

export const getHourlyData = (hourlyData: IHour, slicedIndex = 24): any[] => {
  const result: any[] = [];

  for (let i = 0; i < hourlyData.time.length; i += slicedIndex) {
    const times = hourlyData.time.slice(i, i + slicedIndex);
    const temperature_2ms = hourlyData.temperature_2m.slice(i, i + slicedIndex);
    const precipitations = hourlyData.precipitation.slice(i, i + slicedIndex);
    const rains = hourlyData.rain.slice(i, i + slicedIndex);
    const cloud_covers = hourlyData.cloud_cover.slice(i, i + slicedIndex);
    const snowfalls = hourlyData.snowfall.slice(i, i + slicedIndex);

    const series: Partial<ICurrent>[] = times.map((time, index) => {
      return {
        time: time,
        temperature_2m: temperature_2ms[index],
        rain: rains[index],
        snowfall: snowfalls[index],
        precipitation: precipitations[index],
        cloud_cover: cloud_covers[index],
      };
    });

    result.push(series);
  }

  return result;
};
