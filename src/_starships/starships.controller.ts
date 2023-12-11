import { Controller, Get, Param, Query } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import {
  FindAllStarsipsSwagger,
  FindOneStarshipSwagger,
} from './starships.swagger';

@Controller('starships')
export class StarshipsController {
  constructor(private starshipsService: StarshipsService) {}

  @Get('/')
  @FindAllStarsipsSwagger()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    return await this.starshipsService.findAll(+pageNumber, +pageSize);
  }

  @Get(':starshipId')
  @FindOneStarshipSwagger()
  async findOne(@Param('starshipId') starshipId: number) {
    return await this.starshipsService.findOne(starshipId);
  }
}
