import { ApiProperty } from '@nestjs/swagger';

import { PAYMENT_CREDENTIALS_KEY } from '../default-keys/payment-credentials-key.const';
import { PaymentCredentials } from '../default-values/payment-credentials.class';

export class PaymentCredentialsResponseDto {
  @ApiProperty({ default: PAYMENT_CREDENTIALS_KEY })
  key: string;

  @ApiProperty()
  value: PaymentCredentials;
}
