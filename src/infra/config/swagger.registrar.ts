import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerRegistrar {
  static register(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Digital Wallet API')
      .setDescription(
        'API for managing balances and financial transfers between users.',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentFactory);
  }
}
