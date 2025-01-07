import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from './utils/logger/logger.service';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3000;
  const host = configService.get<string>("HOST") || "localhost";
  const baseUrl = `http://${host}:${port}`;

  app.useLogger(app.get(CustomLoggerService));
  app.use(helmet());
  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: Boolean (configService.get<string>('SESSION_RESAVE')),
      saveUninitialized: Boolean (configService.get<string>('SESSION_SAVE_UNINITIALIZED')),
      cookie: { maxAge: +configService.get<string>('SESSION_MAX_AGE') }
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Set the view engine to EJS
  app.setViewEngine('ejs');

  // Set the directory for EJS templates
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));

  // Serve static assets (optional, for serving CSS/JS files)
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  await app.listen(port, () => {
    Logger.log(`Server listen on URL: ${baseUrl}`, 'Bootstrap');
  });
}
bootstrap();
