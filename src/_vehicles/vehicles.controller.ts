import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { ApiTags } from '@nestjs/swagger';
import { FindAllSwagger, FindOne } from './vehicles.swagger.ts';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { appConfig } from 'config';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private vehiclesService: VehiclesService,
    @Inject(CACHE_MANAGER) private readonly cacheService: CacheStore,
  ) {}

  @Get('/')
  @FindAllSwagger()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    const key = `get_vehicles_${pageNumber}_${pageSize}`;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      return cachedData;
    } else {
      const newData = await this.vehiclesService.findAll(
        +pageNumber,
        +pageSize,
      );

      await this.cacheService.set(key, newData, appConfig.CACHE_TIME);

      return newData;
    }
  }

  @Get(':vehicleId')
  @FindOne()
  async findOne(@Param('vehicleId') vehicleId: number) {
    const key = `get_vehicle:${vehicleId}`;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      console.log('mam cache');
      return cachedData;
    } else {
      const newData = await this.vehiclesService.findOne(vehicleId);

      await this.cacheService.set(key, newData, appConfig.CACHE_TIME);

      console.log('zapisałem dane  cache');
      return newData;
    }
  }
}
