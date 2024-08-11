import { Module } from '@nestjs/common';
import { VariablesService } from './variables.service';
import { VariablesController } from './controllers/variables.controller';
import { FeatureFlagsController } from './controllers/feature-flags.controller';
import { PaymentCredentialsController } from './controllers/payment-credentials.controller';
import { DatabaseModule } from '@app/src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VariablesController, FeatureFlagsController, PaymentCredentialsController],
  providers: [VariablesService],
  exports: [VariablesService],
})
export class VariablesModule {}
