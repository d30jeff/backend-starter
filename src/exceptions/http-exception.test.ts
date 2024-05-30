import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  TooManyRequestsException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@exceptions/http-exception';
import { HttpStatus } from '@enums/http-status.enum';

describe('Http Exception Test', () => {
  test('It Returns Expected 400 Response', () => {
    const exception = new BadRequestException('Hello');
    expect(exception.code).toBe('Hello');
    expect(exception.message).toBe('Hello');
    expect(exception.statusCode).toBe(HttpStatus.BadRequest);
  });

  test('It Returns Expected 401 Response', () => {
    const exception = new UnauthorizedException('Invalid Credentials');
    expect(exception.code).toBe('InvalidCredentials');
    expect(exception.statusCode).toBe(HttpStatus.Unauthorized);
  });

  test('It Returns Expected 404 Response', () => {
    const exception = new NotFoundException('Not Found');
    expect(exception.code).toBe('NotFound');
    expect(exception.statusCode).toBe(HttpStatus.NotFound);
  });

  test('It Returns Expected 409 Response', () => {
    const exception = new ConflictException('Conflict');
    expect(exception.code).toBe('Conflict');
    expect(exception.statusCode).toBe(HttpStatus.Conflict);
  });

  test('It Returns Expected 422 Response', () => {
    const exception = new UnprocessableEntityException('Unprocessable Entity');
    expect(exception.code).toBe('UnprocessableEntity');
    expect(exception.statusCode).toBe(HttpStatus.UnprocessableEntity);
  });

  test('It Returns Expected 429 Response', () => {
    const exception = new TooManyRequestsException('Too Many Requests');
    expect(exception.code).toBe('TooManyRequests');
    expect(exception.statusCode).toBe(HttpStatus.TooManyRequests);
  });

  test('It Returns Expected 500 Response', () => {
    const exception = new InternalServerErrorException('Internal Server Error');
    expect(exception.code).toBe('InternalServerError');
    expect(exception.statusCode).toBe(HttpStatus.InternalServerError);
  });
});
