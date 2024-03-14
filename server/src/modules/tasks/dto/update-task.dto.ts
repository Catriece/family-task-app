import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import sanitizeHtml from 'sanitize-html';

export class UpdateTaskDto {
  @IsNotEmpty()
  taskId: number;

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
