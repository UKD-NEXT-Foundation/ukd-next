import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PAYMENT_CREDENTIALS_KEY } from '../default-keys/payment-credentials-key.const';
import { PaymentCredentials } from '../default-values/payment-credentials.class';
import { PaymentCredentialsResponseDto } from '../dto/payment-credentials-response.dto';
import { VariablesService } from '../variables.service';

@ApiTags('Payment credentials')
@Controller('/payment-credentials')
export class PaymentCredentialsController implements OnModuleInit {
  constructor(private readonly variablesService: VariablesService) {}

  async onModuleInit() {
    await this.variablesService.createDefault({
      key: PAYMENT_CREDENTIALS_KEY,
      value: JSON.stringify(new PaymentCredentials()),
    });
  }

  @ApiOkResponse({ type: () => PaymentCredentialsResponseDto })
  @Get()
  async findAll() {
    const key = PAYMENT_CREDENTIALS_KEY;
    const variable = await this.variablesService.findOne(key);

    return { key, value: JSON.parse(variable.value) };
  }
}
