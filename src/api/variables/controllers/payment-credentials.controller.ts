import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';

import { PaymentCredentials } from '../default-values/payment-credentials.class';
import { VariablesService } from '../variables.service';

@ApiTags('Payment credentials')
@Controller('payment-credentials')
export class PaymentCredentialsController implements OnModuleInit {
  constructor(private readonly variablesService: VariablesService) {}

  static readonly VARIABLE_KEY = 'PAYMENT_CREDENTIALS';

  async onModuleInit() {
    await this.variablesService.createDefault({
      key: PaymentCredentialsController.VARIABLE_KEY,
      value: JSON.stringify(new PaymentCredentials()),
    });
  }

  @ApiOkResponse({ type: () => PaymentCredentialsResponseDto })
  @Get()
  async findAll() {
    const key = PaymentCredentialsController.VARIABLE_KEY;
    const variable = await this.variablesService.findOne(key);

    return { key, value: JSON.parse(variable.value) };
  }
}

export class PaymentCredentialsResponseDto {
  @ApiProperty({ default: PaymentCredentialsController.VARIABLE_KEY })
  key: string;

  @ApiProperty()
  value: PaymentCredentials;
}
