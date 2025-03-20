import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { HashModule } from './infra/services/hash/hash.module';
import { UserControllerModule } from './api/user/user.controller.module';
import { EncryptModule } from './infra/services/encrypt/encrypt.module';
import { TransactionModule } from './api/transactions/transaction.module';
import { UserAuthModule } from './api/user/authorization/user.auth.module';

@Module({
  imports: [
    HashModule,
    EncryptModule,
    UserAuthModule,
    UserControllerModule,
    TransactionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
