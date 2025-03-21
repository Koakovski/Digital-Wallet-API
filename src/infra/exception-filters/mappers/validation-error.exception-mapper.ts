import { ValidationError } from 'class-validator';
import { ExceptionMapper } from './exception-mapper';
import { ExceptionMapped } from 'src/domain/config/exeception-mapped/exception-mapped';

export class ValidationErrorExceptionMapper implements ExceptionMapper {
  constructor(private readonly errors: ValidationError[]) {}

  map(): ExceptionMapped {
    return { code: '', message: '', status: 400 };
  }
}
