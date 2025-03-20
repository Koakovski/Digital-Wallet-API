export interface UseCase<Params = void, Result = void> {
  execute(params: Params extends void ? never : Params): Promise<Result>;
}
