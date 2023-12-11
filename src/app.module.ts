import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsService } from './_films/films.service';
import { FilmsModule } from './_films/films.module';
import { SpeciesModule } from './_species/_species.module';
import { VehiclesController } from './_vehicles/_vehicles.controller';
import { VehiclesService } from './_vehicles/_vehicles.service';
import { VehiclesModule } from './_vehicles/_vehicles.module';

@Module({
  imports: [FilmsModule, SpeciesModule, VehiclesModule],
  controllers: [AppController, VehiclesController],
  providers: [AppService, FilmsService, VehiclesService],
})
export class AppModule {}
