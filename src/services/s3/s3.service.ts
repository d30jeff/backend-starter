import { CustomLogger, Logger } from '@/providers/logger.provider.js';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@/exceptions/http-exception.js';
import { Redis } from '@/services/redis/redis.interface.js';
import { RedisService } from '@/services/redis/redis.service.js';
import { S3 } from '@/services/s3/s3.interface.js';
import { config } from '@/providers/config.provider.js';
import { dayjs } from '@/utils/dayjs.util.js';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { nanoid } from 'nanoid';
import { typeToExtension } from '@/utils/mime-types.util.js';

const client = new S3Client({
  apiVersion: 'v4',
  credentials: {
    accessKeyId: config.S3_ACCESS_KEY,
    secretAccessKey: config.S3_SECRET_KEY,
  },
  region: config.S3_REGION,
});

export class S3Service {
  @Logger()
  private readonly logger: CustomLogger;
  constructor(private readonly redisService: RedisService) {}

  async initialize() {}

  async validateObjectByKey(key: string) {
    try {
      await client.send(
        new GetObjectCommand({
          Bucket: config.S3_BUCKET,
          Key: key,
        })
      );
    } catch (error) {
      if (error && error.Code === 'NoSuchKey') {
        throw new NotFoundException('Image Not Found', 'IMAGE_NOT_FOUND');
      } else {
        this.logger.fatal(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async createSignedReadURL(key: string) {
    const cache = await this.redisService.get({
      ID: key,
      type: Redis.Keys.S3SignedURL,
    });

    if (cache) {
      this.logger.info('S3 Signed Read URL cache hit');
      return cache;
    }

    await this.validateObjectByKey(key);

    const url = await getSignedUrl(
      client,
      new GetObjectCommand({
        Bucket: config.S3_BUCKET,
        Key: key,
      }),
      {
        expiresIn: dayjs.duration(90, 'minutes').asSeconds(),
      }
    );

    this.redisService
      .set({
        ID: key,
        ttl: dayjs.duration(80, 'minutes').asSeconds(),
        type: Redis.Keys.S3SignedURL,
        value: url,
      })
      .catch((error) => {
        this.logger.fatal('Failed to cache S3 Signed URL', error);
      });

    return url;
  }

  async createSignedUploadURL(params: S3.CreatePutSignedURL.Params) {
    const { mimetype, size, accountID } = params;

    const extension = typeToExtension(mimetype);

    if (!extension) {
      throw new S3.Exceptions.UnknownMIMEType();
    }

    const key = `${module}/${accountID}/${nanoid()}.${extension}`;

    const uploadURL = await getSignedUrl(
      client,
      new PutObjectCommand({
        Bucket: config.S3_BUCKET,
        ContentLength: size,
        ContentType: mimetype,
        Key: key,
      }),
      {
        expiresIn: dayjs.duration(10, 'minutes').asSeconds(),
      }
    );

    return {
      key,
      mimetype,
      uploadURL,
    };
  }

  async upload(params: S3.UploadParams): Promise<string> {
    const { mimetype, data, accountID } = params;

    const key = `${module}/${accountID}/${nanoid()}.${typeToExtension(
      mimetype
    )}`;

    await client.send(
      new PutObjectCommand({
        Body: data,
        Bucket: config.S3_BUCKET,
        Key: key,
      })
    );

    return key;
  }
}
