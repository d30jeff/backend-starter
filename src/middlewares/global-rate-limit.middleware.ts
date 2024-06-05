import { ErrorResponse } from '@/interfaces/errors.js';
import { Response } from 'express';
import { TooManyRequestsException } from '@/exceptions/http-exception.js';
import { dayjs } from '@/utils/dayjs.util.js';
import { redis } from '@/providers/redis.provider.js';
import RateLimitRedis from 'rate-limit-redis';
import rateLimit, { Options } from 'express-rate-limit';

export const globalRateLimit = (
  options: Pick<Options, 'windowMs' | 'limit'>
) => {
  const {
    windowMs = dayjs.duration(1, 'minute').asMilliseconds(),
    limit = 60,
  } = options;

  return rateLimit({
    store: new RateLimitRedis({
      sendCommand: (...args: string[]) => (redis as any).call(...args),
      prefix: 'GlobalRateLimit',
    }),
    limit,
    windowMs,
    standardHeaders: true,
    skipSuccessfulRequests: true,
    handler: (request, response: Response) => {
      const instance = new TooManyRequestsException(
        `You're trying that too often`
      );
      return response.status(429).json({
        error: {
          code: instance.code,
          message: instance.message,
        } as ErrorResponse,
        metadata: {
          statusCode: 400,
          resource: request.originalUrl,
          timestamp: dayjs().utc().format(),
          requestID: request.id,
        },
      });
    },
  });
};
