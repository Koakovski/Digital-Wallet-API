import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EncryptService } from 'src/domain/services/encrypt.service';
import { JwtEncryptService } from './jwt.encrypt.service';
import { ConfigService } from 'src/domain/services/config.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: EncryptService,
      useClass: JwtEncryptService,
    },
  ],
  exports: [EncryptService, JwtModule],
})
export class EncryptModule {}
