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
      `${environment.weatherAPIHostUrl}v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m&daily=sunrise&daily=sunset&timezone=Europe/Helsinki`
    );
  }
}
