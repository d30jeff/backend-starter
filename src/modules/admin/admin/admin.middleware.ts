import { Admin } from '@/modules/admin/admin/admin.interface.js';
import { AdminService } from '@/modules/admin/admin/admin.service.js';
import { Container } from 'typedi';
import { CustomLogger, Logger } from '@/providers/logger.provider.js';
import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@/interfaces/express.interface.js';
import { Middleware, Next, Request, Response } from '@decorators/express';

export class AuthenticatedAdmin implements Middleware {
  @Logger()
  private readonly logger: CustomLogger;
  private readonly adminService = Container.get(AdminService);

  public async use(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    if (!request.session.admin) {
      return next(new Admin.Exceptions.InvalidCredentials());
    }

    const admin = await this.adminService.findByID(request.session.admin.ID);

    if (!admin) {
      return next(new Admin.Exceptions.InvalidCredentials());
    }

    next();
  }
}
