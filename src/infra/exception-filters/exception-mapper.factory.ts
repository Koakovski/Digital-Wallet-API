import { HttpException, Injectable } from '@nestjs/common';
import { ExceptionMapper } from 'src/infra/exception-filters/mappers/exception-mapper';
import { BaseExceptionMapper } from './mappers/base.exception-mapper';
import { NestHttpExceptionMapper } from './mappers/nest-http.exception-mapper';
import { UnknownExceptionMapper } from './mappers/unknown.exception.mapper';
import { BaseException } from 'src/domain/exceptions/exception.base';
import { ValidationError } from 'class-validator';
import { ValidationErrorExceptionMapper } from './mappers/validation-error.exception-mapper';

@Injectable()
export class ExceptionMapperFactory {
  create(exception: unknown): ExceptionMapper {
    if (
      Array.isArray(exception) &&
      exception.length &&
      exception.every((exception) => exception instanceof ValidationError)
    ) {
      return new ValidationErrorExceptionMapper(exception);
    }

    if (exception instanceof BaseException && exception.status !== 500) {
      return new BaseExceptionMapper(exception);
    }

    if (exception instanceof HttpException && exception.getStatus() !== 500) {
      return new NestHttpExceptionMapper(exception);
    }

    return new UnknownExceptionMapper(exception);
  }
}
