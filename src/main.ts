import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Komlekdam Backend')
    .setDescription('Komlekdam backend nest js + swagger')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          field: error.property,
          errorMessage: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException({
          fieldError: result,
          errorType: 'Bad Request',
          statusCode: 400,
        });
      },
      stopAtFirstError: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
