export interface AuthGuardAuthorizer {
  authorize<T extends object>(token: string): Promise<T>;
}

export const AuthGuardAuthorizer = Symbol('AuthGuardAuthorizer');
