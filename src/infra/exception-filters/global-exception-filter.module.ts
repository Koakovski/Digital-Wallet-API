import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './global.exception.filter';
import { ExceptionMapperFactory } from './exception-mapper.factory';

@Module({
  providers: [
    ExceptionMapperFactory,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class GlobalExceptionFilterModule {}
