import { Controller, UseGuards, Get, Post, Body, Query } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TodosService } from './todos.service';
import { UserService } from '../user/user.service';
import { CreateTodoDto } from './dto/create-todo-dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  //   @UseGuards(AuthGuard)
  @Get('/get-todos')
  async getUserTodos(@Query('id') id: string) {
    return await this.todosService.getUserTodos(id);
  }

  //   @UseGuards(AuthGuard)
  @Post('/create-todos')
  async createNewTodo(@Body() createTodoDto: CreateTodoDto) {
    console.log('Made it to route?', createTodoDto);
    return await this.todosService.createNewTodo(createTodoDto);
  }
}
