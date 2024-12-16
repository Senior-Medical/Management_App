import {
  HttpStatus,
  MiddlewareConsumer,
  Module,
  ValidationPipe
} from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envVariablesValidationSchema } from './utils/shared/config/envValidation.schema';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './utils/logger/logger.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { LoggerExceptionFilter } from './utils/logger/filters/loggerException.filter';
import { RequestTimingMiddleware } from './utils/shared/middlewares/requestTiming.middleware';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envVariablesValidationSchema,
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [{
        ttl: configService.get<number>("THROTTLE_TTL"),
        limit: configService.get<number>("THROTTLE_LIMIT")
      }],
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("DB_URI")
      }),
      inject: [ConfigService]
    }),
    LoggerModule,
    AuthModule,
    UsersModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      })
    },
    {
      provide: APP_FILTER,
      useClass: LoggerExceptionFilter
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestTimingMiddleware).forRoutes('*');
  }
}
