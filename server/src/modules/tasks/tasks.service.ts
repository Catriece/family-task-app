import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './entities/tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
  ) {}

  async getUserTasks(id: string) {
    if (!id) throw new UnauthorizedException('Unable to find user tasks.');
    return await this.taskRepository.find({ where: { userId: id } });
  }

  async createNewTask(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.save(createTaskDto);
  }

  async deleteTask(taskId: number) {
    const task = await this.taskRepository.delete(taskId);
    if (!task)
      throw new UnauthorizedException('User is unable to delete this task.');

    return task;
  }

  async editTask(updateTaskDto: UpdateTaskDto) {
    const { userId, taskId } = updateTaskDto;
    const findTask = this.taskRepository.findOne({
      where: {
        taskId,
      },
    });
    console.log(findTask);
    // return await this.tasksRepository.save(updateTaskDto);
  }
}
