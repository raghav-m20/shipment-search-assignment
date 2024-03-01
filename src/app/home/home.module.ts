import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ShipmentSearchComponent } from './shipment-search/shipment-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShipmentModule } from '../shipment/shipment.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ShipmentSearchComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HomeRoutingModule,
    ShipmentModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  exports: [ShipmentSearchComponent]
})
export class HomeModule { }
