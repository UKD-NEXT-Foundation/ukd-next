import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';

import { FeatureFlags } from '../default-values/feature-flags.class';
import { VariablesService } from '../variables.service';

@ApiTags('Feature flags')
@Controller('feature-flags')
export class FeatureFlagsController implements OnModuleInit {
  constructor(private readonly variablesService: VariablesService) {}

  static readonly VARIABLE_KEY = 'FEATURE_FLAGS';

  async onModuleInit() {
    await this.variablesService.createDefault({
      key: FeatureFlagsController.VARIABLE_KEY,
      value: JSON.stringify(new FeatureFlags()),
    });
  }

  @ApiOkResponse({ type: () => FeatureFlagsResponseDto })
  @Get()
  async findAll() {
    const key = FeatureFlagsController.VARIABLE_KEY;
    const variable = await this.variablesService.findOne(key);

    return { key, value: JSON.parse(variable.value) };
  }
}

export class FeatureFlagsResponseDto {
  @ApiProperty({ default: FeatureFlagsController.VARIABLE_KEY })
  key: string;

  @ApiProperty()
  value: FeatureFlags;
}
