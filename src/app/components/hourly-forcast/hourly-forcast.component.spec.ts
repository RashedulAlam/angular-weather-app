import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HourlyForcastComponent } from './hourly-forcast.component';
import { ICurrent } from '../../models/weather';

describe('HourlyForcastComponent', () => {
  let component: HourlyForcastComponent;
  let fixture: ComponentFixture<HourlyForcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HourlyForcastComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyForcastComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set hourlyDataSeries when weatherData is provided', () => {
    const mockWeatherData: any = {
      hourly: {
        time: ['2012-12-12', '2012-12-13'],
        temperature_2m: [10, 15],
        wind_speed_10m: [5, 7],
        rain: [0, 0],
        relative_humidity_2m: [50, 55],
        snowfall: [0, 0],
        apparent_temperature: [9, 14],
        precipitation: [0, 0],
        cloud_cover: [30, 40],
      },
    };

    component.weatherData = mockWeatherData;
    fixture.detectChanges();

    const expectedData: any = [
      {
        time: '2012-12-12',
        temperature_2m: 10,
        rain: 0,
        snowfall: 0,
        precipitation: 0,
        cloud_cover: 30,
      },
      {
        time: '2012-12-13',
        temperature_2m: 15,
        rain: 0,
        snowfall: 0,
        precipitation: 0,
        cloud_cover: 40,
      },
    ];

    expect(component.hourlyDataSeries).toEqual(expectedData);
  });

  it('should return correct weather image source', () => {
    const mockData: Partial<ICurrent> = {
      temperature_2m: 20,
      time: new Date().toUTCString(),
    };

    const expectedResult = 'expected/weather/image/src.png';
    spyOn(component, 'getWeatherImageSrc').and.returnValue(expectedResult);

    const result = component.getWeatherImageSrc(mockData);

    expect(result).toEqual(expectedResult);
  });
});
