import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../exception.base';

export class UnauthorizedException extends BaseException {
  constructor(message?: string) {
    const CODE = 'UNAUTHORIZED';
    const BASE_MESSAGE = 'Unauthorized access';
    const HTTP_STATUS = HttpStatus.UNAUTHORIZED;

    super(CODE, message ?? BASE_MESSAGE, HTTP_STATUS);
  }
}
