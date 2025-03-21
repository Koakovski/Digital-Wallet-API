import { expect } from 'vitest';
import { RawMatcherFn } from '@vitest/expect';
import { BaseException } from 'src/domain/exceptions/exception.base';

export const toBeBaseException: RawMatcherFn = function (
  actual: any,
  expectedBaseException: { new (...args: any[]): BaseException },
  expectedMessage?: string,
) {
  const printExpected = this.utils.printExpected;
  const printReceived = this.utils.printReceived;

  if (actual instanceof expectedBaseException === false) {
    return {
      pass: false,
      message: () =>
        `Value should be an instance of ${
          expectedBaseException.name
        }, but received: ${printReceived(
          (actual as BaseException).constructor.name,
        )}`,
    };
  }

  if (expectedMessage !== undefined && expectedMessage !== actual.message) {
    return {
      pass: false,
      message: () =>
        `Expected a ${
          expectedBaseException.name
        } with the message: ${printExpected(
          expectedMessage,
        )}, but received: ${printReceived(actual.message)}`,
    };
  }

  return {
    pass: true,
    message: () =>
      `Expected ${printReceived(actual)} not to be a ${
        expectedBaseException.name
      }`,
  };
};

expect.extend({
  toBeBaseException,
});
