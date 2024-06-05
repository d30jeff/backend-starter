import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@/interfaces/express.interface.js';
import { Middleware } from '@decorators/express';
import { Options, slowDown } from 'express-slow-down';
import { dayjs } from '@/utils/dayjs.util.js';
import { redis } from '@/providers/redis.provider.js';
import RateLimitRedis from 'rate-limit-redis';

export function ControllerSlowDown(
  options?: Partial<Pick<Options, 'delayAfter' | 'maxDelayMs'>>
): any {
  abstract class ValidationMiddlewareClass implements Middleware {
    public use(
      request: ExpressRequest,
      response: ExpressResponse,
      next: ExpressNextFunction
    ) {
      return slowDown({
        windowMs: dayjs.duration(10, 'minutes').asMilliseconds(),
        delayAfter: options?.delayAfter || 3,
        delayMs: (hits) => hits * 250,
        maxDelayMs:
          options?.maxDelayMs || dayjs.duration(3, 'seconds').asMilliseconds(),
        store: new RateLimitRedis({
          sendCommand: (...args: string[]) => (redis as any).call(...args),
          prefix: 'ControllerSlowDown',
        }),
      })(request, response, next);
    }
  }
  return ValidationMiddlewareClass;
}
