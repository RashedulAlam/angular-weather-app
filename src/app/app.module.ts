import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { WeatherSummaryComponent } from './components/weather-summary/weather-summary.component';
import { WeatherForcastComponent } from './components/weather-forcast/weather-forcast.component';
import { HourlyForcastComponent } from './components/hourly-forcast/hourly-forcast.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WeatherSummaryComponent,
    WeatherForcastComponent,
    HourlyForcastComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
