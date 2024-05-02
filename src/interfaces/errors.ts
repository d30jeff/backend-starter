export enum ErrorCodes {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  AuthorizationError = 'AuthorizationError',
  MissingToken = 'MissingTokenError',
  InvalidToken = 'InvalidTokenError',
  AccessDenied = 'AccessDeniedError',
  TooManyRequests = 'TooManyRequestsError',
  ValidationError = 'ValidationError',
  ResourceNotFound = 'ResourceNotFoundError',
  Conflict = 'ConflictError',
  UnprocessableEntityError = 'UnprocessableEntityError',
}

type ErrorLocation = 'Header' | 'Body' | 'Query';

export interface ErrorField {
  field: string;
  location: ErrorLocation;
  description: string;
}

export interface ErrorResponse {
  code: ErrorCodes;
  errors?: ErrorField;
  message: string;
  resource: string;
  timestamp: string;
  requestID: string;
}
