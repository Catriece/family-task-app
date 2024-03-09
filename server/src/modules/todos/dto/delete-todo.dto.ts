import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteTodoDto {
  @IsNotEmpty()
  @IsNumber()
  notesId: number;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
