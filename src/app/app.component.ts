import { Component, OnInit } from '@angular/core';
import { LocationService } from './services/LocationService';
import { WeatherService } from './services/weather.service';
import { of, switchMap } from 'rxjs';
import { WeatherData } from './models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  weatherData?: WeatherData;

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
          this.weatherData = data;
        }
      });
  }
}
