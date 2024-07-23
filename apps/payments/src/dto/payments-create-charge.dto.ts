import { CreateChargeDto } from '@app/common';
import { IsEmail } from 'class-validator';

export default class PaymentsCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}
