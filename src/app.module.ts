import {
  HttpStatus,
  MiddlewareConsumer,
  Module,
  ValidationPipe
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { UsersModule } from './users/users.module';
import { envVariablesValidationSchema } from './utils/config/envValidation.schema';
import { LoggerExceptionFilter } from './utils/logger/filters/loggerException.filter';
import { LoggerModule } from './utils/logger/logger.module';
import { RequestTimingMiddleware } from './utils/middlewares/requestTiming.middleware';
import { WorkersModule } from './workers/workers.module';
import { ProductsModule } from './products/products.module';
import { DepartmentsModule } from './departments/departments.module';
import { BonusModule } from './bonus/bonus.module';
import { ProductPriceModule } from './product-price/product-price.module';
import { ProductionModule } from './production/production.module';
import { UnauthorizedFilter } from './auth/filters/un-auth.filter';
import { FallBackModule } from './fall-back/fall-back.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envVariablesValidationSchema,
      isGlobal: true,
      expandVariables: true
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
    WorkersModule,
    ProductsModule,
    DepartmentsModule,
    BonusModule,
    ProductPriceModule,
    ProductionModule,
    FallBackModule
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
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedFilter
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestTimingMiddleware).forRoutes('*');
  }
}
