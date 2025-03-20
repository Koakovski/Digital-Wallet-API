import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { HashModule } from './infra/services/hash/hash.module';
import { UserControllerModule } from './api/user/user.controller.module';
import { EncryptModule } from './infra/services/encrypt/encrypt.module';
import { TransactionModule } from './api/transactions/transaction.module';

@Module({
  imports: [HashModule, EncryptModule, UserControllerModule, TransactionModule],
  controllers: [AppController],
})
export class AppModule {}
