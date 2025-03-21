import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserAuthEstrategy } from './user.auth.strategy';

@Module({
  imports: [ PassportModule],
  providers: [UserAuthEstrategy],
  exports: [UserAuthEstrategy],
})
export class UserAuthModule {}
