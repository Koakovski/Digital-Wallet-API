import { faker } from '@faker-js/faker';
import { HashService } from 'src/domain/services/hash.service';
import { vi } from 'vitest';

export class HashServiceMock implements HashService {
  hash(): Promise<string> {
    return Promise.resolve(faker.string.alphanumeric({ length: 10 }));
  }

  compare(): Promise<boolean> {
    return Promise.resolve(true);
  }

  static getSpies(mock: HashService) {
    return {
      hashServiceHashSpy: vi.spyOn(mock, 'hash'),
      hashServiceCompareSpy: vi.spyOn(mock, 'compare'),
    };
  }
}
