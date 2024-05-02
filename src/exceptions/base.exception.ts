import { HttpStatus } from '@enums/http-status.enum';
import { ErrorField } from '@interfaces/errors';

export abstract class BaseException {
  code: string;
  statusCode: HttpStatus;
  message: string;
  errors?: ErrorField;
  details: string | object;
}
