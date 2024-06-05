import { Options, slowDown } from 'express-slow-down';
import { dayjs } from '@/utils/dayjs.util.js';
import { redis } from '@/providers/redis.provider.js';
import RateLimitRedis from 'rate-limit-redis';

export const globalSlowDown = (options: Pick<Options, 'delayAfter'>) => {
  const { delayAfter = 5 } = options;

  return slowDown({
    windowMs: dayjs.duration(10, 'minutes').asMilliseconds(),
    delayAfter,
    delayMs: (hits) => hits * 250,
    maxDelayMs: dayjs.duration(3, 'seconds').asMilliseconds(),
    store: new RateLimitRedis({
      sendCommand: (...args: string[]) => (redis as any).call(...args),
      prefix: 'GlobalSlowDown',
    }),
  });
};
