import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as passport from 'passport';
import * as session from 'express-session';

// https://github.com/jdesboeufs/connect-mongo/issues/446#issuecomment-986074165
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoStore = require('connect-mongo');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // Authentication & Session
  app.use(
    session({
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }), // where session will be stored
      secret: process.env.SESSION_SECRET, // to sign session id
      resave: false, // will default to false in near future: https://github.com/expressjs/session#resave
      saveUninitialized: false, // will default to false in near future: https://github.com/expressjs/session#saveuninitialized
      rolling: true, // keep session alive
      cookie: {
        maxAge: 30 * 60 * 1000, // session expires in 1hr, refreshed by `rolling: true` option.
        httpOnly: true, // so that cookie can't be accessed via client-side script
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  Logger.log(`Listening on port ${port}...`);
  await app.listen(port);
}
bootstrap();
