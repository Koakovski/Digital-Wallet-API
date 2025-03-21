export interface ErrorDetail {
  code: string;
  message: string;
}

export interface MappedError extends ErrorDetail {
  validationErrors?: ErrorDetail[];
}

export interface MappedErrorResponse {
  status: number;
  error: MappedError;
}
