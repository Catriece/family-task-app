import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Headers,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TasksService } from './tasks.service';
import { UserService } from '../user/user.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/get-tasks')
  async getUserTasks(@Headers('Authorization') authorizationHeader: string) {
    const payload =
      await this.userService.extractPayloadFromHeader(authorizationHeader);
    const id = payload.sub.toString();
    return await this.tasksService.getUserTasks(id);
  }

  @UseGuards(AuthGuard)
  @Post('/create-tasks')
  async createNewTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.createNewTask(createTaskDto);
  }

  //@UseGuards(AuthGuard)
  @Delete('/delete-task')
  async deleteTask(@Body() deleteTaskDto: DeleteTaskDto) {
    const { taskId } = deleteTaskDto;
    const deleted = await this.tasksService.deleteTask(taskId);
    return deleted;
  }

  //@UseGuards(AuthGuard)
  @Put('/edit-my-task')
  async editTask(@Body() updateTaskDto: UpdateTaskDto) {
    const edited = await this.tasksService.editTask(updateTaskDto);
    return edited;
  }
}
