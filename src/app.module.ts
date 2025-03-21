import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { HashModule } from './infra/services/hash/hash.module';
import { UserControllerModule } from './api/user/user.controller.module';
import { EncryptModule } from './infra/services/encrypt/encrypt.module';
import { TransactionControllerModule } from './api/transaction/transaction.controller.module';
import { UserAuthModule } from './api/user/authorization/user.auth.module';
import { PermissionModule } from './infra/permissions/permission.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    HashModule,
    EncryptModule,
    UserAuthModule,
    PermissionModule,
    UserControllerModule,
    TransactionControllerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
