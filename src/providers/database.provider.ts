import { Prisma, PrismaClient } from '@prisma/client';
import { SignaleLogger } from '@/providers/logger.provider.js';
import { StringUtil } from '@/utils/string.util.js';
import { config } from '@/providers/config.provider.js';
import { generateID } from '@/providers/nanoid.provider.js';
import { getExternalSignedURL } from '@/utils/response.util.js';

const logger = SignaleLogger('Prisma');
const log: (Prisma.LogLevel | Prisma.LogDefinition)[] = [
  {
    emit: 'event',
    level: 'query',
  },
  {
    emit: 'stdout',
    level: 'error',
  },
  {
    emit: 'stdout',
    level: 'warn',
  },
];

if (config.IS_TESTING === false) {
  log.push({
    emit: 'stdout',
    level: 'info',
  });
}

const prismaWriteConnection: PrismaClient<Prisma.PrismaClientOptions, 'query'> =
  new PrismaClient({
    log,
    datasources: {
      db: {
        url: config.DATABASE_URL,
      },
    },
  });

const prismaReadConnection: PrismaClient<Prisma.PrismaClientOptions, 'query'> =
  new PrismaClient({
    log,
    datasources: {
      db: {
        url: config.DATABASE_READ_REPLICA_URL,
      },
    },
  });

const displayLog = (event: Prisma.QueryEvent) => {
  const { query, params, duration } = event;

  logger.debug({
    query,
    params,
    duration: `${duration}ms`,
  });
};

if (config.IS_DEVELOPMENT) {
  prismaWriteConnection.$on('query', displayLog);
  prismaReadConnection.$on('query', displayLog);
}

const middleware = async (params: Prisma.MiddlewareParams, next) => {
  if (
    ['create', 'createMany', 'upsert'].includes(params.action) &&
    (params.args.data || params.args.create)
  ) {
    let data: any[] = [];
    if (params.args.create && params.action === 'upsert') {
      data = [params.args.create];
    } else if (params.args.data.constructor === Array) {
      data = params.args.data;
    } else {
      data = [params.args.data];
    }

    for (const d of data) {
      if (params.model) {
        d.ID = generateID(StringUtil.SnakeCase(params.model));
      }
    }
  }

  const result = await next(params);
  await getExternalSignedURL(result);
  return result;
};

prismaWriteConnection.$use(middleware);
prismaReadConnection.$use(middleware);

// prismaWriteConnection.$use(
//   fieldEncryptionMiddleware({
//     encryptionKey: config.DATABASE_ENCRYPTION_KEY,
//   })
// );

export const database = {
  write: prismaWriteConnection,
  read: prismaReadConnection,
};
