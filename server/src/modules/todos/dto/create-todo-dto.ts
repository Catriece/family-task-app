import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import * as sanitizehtml from 'sanitize-html';

export class CreateTodoDto {
  notesId: number;
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  dueOn: string;

  priority: number;

  completed: boolean;
}
