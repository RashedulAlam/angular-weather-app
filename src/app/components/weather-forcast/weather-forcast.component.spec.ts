import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForcastComponent } from './weather-forcast.component';

describe('WeatherForcastComponent', () => {
  let component: WeatherForcastComponent;
  let fixture: ComponentFixture<WeatherForcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherForcastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
