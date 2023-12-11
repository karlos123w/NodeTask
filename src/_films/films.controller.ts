import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    return await this.filmsService.findAll(pageNumber, pageSize);
  }

  @Get(':filmId')
  async findOne(@Param('filmId') filmId: number) {
    return await this.filmsService.findOne(filmId);
  }
}