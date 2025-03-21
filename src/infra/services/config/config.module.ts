import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from 'src/domain/services/config.service';
import { LocalConfigService } from './local.config.service';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: ConfigService,
          useFactory: () => {
            const configService = new LocalConfigService();
            configService.initialize();
            return configService;
          },
        },
      ],
      exports: [ConfigService],
    };
  }
}
