import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async getOneTask(taskId: number) {
    if (!taskId) throw new UnauthorizedException('Unable to find user tasks.');
    return await this.taskRepository.find({ where: { taskId } });
  }

  async updateTask(updateTaskDto: UpdateTaskDto) {
    const { taskId } = updateTaskDto;
    const taskToUpdate = await this.taskRepository.findOne({
      where: {
        taskId,
      },
    });

    if (!taskToUpdate) {
      throw new NotFoundException(`Task with ID ${taskId} was not found`);
    }

    // Update the task entity with new data
    await this.taskRepository.merge(taskToUpdate, updateTaskDto);

    const task = await this.taskRepository.save(taskToUpdate);
    return task;
  }

  async markCompleted(taskId: number, completed: boolean) {
    const findTask = await this.taskRepository.findOne({ where: { taskId } });

    if (!findTask)
      throw new NotFoundException(`Task with id ${taskId} was not found`);

    findTask.completed = completed;
    // Save the updated task
    await this.taskRepository.save(findTask);

    // get task to send back to frontend
    const task = await this.taskRepository.findOne({ where: { taskId } });

    return task;
  }
}
