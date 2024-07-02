import { Application } from '@/interfaces/application.interface.js';
import { CustomLogger, Logger } from '@/providers/logger.provider.js';
import { Middleware, Next, Request, Response } from '@decorators/express';
import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@/interfaces/express.interface.js';

export function IsValidCat(
  location: Application.Location,
  propertyName: string = 'ID'
) {
  abstract class ValidationMiddlewareClass implements Middleware {
    @Logger() public readonly logger: CustomLogger;
    public async use(
      @Request() request: ExpressRequest,
      @Response() response: ExpressResponse,
      @Next() next: ExpressNextFunction
    ) {
      const ID = request[location][propertyName];
      if (!ID && location !== 'params') {
        return next();
      }

      next();
    }
  }

  return ValidationMiddlewareClass;
}

export class CatMiddleware implements Middleware {
  @Logger() private readonly logger: CustomLogger;
  public async use(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    next();
  }
}
