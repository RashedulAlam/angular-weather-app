import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/LocationService';
import { of, switchMap } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from '../../models/weather';

@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrl: './weather-summary.component.scss',
})
export class WeatherSummaryComponent implements OnInit {
  currentTime = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
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
          console.log(data);
        }
      });
  }
}
