import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiTags } from '@nestjs/swagger';
import { FindAllFilmsSwagger, FindOneFilmSwagger } from './films.swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

const CACHE_TIME = 1000 * 60 * 60 * 24;

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(
    private filmsService: FilmsService,
    @Inject(CACHE_MANAGER) private readonly cacheService: CacheStore,
  ) {}

  @Get('/')
  @FindAllFilmsSwagger()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    const key = `get_films_${pageNumber}_${pageSize}`;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      return cachedData;
    } else {
      const newData = await this.filmsService.findAll(+pageNumber, +pageSize);

      await this.cacheService.set(key, newData, CACHE_TIME);

      return newData;
    }
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('get_unique_words_key')
  @CacheTTL(CACHE_TIME)
  @Get('find-unique-words-from-opening-crawls')
  async findUniqueWordsFromOpeningCrawls() {
    return await this.filmsService.findUniqueWordsFromOpeningCrawls();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('get_frequent_name_key')
  @CacheTTL(CACHE_TIME)
  @Get('find-most-frequent-name')
  async findMostFrequentName() {
    return await this.filmsService.findMostFrequentName();
  }

  @Get(':filmId')
  @FindOneFilmSwagger()
  async findOne(@Param('filmId') filmId: number) {
    const key = `get_vehicle:${filmId}`;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      return cachedData;
    } else {
      const newData = await this.filmsService.findOne(filmId);
      await this.cacheService.set(key, newData, CACHE_TIME);
      return newData;
    }
  }
}
