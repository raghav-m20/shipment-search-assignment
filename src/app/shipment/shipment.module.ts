import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentSearchResultsComponent } from './shipment-search-results/shipment-search-results.component';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    ShipmentSearchResultsComponent,
    ShipmentDetailsComponent
  ],
  imports: [
    CommonModule,
    ShipmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forChild(),
    InfiniteScrollModule
  ],
  exports: [
    ShipmentSearchResultsComponent
  ]
})
export class ShipmentModule { }
