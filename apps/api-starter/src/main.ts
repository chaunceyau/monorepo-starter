import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
// import * as session from 'express-session';

import { AppModule } from './app/app.module';
import { GlobalConfigService } from './app/config/services/global.config';
import { CookiesConfigService } from './app/config/services/cookies.config';
import { CustomLogger } from './app/common/logger';

async function bootstrap() {

  //
  const app = await NestFactory.create(AppModule, {
    logger: CustomLogger
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  //
  const globalConfigService = app.get(GlobalConfigService);
  const cookiesConfigService = app.get(CookiesConfigService);

  app.enableCors(globalConfigService.corsConfig);
  app.use(helmet());

  if (!globalConfigService.inDevelopment) {
    // @ts-ignore
    app.set('trust proxy', 1); // trust first proxy
  }

  app.use(cookieParser(cookiesConfigService.cookieSigningKey));

  // app.use(
  //   session({
  //     secret: cookiesConfigService.cookieSigningKey,
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       secure: false,
  //       httpOnly: false,
  //       domain: 'localhost',
  //       maxAge: 60 * 60 * 60 * 60,
  //     },
  //   })
  // );

  app.use(passport.initialize());
  app.use(passport.session());

  // TODO: instead of csurf, let's enforce JSON only communication?
  // 👀 potential problem - multipart form data?
  // https://github.com/pillarjs/understanding-csrf
  // app.use(csurf())

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(globalConfigService.port, () => {
    Logger.log(
      'Listening at http://localhost:' +
        globalConfigService.port +
        '/' +
        globalPrefix
    );
  });
}

bootstrap();
