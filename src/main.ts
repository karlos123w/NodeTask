import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('StarWars document')
    .setDescription('The Star Wars API description')
    .setVersion('1.0')
    .addTag('StarWars')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3009, async () => {
    console.log('Server listening on port: 3009');
  });
}
bootstrap();
