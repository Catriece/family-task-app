export class ChangePasswordDto {
  id: string;
  token: string;
  currentPassword: string;
  newPassword: string;
}
