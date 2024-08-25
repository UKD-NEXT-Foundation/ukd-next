import { ApiProperty } from '@nestjs/swagger';

import { FEATURE_FLAGS_KEY } from '../default-keys/feature-flags-key.const';
import { FeatureFlags } from '../default-values/feature-flags.class';

export class FeatureFlagsResponseDto {
  @ApiProperty({ default: FEATURE_FLAGS_KEY })
  key: string;

  @ApiProperty()
  value: FeatureFlags;
}
