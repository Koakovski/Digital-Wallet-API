import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EncryptService } from 'src/domain/services/encrypt.service';
import { JwtEncryptService } from './jwt.encrypt.service';

@Module({
  imports: [JwtModule.register({ secret: 'secret_key' })],
  providers: [
    {
      provide: EncryptService,
      useClass: JwtEncryptService,
    },
  ],
  exports: [EncryptService],
})
export class EncryptModule {}
