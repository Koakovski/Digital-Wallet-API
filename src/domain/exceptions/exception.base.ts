import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseException extends HttpException {
  public readonly code: string;

  constructor(code: string, message: string, status: HttpStatus) {
    super(message, status);
    this.code = code;
  }
}
