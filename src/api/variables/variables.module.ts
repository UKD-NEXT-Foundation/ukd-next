import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/src/database/database.module';

import { FeatureFlagsController } from './controllers/feature-flags.controller';
import { PaymentCredentialsController } from './controllers/payment-credentials.controller';
import { VariablesController } from './controllers/variables.controller';
import { VariablesService } from './variables.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VariablesController, FeatureFlagsController, PaymentCredentialsController],
  providers: [VariablesService],
  exports: [VariablesService],
})
export class VariablesModule {}
