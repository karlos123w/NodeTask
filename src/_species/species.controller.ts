import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FindAllSpeciesSwagger,
  FindOneSpeciesSwagger,
} from './species.swagger';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { appConfig } from 'config';

@ApiTags('Species')
@Controller('species')
export class SpeciesController {
  constructor(
    private speciesService: SpeciesService,
    @Inject(CACHE_MANAGER) private readonly cacheService: CacheStore,
  ) {}

  @Get('/')
  @FindAllSpeciesSwagger()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    const key = `get_species_${pageNumber}_${pageSize}`;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      return cachedData;
    } else {
      const newData = await this.speciesService.findAll(+pageNumber, +pageSize);

      await this.cacheService.set(key, newData, appConfig.CACHE_TIME);

      return newData;
    }
  }

  @Get(':speciesId')
  @FindOneSpeciesSwagger()
  async findOne(@Param('speciesId') speciesId: number) {
    const key = `get_species:${speciesId}`;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      return cachedData;
    } else {
      const newData = await this.speciesService.findOne(speciesId);

      await this.cacheService.set(key, newData, appConfig.CACHE_TIME);
      return newData;
    }
  }
}
