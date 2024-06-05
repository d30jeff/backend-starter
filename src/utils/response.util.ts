import {
  ExpressRequest,
  ExpressResponse,
} from '@/interfaces/express.interface.js';
import { SignaleLogger } from '@/providers/logger.provider.js';
import { dayjs } from '@/utils/dayjs.util.js';
import { getFormattedPath } from '@/utils/request.util.js';

// const aliOSSService = Container.get(AliOSSService);
const logger = SignaleLogger('Response Util');

export const getExternalSignedURL = async (data: any) => {
  return new Promise<void | void[]>(async (resolve, reject) => {
    if (!data) {
      logger.info('Invalid data');
      return resolve();
    }

    for (const [key, value] of Object.entries<any>(data)) {
      if (!value) {
        continue;
      }

      if (
        key === 'pictureURI' ||
        key === 'labelURI' ||
        key === 'documentURI' ||
        key === 'videoURI' ||
        key === 'commercialInvoiceURI'
      ) {
        logger.info(`${key} found...`);
        try {
          // const url = await aliOSSService.createSignedReadURL(value as string);
          if (key === 'pictureURI') {
            // data.pictureURL = url;
          } else if (key === 'labelURI') {
            // data.labelURL = url;
          } else if (key === 'documentURI') {
            // data.documentURL = url;
          } else if (key === 'videoURI') {
            // data.videoURL = url;
          } else if (key === 'commercialInvoiceURI') {
            // data.commercialInvoiceURL = url;
          }
        } catch (error) {
          logger.fatal(error);
        }
      } else {
        if (value.constructor === Object) {
          await getExternalSignedURL(value);
        } else if (value.constructor === Array) {
          await Promise.all(
            (value as unknown[] as any).map((v) => {
              return getExternalSignedURL(v);
            })
          );
        }
      }
    }
    return resolve();
  });
};

export const responseInterceptor = async (
  data: any,
  request: ExpressRequest,
  response: ExpressResponse
) => {
  const timestamp = dayjs().utc().format();

  if (data && data.pagination) {
    response.setHeader('X-Page', data.pagination.page);
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
