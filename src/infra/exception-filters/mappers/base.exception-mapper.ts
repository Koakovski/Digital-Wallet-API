import { BaseException } from 'src/domain/exceptions/exception.base';
import { ExceptionMapper } from './exception-mapper';
import { MappedErrorResponse } from '../../../domain/config/exeception-mapped/exception-mapped';

export class BaseExceptionMapper implements ExceptionMapper {
  constructor(private readonly exception: BaseException) {}

  map(): MappedErrorResponse {
    return {
      status: this.exception.status,
      error: {
        code: this.exception.code,
        message: this.exception.message,
      },
    };
  }
}
