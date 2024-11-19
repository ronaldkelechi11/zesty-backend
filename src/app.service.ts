import {
  BadRequestException,
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
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(packageItem.senderEmailAddress) || !emailRegex.test(packageItem.receiverEmailAddress)) {
        throw new BadRequestException('Invalid email format for sender or receiver.');
      }
  
      // Validate dates
      const shippingDate = new Date(packageItem.shipingDate);
      const expectedDeliveryDate = new Date(packageItem.expectedDeliveryDate);
  
      if (shippingDate > expectedDeliveryDate) {
        throw new BadRequestException('Shipping date cannot be after the expected delivery date.');
      }
  
      // Save to database
      await this._packageModel.create(packageItem);
  
      return {
        message: 'success',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Let the BadRequestException propagate
      }
      throw new ConflictException(error.message || 'Failed to add package');
    }
  }

  // Delete Package
  async deletePackage(trackingId) {
    await this._packageModel.findOneAndDelete({ trackingId: trackingId });
    return { message: 'success' };
  }

  // Edit Package
  async editPackage(packageItem) {
    
  // Find the original package by trackingId
  const originalPackage = await this._packageModel.findOne({
    trackingId: packageItem.trackingId,
  });
  

  if (!originalPackage) {
    throw new BadRequestException('Package not found');
  }

  // Compare the original and the updated values
  const hasChanges = Object.keys(packageItem).some((key) => {
    return packageItem[key] !== originalPackage[key];
  });

  if (!hasChanges) {
    return { message: 'No changes detected', updatePackage: originalPackage };
  }

  // Update the package and return the updated document
  const updatedPackage = await this._packageModel.findOneAndUpdate(
    { trackingId: packageItem.trackingId },
    { $set: packageItem }, // Only set fields that are provided
    { new: true },
  );

  return { message: 'success', updatedPackage };
}
}
