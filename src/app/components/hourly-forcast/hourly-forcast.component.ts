import { Component, Input, OnInit } from '@angular/core';
import { ICurrent, WeatherData } from '../../models/weather';
import {
  getHourlyData,
  getWeatherImage,
  getWeatherType,
} from '../../util/weatherUtil';

@Component({
  selector: 'app-hourly-forcast',
  templateUrl: './hourly-forcast.component.html',
  styleUrl: './hourly-forcast.component.scss',
})
export class HourlyForcastComponent implements OnInit {
  @Input() weatherData?: WeatherData;
  hourlyDataSeries: Partial<ICurrent>[] = [];

  ngOnInit(): void {
    if (this.weatherData) {
      const [series] = getHourlyData(this.weatherData.hourly);

      this.hourlyDataSeries = series;
    }
  }

  getWeatherImageSrc(data: Partial<ICurrent>): string {
    return getWeatherImage(getWeatherType(data as ICurrent));
  }
}
