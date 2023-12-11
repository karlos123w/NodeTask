import { Controller, Get, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';

@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @Get()
  async findAll(
    @Query('pageNumber') pageNumber: number | undefined,
    @Query('pageSize') pageSize: number | undefined,
  ) {
    return await this.speciesService.findAll(pageNumber, pageSize);
  }

//   @Get(':speciesId') 
//   asyn
}
