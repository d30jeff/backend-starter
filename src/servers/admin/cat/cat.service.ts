import { Cat } from '@/servers/admin/cat/cat.interface.js';
import {
  CatPublicSelect,
  CatRepository,
} from '@/repositories/cat.repository.js';
import { CustomLogger, Logger } from '@/providers/logger.provider.js';
import { Injectable } from '@decorators/di';
import { Pagination } from '@/utils/pagination.util.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class CatService {
  @Logger()
  private readonly logger: CustomLogger;

  constructor(private readonly catRepository: CatRepository) {}
  async create(params: Cat.Create.Params) {
    const { name } = params;

    return this.catRepository.create<CatPublicSelect>({
      select: CatPublicSelect,
      data: {
        name,
      },
    });
  }

  async list(params: Cat.List.Params) {
    const { page, limit } = params;

    const AND: Prisma.Enumerable<Prisma.CatWhereInput> = [];
    let where: Prisma.CatWhereInput = {};
    where = {
      ...where,
      AND,
    };

    const total = await this.catRepository.count({ where });
    const items = await this.catRepository.findMany<CatPublicSelect>({
      select: CatPublicSelect,
      skip: (page - 1) * limit,
      take: limit,
      where,
    });

    return {
      items,
      pagination: new Pagination({
        page,
        limit,
        total,
      }),
    };
  }

  async findOne(params: Cat.FindOne.Params) {
    const { ID } = params;

    return this.catRepository.findFirst<CatPublicSelect>({
      select: CatPublicSelect,
      where: {
        ID,
      },
    });
  }

  async update(params: Cat.Update.Params) {
    const { ID } = params;

    return this.catRepository.update<CatPublicSelect>({
      select: CatPublicSelect,
      data: {},
      where: {
        ID,
      },
    });
  }

  async delete(params: Cat.Delete.Params) {
    const { ID } = params;
    return this.catRepository.delete({
      where: {
        ID,
      },
    });
  }
}
