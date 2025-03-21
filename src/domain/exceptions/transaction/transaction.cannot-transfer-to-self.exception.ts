import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../exception.base';

export class TransectionCannotTransferToSelfException extends BaseException {
  constructor(message?: string) {
    const CODE = 'TRANSFER_CANNOT_TRANSFER_TO_SELF';
    const BASE_MESSAGE = 'Sender and receiver cannot be the same user';
    const HTTP_STATUS = HttpStatus.BAD_REQUEST;

    super(CODE, message ?? BASE_MESSAGE, HTTP_STATUS);
  }
}
