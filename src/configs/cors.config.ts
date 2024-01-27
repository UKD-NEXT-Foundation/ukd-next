import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import ms from 'ms';

export const corsConfig: CorsOptions = {
  origin: '*',
  credentials: true,
  maxAge: ms('7 days'),
};
