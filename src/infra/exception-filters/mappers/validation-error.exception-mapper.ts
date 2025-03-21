import { ValidationError } from 'class-validator';
import { ExceptionMapper } from './exception-mapper';
import { MappedErrorResponse } from 'src/domain/config/exeception-mapped/exception-mapped';

export class ValidationErrorExceptionMapper implements ExceptionMapper {
  constructor(private readonly errors: ValidationError[]) {}

  map(): MappedErrorResponse {
    return { status: 400, error: { code: '', message: '' } };
  }
}
