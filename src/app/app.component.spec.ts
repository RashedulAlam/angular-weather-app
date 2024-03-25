import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LocationService } from './services/LocationService';
import { WeatherService } from './services/weather.service';
import { of } from 'rxjs';
import { WeatherData } from './models/weather';
import {mockResponse} from "../mock/weatherMockResponse";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let locationServiceSpy: jasmine.SpyObj<LocationService>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    locationServiceSpy = jasmine.createSpyObj('LocationService', ['getLocation']);
    weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getCurrentStat']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: WeatherService, useValue: weatherServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    locationServiceSpy.getLocation.and.returnValue(of({lat: 1.1, lng: 2.2}));

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call getLocation and getCurrentStat on initialization', () => {
    const mockLocation = { lat: 1, lng: 1 };
    const mockWeatherData: WeatherData = mockResponse;

    locationServiceSpy.getLocation.and.returnValue(of(mockLocation));
    weatherServiceSpy.getCurrentStat.and.returnValue(of(mockWeatherData));

    component.ngOnInit();

    expect(locationServiceSpy.getLocation).toHaveBeenCalled();
    expect(weatherServiceSpy.getCurrentStat).toHaveBeenCalledWith(mockLocation.lat, mockLocation.lng);
  });

  it('should set weatherData when getCurrentStat returns data', () => {
    const mockWeatherData: WeatherData = mockResponse;
    weatherServiceSpy.getCurrentStat.and.returnValue(of(mockWeatherData));

    component.ngOnInit();

    expect(component.weatherData).toEqual(mockWeatherData);
  });

  it('should not set weatherData when getCurrentStat returns null', () => {
    weatherServiceSpy.getCurrentStat.and.returnValue(of<any>(null));

    component.ngOnInit();

    expect(component.weatherData).toBeUndefined();
  });
});
