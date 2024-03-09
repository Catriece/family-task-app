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
import { TodosService } from './todos.service';
import { UserService } from '../user/user.service';
import { CreateTodoDto } from './dto/create-todo-dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/get-todos')
  async getUserTodos(@Headers('Authorization') authorizationHeader: string) {
    const payload =
      await this.userService.extractPayloadFromHeader(authorizationHeader);
    const id = payload.sub.toString();
    return await this.todosService.getUserTodos(id);
  }

  @UseGuards(AuthGuard)
  @Post('/create-todos')
  async createNewTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.createNewTodo(createTodoDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete-todo')
  async deleteTodo(@Body() deleteTodoDto: DeleteTodoDto) {
    const { notesId } = deleteTodoDto;
    const deleted = await this.todosService.deleteTodo(notesId);
    return deleted;
  }

  //@UseGuards(AuthGuard)
  @Put('/edit-my-todo')
  async editTodo(@Body() updateTodoDto: UpdateTodoDto) {
    const edited = await this.todosService.editTodo(updateTodoDto);
    return edited;
  }
}
