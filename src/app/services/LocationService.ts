import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private userLocation = new BehaviorSubject<{
    lat: number;
    lng: number;
  } | null>(null);

  constructor(private httpclient: HttpClient) {
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

  getLocationName(): Observable<string> {
    return this.getLocation().pipe(
      switchMap((value) =>
        value
          ? this.httpclient
              .get<{ results: any }>(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${value.lat},${value.lng}&key=AIzaSyB3slK3y99Obkm5M-1R8WZ5HYtU4VrFpXM`
              )
              .pipe(map(({ results }) => results[0].formatted_address))
          : of('Your Location')
      )
    );
  }
}
