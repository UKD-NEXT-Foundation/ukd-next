import { ApiProperty } from '@nestjs/swagger';

export class FeatureFlags {
  @ApiProperty({ default: false })
  newsTabEnabled = false;

  @ApiProperty({ default: false })
  profileFAQEnabled = false;

  @ApiProperty({ default: false })
  notificationServiceEnabled = false;

  @ApiProperty({ default: false })
  faqEnabled = false;
}
