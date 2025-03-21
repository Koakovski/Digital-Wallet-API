import { ExpectationResult } from '@vitest/expect';
import { BaseException } from 'src/domain/exceptions/exception.base';

export class ToBeBaseExceptionVerifier {
  constructor(
    private readonly printExpected: (value: unknown) => string,
    private readonly printReceived: (value: unknown) => string,
    private readonly actual: any,
    private readonly expectedBaseException: {
      new (...args: any[]): BaseException;
    },
    private readonly expectedMessage?: string,
  ) {}

  verify(): ExpectationResult {
    if (this.actual instanceof this.expectedBaseException === false) {
      return {
        pass: false,
        message: () =>
          `Value should be an instance of ${
            this.expectedBaseException.name
          }, but received: ${this.printReceived(
            (this.actual as BaseException).constructor.name,
          )}`,
      };
    }

    if (
      this.expectedMessage !== undefined &&
      this.expectedMessage !== this.actual.message
    ) {
      return {
        pass: false,
        message: () =>
          `Expected a ${
            this.expectedBaseException.name
          } with the message: ${this.printExpected(
            this.expectedMessage,
          )}, but received: ${this.printReceived(this.actual.message)}`,
      };
    }

    return {
      pass: true,
      message: () =>
        `Expected ${this.printReceived(this.actual)} not to be a ${
          this.expectedBaseException.name
        }`,
    };
  }
}
