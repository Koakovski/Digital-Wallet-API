import { Global, Module } from '@nestjs/common';
import { HashService } from 'src/domain/services/hash.service';
import { BcryptHashService } from './bcrypt.hash.service';

@Global()
@Module({
  providers: [{ provide: HashService, useClass: BcryptHashService }],
  exports: [HashService],
})
export class HashModule {}
