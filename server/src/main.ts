import { config } from 'dotenv';
config();

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cnad from '@bitc/cnad';
import { AllExceptionsFilter } from './logger/error.filter';

cnad.config(process.env.CPANEL_DIR);

async function bootstrap() {
  cnad.start();

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
