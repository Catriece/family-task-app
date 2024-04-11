import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserDto {
  // can i extend login user dto?
  // @IsUUID()
  // id: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string; // would like to store this separately in the db
}
