import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './infra/modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
})
export class AppModule {}
