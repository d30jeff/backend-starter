import { Cat, Prisma } from '@prisma/client';
import { Injectable } from '@decorators/di';
import { database } from '@/providers/database.provider.js';

const fields = {
  ID: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CatSelect;

export const CatPublicSelect = fields;
export type CatPublicSelect = typeof CatPublicSelect;

export type CatWithPublicFields = Prisma.CatGetPayload<{
  select: typeof CatPublicSelect;
}>;

export const CatPrivateSelect = { ...fields } satisfies Prisma.CatSelect;
export type CatPrivateSelect = typeof CatPrivateSelect;

export type CatWithPrivateFields = Prisma.CatGetPayload<{
  select: typeof CatPrivateSelect;
}>;

type CustomReturnType<T extends Prisma.CatFindFirstArgs['select']> =
  T extends CatPrivateSelect
    ? CatWithPrivateFields
    : T extends CatPublicSelect
      ? CatWithPublicFields
      : Cat;

@Injectable()
export class CatRepository {
  aggregate(
    params: Prisma.CatAggregateArgs,
    connection: Prisma.TransactionClient = database.read
  ) {
    return connection.cat.aggregate(params);
  }

  upsert<T>(
    params: Prisma.CatUpsertArgs,
    connection: Prisma.TransactionClient = database.write
  ): Promise<CustomReturnType<T>> {
    return connection.cat.upsert(params) as unknown as Promise<
      CustomReturnType<T>
    >;
  }

  create<T>(
    params: Omit<Prisma.CatCreateArgs, 'data'> & {
      data?: Omit<Prisma.CatCreateInput, 'ID'> & { ID?: string };
    },
    connection: Prisma.TransactionClient = database.write
  ): Promise<CustomReturnType<T>> {
    return connection.cat.create(
      params as Prisma.CatCreateArgs
    ) as unknown as Promise<CustomReturnType<T>>;
  }

  createMany<T>(
    params: Omit<Prisma.CatCreateManyArgs, 'data'> & {
      data?: Array<Omit<Prisma.CatCreateManyInput, 'ID'> & { ID?: string }>;
    },
    connection: Prisma.TransactionClient = database.write
  ): Promise<Array<CustomReturnType<T>>> {
    return connection.cat.createMany(
      params as Prisma.CatCreateManyArgs
    ) as unknown as Promise<Array<CustomReturnType<T>>>;
  }

  findFirst<T>(
    params: Prisma.CatFindFirstArgs,
    connection: Prisma.TransactionClient = database.read
  ): Promise<CustomReturnType<T>> {
    return connection.cat.findFirst(params) as unknown as Promise<
      CustomReturnType<T>
    >;
  }

  findMany<T>(
    params: Prisma.CatFindManyArgs,
    connection: Prisma.TransactionClient = database.read
  ): Promise<Array<CustomReturnType<T>>> {
    return connection.cat.findMany(params) as unknown as Promise<
      Array<CustomReturnType<T>>
    >;
  }

  count(
    params: Prisma.CatCountArgs,
    connection: Prisma.TransactionClient = database.read
  ) {
    return connection.cat.count(params);
  }

  update<T>(
    params: Prisma.CatUpdateArgs,
    connection: Prisma.TransactionClient = database.write
  ): Promise<CustomReturnType<T>> {
    return connection.cat.update(params) as unknown as Promise<
      CustomReturnType<T>
    >;
  }

  updateMany<T>(
    params: Prisma.CatUpdateManyArgs,
    connection: Prisma.TransactionClient = database.write
  ): Promise<Array<CustomReturnType<T>>> {
    return connection.cat.updateMany(params) as unknown as Promise<
      Array<CustomReturnType<T>>
    >;
  }

  delete(
    params: Prisma.CatDeleteArgs,
    connection: Prisma.TransactionClient = database.write
  ) {
    return connection.cat.delete(params);
  }

  deleteMany(
    params: Prisma.CatDeleteManyArgs,
    connection: Prisma.TransactionClient = database.write
  ) {
    return connection.cat.deleteMany(params);
  }
}
