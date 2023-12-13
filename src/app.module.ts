import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
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
import { PlanetsService } from './_planets/planets.service';
import { PlanetsModule } from './_planets/planets.module';
import { PlanetsController } from './_planets/planets.controller';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import * as redisStore from 'cache-manager-redis-store';
// import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          password: 'VBNUcMLTxY443pKheVWl8olsZ0VleZHF',
          socket: {
            host: 'redis-16098.c55.eu-central-1-1.ec2.cloud.redislabs.com',
            port: 16098,
          },
        }),
      }),
    }),
    FilmsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipsModule,
    PlanetsModule,
  ],
  controllers: [AppController, VehiclesController, PlanetsController],
  providers: [
    AppService,
    FilmsService,
    VehiclesService,
    StarshipsService,
    PlanetsService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
