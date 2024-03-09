import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as sanitizehtml from 'sanitize-html';

export class CreateTodoDto {
  notesId: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  dueOn: string;

  @IsNumber()
  priority: number;

  @IsBoolean()
  completed: boolean;
}
