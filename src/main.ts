import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'node_modules', 'swagger-ui-dist'));

  app.enableCors({
    origin: [
      'https://back-music-lib-h2eggwera6hydgb3.eastus-01.azurewebsites.net',
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
  .setTitle('Music Library Backend')
  .setDescription('Api for music library application')
  .setVersion('0.1')
  .addServer('https://back-music-lib-h2eggwera6hydgb3.eastus-01.azurewebsites.net')
  .addServer('http://localhost:3000')
  .addBearerAuth()
  .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000);

}
bootstrap();
