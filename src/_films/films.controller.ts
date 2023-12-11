import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all films',
    description: 'Get a list of all films',
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
    return await this.filmsService.findAll(pageNumber, pageSize);
  }

  @Get(':filmId')
  @ApiOperation({
    summary: 'Get a single film',
    description: 'Get details for a specific film',
  })
  @ApiParam({ name: 'filmId', type: Number, description: 'Film ID ' })
  // @ApiG
  async findOne(@Param('filmId') filmId: number) {
    return await this.filmsService.findOne(filmId);
  }
}
