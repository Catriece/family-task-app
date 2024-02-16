export class CreateUserDto {
  // can i extend login user dto?
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string; // would like to store this separately in the db
}
