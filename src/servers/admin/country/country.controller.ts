import { AuthenticatedAdmin } from '@/servers/admin/admin/admin.middleware.js';
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
import { serializePaginationParams } from '@/utils/pagination.util.js';

@Controller('/countries', [AuthenticatedAdmin])
export class CountryController {
  @Logger()
  private readonly logger: CustomLogger;

  @Post('/')
  async create(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      return response.status(HttpStatus.Created).json({});
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
      return response.status(HttpStatus.Ok).json({});
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
      return response.status(HttpStatus.Ok).json({});
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
      return response.status(HttpStatus.Ok).json({});
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
      return response.sendStatus(HttpStatus.NoContent);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
