import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../exception.base';

export class InternalServerErrorException extends BaseException {
  constructor(message?: string) {
    const CODE = 'INTERNAL_SERVER_ERROR';
    const BASE_MESSAGE = 'Internal server error';
    const HTTP_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;

    super(CODE, message ?? BASE_MESSAGE, HTTP_STATUS);
  }
}
