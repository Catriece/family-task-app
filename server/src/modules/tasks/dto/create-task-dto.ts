import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  taskId: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  // @IsNotEmpty()
  // @IsString()
  // dueOn: string;

  @IsNumber()
  priority: number;

  @IsBoolean()
  completed: boolean;
}
