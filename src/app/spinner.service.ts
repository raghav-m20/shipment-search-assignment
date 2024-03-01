import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private showSpinner = new BehaviorSubject<boolean>(false);
  constructor() { }

  show() {
    this.showSpinner.next(true);
  }

  hide() {
    this.showSpinner.next(false);
  }

  getSpinnerVisibility() {
    return this.showSpinner.asObservable();
  }
}
