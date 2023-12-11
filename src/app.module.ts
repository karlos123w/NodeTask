import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsService } from './_films/films.service';
import { FilmsModule } from './_films/films.module';
import { SpeciesModule } from './_species/species.module';
import { VehiclesController } from './_vehicles/vehicles.controller';
import { VehiclesService } from './_vehicles/vehicles.service';
import { VehiclesModule } from './_vehicles/vehicles.module';
import { StarshipsService } from './_starships/starships.service';
import { StarshipsModule } from './_starships/starships.module';

@Module({
  imports: [FilmsModule, SpeciesModule, VehiclesModule, StarshipsModule],
  controllers: [AppController, VehiclesController],
  providers: [AppService, FilmsService, VehiclesService, StarshipsService],
})
export class AppModule {}
