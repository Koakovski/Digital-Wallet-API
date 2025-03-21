import { BaseException } from 'src/domain/exceptions/exception.base';

interface CustomMatchers<R = unknown> {
  toBeBaseException(
    exception: { new (...args: any[]): BaseException },
    message?: string,
  ): R;
  toThrowBaseException(
    expectedBaseException: { new (...args: any[]): BaseException },
    expectedMessage?: string,
  );
}

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Expect extends CustomMatchers {}
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Matchers<R> extends CustomMatchers<R> {}
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}
export {};
