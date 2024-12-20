type ShipingContent = {
  content: string;
  quantity: string;
  weight: string;
};

type ShipingTracking = {
  datetime: string;
  remark: string;
  location: string;
};

export class PackageDto {
  trackingId: string;
  senderName: string;
  senderAddress: string;
  senderEmailAddress: string;
  senderTelephone: string;
  receiverName: string;
  receiverAddress: string;
  receiverEmailAddress: string;
  receiverTelephone: string;
  originCountry: string;
  destinationCountry: string;
  shipingDate: string;
  expectedDeliveryDate: string;
  typeOfShipment: string;
  carrier: string;
  comments: string;
  status:boolean;
  currentLocation: string;
  shipingContent: ShipingContent[];
  shipingTracking: ShipingTracking[];
}
