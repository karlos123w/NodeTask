import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { FindAllPlanetsSwagger, FindOnePlanetSwagger } from './planets.swagger';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { appConfig } from 'config';

@Controller('planets')
export class PlanetsController {
  constructor(
    private planetsService: PlanetsService,
    @Inject(CACHE_MANAGER) private readonly cacheService: CacheStore,
  ) {}

  @Get('/')
  @FindAllPlanetsSwagger()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    const key = `get_planets_${pageNumber}_${pageSize}`;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      return cachedData;
    } else {
      const newData = await this.planetsService.findAll(+pageNumber, +pageSize);

      await this.cacheService.set(key, newData, appConfig.CACHE_TIME);

      return newData;
    }
  }

  @Get(':planetId')
  @FindOnePlanetSwagger()
  async findOne(@Param('planetId') planetId: number) {
    const key = `get_planet:${planetId}`;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      return cachedData;
    } else {
      const newData = await this.planetsService.findOne(planetId);

      await this.cacheService.set(key, newData, appConfig.CACHE_TIME);
      return newData;
    }
  }
}
