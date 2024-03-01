import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipment } from './shipment/shipment.model';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = "https://dev-5lhaaaymlmrgje6.api.raw-labs.com/";
  private previousUrl: any;
  private currentUrl: any;
  public static ShipmentSearchResults: Shipment[] = [];
  public static ShipmentDetails: any;
  constructor(private http: HttpClient, private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  getPreviousUrl(): any {
    return this.previousUrl;
  }

  getResult(dataEntity: string): Observable<any> {
    return this.http.get(this.baseUrl + dataEntity);
  }
}

