import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseException extends HttpException {
  protected abstract BASE_MESSAGE: string;
  protected abstract HTTP_STATUS: HttpStatus;

  constructor(message?: string) {
    super(
      message ?? new.target.prototype.BASE_MESSAGE,
      new.target.prototype.HTTP_STATUS,
    );
  }
}
