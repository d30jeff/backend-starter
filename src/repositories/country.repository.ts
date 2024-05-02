import { Prisma, Country } from '@prisma/client';
import { database } from '@providers/database.provider';
import { Service } from 'typedi';

const fields = {
  ID: true,
  name: true,
} satisfies Prisma.CountrySelect;

export const CountryPublicSelect = fields;
export type CountryPublicSelect = typeof CountryPublicSelect;

export type CountryWithPublicFields = Prisma.CountryGetPayload<{
  select: typeof CountryPublicSelect;
}>;

export const CountryPrivateSelect = { ...fields } satisfies Prisma.CountrySelect;
export type CountryPrivateSelect = typeof CountryPrivateSelect;

export type CountryWithPrivateFields = Prisma.CountryGetPayload<{
  select: typeof CountryPrivateSelect;
}>;

type CustomReturnType<T extends Prisma.CountryFindFirstArgs['select']> =
  T extends CountryPrivateSelect
    ? CountryWithPrivateFields
    : T extends CountryPublicSelect
    ? CountryWithPublicFields
    : Country;

@Service()
export class CountryRepository {
  aggregate(
    params: Prisma.CountryAggregateArgs,
    connection: Prisma.TransactionClient = database.read
  ) {
    return connection.country.aggregate(params);
  }

  upsert<T>(
    params: Prisma.CountryUpsertArgs,
    connection: Prisma.TransactionClient = database.write
  ): Promise<CustomReturnType<T>> {
    return connection.country.upsert(params) as unknown as Promise<CustomReturnType<T>>;
  }

  create<T>(
    params: Omit<Prisma.CountryCreateArgs, 'data'> & {
      data?: Omit<Prisma.CountryCreateInput, 'ID'> & { ID?: string };
    },
    connection: Prisma.TransactionClient = database.write
  ): Promise<CustomReturnType<T>> {
    return connection.country.create(params as Prisma.CountryCreateArgs) as unknown as Promise<
      CustomReturnType<T>
    >;
  }

  createMany<T>(
    params: Omit<Prisma.CountryCreateManyArgs, 'data'> & {
      data?: Array<Omit<Prisma.CountryCreateManyInput, 'ID'> & { ID?: string }>;
    },
    connection: Prisma.TransactionClient = database.write
  ): Promise<Array<CustomReturnType<T>>> {
    return connection.country.createMany(
      params as Prisma.CountryCreateManyArgs
    ) as unknown as Promise<Array<CustomReturnType<T>>>;
  }

  findFirst<T>(
    params: Prisma.CountryFindFirstArgs,
    connection: Prisma.TransactionClient = database.read
  ): Promise<CustomReturnType<T>> {
    return connection.country.findFirst(params) as unknown as Promise<CustomReturnType<T>>;
  }

  findMany<T>(
    params: Prisma.CountryFindManyArgs,
    connection: Prisma.TransactionClient = database.read
  ): Promise<Array<CustomReturnType<T>>> {
    return connection.country.findMany(params) as unknown as Promise<Array<CustomReturnType<T>>>;
  }

  count(params: Prisma.CountryCountArgs, connection: Prisma.TransactionClient = database.read) {
    return connection.country.count(params);
  }

  update<T>(
    params: Prisma.CountryUpdateArgs,
    connection: Prisma.TransactionClient = database.write
  ): Promise<CustomReturnType<T>> {
    return connection.country.update(params) as unknown as Promise<CustomReturnType<T>>;
  }

  updateMany<T>(
    params: Prisma.CountryUpdateManyArgs,
    connection: Prisma.TransactionClient = database.write
  ): Promise<Array<CustomReturnType<T>>> {
    return connection.country.updateMany(params) as unknown as Promise<Array<CustomReturnType<T>>>;
  }

  delete(params: Prisma.CountryDeleteArgs, connection: Prisma.TransactionClient = database.write) {
    return connection.country.delete(params);
  }

  deleteMany(
    params: Prisma.CountryDeleteManyArgs,
    connection: Prisma.TransactionClient = database.write
  ) {
    return connection.country.deleteMany(params);
  }
}
