import { ExpressRequest } from '@interfaces/express.interface';

export const serializeSortQueries = (request: ExpressRequest) => {
  const sort = request.query.sort as string;

  if (!sort) {
    return null;
  }

  const order = {};

  const sortKeys: string[] = Array.isArray(sort) ? sort : [sort];

  for (const sortKey of sortKeys) {
    const [key, value] = sortKey.split('.');

    if (!key || !value) {
      continue;
    }
    order[key] = value;
  }

  return order;
};
