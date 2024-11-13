import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { PackageDto } from './utils/package.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  // Login Admin
  @ApiOperation({ summary: 'Login Admin' })
  @Post('login')
  loginAdmin(@Body('email') email: string, @Body('password') password: string) {
    return this._appService.loginAdmin(email, password);
  }

  // Search Package
  @Post()
  @ApiOperation({ summary: 'Search package' })
  searchPackage(@Body('trackingId') trackingId: string) {
    return this._appService.searchForPackage(trackingId);
  }

  // Add Package
  @Post('admin')
  @ApiOperation({ summary: 'Add a Package to the DB' })
  addPackage(@Body() packageDto: PackageDto) {
    return this._appService.addPackage(packageDto);
  }

  // Get all Packages
  @Get('admin')
  @ApiOperation({ summary: 'Get all packages' })
  getAllPackages() {
    return this._appService.getAllPackages();
  }

  // Edit Package
  @Put('admin')
  @ApiOperation({ summary: 'Edit a Package in the DB' })
  editPackage(@Body() packageDto: PackageDto) {
    return this._appService.editPackage(packageDto);
  }

  // Delete a package
  @Delete('admin')
  @ApiOperation({ summary: 'Delete a Package in the DB' })
  deleteAPackage(@Body('trackingId') trackingId: string) {
    return this._appService.deletePackage(trackingId);
  }
}
