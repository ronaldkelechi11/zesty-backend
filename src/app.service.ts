import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from './utils/package.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Package.name) private _packageModel: Model<Package>,
  ) {}

  // Login Admin
  loginAdmin(email: string, password: string) {
    if (email != 'admin@zestylogistics' && password != 'admin234zesty')
      throw new UnauthorizedException('Login Details Incorrect');
    else {
      return { message: 'success' };
    }
  }

  // Get all packages
  async getAllPackages() {
    const allPackages = await this._packageModel.find();
    return {
      message: 'success',
      allPackages,
    };
  }

  // Search Package
  async searchForPackage(trackingId: string) {
    const trackingPackage = await this._packageModel.findOne({
      trackingId: trackingId,
    });
    if (!trackingPackage) {
      throw new NotFoundException('Package does not exist');
    }
    return { message: 'success', trackingPackage };
  }

  // Add Package
  async addPackage(packageItem) {
    try {
      await this._packageModel.create({
        trackingId: packageItem.trackingId,
        senderName: packageItem.senderName,
        senderAddress: packageItem.senderAddress,
        senderEmailAddress: packageItem.senderEmailAddress,
        senderTelephone: packageItem.senderTelephone,
        receiverName: packageItem.receiverName,
        receiverAddress: packageItem.receiverAddress,
        receiverEmailAddress: packageItem.receiverEmailAddress,
        receiverTelephone: packageItem.receiverTelephone,
        originCountry: packageItem.originCountry,
        destinationCountry: packageItem.destinationCountry,
        shipingDate: packageItem.shipingDate,
        expectedDeliveryDate: packageItem.expectedDeliveryDate,
        typeOfShipment: packageItem.typeOfShipment,
        carrier: packageItem.carrier,
        comments: packageItem.comments,
        status:packageItem.status,
        shipingContent: packageItem.shipingContent,
        shipingTracking: packageItem.shipingTracking,
      });
      return {
        message: 'success',
      };
    } catch (error) {
      throw new ConflictException('Could not add new package to DB');
      console.log(error);
    }
  }

  // Delete Package
  async deletePackage(trackingId) {
    await this._packageModel.findOneAndDelete({ trackingId: trackingId });
    return { message: 'success' };
  }

  // Edit Package
  async editPackage(packageItem) {
    const updatePackage = await this._packageModel.findOneAndUpdate(
      {
        trackingId: packageItem.trackingId,
      },
      packageItem,
      { new: true },
    );

    return { message: 'success', updatePackage };
  }
}
