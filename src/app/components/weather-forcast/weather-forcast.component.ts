import { Component } from '@angular/core';

@Component({
  selector: 'app-weather-forcast',
  templateUrl: './weather-forcast.component.html',
  styleUrl: './weather-forcast.component.scss'
})
export class WeatherForcastComponent {
  hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
}
