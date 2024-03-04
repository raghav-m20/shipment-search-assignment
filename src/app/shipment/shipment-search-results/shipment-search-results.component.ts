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
  currentstart = 1;
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
  displayedShipments: any[] = [];
  itemsPerPage = 10;
  currentPage = 1;

  private prevScrollPos = window.pageYOffset;

  constructor(private router: Router, private dataService: DataService ) { }

  ngOnInit(): void {
    this.shipments = this.allShipments
    this.loadMoreData()
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onScroll() {
    console.log("hello scrolling")
    this.loadMoreData();
  }

  loadMoreData() {
    const endIndex = this.currentPage * this.itemsPerPage;
    const newShipments = this.shipments.slice(0, endIndex);
    this.displayedShipments = [...this.displayedShipments, ...newShipments];
    console.log("display shipments ", this.displayedShipments)
    this.currentPage++;
  }

  toggleLoading() {
    this.loading = !this.loading;
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
