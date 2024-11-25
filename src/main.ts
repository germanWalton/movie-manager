import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENVIRONMENT } from './_config/constants/environment.constant';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Movies API')
    .setDescription('API to manage movies')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const app = await NestFactory.create(AppModule, { cors: true });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(ENVIRONMENT.PORT);
}
bootstrap();
