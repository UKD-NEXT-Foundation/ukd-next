import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { FEATURE_FLAGS_KEY } from '../default-keys/feature-flags-key.const';
import { FeatureFlags } from '../default-values/feature-flags.class';
import { FeatureFlagsResponseDto } from '../dto/feature-flags-response.dto';
import { VariablesService } from '../variables.service';

@ApiTags('Feature flags')
@Controller('/feature-flags')
export class FeatureFlagsController implements OnModuleInit {
  constructor(private readonly variablesService: VariablesService) {}

  async onModuleInit() {
    await this.variablesService.createDefault({
      key: FEATURE_FLAGS_KEY,
      value: JSON.stringify(new FeatureFlags()),
    });
  }

  @ApiOkResponse({ type: () => FeatureFlagsResponseDto })
  @Get()
  async findAll() {
    const key = FEATURE_FLAGS_KEY;
    const variable = await this.variablesService.findOne(key);

    return { key, value: JSON.parse(variable.value) };
  }
}
