import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(2883, () => {
    console.log('Listening on port 2883...');
  });
}
bootstrap();
