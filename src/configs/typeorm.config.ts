import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GlobalConfigType } from '@app/src/configs';

export function typeormConfig(config: GlobalConfigType): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url: config.databaseURL,
    autoLoadEntities: true,
    synchronize: true,
  };
}
