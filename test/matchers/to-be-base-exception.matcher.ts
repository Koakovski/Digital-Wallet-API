import { expect } from 'vitest';
import { RawMatcherFn } from '@vitest/expect/dist';
import { BaseException } from 'src/domain/exceptions/exception.base';
import { ToBeBaseExceptionVerifier } from './to-be-base-exception.verifier';

export const toBeBaseException: RawMatcherFn = function (
  actual: any,
  expectedBaseException: { new (...args: any[]): BaseException },
  expectedMessage?: string,
) {
  const printExpected = this.utils.printExpected;
  const printReceived = this.utils.printReceived;

  const verifier = new ToBeBaseExceptionVerifier(
    printExpected,
    printReceived,
    actual,
    expectedBaseException,
    expectedMessage,
  );

  return verifier.verify();
};

expect.extend({
  toBeBaseException,
});
