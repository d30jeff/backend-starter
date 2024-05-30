import { Redis } from '@services/redis/redis.interface';
import { Service } from 'typedi';
import { redis } from '@providers/redis.provider';

@Service()
export class RedisService {
  set(params: Redis.CreateParams) {
    const { type, ID, value, ttl = 60 } = params;
    const key = `${type.toString().trim()}:${ID.trim()}`;

    if (ttl) {
      return redis.set(key, JSON.stringify(value), 'EX', ttl);
    }

    return redis.set(key, JSON.stringify(value));
  }

  setex(params: Redis.CreateParams) {
    const { type, ID, value, ttl = 60 } = params;
    const key = `${type.toString().trim()}:${ID.trim()}`;
    return redis.setex(key, ttl, JSON.stringify(value));
  }

  async get(params: Redis.FindParams) {
    const { type, ID } = params;
    const key = `${type.toString().trim()}:${ID.trim()}`;
    const value = await redis.get(key);
    return JSON.parse(value);
  }

  async getTTL(params: Redis.GetTTLParams) {
    const { type, ID } = params;
    const key = `${type.toString().trim()}:${ID.trim()}`;
    return redis.ttl(key);
  }

  delete(params: Redis.DeleteParams) {
    const { type, ID } = params;
    const key = `${type.toString().trim()}:${ID.trim()}`;
    return redis.del(key);
  }
}
