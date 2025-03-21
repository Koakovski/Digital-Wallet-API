import { expect } from 'vitest';
import { RawMatcherFn } from '@vitest/expect';
import { BaseException } from 'src/domain/exceptions/exception.base';
import { ToBeBaseExceptionVerifier } from './to-be-base-exception.verifier';

export const toThrowBaseException: RawMatcherFn = function (
  actual: () => any,
  expectedBaseException: { new (...args: any[]): BaseException },
  expectedMessage?: string,
) {
  const printExpected = this.utils.printExpected;
  const printReceived = this.utils.printReceived;

  try {
    actual();
  } catch (error) {
    const verifier = new ToBeBaseExceptionVerifier(
      printExpected,
      printReceived,
      error,
      expectedBaseException,
      expectedMessage,
    );

    return verifier.verify();
  }

  return {
    pass: false,
    message: () =>
      `Expected function to throw an ${expectedBaseException.name}, but it didn't throw anything.`,
  };
};

expect.extend({
  toThrowBaseException,
});
