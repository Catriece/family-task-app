import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateTodoDto } from './create-todo-dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTodoDto {
  @IsNotEmpty()
  notesId: number;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  title: string;

  description: string;

  @IsOptional()
  dueOn: string;

  @IsOptional()
  @IsNumber()
  priority: number;

  @IsBoolean()
  completed: boolean;
}
