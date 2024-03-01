import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/data.service';
import { Shipment } from 'src/app/shipment/shipment.model';

@Component({
  selector: 'app-shipment-search',
  templateUrl: './shipment-search.component.html',
  styleUrls: ['./shipment-search.component.sass']
})
export class ShipmentSearchComponent {
  shipmentSearchForm!: FormGroup;
  shipments: Shipment[] = [];
  filteredShipments: Shipment[] = [];
  loading = false;
  apiFailed = false;
  showMessage = false;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    public translate: TranslateService
  ) {
    console.log(this.translate.instant('home.LABEL_WhatDoYouWantToDO'), 'hello')
   }

  ngOnInit() {
    this.shipmentSearchForm = this.formBuilder.group({
      orderNo: [''],
      shipmentNo: [''],
      firstName: [''],
      lastName: [''],
      emailId: ['', [Validators.email]],
      contact: ['']
    });
  }

  resetForm() {
    this.shipmentSearchForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const formData = this.shipmentSearchForm.value;
    this.dataService.getResult("shipment-search-results").subscribe({
      next: (data: any) => {
        if (data && data.Shipments && data.Shipments.Shipment) {
          const length = data.Shipments.Shipment.length ? data.Shipments.Shipment.length : 0;
          if (length > 0) {
            if (!Object.values(formData).some(val => val !== '')) {
              this.filteredShipments = this.shipments;
            }
            this.filteredShipments = data.Shipments.Shipment.filter((shipment: any) => {
              let matchesCriteria = true;
              if (formData.orderNo && !shipment.OrderNo.toLowerCase().includes(formData.orderNo.toLowerCase())) {
                matchesCriteria = false;
              }

              if (formData.shipmentNo && !shipment.ShipmentNo.toLowerCase().includes(formData.shipmentNo.toLowerCase())) {
                matchesCriteria = false;
              }

              if (formData.firstName && !shipment.BillToAddress.FirstName.toLowerCase().includes(formData.firstName.toLowerCase())) {
                matchesCriteria = false;
              }

              if (formData.lastName && !shipment.BillToAddress.LastName.toLowerCase().includes(formData.lastName.toLowerCase())) {
                matchesCriteria = false;
              }

              if (formData.emailId && !shipment.BillToAddress.EMailID.toLowerCase().includes(formData.emailId.toLowerCase())) {
                matchesCriteria = false;
              }

              if (formData.contact && !shipment.BillToAddress.DayPhone.toLowerCase().includes(formData.contact.toLowerCase())) {
                matchesCriteria = false;
              }

              return matchesCriteria;
            });
          }
          else {
            this.filteredShipments = this.shipments = [];
            this.showMessage = true;
            this.apiFailed = false;
            this.errorMessage = 'No records for your search criteria.'
            setTimeout(()=>{
              this.errorMessage = '';
              this.apiFailed = this.showMessage = false;
            }, 2000)
          }

          DataService.ShipmentSearchResults = this.filteredShipments;
          if (this.filteredShipments.length > 1) {
            this.router.navigate(['shipments/search-results']);
          }
          else if (this.filteredShipments.length === 1) {
            const id = this.filteredShipments[0].ShipmentNo
            this.router.navigate(['shipments/shipment-details', id]);
          }
        }
      },
      error: (data: any) => {
        this.filteredShipments = this.shipments = [];
        this.loading = false;
        this.apiFailed = true;
        this.showMessage = true;
        this.errorMessage = 'Something went wrong please try again later.'
        setTimeout(()=>{
          this.errorMessage = '';
          this.apiFailed = this.showMessage = false;
        }, 2000)
      }
    })
  }
}
