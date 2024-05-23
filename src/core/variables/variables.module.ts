import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariablesService } from './variables.service';
import { VariablesController } from './controllers/variables.controller';
import { VariableEntity } from './entities/variable.entity';
import { FeatureFlagsController } from './controllers/feature-flags.controller';
import { PaymentCredentialsController } from './controllers/payment-credentials.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VariableEntity])],
  controllers: [VariablesController, FeatureFlagsController, PaymentCredentialsController],
  providers: [VariablesService],
  exports: [VariablesService],
})
export class VariablesModule {}
