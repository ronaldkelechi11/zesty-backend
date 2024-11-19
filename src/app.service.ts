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
      await this._packageModel.create(packageItem);
      return {
        message: 'success',
      };
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  // Delete Package
  async deletePackage(trackingId) {
    await this._packageModel.findOneAndDelete({ trackingId: trackingId });
    return { message: 'success' };
  }

  // Edit Package
  async editPackage(packageItem) {
  console.log(packageItem);
    
  // Find the original package by trackingId
  const originalPackage = await this._packageModel.findOne({
    trackingId: packageItem.trackingId,
  });

  console.log(originalPackage);
  

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
