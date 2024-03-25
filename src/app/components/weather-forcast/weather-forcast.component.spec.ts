import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherForcastComponent } from './weather-forcast.component';
import { mockResponse } from '../../../mock/weatherMockResponse';

describe('WeatherForcastComponent', () => {
  let component: WeatherForcastComponent;
  let fixture: ComponentFixture<WeatherForcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherForcastComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties', () => {
    component.weatherData = mockResponse;
    component.ngOnInit();

    expect(component.hourlyDataSeries.length).toBe(24);
    expect(component.selectedIndex).toBe(1);
    expect(component.maxIndex).toBe(5);
  });

  it('should update selectedIndex when calling prev() and next()', () => {
    component.weatherData = mockResponse;
    component.ngOnInit();

    component.prev();
    expect(component.selectedIndex).toBe(0);

    component.next();
    expect(component.selectedIndex).toBe(1);
  });

  it('should update hourlyDataSeries when calling prev() and next()', () => {
    component.weatherData = mockResponse;
    component.ngOnInit();

    component.prev();
    expect(component.hourlyDataSeries.length).toEqual(24);

    component.next();
    expect(component.hourlyDataSeries.length).toEqual(24);
  });
});
