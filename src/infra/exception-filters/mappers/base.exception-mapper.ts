import { BaseException } from 'src/domain/exceptions/exception.base';
import { ExceptionMapper } from './exception-mapper';
import { ExceptionMapped } from '../../../domain/config/exeception-mapped/exception-mapped';

export class BaseExceptionMapper implements ExceptionMapper {
  constructor(private readonly exception: BaseException) {}

  map(): ExceptionMapped {
    return {
      code: this.exception.code,
      message: this.exception.message,
      status: this.exception.status,
    };
  }
}
