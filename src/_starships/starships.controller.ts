import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import {
  FindAllStarsipsSwagger,
  FindOneStarshipSwagger,
} from './starships.swagger';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

const CACHE_TIME = 1000 * 60 * 60 * 24;

@Controller('starships')
export class StarshipsController {
  constructor(
    private starshipsService: StarshipsService,
    @Inject(CACHE_MANAGER) private readonly cacheService: CacheStore,
  ) {}

  @Get('/')
  @FindAllStarsipsSwagger()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    const key = `get_starships_${pageNumber}_${pageSize}`;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      return cachedData;
    } else {
      const newData = await this.starshipsService.findAll(
        +pageNumber,
        +pageSize,
      );

      await this.cacheService.set(key, newData, CACHE_TIME);

      return newData;
    }
  }

  @Get(':starshipId')
  @FindOneStarshipSwagger()
  async findOne(@Param('starshipId') starshipId: number) {
    const key = `get_starship:${starshipId}`;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      return cachedData;
    } else {
      const newData = await this.starshipsService.findOne(starshipId);

      await this.cacheService.set(key, newData, CACHE_TIME);
      return newData;
    }
  }
}
