import { ConfigType, registerAs } from '@nestjs/config';
import { config } from '@app/src/configs';

export const GlobalConfig = registerAs('global', config).KEY;
export type GlobalConfigType = ConfigType<typeof config>;
