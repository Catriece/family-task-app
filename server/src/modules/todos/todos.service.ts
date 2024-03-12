import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TodosEntity } from './entities/todos.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodosEntity)
    private readonly todosRepository: Repository<TodosEntity>,
  ) {}

  async getUserTodos(id: string) {
    if (!id) throw new UnauthorizedException('User to find user tasks.');
    return await this.todosRepository.find({ where: { userId: id } });
  }

  async createNewTodo(createTodoDto: CreateTodoDto) {
    return await this.todosRepository.save(createTodoDto);
  }

  async deleteTodo(notesId: number) {
    const todo = await this.todosRepository.delete(notesId);

    if (!todo)
      throw new UnauthorizedException('User is unable to delete this task.');

    return todo;
  }

  async editTodo(updateTodoDto: UpdateTodoDto) {
    const { userId, notesId } = updateTodoDto;
    const taskNeedingUpdate = this.todosRepository.findOne({
      where: {
        notesId,
      },
    });
    return await this.todosRepository.save(updateTodoDto);
  }
}
