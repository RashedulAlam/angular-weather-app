import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private userLocation = new BehaviorSubject<{
    lat: number;
    lng: number;
  } | null>(null);

  constructor() {
    this.init();
  }

  private init() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            let lat: number = position.coords.latitude;
            let lng: number = position.coords.longitude;

            const location = {
              lat,
              lng,
            };
            this.userLocation.next(location);
          }
        },
        (error) => console.log(error)
      );
    }
  }

  getLocation(): Observable<{ lat: number; lng: number } | null> {
    return this.userLocation.asObservable();
  }
}
