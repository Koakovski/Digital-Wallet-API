export interface EncryptService {
  encrypt(payload: Record<string, any>): string;
  decrypt<T extends object>(token: string): T;
}

export const EncryptService = Symbol('EncryptService');
