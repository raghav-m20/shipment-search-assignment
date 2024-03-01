import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.sass']
})
export class ShipmentDetailsComponent implements OnInit {
  previousUrl: any;
  shipmentNo: any;
  shipmentDetails: any;
  showInfo = false;
  loading = false;
  showMessage = false;
  apiFail = false;
  constructor(private route: Router, private dataService: DataService, private actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.actRoute.params.subscribe({
      next: (data: any) => {
        this.shipmentNo = data.id;
        this.getShipmentDetails(this.shipmentNo);
      }

    })
    this.previousUrl = this.dataService.getPreviousUrl();
    this.shipmentDetails = DataService.ShipmentDetails;
  }

  goBack() {
    this.route.navigate([`${this.previousUrl}`]);
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }


  getShipmentDetails(id: any) {
    this.loading = true;
    this.dataService.getResult("shipment-detail/" + id).subscribe({
      next: (data: any) => {
        if (data && data.Shipment) {
          this.shipmentDetails = data.Shipment;
        }
        else {
          this.shipmentDetails = null;
        }
        this.loading = false;
      },
      error: (err: any) => {
        this.shipmentDetails = null;
        this.showMessage = true;
        this.apiFail = true;
        this.loading = false;
      }
    })
  }


}
