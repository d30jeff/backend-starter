import { Cat } from '@/servers/admin/cat/cat.interface.js';
import { CatService } from '@/servers/admin/cat/cat.service.js';
import {
  Controller,
  Delete,
  Get,
  Next,
  Params,
  Post,
  Put,
  Request,
  Response,
} from '@decorators/express';
import { CustomLogger, Logger } from '@/providers/logger.provider.js';
import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@/interfaces/express.interface.js';
import { HttpStatus } from '@/enums/http-status.enum.js';
import { Injectable } from '@decorators/di';
import { serializePaginationParams } from '@/utils/pagination.util.js';
import { validate } from '@/utils/class-validator.util.js';

@Injectable()
@Controller('/cats')
export class CatController {
  @Logger()
  private readonly logger: CustomLogger;

  constructor(private readonly catService: CatService) {}

  @Post('/')
  async create(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<Cat.Create.Dto>(Cat.Create.Dto, request.body);
      const data = await this.catService.create(body);
      return response.status(HttpStatus.Created).json(new Cat.Response(data));
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Get('/')
  async list(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const { page, limit } = serializePaginationParams(request);

      const { items, pagination } = await this.catService.list({
        page,
        limit,
      });

      return response.status(HttpStatus.Ok).json({
        items: items.map((item) => {
          return new Cat.Response(item);
        }),
        pagination,
      });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Get('/:ID')
  async get(
    @Params('ID') ID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const data = await this.catService.findOne({
        ID,
      });

      return response.status(HttpStatus.Ok).json(new Cat.Response(data));
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Put('/:ID')
  async update(
    @Params('ID') ID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<Cat.Update.Dto>(Cat.Update.Dto, request.body);

      const data = await this.catService.update({
        ...body,
        ID,
      });

      return response.status(HttpStatus.Ok).json(new Cat.Response(data));
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Delete('/:ID')
  async delete(
    @Params('ID') ID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      await this.catService.delete({
        ID,
      });

      return response.sendStatus(HttpStatus.NoContent);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
