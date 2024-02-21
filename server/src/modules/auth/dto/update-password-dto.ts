export class UpdatePasswordDto {
  password: string; // Eventually change to currentPassword so this class can be extended by Change password
  token: string;
  id: string;
}

export class ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  token: string;
  id: string;
}
