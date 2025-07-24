import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for both local and production frontends
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://aisel-patient-frontend.vercel.app',
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
