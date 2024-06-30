import { Controller, Get, Next, Request, Response } from '@decorators/express';
import { CustomLogger, Logger } from '@/providers/logger.provider.js';
import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@/interfaces/express.interface.js';
import { HttpStatus } from '@/enums/http-status.enum.js';

@Controller('/healthcheck')
export class HealthcheckController {
  @Logger()
  private readonly logger: CustomLogger;

  @Get('/')
  async list(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      return response.status(HttpStatus.Ok).json({
        status: '🚀 Service is up and running',
        service: 'Admin API',
      });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
