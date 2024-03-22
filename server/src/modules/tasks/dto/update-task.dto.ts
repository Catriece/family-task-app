import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTaskDto {
  @IsNotEmpty()
  taskId: number;

  @IsOptional()
  userId: string;

  @IsOptional()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  dueOn: string;

  @IsOptional()
  @IsNumber()
  priority: number;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
