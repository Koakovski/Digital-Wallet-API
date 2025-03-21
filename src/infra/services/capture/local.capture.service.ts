import { Injectable } from '@nestjs/common';
import { CaptureService } from 'src/domain/services/capture.service';

@Injectable()
export class LocalCaptureService implements CaptureService {
  capture(data: unknown): void {
    console.log({ capturedData: data });
  }
}
