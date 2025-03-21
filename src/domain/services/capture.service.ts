export interface CaptureService {
  capture(data: unknown): void;
}

export const CaptureService = Symbol('CaptureService');
