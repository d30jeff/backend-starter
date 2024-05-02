// import { RedisKeys } from '@enums/redis-keys.enum';
import { redis } from '@providers/redis.provider';
import request from 'supertest';

export const createArray = (length: number) => {
  return new Array(length).fill(0);
};

export const resetRedis = async () => {
  await resetRedisByKey('*');
};

export const resetRedisByKey = async (pattern) => {
  const keys = await redis.keys(pattern);
  for (const key of keys) {
    await redis.del(key);
  }
};

export const expectSuccess = (endpoint: string, statusCode: number, response: request.Response) => {
  expect(response.statusCode).toBe(statusCode);
  expect(response.body.data).toBeDefined();
  expectMetadata(endpoint, response);
};

export const expectBody = (response: request.Response, data: any) => {
  expect(response.body.data).toEqual(expect.objectContaining(data));
};

export const expectError = (endpoint: string, statusCode: number, response: request.Response) => {
  expect(response.statusCode).toBe(statusCode);
  expect(response.body.error).toBeDefined();
  expect(response.body.error.code).toBeDefined();
  expect(response.body.error.message).toBeDefined();
  expectMetadata(endpoint, response);
};

export const expectMetadata = (endpoint: string, response: request.Response) => {
  expect(response.body.metadata).toBeDefined();
  expect(response.body.metadata.requestID).toBeDefined();
  expect(response.body.metadata.timestamp).toBeDefined();
  expect(response.body.metadata.resource).toContain(endpoint);
};
