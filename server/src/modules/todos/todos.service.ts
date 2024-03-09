import { Injectable } from '@nestjs/common';
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
    return await this.todosRepository.find({ where: { userId: id } });
  }

  async createNewTodo(createTodoDto: CreateTodoDto) {
    return await this.todosRepository.save(createTodoDto);
  }

  async deleteTodo(notesId: number) {
    const todo = await this.todosRepository.delete(notesId);

    return todo;
  }

  async editTodo(updateTodoDto: UpdateTodoDto) {
    return await this.todosRepository.save(updateTodoDto);
  }
}
