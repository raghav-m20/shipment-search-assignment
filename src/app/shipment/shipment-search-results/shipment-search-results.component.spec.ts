import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentSearchResultsComponent } from './shipment-search-results.component';

describe('ShipmentSearchResultsComponent', () => {
  let component: ShipmentSearchResultsComponent;
  let fixture: ComponentFixture<ShipmentSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentSearchResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
