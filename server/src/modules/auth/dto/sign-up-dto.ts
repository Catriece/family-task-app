import { UserLoginDto } from './login-user-dto';

export class SignUpDto extends UserLoginDto {
  firstName: string;
  lastName: string;
}
