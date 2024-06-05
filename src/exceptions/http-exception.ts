import { BaseException } from '@/exceptions/base.exception.js';
import { ErrorField } from '@/interfaces/errors.js';
import { HttpStatus } from '@/enums/http-status.enum.js';
import { StringUtil } from '@/utils/string.util.js';

export interface HttpExceptionProps {
  status: HttpStatus;
  message: string;
  details: string | object;
  errors?: ErrorField;
}

export class HttpException extends BaseException {
  constructor(props: HttpExceptionProps) {
    super();
    const { status, message, errors, details } = props;
    this.statusCode = status;
    this.message = message;
    this.errors = errors;
    this.details = details;
    this.code = StringUtil.PascalCase(message);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, errors?: ErrorField, details = '') {
    super({
      status: HttpStatus.BadRequest,
      message,
      details,
      errors,
    });
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized', details = '') {
    super({
      status: HttpStatus.Unauthorized,
      message,
      details,
    });
  }
}
export class ForbiddenException extends HttpException {
  constructor(message: string, details = '') {
    super({
      status: HttpStatus.Forbidden,
      message,
      details,
    });
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, details = '') {
    super({
      status: HttpStatus.NotFound,
      message,
      details,
    });
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, details?: string) {
    super({
      status: HttpStatus.Conflict,
      message,
      details,
    });
  }
}

export class PaymentRequiredException extends HttpException {
  constructor(message: string, details = '') {
    super({
      status: HttpStatus.PaymentRequired,
      message,
      details,
    });
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, details = '') {
    super({
      status: HttpStatus.UnprocessableEntity,
      message,
      details,
    });
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message: string, details = '') {
    super({
      status: HttpStatus.TooManyRequests,
      message,
      details,
    });
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = 'Something went wrong', details = '') {
    super({
      status: HttpStatus.InternalServerError,
      message,
      details,
    });
  }
}
