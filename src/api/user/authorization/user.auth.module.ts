import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserAuthEstrategy } from './user.auth.strategy';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule, PassportModule],
  providers: [UserAuthEstrategy],
  exports: [UserAuthEstrategy],
})
export class UserAuthModule {}
