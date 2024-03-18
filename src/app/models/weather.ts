export interface ICurrent {
  time: string;
  interval: number;
  temperature_2m: number;
  wind_speed_10m: number;
  rain: number;
  relative_humidity_2m: number;
  snowfall: number;
  apparent_temperature: number;
}

export interface IHour {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
}

export interface IHourUnit {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units?: ICurrent;
  current?: ICurrent;
  hourly_units?: IHourUnit;
  hourly?: IHour;
  daily?: {
    sunrise: string[];
    sunset: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}
