import { Global, Module } from '@nestjs/common';
import { CaptureService } from 'src/domain/services/capture.service';
import { LocalCaptureService } from './local.capture.service';

@Global()
@Module({
  providers: [{ provide: CaptureService, useClass: LocalCaptureService }],
  exports: [CaptureService],
})
export class CaptureModule {}
