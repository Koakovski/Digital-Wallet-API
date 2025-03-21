import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../exception.base';

export class TransactionNotFoundException extends BaseException {
  constructor(message?: string) {
    const CODE = 'TRANSACTION_NOT_FOUND';
    const BASE_MESSAGE = 'Transaction was not found';
    const HTTP_STATUS = HttpStatus.BAD_REQUEST;

    super(CODE, message ?? BASE_MESSAGE, HTTP_STATUS);
  }
}
