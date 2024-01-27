import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GlobalConfigType } from '@src/configs';

export function typeormConfig(config: GlobalConfigType): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url: config.databaseURL,
    autoLoadEntities: true,
    synchronize: true,
  };
}
