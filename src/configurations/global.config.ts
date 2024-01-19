import { registerAs } from '@nestjs/config';
import { config } from '@src/configurations';

export const globalConfig = registerAs('global', config);
