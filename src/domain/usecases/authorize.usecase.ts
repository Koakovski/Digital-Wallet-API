import { UseCase } from '../base/usecase';

export type AuthorizeUseCase = UseCase<AuthorizeUseCaseParams, object>;

export type AuthorizeUseCaseParams = {
  token: string;
};

export const AuthorizeUseCase = Symbol('AuthorizeUseCase');
