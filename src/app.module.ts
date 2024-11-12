import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from './utils/package.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/zestylogistics'),
    MongooseModule.forFeature(
      [
        {
          name: Package.name,
          schema: PackageSchema
        }
      ]
    )
  ],
  controllers: [AppController],
  providers: [
        AppService, ],
})
export class AppModule {}
