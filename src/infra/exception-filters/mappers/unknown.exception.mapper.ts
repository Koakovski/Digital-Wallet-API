import { MappedErrorResponse } from 'src/domain/config/exeception-mapped/exception-mapped';
import { CaptureService } from 'src/domain/services/capture.service';
import { ExceptionMapper } from 'src/infra/exception-filters/mappers/exception-mapper';

export class UnknownExceptionMapper implements ExceptionMapper {
  constructor(
    private readonly exception: unknown,
    private readonly captureService: CaptureService,
  ) {}

  map(): MappedErrorResponse {
    this.captureService.capture(this.exception);

    return {
      status: 500,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal Server Error',
      },
    };
  }
}
