import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { join } from 'path';

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

  app.enableCors();

  await app.listen(3000);
}

bootstrap().catch((err) => console.error(err));
