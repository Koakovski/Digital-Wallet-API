import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../exception.base';

export class UserEmailAlreadyExistsException extends BaseException {
  protected BASE_MESSAGE = 'User with provided email already exists';
  protected HTTP_STATUS = HttpStatus.CONFLICT;
}
