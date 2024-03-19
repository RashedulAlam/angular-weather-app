import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../../services/LocationService';
import { ICurrent, WeatherData } from '../../models/weather';

@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrl: './weather-summary.component.scss',
})
export class WeatherSummaryComponent implements OnInit {
  @Input() weatherData?: WeatherData;

  currentTime = new Date();

  current: ICurrent | undefined;
  sunriseAndSet: { sunrise?: Date; sunset?: Date } = {};
  temparature: { max?: number; min?: number } = {};
  rainAndWind: { rain?: number; wind?: number } = {};
  userLocation: string = 'Your Location';

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    if (this.weatherData) {
      this.current = this.weatherData.current;
      this.setSunriseAndSunSet(this.weatherData);
      this.setRainAndWind(this.weatherData);
    }

    this.locationService.getLocationName().subscribe((location: string) => {
      if (location) {
        this.userLocation = location;
      }
    });
  }

  private setSunriseAndSunSet(data: WeatherData): void {
    if (data.daily) {
      this.sunriseAndSet = {
        sunrise: new Date(data.daily.sunrise[0]),
        sunset: new Date(data.daily.sunset[0]),
      };
      this.temparature = {
        max: data.daily.temperature_2m_max[0],
        min: data.daily.temperature_2m_min[0],
      };
    }
  }

  private setRainAndWind(data: WeatherData): void {
    if (data.current) {
      this.rainAndWind = {
        wind: data.current.wind_speed_10m,
        rain: data.current.rain,
      };
    }
  }
}
