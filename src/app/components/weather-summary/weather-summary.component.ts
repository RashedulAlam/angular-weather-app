import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/LocationService';
import { of, switchMap } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { ICurrent, WeatherData } from '../../models/weather';

@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrl: './weather-summary.component.scss',
})
export class WeatherSummaryComponent implements OnInit {
  currentTime = new Date();

  current: ICurrent | undefined;
  sunriseAndSet: { sunrise?: Date; sunset?: Date } = {};
  temparature: { max?: number; min?: number } = {};
  rainAndWind: { rain?: number; wind?: number } = {};
  userLocation: string = 'Your Location';

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {}
  ngOnInit(): void {
    this.locationService
      .getLocation()
      .pipe(
        switchMap((location) =>
          location
            ? this.weatherService.getCurrentStat(location.lat, location.lng)
            : of(null)
        )
      )
      .subscribe((data: WeatherData | null) => {
        if (data) {
          this.current = data.current;
          this.setSunriseAndSunSet(data);
          this.setRainAndWind(data);
        }
        console.log(data);
      });
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
