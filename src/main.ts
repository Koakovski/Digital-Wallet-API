import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerRegistrar } from './infra/config/swagger.registrar';
import { ValidatorRegistrar } from './infra/config/validator.registrar';
import { ConfigService } from './domain/services/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  SwaggerRegistrar.register(app);
  ValidatorRegistrar.register(app);

  await app.listen(configService.get('PORT'));
}
bootstrap();
