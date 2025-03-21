import { INestApplication, ValidationPipe } from '@nestjs/common';

export class ValidatorRegistrar {
  static register(app: INestApplication) {
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => errors,
      }),
    );
  }
}
