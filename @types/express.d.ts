declare namespace Express {
  export interface Request<T = object> {
    user?: T;
  }
}
