import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { ApiTags } from '@nestjs/swagger';
import { FindAllSwagger, FindOne } from './vehicles.swagger.ts';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get('/')
  @FindAllSwagger()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    return await this.vehiclesService.findAll(+pageNumber, +pageSize);
  }

  @Get(':vehicleId')
  @FindOne()
  async findOne(@Param('vehicleId') vehicleId: number) {
    return await this.vehiclesService.findOne(vehicleId);
  }
}
