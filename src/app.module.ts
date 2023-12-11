import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsService } from './_films/films.service';
import { FilmsModule } from './_films/films.module';

@Module({
  imports: [FilmsModule],
  controllers: [AppController],
  providers: [AppService, FilmsService],
})
export class AppModule {}
