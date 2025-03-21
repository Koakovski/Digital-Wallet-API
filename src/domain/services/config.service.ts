import { Env } from '../config/env/env.interface';

export interface ConfigService {
  get<Key extends keyof Env>(key: Key): Env[Key];
}

export const ConfigService = Symbol('ConfigService');
