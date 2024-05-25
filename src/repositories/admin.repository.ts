import { Prisma, Admin } from '@prisma/client';
import { database } from '@providers/database.provider';
import { Service } from 'typedi';

const fields = {
  ID: true,
  email: true,
  passwordHash: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.AdminSelect;

export const AdminPublicSelect = fields;
export type AdminPublicSelect = typeof AdminPublicSelect;

export type AdminWithPublicFields = Prisma.AdminGetPayload<{
  select: typeof AdminPublicSelect;
}>;

export const AdminPrivateSelect = { ...fields } satisfies Prisma.AdminSelect;
export type AdminPrivateSelect = typeof AdminPrivateSelect;

export type AdminWithPrivateFields = Prisma.AdminGetPayload<{
  select: typeof AdminPrivateSelect;
}>;

type CustomReturnType<T extends Prisma.AdminFindFirstArgs['select']> =
  T extends AdminPrivateSelect
    ? AdminWithPrivateFields
    : T extends AdminPublicSelect
    ? AdminWithPublicFields
    : Admin;

@Service()
export class AdminRepository {
  aggregate(
    params: Prisma.AdminAggregateArgs,
    connection: Prisma.TransactionClient = database.read
  ) {
    return connection.admin.aggregate(params);
  }

  upsert<T>(
    params: Prisma.AdminUpsertArgs,
    connection: Prisma.TransactionClient = database.write
  ): Promise<CustomReturnType<T>> {
    return connection.admin.upsert(params) as unknown as Promise<
      CustomReturnType<T>
    >;
  }

  create<T>(
    params: Omit<Prisma.AdminCreateArgs, 'data'> & {
      data?: Omit<Prisma.AdminCreateInput, 'ID'> & { ID?: string };
    },
    connection: Prisma.TransactionClient = database.write
  ): Promise<CustomReturnType<T>> {
    return connection.admin.create(
      params as Prisma.AdminCreateArgs
    ) as unknown as Promise<CustomReturnType<T>>;
  }

  createMany<T>(
    params: Omit<Prisma.AdminCreateManyArgs, 'data'> & {
      data?: Array<Omit<Prisma.AdminCreateManyInput, 'ID'> & { ID?: string }>;
    },
    connection: Prisma.TransactionClient = database.write
  ): Promise<Array<CustomReturnType<T>>> {
    return connection.admin.createMany(
      params as Prisma.AdminCreateManyArgs
    ) as unknown as Promise<Array<CustomReturnType<T>>>;
  }

  findFirst<T>(
    params: Prisma.AdminFindFirstArgs,
    connection: Prisma.TransactionClient = database.read
  ): Promise<CustomReturnType<T>> {
    return connection.admin.findFirst(params) as unknown as Promise<
      CustomReturnType<T>
    >;
  }

  findMany<T>(
    params: Prisma.AdminFindManyArgs,
    connection: Prisma.TransactionClient = database.read
  ): Promise<Array<CustomReturnType<T>>> {
    return connection.admin.findMany(params) as unknown as Promise<
      Array<CustomReturnType<T>>
    >;
  }

  count(
    params: Prisma.AdminCountArgs,
    connection: Prisma.TransactionClient = database.read
  ) {
    return connection.admin.count(params);
  }

  update<T>(
    params: Prisma.AdminUpdateArgs,
    connection: Prisma.TransactionClient = database.write
  ): Promise<CustomReturnType<T>> {
    return connection.admin.update(params) as unknown as Promise<
      CustomReturnType<T>
    >;
  }

  updateMany<T>(
    params: Prisma.AdminUpdateManyArgs,
    connection: Prisma.TransactionClient = database.write
  ): Promise<Array<CustomReturnType<T>>> {
    return connection.admin.updateMany(params) as unknown as Promise<
      Array<CustomReturnType<T>>
    >;
  }

  delete(
    params: Prisma.AdminDeleteArgs,
    connection: Prisma.TransactionClient = database.write
  ) {
    return connection.admin.delete(params);
  }

  deleteMany(
    params: Prisma.AdminDeleteManyArgs,
    connection: Prisma.TransactionClient = database.write
  ) {
    return connection.admin.deleteMany(params);
  }
}
