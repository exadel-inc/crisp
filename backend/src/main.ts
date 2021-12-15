import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as rateLimit from 'fastify-rate-limit';
import * as multipart from 'fastify-multipart';
import * as compress from 'fastify-compress';
import * as helmet from 'fastify-helmet';

import { ConfigService } from './config';
import { AppModule } from './app.module';

import { TransformInterceptor } from './common/interceptors';
import { HttpExceptionFilter } from './common/filters';
import { errorParser } from './common/helpers/error-handling.helpers';
import { ResponseErrorTypeEnum } from './common/enums';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const transformInterceptor = new TransformInterceptor();
  const httpExceptionFilter = new HttpExceptionFilter();
  const validationPipe = new ValidationPipe({
    exceptionFactory: (errors) =>
      new BadRequestException({
        type: ResponseErrorTypeEnum.SCHEMA_VALIDATION_ERROR,
        errors: errorParser(errors),
      }),
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  });

  app.setGlobalPrefix(configService.get('PREFIX')).enableCors({
    credentials: configService.get('CORS_CREDENTIALS'),
    origin: configService.get('CORS_ORIGIN'),
  });

  app
    .register(compress.default, { encodings: ['gzip', 'deflate'] })
    .register(rateLimit.default, { max: 100 })
    .register(multipart.default)
    .register(helmet.default, {
      contentSecurityPolicy: false,
    });

  await app
    .useGlobalPipes(validationPipe)
    .useGlobalFilters(httpExceptionFilter)
    .useGlobalInterceptors(transformInterceptor)
    .listen(configService.get('PORT'), configService.get('HOST'));

  if (configService.get('SWAGGER_MODULE')) {
    const config = new DocumentBuilder()
      .setDescription(configService.get('npm_package_description'))
      .setVersion(configService.get('npm_package_version'))
      .setTitle(configService.get('npm_package_name'))
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);
  }
}

bootstrap();
