import { HttpStatus } from '@nestjs/common';

export abstract class BaseException extends Error {
  public readonly _code: string;
  public readonly _status: number;

  get code() {
    return this._code;
  }

  get status() {
    return this._status;
  }

  constructor(code: string, message: string, status: HttpStatus) {
    super(message);
    this._code = code;
    this._status = status;
  }
}
