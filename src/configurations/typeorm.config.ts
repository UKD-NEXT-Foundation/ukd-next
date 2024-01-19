import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigTypes } from '@src/configurations';

export function typeormConfig(config: ConfigTypes): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url: config.databaseURL,
    autoLoadEntities: true,
    synchronize: true,
  };
}
