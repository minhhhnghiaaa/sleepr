import { IsEmail } from 'class-validator';

export default class NotifyEmailDto {
  @IsEmail()
  email: string;
}
