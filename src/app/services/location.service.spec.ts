import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocationService } from './LocationService';
import { of, skip } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('LocationService', () => {
  let service: LocationService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService, { provide: HttpClient, useValue: spy }],
    });
    service = TestBed.inject(LocationService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user location', () => {
    const mockPosition = {
      coords: {
        latitude: 123,
        longitude: 456,
      },
    } as any;

    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
      (success) => {
        success(mockPosition);
      }
    );

    service
      .getLocation()
      .pipe(skip(1))
      .subscribe((location) => {
        expect(location).toEqual({ lat: 123, lng: 456 });
      });
  });

  it('should get location name', () => {
    spyOn(service, 'getLocation').and.returnValue(of({ lat: 1.1, lng: 2.2 }));

    const mockLocationResponse = {
      results: [
        {
          formatted_address: 'Mock Location',
        },
      ],
    };
    httpClientSpy.get.and.returnValue(of(mockLocationResponse));

    service.getLocationName().subscribe((locationName) => {
      expect(locationName).toBe('Mock Location');
    });
  });
});
