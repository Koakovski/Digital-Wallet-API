import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { HashModule } from './infra/services/hash/hash.module';
import { UserControllerModule } from './api/user/user.controller.module';

@Module({
  imports: [HashModule, UserControllerModule],
  controllers: [AppController],
})
export class AppModule {}
