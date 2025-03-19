import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerRegistrar } from './infra/config/swagger.registrar';
import { ValidatorRegistrar } from './infra/config/validator.registrar';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerRegistrar.register(app);
  ValidatorRegistrar.register(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
