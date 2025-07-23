import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS so frontend at port 3001 can make requests
  app.enableCors({
    origin: 'http://localhost:3001', // your frontend's port
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
