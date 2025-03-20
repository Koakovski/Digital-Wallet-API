import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../exception.base';

export class InsufficientBalanceException extends BaseException {
  constructor(message?: string) {
    const CODE = 'USER_INSUFFICIENT_BALANCE';
    const BASE_MESSAGE =
      'User does not have enough balance to complete the transaction';
    const HTTP_STATUS = HttpStatus.BAD_REQUEST;

    super(CODE, message ?? BASE_MESSAGE, HTTP_STATUS);
  }
}
