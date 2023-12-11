import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { FindAllPlanetsSwagger, FindOnePlanetSwagger } from './planets.swagger';

@Controller('planets')
export class PlanetsController {
  constructor(private planetsService: PlanetsService) {}

  @Get('/')
  @FindAllPlanetsSwagger()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    return await this.planetsService.findAll(+pageNumber, +pageSize);
  }

  @Get(':planetId')
  @FindOnePlanetSwagger()
  async findOne(@Param('planetId') planetId: number) {
    return await this.planetsService.findOne(planetId);
  }
}
