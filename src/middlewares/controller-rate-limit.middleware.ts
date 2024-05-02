import { Middleware } from '@decorators/express';
import { HttpStatus } from '@enums/http-status.enum';
import { TooManyRequestsException } from '@exceptions/http-exception';
import { ErrorResponse } from '@interfaces/errors';
import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@interfaces/express.interface';
import { redis } from '@providers/redis.provider';
import { dayjs } from '@utils/dayjs.util';
import rateLimit, { Options } from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';

export function ControllerRateLimit(options?: Partial<Pick<Options, 'windowMs' | 'max'>>): any {
  abstract class ValidationMiddlewareClass implements Middleware {
    public use(request: ExpressRequest, response: ExpressResponse, next: ExpressNextFunction) {
      const { windowMs = dayjs.duration(1, 'minute').asMilliseconds(), max = 60 } = options;

      return rateLimit({
        store: new RateLimitRedis({
          sendCommand: (...args: string[]) => (redis as any).call(...args),
          prefix: 'ControllerRateLimit',
        }),
        max,
        windowMs,
        standardHeaders: true,
        skipSuccessfulRequests: true,
        handler: (request, response: ExpressResponse) => {
          const instance = new TooManyRequestsException(`You're trying that too often`);

          return response.status(HttpStatus.TooManyRequests).json({
            error: {
              code: instance.code,
              message: instance.message,
            } as ErrorResponse,
            metadata: {
              statusCode: HttpStatus.TooManyRequests,
              resource: request.originalUrl,
              timestamp: dayjs().utc().format(),
              requestID: request.id,
            },
          });
        },
      })(request, response, next);
    }
  }
  return ValidationMiddlewareClass;
}
