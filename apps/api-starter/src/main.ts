// import { createClient } from 'redis';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as nA from 'next-auth/jwt';
// import * as session from 'express-session';
// import * as connectRedis from 'connect-redis';

import { AppModule } from './app/app.module';
import { GlobalConfigService } from './app/config/services/global.config';
import { CookiesConfigService } from './app/config/services/cookies.config';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  // const RedisStore = connectRedis(session);
  const prisma = new PrismaClient();

  //
  const app = await NestFactory.create(AppModule);
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

  app.use(cookieParser('cookies_secret'));
  app.use((req, res, next) => {
    const token = req.cookies['next-auth.session-token'];
    // console.log({ token: token.length });

    // const clean = nA
    //   .getToken({ req, secret: 'cookies_secret' })
    //   .then((t) => console.log({ t }))
    //   .catch((e) => console.log({ e }));
    // console.log({ clean });


    // const decoded = jwt.decode(token);

    next();
  });
  // app.use(cookieParser(cookiesConfigService.cookieSigningKey));
  app.use(cookieParser('cookies_secret'));

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
  //     // store: new RedisStore({ client: redisClient }),
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
