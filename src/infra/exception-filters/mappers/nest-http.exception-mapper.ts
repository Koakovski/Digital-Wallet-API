import { ExceptionMapper } from './exception-mapper';
import { ExceptionMapped } from '../../../domain/config/exeception-mapped/exception-mapped';
import { HttpException, HttpStatus } from '@nestjs/common';
import { slugify } from 'src/domain/helpers/slugify';

export class NestHttpExceptionMapper implements ExceptionMapper {
  constructor(private readonly exception: HttpException) {}

  map(): ExceptionMapped {
    const code = HttpStatus[this.exception.getStatus()];
    const status = this.exception.getStatus();
    const message = this.exception.message;

    return {
      code: slugify(code).toUpperCase(),
      message,
      status,
    };
  }
}
