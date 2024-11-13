import {
  ExpressRequest,
  ExpressResponse,
} from '@/interfaces/express.interface.js';
import { SignaleLogger } from '@/providers/logger.provider.js';
import { dayjs } from '@/utils/dayjs.util.js';
import { getFormattedPath } from '@/utils/request.util.js';

const logger = SignaleLogger('Response Util');

export const responseInterceptor = async (
  data: any,
  request: ExpressRequest,
  response: ExpressResponse
) => {
  const timestamp = dayjs().utc().format();

  if (data && data.pagination) {
    response.setHeader('X-Page', data.pagination.page);
    response.setHeader('X-Limit', data.pagination.limit);
    response.setHeader('X-Total-Pages', data.pagination.totalPages);
    response.setHeader('X-Total-Results', data.pagination.totalResults);
  }

  return {
    data,
    metadata: {
      statusCode: response.statusCode,
      resource: getFormattedPath(request),
      timestamp,
      requestID: request.id,
    },
  };
};
