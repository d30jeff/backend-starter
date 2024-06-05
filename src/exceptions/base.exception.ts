import { ErrorField } from '@/interfaces/errors.js';
import { HttpStatus } from '@/enums/http-status.enum.js';

export abstract class BaseException {
  code: string;
  statusCode: HttpStatus;
  message: string;
  errors?: ErrorField;
  details: string | object;
}
