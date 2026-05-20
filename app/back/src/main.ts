import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const serviceAccountPath = join(
    process.cwd(),
    'firebase-service-account.json',
  );

  const serviceAccount = serviceAccountPath as admin.ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const app = await NestFactory.create(AppModule);

  // Verificador Global de Requisições
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();
  await app.listen(3000);
}

bootstrap().catch((err) => console.error(err));
