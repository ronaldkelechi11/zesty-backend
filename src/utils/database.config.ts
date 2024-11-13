import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private _configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this._configService.get<string>('MONGO_URL'),
    };
  }
}
