import { ExceptionMapped } from 'src/domain/config/exeception-mapped/exception-mapped';

export interface ExceptionMapper {
  map(): ExceptionMapped;
}
