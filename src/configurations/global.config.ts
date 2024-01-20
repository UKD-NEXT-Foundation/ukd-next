import { ConfigType, registerAs } from '@nestjs/config';
import { config } from '@src/configurations';

export const GlobalConfig = registerAs('global', config).KEY;
export type GlobalConfigType = ConfigType<typeof config>;
