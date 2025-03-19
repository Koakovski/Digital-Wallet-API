export interface HashService {
  hash(value: string): Promise<string>;
  compare(value: string, hashedValue: string): Promise<boolean>;
}

export const HashService = Symbol('HashService');
