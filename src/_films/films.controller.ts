import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiTags } from '@nestjs/swagger';
import { FindAllFilmsSwagger, FindOneFilmSwagger } from './films.swagger';

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get('/')
  @FindAllFilmsSwagger()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    return await this.filmsService.findAll(+pageNumber, +pageSize);
  }

  @Get('find-unique-words-from-opening-crawls')
  async findUniqueWordsFromOpeningCrawls() {
    return await this.filmsService.findUniqueWordsFromOpeningCrawls();
  }

  @Get('find-most-frequent-name')
  async findMostFrequentName() {
    return await this.filmsService.findMostFrequentName();
  }

  @Get(':filmId')
  @FindOneFilmSwagger()
  async findOne(@Param('filmId') filmId: number) {
    return await this.filmsService.findOne(filmId);
  }
}
