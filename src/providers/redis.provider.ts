import { Redis } from 'ioredis';
import { config } from '@/providers/config.provider.js';

export const redis = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
});
