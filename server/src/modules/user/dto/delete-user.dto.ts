import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteUserDto {
  // can i extend login user dto?
  @IsUUID()
  id: string;

  @IsNotEmpty()
  password: string; // would like to store this separately in the db

  token: string;
}
