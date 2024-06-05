export namespace Error {
  export enum Codes {
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

  type Location = 'Header' | 'Body' | 'Query';

  export interface Field {
    field: string;
    location: Location;
    description: string;
  }

  export interface Response {
    code: Codes;
    errors?: Field;
    message: string;
    resource: string;
    timestamp: string;
    requestID: string;
  }
}
