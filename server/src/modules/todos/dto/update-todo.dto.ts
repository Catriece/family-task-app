import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateTodoDto } from './create-todo-dto';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import sanitizeHtml from 'sanitize-html';

export class UpdateTodoDto {
  @IsNotEmpty()
  notesId: number;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  title: string;

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string;

  @IsOptional()
  dueOn: string;

  @IsOptional()
  @IsNumber()
  priority: number;

  @IsBoolean()
  completed: boolean;
}
