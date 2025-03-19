import { HashService } from 'src/domain/services/hash.service';
import * as bcrypt from 'bcrypt';

export class BcryptHashService implements HashService {
  private readonly SALT_ROUNDS = 10;

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.SALT_ROUNDS);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return await bcrypt.compare(value, hashedValue);
  }
}
