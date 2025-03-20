import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { HashModule } from './infra/services/hash/hash.module';
import { UserControllerModule } from './api/user/user.controller.module';
import { EncryptModule } from './infra/services/encrypt/encrypt.module';

@Module({
  imports: [HashModule, EncryptModule, UserControllerModule],
  controllers: [AppController],
})
export class AppModule {}
