import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigTypes } from '@src/configurations';

export function typeormConfig(configService: ConfigService<ConfigTypes>): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url: configService.getOrThrow('databaseURL'),
    autoLoadEntities: true,
    synchronize: true,
  };
}
