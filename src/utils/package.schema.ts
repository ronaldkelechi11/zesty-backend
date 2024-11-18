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

  @Prop({ required: true })
  senderName: string;

  @Prop()
  senderAddress: string;

  @Prop()
  senderEmailAddress: string;

  @Prop()
  senderTelephone: string;

  @Prop({ required: true })
  receiverName: string;

  @Prop({ required: true })
  receiverAddress: string;

  @Prop()
  receiverEmailAddress: string;

  @Prop({ required: true })
  receiverTelephone: string;

  @Prop({ required: true })
  originCountry: string;

  @Prop({ required: true })
  destinationCountry: string;

  @Prop({ required: true })
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
  shipingContent: ShipingContent[];

  @Prop()
  shipingTracking: ShipingTracking[];
}

export const PackageSchema = SchemaFactory.createForClass(Package);
