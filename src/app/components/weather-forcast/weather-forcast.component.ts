import { Component, Input, OnInit } from '@angular/core';
import { ICurrent, WeatherData } from '../../models/weather';
import {
  getHourlyData,
  getWeatherImage,
  getWeatherType,
} from '../../util/weatherUtil';

@Component({
  selector: 'app-weather-forcast',
  templateUrl: './weather-forcast.component.html',
  styleUrl: './weather-forcast.component.scss',
})
export class WeatherForcastComponent implements OnInit {
  @Input() weatherData?: WeatherData;

  hourlyDataSeries: Partial<ICurrent>[] = [];
  selectedIndex = 1;
  maxIndex = 1;

  ngOnInit(): void {
    this.initData()
  }

  prev(): void {
    this.selectedIndex -= 1;
    this.initData();
  }

  next(): void {
    this.selectedIndex += 1;
    this.initData();
  }

  getWeatherImageSrc(data: Partial<ICurrent>): string {
    return getWeatherImage(getWeatherType(data as ICurrent));
  }

  private initData(): void {
    if (this.weatherData) {
      const series = getHourlyData(this.weatherData.hourly);
      this.maxIndex = series.length -1

      this.hourlyDataSeries = series[this.selectedIndex];
    }
  }
}
