export interface Shipment {
    AssignedToUserId: string;
    DeliveryMethod: string;
    ExpectedShipmentDate: string;
    OrderNo: string;
    ScacAndService: string;
    ShipNode: string;
    ShipmentKey: string;
    ShipmentNo: string;
    Status: string;
    BillToAddress: {
      DayPhone: string;
      EMailID: string;
      FirstName: string;
      LastName: string;
      PersonInfoKey: string;
    };
    ShipmentLines: {
      TotalNumberOfRecords: string;
    };
  }