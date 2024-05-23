import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariablesService } from './variables.service';
import { VariablesController } from './variables.controller';
import { VariableEntity } from './entities/variable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariableEntity])],
  controllers: [VariablesController],
  providers: [VariablesService],
  exports: [VariablesService],
})
export class VariablesModule {}
