import { ExpressRequest } from '@/interfaces/express.interface.js';

export const getFormattedPath = (request: ExpressRequest) => {
  return [request.baseUrl, request.path]
    .filter((path) => {
      return Boolean(path);
    })
    .join('');
};
