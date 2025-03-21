import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../exception.base';

export class TransactionAlreadyCancelledException extends BaseException {
  constructor(message?: string) {
    const CODE = 'TRANSACTION_ALREADY_CANCELLED';
    const BASE_MESSAGE = 'This transaction has already been cancelled';
    const HTTP_STATUS = HttpStatus.BAD_REQUEST;

    super(CODE, message ?? BASE_MESSAGE, HTTP_STATUS);
  }
}
