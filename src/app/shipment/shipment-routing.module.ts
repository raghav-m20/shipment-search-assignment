import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentSearchResultsComponent } from './shipment-search-results/shipment-search-results.component';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';

const routes: Routes = [
  {
    path: 'search-results',
    component: ShipmentSearchResultsComponent
  },
  {
    path: 'shipment-details/:id',
    component: ShipmentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { }
