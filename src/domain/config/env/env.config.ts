import { z } from 'zod';
import { Env } from './env.interface';

export class EnvConfig {
  static load(): Env {
    const parsedEnv = this.envSchema.safeParse(process.env);

    if (!parsedEnv.success) {
      if (!parsedEnv.error) {
        throw new Error('Invalid environment variables');
      }

      throw new Error(
        `Environment variable validation failed:\n
        ${parsedEnv.error.errors
          .map((err) => `- ${err.path.join('.')}: ${err.message}`)
          .join('\n')}`,
      );
    }

    return parsedEnv.data;
  }

  private static PORT_schema = z
    .string()
    .regex(/^\d+$/, 'must be a valid number')
    .transform((val) => Number(val))
    .default('3000');

  private static DATABASE_URL_schema = z
    .string()
    .regex(
      /^postgres(?:ql)?:\/\/(?<username>[^:]+):(?<password>[^@]+)@(?<host>[^:/]+):(?<port>\d+)\/(?<database>[^\s]+)$/,
      'Invalid PostgreSQL database URL',
    );

  private static JWT_SECRET_schema = z
    .string()
    .min(1, 'JWT_SECRET cannot be empty');

  private static envSchema = z.object({
    PORT: this.PORT_schema,
    DATABASE_URL: this.DATABASE_URL_schema,
    JWT_SECRET: this.JWT_SECRET_schema,
  });
}
