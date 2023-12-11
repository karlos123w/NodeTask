import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';

@Module({
  imports: [],
  providers: [StarshipsService],
  exports: [StarshipsService],
  controllers: [StarshipsController],
})
export class StarshipsModule {}
