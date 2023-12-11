import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
  imports: [],
  providers: [FilmsService],
  exports: [FilmsService],
  controllers: [FilmsController],
})
export class FilmsModule {}
