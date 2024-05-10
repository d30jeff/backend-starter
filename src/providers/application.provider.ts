require('source-map-support').install();
import { Container } from '@decorators/di';
import { ERROR_MIDDLEWARE, attachControllers } from '@decorators/express';
import { HttpStatus } from '@enums/http-status.enum';
import { Application } from '@interfaces/application.interface';
import { ExpressRequest } from '@interfaces/express.interface';
import { GlobalErrorMiddleware } from '@middlewares/error.middleware';
import { globalRateLimit } from '@middlewares/global-rate-limit.middleware';
import { globalSlowDown } from '@middlewares/global-slow-down.middleware';
import { config } from '@providers/config.provider';
import { SignaleLogger } from '@providers/logger.provider';
import { generateID } from '@providers/nanoid.provider';
import { redis } from '@providers/redis.provider';
import { dayjs } from '@utils/dayjs.util';
import { getFormattedPath } from '@utils/request.util';
import { responseInterceptor } from '@utils/response.util';
import { json, raw, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import mung from 'express-mung';
import requestID from 'express-request-id';
import session, { CookieOptions, SessionOptions } from 'express-session';
import useragent from 'express-useragent';
import helmet from 'helmet';
import morgan from 'morgan';
import { nanoid } from 'nanoid';
import 'reflect-metadata';

export const createApplication = async (
  params: Application.CreateApplicationParams
): Promise<Application.Instance> => {
  const { name, controllers, origin, staticPaths } = params;

  if (!name) {
    throw new Error('Application name is required');
  }

  const logger = SignaleLogger(name);
  const app = express();
  morgan.token('requestID', (req) => {
    return req.id;
  });

  app.use(
    urlencoded({
      extended: false,
      limit: '500kb',
    }),
    useragent.express(),
    compression(),
    helmet({
      contentSecurityPolicy: false,
      hidePoweredBy: true,
      noSniff: true,
    }),
    requestID({
      headerName: 'X-Request-ID',
    }),
    cookieParser(),
    cors({
      credentials: true,
      origin,
    })
  );

  if (config.IS_TESTING === false) {
    app.use(
      morgan('[:date[web]] :requestID :method :url :status - :response-time ms')
    );
  }

  app.set('trust proxy', 1);

  if (config.IS_DEVELOPMENT === false) {
    app.use(
      globalRateLimit({
        limit: 100,
        windowMs: dayjs.duration(1, 'minute').asMilliseconds(),
      })
    );

    app.use(
      globalSlowDown({
        delayAfter: 5,
      })
    );
  }

  app.use(mung.jsonAsync(responseInterceptor));

  const RedisStore = require('connect-redis')(session);

  const sessionOptions: SessionOptions = {
    name,
    store: new RedisStore({
      client: redis,
    }),
    secret: nanoid(255),
    resave: true,
    saveUninitialized: false,
    genid: (request: ExpressRequest) => {
      return generateID('session', 128);
    },
    cookie: {
      maxAge: dayjs.duration(8, 'hour').asMilliseconds(),
      httpOnly: true,
      secure: config.IS_DEVELOPMENT === false,
      sameSite: config.IS_DEVELOPMENT ? 'lax' : 'none',
    } as CookieOptions,
  };

  app.use(session(sessionOptions));
  app.use('/v1/webhooks/*', raw({ type: 'application/json' }));
  const router = Router();
  attachControllers(router, controllers);
  app.use(
    json({
      limit: '500kb',
    })
  );

  if (config.IS_PRODUCTION === false && staticPaths && staticPaths.length) {
    for (const { prefix, path } of staticPaths) {
      app.use(prefix, express.static(path));
    }
  }

  app.use('/v1', router);

  app.use((request: ExpressRequest, response, next) => {
    const timestamp = dayjs().utc().format();
    request.setTimeout(dayjs.duration(5, 'minutes').asMilliseconds(), () => {
      return response.status(408).json({
        error: {
          code: 'RequestTimedOut',
          message: 'Request Timed Out',
        },
        metadata: {
          statusCode: HttpStatus.RequestTimeout,
          resource: getFormattedPath(request),
          timestamp,
          requestID: request.id,
        },
      });
    });
    next();
  });

  Container.provide([
    { provide: ERROR_MIDDLEWARE, useClass: GlobalErrorMiddleware },
  ]);

  app.use((request: ExpressRequest, response, next) => {
    return response.status(HttpStatus.NotFound).json({
      error: {
        code: 'RouteNotFound',
        message: 'Route Not Found',
      },
      metadata: {
        statusCode: HttpStatus.NotFound,
        resource: getFormattedPath(request),
        timestamp: dayjs().utc().format(),
        requestID: request.id,
      },
    });
  });

  return {
    app,
    logger,
  };
};
