import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FindAllSpeciesSwagger,
  FindOneSpeciesSwagger,
} from './species.swagger';

@ApiTags('Species')
@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @Get('/')
  @FindAllSpeciesSwagger()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    return await this.speciesService.findAll(+pageNumber, +pageSize);
  }

  @Get(':speciesId')
  @FindOneSpeciesSwagger()
  async findOne(@Param('speciesId') speciesId: number) {
    return await this.speciesService.findOne(speciesId);
  }
}
