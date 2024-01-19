import { ConfigType } from '@nestjs/config';
import { config } from '@src/configurations';

export type ConfigTypes = ConfigType<typeof config>;
