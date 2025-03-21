import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ExceptionMapperFactory } from './exception-mapper.factory';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly exceptionMapperFactory: ExceptionMapperFactory,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionMapper = this.exceptionMapperFactory.create(exception);
    const mappedException = exceptionMapper.map();

    return response.status(mappedException.status).json(mappedException);
  }
}
