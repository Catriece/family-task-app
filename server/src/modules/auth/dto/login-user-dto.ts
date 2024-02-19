import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';
import * as sanitizehtml from 'sanitize-html';

export class UserLoginDto {
  @IsEmail()
  @Transform((params) => sanitizehtml(params.value))
  email: string;
  @IsNotEmpty()
  password: string;
}
