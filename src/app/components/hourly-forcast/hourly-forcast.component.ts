import { Component } from '@angular/core';

@Component({
  selector: 'app-hourly-forcast',
  templateUrl: './hourly-forcast.component.html',
  styleUrl: './hourly-forcast.component.scss',
})
export class HourlyForcastComponent {
  hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
}
