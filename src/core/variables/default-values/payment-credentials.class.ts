import { ApiProperty } from '@nestjs/swagger';

export class PaymentCredentials {
  @ApiProperty()
  receiver: string = 'ЗВО УНІВЕРСИТЕТ КОРОЛЯ ДАНИЛА';

  @ApiProperty()
  code: number = 24684167;

  @ApiProperty()
  IBAN: string = 'UA52 322313 0000026003000007524';

  @ApiProperty()
  bankName: string = 'АТ «Укрексімбанк» МФО 322313';

  @ApiProperty()
  purposeOfPayment: string = 'За навчання студента ПІБ, факультет, курс, форма навчання.';
}
