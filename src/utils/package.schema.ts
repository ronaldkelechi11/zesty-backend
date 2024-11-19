import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

@Schema()
export class Package extends Document {
  @Prop({ required: true, immutable: true })
  trackingId: string;

  @Prop()
  senderName: string;

  @Prop()
  senderAddress: string;

  @Prop()
  senderEmailAddress: string;

  @Prop()
  senderTelephone: string;

  @Prop()
  receiverName: string;

  @Prop()
  receiverAddress: string;

  @Prop()
  receiverEmailAddress: string;

  @Prop()
  receiverTelephone: string;

  @Prop()
  originCountry: string;

  @Prop()
  destinationCountry: string;

  @Prop()
  shipingDate: string;

  @Prop()
  expectedDeliveryDate: string;

  @Prop()
  typeOfShipment: string;

  @Prop({ default: 'ZESTY' })
  carrier: string;

  @Prop()
  comments: string;

  @Prop({default: 'true'})
  status: boolean;

  @Prop()
  currentLocation: string;

  @Prop()
  shipingContent: ShipingContent[];

  @Prop()
  shipingTracking: ShipingTracking[];
}

export const PackageSchema = SchemaFactory.createForClass(Package);
