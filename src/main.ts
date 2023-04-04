import { LoggerService } from './logger/logger.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './shared/base';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { CustomException } from './exceptions/custom.exception';
import { ERROR_MESSAGE } from './shared/constants';
import { PrismaInterceptor } from './interceptors/prisma.interceptor';
import { UserRegisterDto, TokenResponseDto } from './auth/dtos';
import { ResponseDto, ResponsePaginationDto } from './shared/base';
import helmet from 'helmet';
import * as compression from 'compression';
import { ProgressDailyResponseDto } from './modules/goal/dtos';
import { UserByIdResponseDto, UsersResponseDto } from './modules/user/dtos';
import { GraphResponseDto, GraphTypeDto } from './modules/graph/dtos';
import { ExercisesResponseDto } from './modules/exercise/dtos';
import { DiariesResponseDto } from './modules/diary/dtos';

dotenv.config();

function errorMap(error: ValidationError) {
  if (error.children) {
    return {
      field: error.property,
      message: [
        ...error.children.map(errorMap),
        ...Object.values(error.constraints || []),
      ],
    };
  }
  return {
    field: error.property,
    message: error.constraints,
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, {
          key: ERROR_MESSAGE.VALIDATION_ENTITY_ERROR.key,
          message: ERROR_MESSAGE.VALIDATION_ENTITY_ERROR.message,
          errors: validationErrors.map(errorMap),
        });
      },
    }),
  );

  app.use(helmet());
  app.use(compression());
  app.useGlobalInterceptors(new PrismaInterceptor());
  app.setGlobalPrefix(process.env.PREFIX_API);

  // setup prisma client service when server off
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // setup docs api
  const options = new DocumentBuilder()
    .setTitle('Health app')
    .setDescription('Arent test health app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [
      ResponsePaginationDto,
      ResponseDto,
      UserRegisterDto,
      TokenResponseDto,
      UsersResponseDto,
      ProgressDailyResponseDto,
      UserByIdResponseDto,
      GraphResponseDto,
      GraphTypeDto,
      ExercisesResponseDto,
      DiariesResponseDto,
    ],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
