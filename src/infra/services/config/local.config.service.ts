import { EnvConfig } from 'src/domain/config/env/env.config';
import { Env } from 'src/domain/config/env/env.interface';
import { ConfigService } from 'src/domain/services/config.service';

export class LocalConfigService implements ConfigService {
  private env?: Env = undefined;

  get<Key extends keyof Env>(key: Key): Env[Key] {
    if (!this.env) {
      throw new Error('Config has not been initialized');
    }

    return this.env[key];
  }

  initialize() {
    this.env = EnvConfig.load();
  }
}
