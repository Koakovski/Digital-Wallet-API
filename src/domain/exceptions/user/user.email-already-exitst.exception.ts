import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../exception.base';

export class UserEmailAlreadyExistsException extends BaseException {
  constructor(message?: string) {
    const CODE = 'USER_EMAIL_ALREADY_EXISTS';
    const BASE_MESSAGE = 'User with provided email already exists';
    const HTTP_STATUS = HttpStatus.CONFLICT;

    super(CODE, message ?? BASE_MESSAGE, HTTP_STATUS);
  }
}
