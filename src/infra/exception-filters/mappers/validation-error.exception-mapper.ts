import { ValidationError } from 'class-validator';
import { ExceptionMapper } from './exception-mapper';
import {
  MappedErrorResponse,
  ValidationErrorDetail,
} from 'src/domain/config/exeception-mapped/exception-mapped';

export class ValidationErrorExceptionMapper implements ExceptionMapper {
  constructor(private readonly errors: ValidationError[]) {}

  map(): MappedErrorResponse {
    const validationErrors = this.mapErrors(this.errors);

    const firstError = validationErrors[0];

    return {
      status: 400,
      error: {
        code: firstError.code,
        message: firstError.message,
        validation_errors: validationErrors,
      },
    };
  }

  private mapErrors(errors: ValidationError[], parentPath = '') {
    const validationErrors: ValidationErrorDetail[] = [];

    for (const error of this.errors) {
      const currentPath = parentPath
        ? `${parentPath}.${error.property}`
        : error.property;

      if (error.constraints) {
        for (const constraint in error.constraints) {
          const validationError: ValidationErrorDetail = {
            code: constraint,
            message: error.constraints[constraint],
            field: currentPath,
          };
          validationErrors.push(validationError);
        }
      }

      if (error.children && error.children.length > 0) {
        const chieldrenErrors = this.mapErrors(error.children, currentPath);
        validationErrors.push(...chieldrenErrors);
      }
    }

    return validationErrors;
  }
}
