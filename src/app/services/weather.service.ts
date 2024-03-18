import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentStat(lat: number, long: number): Observable<WeatherData> {
    return this.httpClient.get<WeatherData>(
      `${
        environment.weatherAPIHostUrl
      }v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,rain,cloud_cover,wind_speed_10m,relative_humidity_2m,apparent_temperature,snowfall&daily=sunrise&daily=sunset&daily=temperature_2m_max&daily=temperature_2m_min&timezone=${
        Intl.DateTimeFormat().resolvedOptions().timeZone
      }&forecast_days=5&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,rain,snowfall`
    );
  }
}
