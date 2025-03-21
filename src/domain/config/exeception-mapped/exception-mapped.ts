export interface ExceptionMappedError {
  code: string;
  message: string;
}

export interface ExceptionMapped extends ExceptionMappedError {
  status: number;
  validation_errors?: ExceptionMappedError[];
}
