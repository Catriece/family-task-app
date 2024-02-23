import { IsNotEmpty } from 'class-validator';
import { UserLoginDto } from './login-user-dto';
import * as sanitizehtml from 'sanitize-html';
import { Transform } from 'class-transformer';

export class SignUpDto extends UserLoginDto {
  @IsNotEmpty() // Class-validator; Makes sure first name isn't an empty string
  @Transform((params) => sanitizehtml(params.value))
  firstName: string;

  @IsNotEmpty() // Class-validator; Makes sure last name isn't an empty string
  @Transform((params) => sanitizehtml(params.value))
  lastName: string;
}
