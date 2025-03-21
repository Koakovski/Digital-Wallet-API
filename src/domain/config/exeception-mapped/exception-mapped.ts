export interface ErrorDetail {
  code: string;
  message: string;
}

export interface ValidationErrorDetail extends ErrorDetail {
  field: string;
}

export interface MappedError extends ErrorDetail {
  validation_errors?: ValidationErrorDetail[];
}

export interface MappedErrorResponse {
  status: number;
  error: MappedError;
}
