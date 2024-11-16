type ShipingContent = {
  content: string;
  quantity: string;
  weight: string;
};

type ShipingTracking = {
  datetime: string;
  activity: string;
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
  shipingContent: ShipingContent[];
  shipingTracking: ShipingTracking[];
}
