import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-shipment-search-results',
  templateUrl: './shipment-search-results.component.html',
  styleUrls: ['./shipment-search-results.component.sass']
})
export class ShipmentSearchResultsComponent {
  shipments: any[] = []; 
  loading: boolean = false; 
  page: number = 1; 
  pageSize: number = 10; 
  currentstart = 0;
  end = this.pageSize;
  selectedShipmentIndex: number | null = null;
  allShipments = DataService.ShipmentSearchResults;
  filterApplied: boolean = false; 
  showFilterPopover: boolean = false; 
  shipmentStatuses: string[] = ['Ready for Backroom Pick', 'Backroom Pick In Progress', 'Ready for Customer Pickup', 'Picked', 'Cancelled', 'Ready for Packing', 'Packing In Progress', 'Packed', 'Shipped'];
  selectedStatuses: { [key: string]: boolean } = {};
  appliedFilter = false;
  originalShipments: any[] = [];
  originalSelectedStatuses: { [key: string]: boolean } = {};
  @ViewChild('filterIcon') filterIcon!: ElementRef;

  private prevScrollPos = window.pageYOffset;

  constructor(private router: Router ) { }

  ngOnInit(): void {
    this.fetchShipments(this.currentstart, this.end);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  fetchShipments(start: number, end: number): void {
    this.loading = true;
    this.shipments = this.allShipments.slice(start, end);
    this.loading = false;
  }

  toggleFilterPopover(): void {
    this.showFilterPopover = !this.showFilterPopover;
    const popover = document.querySelector('.popover');
    if (popover) {
      popover.classList.toggle('show', this.showFilterPopover);
    }
  }
  applyFilter(): void {
    this.originalShipments = [...this.shipments];
    const selectedStatuses = this.shipmentStatuses.filter(status => this.selectedStatuses[status]);
    this.filterShipments();
    this.showFilterPopover = false;
  }

  filterShipments(): void {
    this.shipments = this.originalShipments.filter((shipment) =>
      this.isSelectedStatusAllowed(shipment.Status, shipment.DeliveryMethod)
    );
    this.appliedFilter = true;
    
  }

  isSelectedStatusAllowed(status: string, deliveryMethod: string): boolean {
    if (this.selectedStatuses['Ready for Backroom Pick'] ||
      this.selectedStatuses['Backroom Pick In Progress'] ||
      this.selectedStatuses['Ready for Packing'] ||
      this.selectedStatuses['Packing In Progress'] ||
      this.selectedStatuses['Packed'] ||
      this.selectedStatuses['Shipped'] ||
      this.selectedStatuses['Cancelled']) {
      return deliveryMethod === 'SHP';
    } else if (this.selectedStatuses['Ready for Backroom Pick'] ||
      this.selectedStatuses['Backroom Pick In Progress'] ||
      this.selectedStatuses['Ready for Customer Pickup'] ||
      this.selectedStatuses['Picked'] ||
      this.selectedStatuses['Cancelled']) {
      return deliveryMethod === 'PICK';
    }
    return false;
  }

  closePopover(): void {
    this.shipments = this.originalShipments.length > 0 ? [...this.originalShipments] : this.shipments;
    this.selectedStatuses = { ...this.originalSelectedStatuses };
    this.showFilterPopover = false;
    this.appliedFilter = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > this.prevScrollPos) {
      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const bottomScroll = totalHeight - windowHeight - currentScrollPos;
      if (bottomScroll < 100 && !this.loading) {
        this.currentstart = this.end;
        this.end += this.pageSize;
        if (this.end > this.allShipments.length) {
          this.currentstart = 0;
          this.end = this.pageSize;
        }

        this.fetchShipments(this.currentstart, this.end);
      }
    } else {
      if (this.currentstart > 0) {
        this.end = this.currentstart;
        this.currentstart -= this.pageSize;
        if (this.currentstart < 0) {
          this.currentstart = 0;
          this.end = this.pageSize;
        }

        this.fetchShipments(this.currentstart, this.end);
      }
    }
    this.prevScrollPos = currentScrollPos;
  }

  selectShipment(index: number) {
    
    
    if(index === 0) {
      this.selectedShipmentIndex = 0;
    }
    else {
      this.selectedShipmentIndex = (this.selectedShipmentIndex === index) ? null : index;
    }
    
    if(this.selectedShipmentIndex!=null){
      
      
      DataService.ShipmentDetails = this.shipments[this.selectedShipmentIndex];
      const shipmentno = this.shipments[this.selectedShipmentIndex].ShipmentNo;
      this.router.navigate(['shipments/shipment-details', shipmentno]);
    }
  }

}
