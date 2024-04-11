import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  //taskId: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  dueOn: string;

  @IsNumber()
  priority: number;

  @IsBoolean()
  completed: boolean;
}
