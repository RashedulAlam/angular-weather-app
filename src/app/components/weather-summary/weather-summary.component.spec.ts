import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherSummaryComponent } from './weather-summary.component';
import { LocationService } from '../../services/LocationService';
import { of } from 'rxjs';

describe('WeatherSummaryComponent', () => {
  let component: WeatherSummaryComponent;
  let fixture: ComponentFixture<WeatherSummaryComponent>;
  let locationServiceSpy: jasmine.SpyObj<LocationService>;

  beforeEach(async () => {
    locationServiceSpy = jasmine.createSpyObj('LocationService', ['getLocationName']);

    await TestBed.configureTestingModule({
      declarations: [WeatherSummaryComponent],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const mockLocation = 'Test Location';
    locationServiceSpy.getLocationName.and.returnValue(of(mockLocation));

    fixture = TestBed.createComponent(WeatherSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userLocation from LocationService', () => {
    const mockLocation = 'Test Location';
    component.ngOnInit();

    expect(component.userLocation).toEqual(mockLocation);
  });

  it('should set sunrise, sunset, max temperature, min temperature, wind speed, and rain', () => {
    const mockWeatherData: any = {
      current: {
        wind_speed_10m: 5,
        rain: 0,
      },
      daily: {
        sunrise: ['2022-03-01T06:00:00'],
        sunset: ['2022-03-01T18:00:00'],
        temperature_2m_max: [25],
        temperature_2m_min: [15],
      }
    };

    component.weatherData = mockWeatherData;
    component.ngOnInit();

    expect(component.sunriseAndSet.sunrise).toEqual(new Date('2022-03-01T06:00:00'));
    expect(component.sunriseAndSet.sunset).toEqual(new Date('2022-03-01T18:00:00'));
    expect(component.temparature.max).toBe(25);
    expect(component.temparature.min).toBe(15);
    expect(component.rainAndWind.wind).toBe(5);
    expect(component.rainAndWind.rain).toBe(0);
  });
});
