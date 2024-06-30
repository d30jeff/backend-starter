import { ExpressRequest } from '@/interfaces/express.interface.js';

export const getFormattedPath = (request: ExpressRequest): string => {
  return [request.baseUrl, request.path]
    .filter((path) => {
      return Boolean(path);
    })
    .join('');
};
