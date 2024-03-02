import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TodosEntity } from './entities/todos.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo-dto';

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
    const todo = await this.todosRepository.save(createTodoDto);
    console.log(todo);
    return todo;
  }
}
