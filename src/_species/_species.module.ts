import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './_species.controller';

@Module({
  providers: [SpeciesService],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
