import { Admin } from '@/servers/admin/admin/admin.interface.js';
import { AdminService } from '@/servers/admin/admin/admin.service.js';
import { Container } from 'typedi';
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
import { ControllerSlowDown } from '@/middlewares/controller-slow-down.middleware.js';
import { CustomLogger, Logger } from '@/providers/logger.provider.js';
import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@/interfaces/express.interface.js';
import { HttpStatus } from '@/enums/http-status.enum.js';
import { serializePaginationParams } from '@/utils/pagination.util.js';
import { validate } from '@/utils/class-validator.util.js';

@Controller('/admin')
export class AdminController {
  @Logger()
  private readonly logger: CustomLogger;
  private readonly adminService = Container.get(AdminService);

  constructor() {}

  @Post('/sign-in', [ControllerSlowDown()])
  async create(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<Admin.SignIn.Dto>(
        Admin.SignIn.Dto,
        request.body
      );
      const data = await this.adminService.signIn(body);

      return response.status(HttpStatus.Created).json(body);
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
      request.sessionStore.all((error, session) => {
        console.log(error, session);
      });
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
