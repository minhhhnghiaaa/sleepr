import { IsEmail, IsString } from 'class-validator';

export default class NotifyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  text: string;
}
