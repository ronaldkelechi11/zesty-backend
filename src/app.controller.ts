import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { PackageDto } from './utils/package.dto';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  // Login Admin
  @Post('login')
  loginAdmin(@Body('email') email: string, @Body('password') password: string) {
    return this._appService.loginAdmin(email, password);
  }

  // Search Package
  @Post()
  searchPackage(@Body('trackingId') trackingId: string) {
    return this._appService.searchForPackage(trackingId);
  }

  // Add Package
  @Post('admin')
  addPackage(@Body() packageDto: PackageDto) {
    return this._appService.addPackage(packageDto);
  }

  // Get all Packages
  @Get('admin')
  getAllPackages() {
    return this._appService.getAllPackages();
  }

  // Edit Package
  @Put('admin')
  editPackage(@Body() packageDto: PackageDto) {
    return this._appService.editPackage(packageDto);
  }

  // Delete a package
  @Delete('admin')
  deleteAPackage(@Body('trackingId') trackingId: string) {
    return this._appService.deletePackage(trackingId);
  }
}
