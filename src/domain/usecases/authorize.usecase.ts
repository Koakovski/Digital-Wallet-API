import { UseCase } from '../base/usecase';

export type AuthorizeUseCase<Result = object> = UseCase<
  AuthorizeUseCaseParams,
  Result
>;

export type AuthorizeUseCaseParams = {
  token: string;
};

export const AuthorizeUseCase = Symbol('AuthorizeUseCase');
