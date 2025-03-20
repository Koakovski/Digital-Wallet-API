import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from 'src/domain/services/encrypt.service';

@Injectable()
export class JwtEncryptService implements EncryptService {
  constructor(private readonly jwtService: JwtService) {}

  encrypt(payload: Record<string, any>): string {
    return this.jwtService.sign(payload);
  }

  decrypt<T extends object>(token: string): T {
    return this.jwtService.verify<T>(token);
  }
}
