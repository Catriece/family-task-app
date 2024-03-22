import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteTaskDto {
  @IsNotEmpty()
  @IsNumber()
  taskId: number;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
