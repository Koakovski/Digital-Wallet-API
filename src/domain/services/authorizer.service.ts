export interface AuthorizerService {
  authorize<T extends object>(token: string): Promise<T>;
}

export const AuthorizerService = Symbol('AuthorizerService');
