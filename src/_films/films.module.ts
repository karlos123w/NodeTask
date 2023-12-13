import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [FilmsService],
  exports: [FilmsService],
  controllers: [FilmsController],
})
export class FilmsModule {}
