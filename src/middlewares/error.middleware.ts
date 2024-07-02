import { BaseException } from '@/exceptions/base.exception.js';
import { ErrorMiddleware } from '@decorators/express';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@/enums/http-status.enum.js';
import { Injectable } from '@decorators/di';
import { SignaleLogger } from '@/providers/logger.provider.js';
import { ValidationError } from 'class-validator';
import { dayjs } from '@/utils/dayjs.util.js';
import { getFormattedPath } from '@/utils/request.util.js';

const logger = SignaleLogger('Error Middleware');

const extractPropertiesAndConstraint = (
  validationErrors: ValidationError[],
  errors: any[],
  property: string = ''
) => {
  for (const validationError of validationErrors) {
    errors.push({
      [property || validationError.property]: validationError.constraints,
    });
    if (validationError.children) {
      for (const child of validationError.children) {
        extractPropertiesAndConstraint(
          [child],
          errors,
          [validationError.property, child.property].join('.')
        );
      }
    }
  }
};

@Injectable()
export class GlobalErrorMiddleware implements ErrorMiddleware {
  public use(e: Error, request: Request, response: Response) {
    const timestamp = dayjs().utc().format();
    const error = e as unknown as ErrorRequestHandler & {
      statusCode: number;
      details: string;
    };

    if (error.length && error.constructor === Array) {
      const errors = [];
      extractPropertiesAndConstraint(error, errors);
      return response.status(HttpStatus.BadRequest).json({
        error: {
          code: 'ValidationError',
          message: 'Validation Error',
          errors: errors.filter((error) => {
            return Object.values(error).filter((item) => {
              return Boolean(item);
            }).length;
          }),
        },
        metadata: {
          statusCode: HttpStatus.BadRequest,
          resource: getFormattedPath(request),
          timestamp,
          requestID: request.id,
        },
      });
    } else if (error instanceof BaseException) {
      return response.status(error.statusCode).json({
        error: {
          code: error.code,
          message: error.message,
          errors: error.errors ?? error.errors,
          details: error.details ?? error.details,
        },
        metadata: {
          statusCode: error.statusCode,
          resource: getFormattedPath(request),
          timestamp,
          requestID: request.id,
        },
      });
    }

    return response.status(HttpStatus.InternalServerError).json({
      error: {
        code: 'InternalServerError',
        message: 'Internal Server Error',
      },
      metadata: {
        statusCode: HttpStatus.InternalServerError,
        resource: getFormattedPath(request),
        timestamp,
        requestID: request.id,
      },
    });
  }
}
