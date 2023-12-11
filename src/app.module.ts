import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsService } from './_films/films.service';
import { FilmsModule } from './_films/films.module';
import { SpeciesModule } from './_species/_species.module';

@Module({
  imports: [FilmsModule, SpeciesModule],
  controllers: [AppController],
  providers: [AppService, FilmsService],
})
export class AppModule {}
