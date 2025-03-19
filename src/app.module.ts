import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './infra/modules/user/user.module';
import { HashModule } from './infra/services/hash/hash.module';

@Module({
  imports: [HashModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
