import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { environment } from '../../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch current weather statistics', () => {
    const mockLat = 123;
    const mockLong = 456;

    const mockWeatherData = {
    };

    service.getCurrentStat(mockLat, mockLong).subscribe((weatherData) => {
      expect(weatherData).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `${environment.weatherAPIHostUrl}v1/forecast?latitude=${mockLat}&longitude=${mockLong}&current=temperature_2m,precipitation,rain,cloud_cover,wind_speed_10m,relative_humidity_2m,apparent_temperature,snowfall&daily=sunrise&daily=sunset&daily=temperature_2m_max&daily=temperature_2m_min&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}&forecast_days=6&hourly=temperature_2m,precipitation,rain,cloud_cover,wind_speed_10m,relative_humidity_2m,apparent_temperature,snowfall`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherData);
  });
});
