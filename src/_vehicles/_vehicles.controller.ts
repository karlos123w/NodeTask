import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehiclesService } from './_vehicles.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get all vehicles',
    description: 'Get a list of all vehicles',
  })
  @ApiQuery({
    name: 'pageNumber',
    type: Number,
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    description: 'Page Size',
  })
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    return await this.vehiclesService.findAll(+pageNumber, +pageSize);
  }

  @Get(':vehicleId')
  @ApiOperation({
    summary: 'Get a single vehicle',
    description: 'Get details for a specific film',
  })
  @ApiParam({ name: 'vehicleId', type: Number, description: 'VehicleId' })
  async findOne(@Param('vehicleId') vehicleId: number) {
    return await this.vehiclesService.findOne(vehicleId);
  }
}
